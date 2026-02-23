from flask_sqlalchemy import SQLAlchemy
from flask_login import UserMixin

db = SQLAlchemy()


class User(UserMixin, db.Model):
    """User model for authentication and profile management."""
    
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False, index=True)
    password_hash = db.Column(db.String(255), nullable=False)
    saved_skills = db.Column(db.Text, default="", nullable=True)
    
    def __repr__(self):
        return f"<User {self.email}>"
    
    def get_skills_list(self):
        """Parse saved_skills as a comma-separated string and return as list."""
        if not self.saved_skills:
            return []
        return [skill.strip() for skill in self.saved_skills.split(",") if skill.strip()]
