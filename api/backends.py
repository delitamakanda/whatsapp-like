from .models import CustomUser
from rest_framework import authentication, exceptions

from firebase_admin import auth

class FirebaseAuthenticationBackend(authentication.BaseAuthentication):
    def authenticate(self, request):
        authorization_header = request.META.get('HTTP_AUTHORIZATION')
        if not authorization_header:
            raise exceptions.AuthenticationFailed('No authorization header')
        id_token = authorization_header.split(' ').pop()
        if not id_token:
            raise exceptions.AuthenticationFailed('No id token')
        decoded_token = None
        try:
            decoded_token = auth.verify_id_token(id_token)
        except Exception:
            raise exceptions.AuthenticationFailed('Invalid token')

        try:
            uid = decoded_token['uid']
        except Exception:
            raise exceptions.AuthenticationFailed('Invalid token')
        user, created = CustomUser.objects.get_or_create(phone=uid)
        if ((not user.phone or not hasattr(user, 'profile')) and not (request.method == 'PUT' and request.path.startswith('/api/users/'))):
            raise exceptions.AuthenticationFailed('Invalid token')
        return (user, None)
