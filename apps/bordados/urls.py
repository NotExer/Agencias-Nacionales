from django.urls import path
from . import views

urlpatterns = [
    path('bordados/', views.BordadosHome, name='bordados_home'),
    
]