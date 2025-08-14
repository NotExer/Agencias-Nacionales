from django.urls import path
from . import views
from apps.usuarios.views import crear_usuario, editar_usuario, lista_usuarios, resetear_contrasena_admin, modal_reset_password
urlpatterns = [
    path('login/', views.login_view, name='login'),
    path('usuarios/', lista_usuarios, name='lista_usuarios'),
    path('usuarios/crear/', crear_usuario, name='crear_usuario'),
    path('usuarios/editar/<int:pk>/', editar_usuario, name='editar_usuario'),
    path('usuarios/<int:pk>/resetear-contrasena/', resetear_contrasena_admin, name='resetear_contrasena_admin'),
    path('usuarios/cambiarContrasena/<int:pk>/', modal_reset_password, name='modal_reset_password'),
    
]
