from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from django.contrib.auth.models import User
from django.contrib import messages


def login_view(request):
    if request.user.is_authenticated:
        return redirect('home')
    if request.method == 'POST':
        username = request.POST.get('username', '').strip()
        password = request.POST.get('password', '').strip()

        if not username or not password:
            messages.error(request, 'Por favor completa todos los campos.')
            return render(request, 'account/login.html')

        # Intentar autenticar por username
        user = authenticate(request, username=username, password=password)

        if user is None:
            # Intentar autenticar por email
            try:
                user_obj = User.objects.get(email=username)
                user = authenticate(request, username=user_obj.username, password=password)
            except User.DoesNotExist:
                user = None

        if user is not None:
            login(request, user)

            return redirect('home')
        else:
            messages.error(request, 'Credenciales inválidas.')

    return render(request, 'account/login.html')

def logout_view(request):
    logout(request)
    return redirect('home')

def home(request):
    return render(request, "main/index.html")