from django.urls import path
from apps.inventario.views import InsumosListView, InsumosCreateView, InsumosDeleteView, InsumosUpdateView
from . import views

urlpatterns = [
    path('inventario/', views.InventarioHome, name='inventario_home'),
    path('inventario/insumos', InsumosListView.as_view(), name='insumos_home'),
    path('inventario/insumos/crear', InsumosCreateView.as_view(), name='insumos_create'),
    path('inventario/insumos/editar/<int:insumoID>/', InsumosUpdateView.as_view(), name='insumos_editar'),
    path('inventario/insumos/eliminar/<int:insumoID>/', InsumosDeleteView.as_view(), name='insumos_eliminar'),
    

]