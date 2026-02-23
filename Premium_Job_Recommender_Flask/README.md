# Premium Job Recommender (Flask) — Blue Dashboard UI

A premium-looking job recommendation web app built using **Flask + CSV dataset**.
Includes a modular structure for **future features** like authentication, DB profile storage,
resume parsing, skill gap analysis, salary estimation, and feedback loops.

## ✅ Features (Working)
- Premium Blue Dashboard UI
- Input: skills, experience, location, preference, job type
- Job recommendations using TF-IDF similarity + weighted skill match
- Filters + rank scoring
- Company list page
- Analytics page

## 🧩 Future (Included as folders & starter code)
- Authentication (Login/Signup UI)
- DB model stubs (SQLite supported)
- Resume parsing endpoints (PDF/DOCX)
- Skill gap analysis stub
- Salary estimation stub
- Feedback collection stub
- Explainable AI (why recommended)

---

## ▶️ Run Locally

### 1) Install
```bash
pip install -r requirements.txt
```

### 2) Run
```bash
python app.py
```

### 3) Open
http://127.0.0.1:5000/

---

## Project Structure
```
Premium_Job_Recommender_Flask/
│ app.py
│ jobs.csv
│ requirements.txt
│ README.md
├─ recommender/
│   ├─ model.py
│   ├─ utils.py
│   └─ __init__.py
├─ templates/
│   ├─ index.html
│   ├─ dashboard.html
│   ├─ results.html
│   ├─ companies.html
│   ├─ analysis.html
│   ├─ login.html          (future)
│   └─ signup.html         (future)
├─ static/
│   ├─ css/style.css
│   └─ js/app.js
└─ future/
    ├─ auth/
    ├─ database/
    ├─ resume_parser/
    ├─ explainable_ai/
    └─ feedback/
```

---

## Notes
- Dataset in `jobs.csv` is included with ~50 sample jobs for testing.
- You can replace `jobs.csv` with your real dataset.
