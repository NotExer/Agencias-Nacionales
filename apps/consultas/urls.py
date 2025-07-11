from django.urls import path
from . import views

urlpatterns = [
    path('consultas/', views.ConsultasHome, name='consultas_home'),
]