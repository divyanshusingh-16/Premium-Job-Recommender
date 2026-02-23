# Future module: Auth service
# TODO: implement password hashing, sessions/JWT, login/signup, forgot password

class AuthService:
    def create_user(self, name, email, password):
        raise NotImplementedError

    def authenticate(self, email, password):
        raise NotImplementedError
