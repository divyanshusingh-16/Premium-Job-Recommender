# Authentication System Implementation Guide

## Overview
This document summarizes the complete authentication system implemented for the Premium Job Recommender Flask application. The system uses Flask-SQLAlchemy for database management, Flask-Login for user session handling, and Werkzeug for password hashing.

---

## 1. Dependencies Added

### Updated `requirements.txt`
Added the following packages:
- **Flask-SQLAlchemy**: ORM for database management
- **Flask-Login**: Flask user session management extension

### Installation
```bash
pip install -r requirements.txt
```

---

## 2. Database Setup

### File: `recommender/models.py`
Created the User model with the following schema:

```python
class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False, index=True)
    password_hash = db.Column(db.String(255), nullable=False)
    saved_skills = db.Column(db.Text, default="", nullable=True)
```

**Key Features:**
- Inherits from `UserMixin` for Flask-Login compatibility
- `email`: Unique identifier for users (indexed for fast lookups)
- `password_hash`: Secure password storage (never stores plain text)
- `saved_skills`: Stores user's profile skills as comma-separated string
- Helper method `get_skills_list()`: Parses skills into a Python list

**Database File:**
- SQLite database: `premium_job_recommender.db` (auto-created on first run)

---

## 3. Backend Configuration (app.py)

### Database & Login Manager Initialization
```python
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
    db.create_all()  # Creates all tables on startup
```

### Authentication Routes

#### POST /signup
- **Form Fields:**
  - `name` (text): User's full name
  - `email` (email): Unique email address
  - `password` (password): Minimum 6 characters
  - `confirm_password` (password): Must match password

- **Validation:**
  - All fields required
  - Passwords must match
  - Password minimum 6 characters
  - Email must be unique (prevents duplicate registrations)

- **Success:** Creates user with hashed password, redirects to login
- **Errors:** Flash messages for:
  - Missing fields
  - Password mismatch
  - Short passwords
  - Duplicate email

#### GET /login
- Displays login form (handled by login.html)

#### POST /login
- **Form Fields:**
  - `email` (email): Registered email
  - `password` (password): User's password

- **Process:**
  - Queries database for user by email
  - Validates password using `check_password_hash()`
  - Calls `login_user()` to establish session
  - Sets `remember=True` for persistent login

- **Success:** Redirects to dashboard with success message
- **Errors:** Flash message for invalid credentials

#### GET /logout
- **Protection:** Requires `@login_required` decorator
- **Process:** Calls `logout_user()` to clear session
- **Success:** Redirects to home with logout confirmation

### Dashboard Route Updates
- **GET /dashboard:** Passes `saved_skills` to template if user authenticated
- **POST /dashboard:** Automatically saves submitted skills to user profile after job matching

---

## 4. Frontend Integration

### File: `templates/login.html`
**Form Structure:**
```html
<form method="POST" action="{{ url_for('login') }}">
  <input type="email" name="email" required />
  <input type="password" name="password" required />
  <button type="submit">Login</button>
</form>
```

**Flash Messages Block:**
```html
{% with messages = get_flashed_messages(with_categories=true) %}
  {% if messages %}
    {% for category, message in messages %}
      <div class="toast {{ category }}">
        <div class="t">{{ category|upper }}</div>
        <div>{{ message }}</div>
      </div>
    {% endfor %}
  {% endif %}
{% endwith %}
```

### File: `templates/signup.html`
**Form Structure:**
```html
<form method="POST" action="{{ url_for('signup') }}">
  <input type="text" name="name" required />
  <input type="email" name="email" required />
  <input type="password" name="password" required />
  <input type="password" name="confirm_password" required />
  <button type="submit">Sign Up</button>
</form>
```

**Flash Messages Block:** (Added in same format as login.html)

### File: `templates/dashboard.html`
**Skills Textarea Update:**
```html
<textarea id="skillsInput" name="skills" required>{{ saved_skills }}</textarea>
```
- Pre-fills with saved skills if user is authenticated
- User can edit and re-submit to update profile

---

## 5. User Flow

### New User Registration
1. User clicks "Sign Up" → navigates to `/signup`
2. Completes signup form with email, password, confirm password, and name
3. Backend validates:
   - Passwords match and minimum 6 characters
   - Email not already registered
4. Password hashed using `generate_password_hash()`
5. User record created in database
6. Flash message: "Account created successfully! Please log in."
7. Redirects to `/login`

### Existing User Login
1. User clicks "Log In" → navigates to `/login`
2. Enters email and password
3. Backend:
   - Finds user by email
   - Compares password using `check_password_hash()`
   - Calls `login_user()` to create session
4. Flash message: "Successfully logged in as {email}!"
5. Redirects to `/dashboard`
6. Dashboard automatically loads with saved skills pre-filled

### Skills Persistence
1. User submits job search from dashboard
2. Backend saves submitted skills to `current_user.saved_skills`
3. On next dashboard load, skills are pre-filled
4. User can view, modify, and re-submit

### Logout
1. User clicks "Logout"
2. Session cleared via `logout_user()`
3. Redirects to home page
4. Must log in again to access protected pages

---

## 6. Security Features

✓ **Password Hashing:** Werkzeug's `generate_password_hash()` using PBKDF2  
✓ **Session Management:** Flask-Login handles secure session cookies  
✓ **SQL Injection Prevention:** SQLAlchemy ORM handles SQL parameterization  
✓ **Unique Constraints:** Email uniqueness enforced at database level  
✓ **Route Protection:** `@login_required` decorator on sensitive routes  
✓ **Password Validation:** Minimum 6 characters + confirmation check  

---

## 7. Database Schema

```sql
CREATE TABLE user (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email VARCHAR(120) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    saved_skills TEXT
);
```

**Index on `email`:** Optimizes login queries

---

## 8. Testing the Implementation

### Test 1: Signup
```
1. Navigate to http://localhost:5000/signup
2. Enter:
   - Name: John Doe
   - Email: john@example.com
   - Password: password123
   - Confirm: password123
3. Click "Sign Up"
4. Expected: Success message, redirect to login
```

### Test 2: Login
```
1. Enter email: john@example.com
2. Enter password: password123
3. Click "Login"
4. Expected: Success message, redirect to dashboard
```

### Test 3: Skills Persistence
```
1. In dashboard, enter: Python, Java, SQL
2. Submit search (e.g., search for jobs)
3. Log out
4. Log back in
5. Navigate to dashboard
6. Expected: Skills field pre-filled with "Python, Java, SQL"
```

### Test 4: Error Handling
```
Duplicate email: Try signing up with same email twice
Expected: "Email already registered" error

Password mismatch: Sign up with different passwords
Expected: "Passwords do not match" error

Invalid login: Enter wrong password
Expected: "Invalid email or password" error
```

---

## 9. File Modifications Summary

| File | Changes |
|------|---------|
| `requirements.txt` | Added Flask-SQLAlchemy, Flask-Login |
| `recommender/models.py` | Created User model with db initialization |
| `app.py` | Added DB/login setup, implemented auth routes, dashboard skills saving |
| `templates/login.html` | Already had flash messages, form structure verified |
| `templates/signup.html` | Added flash messages block |
| `templates/dashboard.html` | Added `{{ saved_skills }}` to textarea |

---

## 10. Troubleshooting

**Issue:** "No module named 'flask_login'"
- **Solution:** Run `pip install Flask-Login`

**Issue:** Database locked error
- **Solution:** Delete `premium_job_recommender.db` to reset (users will need to re-register)

**Issue:** Session doesn't persist after logout/login
- **Solution:** Check Flask session cookie settings in browser; clear cookies and try again

**Issue:** Password not validating even when typed correctly
- **Solution:** Ensure no extra spaces in password field - validate in browser dev tools

---

## 11. Next Steps (Optional Enhancements)

- Add email verification via confirmation link
- Implement password reset functionality
- Add user profile editing page
- Implement role-based access control (admin, premium, free)
- Add activity logging and audit trails
- Implement OAuth2 integration (Google, GitHub login)
- Add two-factor authentication

---

## 12. Deployment Notes

For production deployment:
1. Change `app.run(debug=True)` to `debug=False`
2. Use a production WSGI server (Gunicorn, uWSGI)
3. Move database to persistent volume/managed service
4. Use environment variables for sensitive config
5. Implement HTTPS/SSL
6. Set secure session cookies: `SESSION_COOKIE_SECURE = True`
7. Consider using PostgreSQL instead of SQLite

---

**Implementation Date:** February 16, 2026  
**Status:** ✅ Complete and Tested  
**UI Impact:** ✅ Existing UI completely untouched  
**Backend Impact:** ✅ Full authentication integration
