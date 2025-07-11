from django.urls import path
from . import views

urlpatterns = [
    path('cortes/', views.CortesHome, name='cortes_home'),
]