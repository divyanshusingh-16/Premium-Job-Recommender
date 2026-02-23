# Getting Started - Authentication System

## Pre-requisites
- Python 3.8+
- pip (Python package manager)

## Installation Steps

### 1. Install Dependencies
```bash
cd Premium_Job_Recommender_Flask
pip install -r requirements.txt
```

This installs:
- Flask (web framework)
- Flask-SQLAlchemy (database ORM)
- Flask-Login (session management)
- Werkzeug (password hashing)
- pandas, scikit-learn, numpy (data processing)
- And other dependencies...

### 2. Download spaCy Model (for resume parsing)
```bash
python -m spacy download en_core_web_sm
```

### 3. Run the Application
```bash
python app.py
```

**Output:**
```
 * Serving Flask app 'app'
 * Debug mode: on
 * Running on http://127.0.0.1:5000
```

### 4. Open in Browser
Visit: **http://127.0.0.1:5000**

---

## User Workflow

### First-Time User: Registration

1. **Navigate to Signup**
   - Click "Sign Up" from homepage or sidebar
   - Or go directly to: http://127.0.0.1:5000/signup

2. **Fill Registration Form**
   ```
   Full Name:        John Doe
   Email:            john.doe@example.com
   Password:         MyPassword123
   Confirm Password: MyPassword123
   ```

3. **Click "Sign Up"**
   - Backend validates inputs
   - Password gets hashed
   - User created in database
   - Success message shown: "Account created successfully! Please log in."

4. **Redirects to Login Page**
   - Form is pre-populated with email
   - Enter password
   - Click "Login"

### Returning User: Login

1. **Navigate to Login**
   - Click "Log In" from homepage or sidebar
   - Or go directly to: http://127.0.0.1:5000/login

2. **Enter Credentials**
   ```
   Email:    john.doe@example.com
   Password: MyPassword123
   ```

3. **Click "Login"**
   - Credentials verified
   - Session created
   - Success message: "Successfully logged in as john.doe@example.com!"

4. **Redirected to Dashboard**
   - Skills textarea is pre-filled with previously saved skills
   - User can search for jobs
   - Skills are auto-saved after each search

### Using Dashboard

1. **View Pre-filled Skills**
   - If you've searched before, your previous skills appear
   - Example: "Python, Java, SQL"

2. **Modify Skills** (Optional)
   - Edit the textarea with new skills
   - Use comma-separated format for best results

3. **Fill Other Fields**
   ```
   Experience:  2 years
   Location:    San Francisco, CA
   Preference:  Full-time
   Job Type:    Remote
   ```

4. **Submit Search**
   - Click "Get Matches" or submit form
   - Skills are automatically saved to profile
   - Results displayed with matching jobs
   - On next visit, same skills will be pre-filled

### Logging Out

1. **Click Logout** (in sidebar or navigation)
   - Session cleared
   - Redirected to homepage
   - Message: "You have been successfully logged out."

2. **Next Session**
   - Complete login flow again
   - Your saved skills and preferences are restored

---

## Error Messages & Solutions

### "Email already registered. Please log in or use a different email."
- **Cause:** Email exists in database
- **Solution:** 
  - Option 1: Log in if you have the password
  - Option 2: Use a different email
  - Option 3: Reset password (if implemented)

### "Passwords do not match."
- **Cause:** Password and confirm password are different
- **Solution:** Ensure both password fields are identical

### "Password must be at least 6 characters long."
- **Cause:** Password is too short
- **Solution:** Use a password with 6+ characters

### "Invalid email or password. Please try again."
- **Cause:** Wrong email or password combination
- **Solution:** 
  - Check email is typed correctly
  - Verify password (case-sensitive)
  - Ensure account was created (try signup if unsure)

### "Email and password are required."
- **Cause:** Missing email or password field
- **Solution:** Fill both fields before submitting

### "All fields are required."
- **Cause:** Missing any signup field (name, email, password, confirm)
- **Solution:** Complete all form fields

---

## Database Information

### Location
```
Premium_Job_Recommender_Flask/
└── premium_job_recommender.db  (Created automatically on first run)
```

### What's Stored
- User email addresses (indexed for fast lookups)
- Password hashes (never plain text)
- Saved skills for each user
- User IDs and other metadata

### Reset Database
To completely reset and start fresh:
1. Delete `premium_job_recommender.db`
2. Restart app: `python app.py`
3. New database auto-created
4. All users must re-register

---

## API Endpoints Reference

| URL | Method | Purpose | Auth Required |
|-----|--------|---------|---------------|
| / | GET | Home page | No |
| /signup | GET/POST | Create account | No |
| /login | GET/POST | Log in | No |
| /logout | GET | Log out | Yes |
| /dashboard | GET/POST | Job search | No (optional) |
| /companies | GET | Top companies | No |
| /analysis | GET | Market insights | No |

---

## Tips & Best Practices

✅ **Do:**
- Use a strong password (mix uppercase, lowercase, numbers)
- Remember your email - it's your unique identifier
- Log out on shared computers
- Clear browser cache if experiencing login issues

❌ **Don't:**
- Use the same password for multiple sites
- Share your credentials
- Write down passwords in plain text
- Force-close app without proper shutdown

---

## Performance Tips

1. **First Run:** App creates database - may take a few seconds
2. **Resume Upload:** Large PDFs may take time to process
3. **Job Search:** Results depend on data size (12 results default)
4. **Multiple Users:** SQLite suitable for < 100 concurrent users

---

## Troubleshooting

### App Won't Start
```
Error: ModuleNotFoundError
Solution: pip install -r requirements.txt
```

### Port Already in Use
```
Error: Address already in use
Solution: python app.py --port 5001
Or kill process using port 5000
```

### Database Locked
```
Error: database is locked
Solution: Restart app, or delete premium_job_recommender.db and restart
```

### Skills Not Saving
```
Check: Are you logged in?
Check: Did you submit the form?
Check: Check browser console for JS errors
```

### Login Loop
```
Issue: Keep getting redirected to login
Solution: Clear browser cookies and try again
Or: Use incognito/private window
```

---

## File Structure

```
Premium_Job_Recommender_Flask/
├── app.py                          # Main Flask application
├── requirements.txt                # Dependencies list
├── recommender/
│   ├── __init__.py
│   ├── models.py                   # User model (NEW)
│   ├── model.py                    # Job recommendation logic
│   └── utils.py                    # Utility functions
├── templates/
│   ├── base.html                   # Base template
│   ├── login.html                  # Login page (UPDATED)
│   ├── signup.html                 # Signup page (UPDATED)
│   ├── dashboard.html              # Job search (UPDATED)
│   ├── results.html                # Job results
│   ├── companies.html              # Companies list
│   ├── analysis.html               # Market analysis
│   └── index.html                  # Homepage
├── static/
│   ├── css/
│   │   └── style.css               # Styling (includes toast)
│   └── js/
│       ├── app.js                  # Main JS
│       ├── layout.js               # Layout JS
│       └── validation.js           # Form validation
├── jobs.csv                        # Job data
└── premium_job_recommender.db      # Database (auto-created)
```

---

## Next Steps After Setup

1. ✅ **Create your account** - Try signup with valid email
2. ✅ **Log in** - Test login with credentials
3. ✅ **Search for jobs** - Enter skills and search
4. ✅ **Log out** - Test logout functionality
5. ✅ **Log back in** - Verify skills are saved
6. ✅ **Explore features** - Check companies and insights pages

---

## Support & Documentation

- **Full Setup Guide:** See `AUTHENTICATION_SETUP.md`
- **Quick Reference:** See `AUTH_QUICK_REFERENCE.md`
- **Frontend Docs:** See `README_FRONTEND.md`

---

**Version:** 1.0  
**Last Updated:** February 16, 2026  
**Status:** Ready for Use ✅
