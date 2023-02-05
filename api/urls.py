from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet, generate_agora_token

router = DefaultRouter()
router.register('users', UserViewSet)

"""
todo:
1. login
2. get user info
3. update user info
4. fcm token
5. contact
6. upload image
7. send notice
8. get rtc token
9. sent notice test
"""

urlpatterns = [
    path('', include(router.urls)),
    path('token/', generate_agora_token),
]
