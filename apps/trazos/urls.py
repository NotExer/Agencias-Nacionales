from django.urls import path
from . import views

urlpatterns = [
    path('trazos/', views.TrazosHome, name='trazos_home'),
]