from django.urls import path
from . import views

urlpatterns = [
    path('informes/', views.InformesHome, name='informes_home'),
]