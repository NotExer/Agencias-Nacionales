from django.urls import path
from . import views

urlpatterns = [
    path('cuentas/', views.CuentasHome, name='cuentas_home'),
]