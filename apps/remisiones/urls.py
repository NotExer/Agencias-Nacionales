from django.urls import path
from . import views

urlpatterns = [
    path('remisiones/', views.RemisionesHome, name='remisiones_home'),
]