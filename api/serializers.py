from .models import UserProfile, CustomUser
from django.contrib.auth import get_user_model
from rest_framework import serializers, exceptions

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['bio', 'dob']


class CustomUserSerializer(serializers.ModelSerializer):
    profile = UserProfileSerializer()

    def update(self, instance, validated_data):
        if(not instance.phone == self.context['request'].user.phone):
            raise exceptions.PermissionDenied('no permission to update')
        profile_data = validated_data.pop('profile')
        if (not hasattr(instance, 'profile')):
            instance.profile = UserProfile.objects.create(user=instance, **profile_data)
        else:
            instance.profile.dob = profile_data['dob']
            instance.profile.bio = profile_data['bio']
            instance.profile.save()
        instance.phone = validated_data.get('phone', instance.phone)
        instance.email = validated_data.get('email', instance.email)
        instance.display_name = validated_data.get('display_name', instance.display_name)
        instance.save()
        return instance

    class Meta:
        model = CustomUser
        fields = ['phone', 'email', 'display_name', 'profile']

