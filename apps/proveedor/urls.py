from django.urls import path
from . import views
from apps.proveedor.views import proveedores_download, ProveedorCreateView, ProveedorDeleteView, ProveedorDetailView, ProveedorListView, ProveedorUpdateView, PrendaCreateView, PrendaDeleteView, PrendaUpdateView, PreciosHome, guardar_orden_prendas

urlpatterns = [
    path('proveedor/', views.ProveedorHome, name='proveedor_home'),
    path('proveedor/proveedor', ProveedorListView.as_view(), name='proveedores_list'),
    path('proveedor/proveedor/crear', ProveedorCreateView.as_view(), name='proveedores_create'),
    path('proveedor/proveedor/editar/<int:ProveedorID>/', ProveedorUpdateView.as_view(), name='proveedores_editar'),
    path('proveedor/proveedor/eliminar/<int:ProveedorID>/', ProveedorDeleteView.as_view(), name='proveedores_eliminar'),
    path('proveedor/proveedor/exportar', proveedores_download, name='exportar_preveedor_excel'),
    path('proveedor/proveedor/detalle/<int:ProveedorID>/', ProveedorDetailView.as_view(), name='detalle_proveedor'),
    
    path('proveedores/<int:proveedor_id>/prendas/nueva/', PrendaCreateView.as_view(), name='prenda_crear'),
    path('guardar-orden-prendas/', guardar_orden_prendas, name='guardar_orden_prendas'),
    path('proveedores/prenda/<int:PrendaID>/editar/', PrendaUpdateView.as_view(), name='prenda_editar'),
    path('proveedores/prenda/<int:PrendaID>/eliminar/', PrendaDeleteView.as_view(), name='prenda_eliminar'),


]