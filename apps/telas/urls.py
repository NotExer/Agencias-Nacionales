from django.urls import path
from . import views

urlpatterns = [
    path('telas/', views.TelasHome, name='telas_home'),
]