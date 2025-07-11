from django.urls import path
from . import views

urlpatterns = [
    path('planchas/', views.PlanchasHome, name='planchas_home'),
]