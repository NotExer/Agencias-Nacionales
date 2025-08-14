# En tu archivo views.py
from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
from django.contrib import messages
from .forms import UsuarioForm, UsuarioEditForm
from .models import Usuario

def login_view(request):
    if request.user.is_authenticated:
        return redirect('home')
    if request.method == 'POST':
        username = request.POST.get('username', '').strip()
        password = request.POST.get('password', '').strip()

        if not username or not password:
            messages.error(request, 'Por favor completa todos los campos.')
            return render(request, 'usuarios/login.html')

        # Intentar autenticar por username o email
        user = authenticate(request, username=username, password=password)
        if user is None:
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

    return render(request, 'usuarios/login.html')

def logout_view(request):
    logout(request)
    return redirect('home')

def home(request):
    return render(request, "main/index.html")

def crear_usuario(request):
    if request.method == 'POST':
        form = UsuarioForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            messages.success(request, 'El usuario ha sido creado exitosamente.')
            return redirect('lista_usuarios')
    else:
        form = UsuarioForm()
    return render(request, 'usuarios/crear_usuario.html', {'form': form})

def editar_usuario(request, pk):
    usuario_perfil = get_object_or_404(Usuario, pk=pk)
    usuario_auth = usuario_perfil.user

    if request.method == 'POST':
        # Usa el nuevo formulario de edición
        form = UsuarioEditForm(request.POST, request.FILES, instance=usuario_perfil)
        if form.is_valid():
            form.save()
            messages.success(request, 'El usuario ha sido actualizado correctamente.')
            return redirect('lista_usuarios')
    else:
        # Pasa los datos iniciales a los campos del formulario
        form = UsuarioEditForm(instance=usuario_perfil, initial={
            'username': usuario_auth.username,
            'email': usuario_auth.email,
        })

    context = {
        'form': form,
        'usuario': usuario_perfil
    }
    return render(request, 'usuarios/editar_usuario.html', context)

def lista_usuarios(request):
    # Ahora solo necesitas obtener tu modelo de perfil, Usuario
    usuarios = Usuario.objects.all()
    return render(request, 'usuarios/lista_usuarios.html', {'usuarios': usuarios})

def resetear_contrasena_admin(request, pk):
    if not request.user.is_superuser:
        messages.error(request, 'No tienes permiso para realizar esta acción.')
        return redirect('home')

    user = get_object_or_404(User, pk=pk)
    
    if request.method == 'POST':
        nueva_contrasena = request.POST.get('nueva_contrasena', '').strip()
        confirmar_contrasena = request.POST.get('confirmar_contrasena', '').strip()

        if not nueva_contrasena:
            messages.error(request, 'La contraseña no puede estar vacía.')
            return redirect('lista_usuarios')
        if nueva_contrasena != confirmar_contrasena:
            messages.error(request, 'Las contraseñas no coinciden.')
            return redirect('lista_usuarios')

        user.set_password(nueva_contrasena)
        user.save()
        
        messages.success(request, f'La contraseña del usuario **{user.username}** ha sido restablecida. La nueva contraseña es: **{nueva_contrasena}**.')
    
    return redirect('lista_usuarios')

def modal_reset_password(request, pk):
    user = get_object_or_404(User, pk=pk)
    return render(request, 'usuarios/modal_reset_password.html', {'usuario': user})