import numpy as np
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
from recommender.utils import normalize_text, parse_skills

def _compose_job_text(row):
    return " ".join([
        str(row.get("title","")),
        str(row.get("company","")),
        str(row.get("location","")),
        str(row.get("skills","")),
        str(row.get("description","")),
        str(row.get("job_type","")),
        str(row.get("level","")),
    ])

def recommend_jobs(df: pd.DataFrame, skills: str, experience_years: int,
                   location: str="", preference: str="", job_type: str="", top_n: int=10):
    df = df.copy()
    df["job_text"] = df.apply(_compose_job_text, axis=1).map(normalize_text)

    skill_list = parse_skills(skills)
    query_parts = [skills, preference, location, job_type]
    query = " ".join([p for p in query_parts if p]).strip()
    query = normalize_text(query)

    vectorizer = TfidfVectorizer(stop_words="english")
    X = vectorizer.fit_transform(df["job_text"])
    q = vectorizer.transform([query])

    sim = cosine_similarity(q, X).flatten()

    # rule-based boosts
    boost = np.zeros(len(df))

    # experience boost
    for i, level in enumerate(df.get("level", [""]*len(df))):
        lvl = str(level).lower()
        if experience_years <= 1 and ("intern" in lvl or "fresher" in lvl or "junior" in lvl):
            boost[i] += 0.12
        if 2 <= experience_years <= 4 and ("mid" in lvl or "associate" in lvl):
            boost[i] += 0.08
        if experience_years >= 5 and ("senior" in lvl or "lead" in lvl or "manager" in lvl):
            boost[i] += 0.10

    # exact skill match boost
    for i, jobskills in enumerate(df.get("skills", [""]*len(df))):
        s = normalize_text(jobskills)
        hits = 0
        for sk in skill_list:
            if normalize_text(sk) in s:
                hits += 1
        if hits:
            boost[i] += min(0.18, hits * 0.05)

    # filters
    def match_filter(col, value):
        if not value:
            return np.ones(len(df), dtype=bool)
        return df[col].astype(str).str.lower().str.contains(str(value).lower())

    loc_mask = match_filter("location", location)
    type_mask = match_filter("job_type", job_type)

    score = sim + boost
    df["score"] = score

    filtered = df[loc_mask & type_mask].copy()
    if len(filtered) < 5:
        # fallback to similarity only if filters are too strict
        filtered = df.copy()

    filtered = filtered.sort_values("score", ascending=False).head(top_n)

    results = []
    for _, r in filtered.iterrows():
        why = []
        if location and location.lower() in str(r.get("location","")).lower():
            why.append("Matches your preferred location")
        if job_type and job_type.lower() in str(r.get("job_type","")).lower():
            why.append("Matches your job type filter")
        # top 3 skills overlap
        overlaps = []
        for sk in skill_list:
            if normalize_text(sk) in normalize_text(r.get("skills","")):
                overlaps.append(sk)
        if overlaps:
            why.append(f"Skill match: {', '.join(overlaps[:3])}")
        if not why:
            why.append("Recommended based on keyword similarity")

        results.append({
            "title": r.get("title",""),
            "company": r.get("company",""),
            "location": r.get("location",""),
            "job_type": r.get("job_type",""),
            "level": r.get("level",""),
            "salary": r.get("salary",""),
            "skills": r.get("skills",""),
            "score": float(r.get("score", 0.0)),
            "why": " • ".join(why),
            "apply_link": r.get("apply_link","")
        })

    return results

def build_company_stats(df: pd.DataFrame):
    df = df.copy()
    df["company"] = df["company"].astype(str)
    g = df.groupby("company").size().sort_values(ascending=False).head(30)
    out = [{"company": k, "openings": int(v)} for k, v in g.items()]
    return out

def build_skill_stats(df: pd.DataFrame):
    skills = []
    for s in df.get("skills", []):
        if not s:
            continue
        parts = [p.strip().lower() for p in str(s).split(",") if p.strip()]
        skills.extend(parts)

    from collections import Counter
    c = Counter(skills)
    top = c.most_common(25)
    return [{"skill": k, "count": int(v)} for k, v in top]
