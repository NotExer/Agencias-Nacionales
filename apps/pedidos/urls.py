from django.urls import path
from . import views

urlpatterns = [
    path('pedidos/', views.PedidosHome, name='pedidos_home'),
    path('pedidos/crear/', views.crear_pedido, name='crear_pedido'), 
]
