from flask import Flask, render_template, request, redirect, url_for, flash, session, jsonify
from flask_login import LoginManager, login_user, logout_user, login_required, current_user
from werkzeug.security import generate_password_hash, check_password_hash
import pandas as pd
from recommender.model import recommend_jobs, build_company_stats, build_skill_stats
from recommender.utils import extract_skills_from_text
from recommender.models import db, User
import io
import os

try:
    import pdfplumber
except Exception:
    pdfplumber = None

app = Flask(__name__)
app.secret_key = "premium-job-recommender-secret"
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///premium_job_recommender.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'
login_manager.login_message = 'Please log in to access this page.'
login_manager.login_message_category = 'info'

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

with app.app_context():
    db.create_all()

DATA_PATH = "jobs.csv"

def load_jobs():
    df = pd.read_csv(DATA_PATH)
    # basic cleaning
    df.fillna("", inplace=True)
    return df

@app.route("/", methods=["GET"])
def home():
    return render_template("index.html")

@app.route("/dashboard", methods=["GET", "POST"])
def dashboard():
    if request.method == "POST":
        skills = request.form.get("skills", "").strip()
        experience = request.form.get("experience", "").strip()
        location = request.form.get("location", "").strip()
        preference = request.form.get("preference", "").strip()
        job_type = request.form.get("job_type", "").strip()

        if not skills:
            flash("Skills field cannot be empty.", "danger")
            return redirect(url_for("dashboard"))

        # validate experience
        try:
            exp_val = int(experience) if experience else 0
            if exp_val < 0 or exp_val > 50:
                raise ValueError
        except:
            flash("Experience must be a valid number (0–50).", "danger")
            return redirect(url_for("dashboard"))

        df = load_jobs()
        recs = recommend_jobs(
            df=df,
            skills=skills,
            experience_years=exp_val,
            location=location,
            preference=preference,
            job_type=job_type,
            top_n=12
        )
        # Save skills to user profile if authenticated
        if current_user.is_authenticated:
            current_user.saved_skills = skills
            db.session.commit()
        
        return render_template("results.html", results=recs, skills=skills)

    # Get saved skills if user is authenticated
    saved_skills = ""
    if current_user.is_authenticated and current_user.saved_skills:
        saved_skills = current_user.saved_skills
    
    return render_template("dashboard.html", saved_skills=saved_skills)

@app.route("/companies", methods=["GET"])
def companies():
    df = load_jobs()
    stats = build_company_stats(df)
    return render_template("companies.html", companies=stats)

@app.route("/analysis", methods=["GET"])
def analysis():
    df = load_jobs()
    skill_stats = build_skill_stats(df)
    return render_template("analysis.html", skill_stats=skill_stats)

# ---------- Authentication Routes ----------

@app.route("/signup", methods=["GET", "POST"])
def signup():
    if request.method == "POST":
        email = request.form.get("email", "").strip()
        password = request.form.get("password", "").strip()
        confirm_password = request.form.get("confirm_password", "").strip()
        name = request.form.get("name", "").strip()
        
        # Validation
        if not email or not password or not confirm_password:
            flash("All fields are required.", "danger")
            return redirect(url_for("signup"))
        
        if password != confirm_password:
            flash("Passwords do not match.", "danger")
            return redirect(url_for("signup"))
        
        if len(password) < 6:
            flash("Password must be at least 6 characters long.", "danger")
            return redirect(url_for("signup"))
        
        # Check if email already exists
        existing_user = User.query.filter_by(email=email).first()
        if existing_user:
            flash("Email already registered. Please log in or use a different email.", "danger")
            return redirect(url_for("signup"))
        
        # Create new user
        password_hash = generate_password_hash(password)
        new_user = User(email=email, password_hash=password_hash, saved_skills="")
        
        try:
            db.session.add(new_user)
            db.session.commit()
            flash("Account created successfully! Please log in.", "success")
            return redirect(url_for("login"))
        except Exception as e:
            db.session.rollback()
            flash("An error occurred during signup. Please try again.", "danger")
            return redirect(url_for("signup"))
    
    return render_template("signup.html")

@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        email = request.form.get("email", "").strip()
        password = request.form.get("password", "").strip()
        
        if not email or not password:
            flash("Email and password are required.", "danger")
            return redirect(url_for("login"))
        
        user = User.query.filter_by(email=email).first()
        
        if user and check_password_hash(user.password_hash, password):
            login_user(user, remember=True)
            flash(f"Successfully logged in as {email}!", "success")
            return redirect(url_for("dashboard"))
        else:
            flash("Invalid email or password. Please try again.", "danger")
            return redirect(url_for("login"))
    
    return render_template("login.html")

@app.route("/logout")
@login_required
def logout():
    logout_user()
    flash("You have been successfully logged out.", "info")
    return redirect(url_for("home"))

@app.route("/login_to_apply")
def login_to_apply():
    """This route intercepts unauthenticated users clicking 'Apply Now'."""
    flash("Please log in or create an account to apply for jobs.", "info")
    return redirect(url_for("login"))


@app.route('/parse_resume', methods=['POST'])
def parse_resume():
    """Accepts a PDF file upload (in-memory), extracts text and returns detected skills as JSON."""
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    f = request.files['file']
    if f.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    # Ensure pdfplumber available
    if pdfplumber is None:
        return jsonify({'error': 'Server not configured for PDF parsing (missing pdfplumber).'}), 500

    try:
        # Read PDF from file stream without saving to disk
        raw_text = []
        with pdfplumber.open(f.stream) as pdf:
            for page in pdf.pages:
                text = page.extract_text() or ''
                raw_text.append(text)

        full_text = "\n".join(raw_text)

        skills_list = extract_skills_from_text(full_text)
        skills_csv = ", ".join(skills_list)
        return jsonify({'skills': skills_csv})
    except Exception as e:
        # Log server-side if needed, return generic error message to client
        return jsonify({'error': 'Failed to parse resume', 'details': str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)