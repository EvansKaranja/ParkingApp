from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User


class CustomUserAdmin(UserAdmin):
    list_display = ('email', 'first_name', 'last_name')
    ordering = ('email',)
    list_filter = ('is_superuser', 'is_staff',)

    fieldsets = (
        (None, {'fields': ('email', 'password', 'first_name', 'last_name')}),

        ('Permissions', {'fields': ('is_superuser', 'is_staff', 'is_active')}),
    )

    search_fields = ('email',)
    ordering = ('email',)

    filter_horizontal = ()


admin.site.register(User, CustomUserAdmin)
