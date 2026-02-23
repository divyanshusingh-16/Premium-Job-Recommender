import re

def normalize_text(s: str) -> str:
    s = str(s).lower()
    s = re.sub(r"[^a-z0-9+.#\s]", " ", s)
    s = re.sub(r"\s+", " ", s).strip()
    return s

def parse_skills(skills: str):
    # split by comma or space groups
    if not skills:
        return []
    skills = skills.replace(";", ",")
    parts = [p.strip().lower() for p in re.split(r",|\n", skills) if p.strip()]
    # also split items that have spaces like "machine learning"
    return parts

def contains_any(text: str, skill_list):
    t = normalize_text(text)
    for sk in skill_list:
        if normalize_text(sk) in t:
            return True
    return False


# --- Resume NLP Extraction (spaCy PhraseMatcher) ---
def extract_skills_from_text(raw_text: str):
    """
    Extracts a set of tech skills from raw resume text using spaCy PhraseMatcher
    against a curated list of common skills. Returns a deduplicated list.
    """
    try:
        import spacy
        from spacy.matcher import PhraseMatcher
    except Exception:
        # If spaCy isn't installed, raise an informative error for the server logs
        raise RuntimeError("spaCy is required for skill extraction. Please install spacy and en_core_web_sm.")

    # Small curated skills vocabulary - extendable
    SKILLS = [
        "python", "java", "c++", "c#", "javascript", "react", "angular",
        "sql", "nosql", "mongodb", "postgresql", "mysql", "tensorflow",
        "pytorch", "machine learning", "deep learning", "data science",
        "data structures", "algorithms", "flask", "django", "aws", "azure",
        "gcp", "docker", "kubernetes", "pandas", "numpy", "scikit-learn",
        "spark", "hadoop", "tableau", "power bi", "excel", "rest api"
    ]

    # Load model once per process if possible
    try:
        nlp = spacy.load("en_core_web_sm")
    except Exception:
        # Provide a clearer message if model not present
        raise RuntimeError("spaCy language model 'en_core_web_sm' not found. Run 'python -m spacy download en_core_web_sm'.")

    matcher = PhraseMatcher(nlp.vocab, attr='LOWER')
    patterns = [nlp.make_doc(s) for s in SKILLS]
    matcher.add('SKILL', patterns)

    doc = nlp(raw_text or "")
    matches = matcher(doc)
    found = []
    for match_id, start, end in matches:
        span = doc[start:end].text.strip()
        # Normalize common variants
        found.append(span)

    # Deduplicate preserving order
    seen = set()
    results = []
    for s in found:
        key = s.lower()
        if key not in seen:
            seen.add(key)
            results.append(s)

    return results
