from django.urls import path
from . import views

urlpatterns = [
    path('produccion/', views.ProduccionHome, name='produccion_home'),
]