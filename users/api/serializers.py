from users.models import User
from rest_framework import serializers
from django.contrib.auth import authenticate


# User serializers
class UserSerilizer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', "first_name",
                  "last_name", "is_superuser", "is_staff")

# RegisterUser


class RegisterSerilizer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"

        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(
            validated_data['email'],
            validated_data["first_name"],
            validated_data["last_name"],
            validated_data["password"]


        )

        user.save()
        return user

# LoginSerializer


class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user

        raise serializers.ValidationError("Incorrect Credentials")
