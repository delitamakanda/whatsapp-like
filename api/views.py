import os
import json
import time
from django.http.response import JsonResponse
from django.shortcuts import render
from .serializers import CustomUserSerializer
from .models import CustomUser
from rest_framework import viewsets
from .rtc_token_builder import RtcTokenBuilder, Role_Attendee

class UserViewSet(viewsets.ModelViewSet):
    queryset = CustomUser.objects.all()
    serializer_class = CustomUserSerializer
    lookup_field = 'phone'


# get rtc token
def generate_agora_token(request):
    app_id = os.environ.get('AGORA_APP_ID')
    app_certificate = os.environ.get('AGORA_APP_CERTIFICATE_ID')
    channel_name = json.loads(request.body.decode('utf-8'))['channelName']
    user_account = request.user.display_name
    expire_time_in_seconds = 3600
    current_timestamp = int(time.time())
    privilege_expired_ts = current_timestamp + expire_time_in_seconds

    token = RtcTokenBuilder.buildTokenWithAccount(
        app_id,
        app_certificate,
        channel_name,
        user_account,
        Role_Attendee,
        privilege_expired_ts,
    )

    return JsonResponse({'token': token, 'app_id': app_id})
    