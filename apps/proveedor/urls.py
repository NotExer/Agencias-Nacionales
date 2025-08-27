from django.urls import path
from .views import ProveedorHome,proveedores_download,ProveedorCreateView,ProveedorDeleteView,ProveedorDetailView,ProveedorListView,ProveedorUpdateView,PrendaCreateView,PrendaDeleteView,PrendaUpdateView


urlpatterns = [
    # URLs de Proveedores
    path('proveedor/', ProveedorHome, name='proveedor_home'),
    path('proveedor/proveedor', ProveedorListView.as_view(), name='proveedores_list'),
    path('proveedor/proveedor/crear', ProveedorCreateView.as_view(), name='proveedores_create'),
    path('proveedor/proveedor/editar/<int:ProveedorID>/', ProveedorUpdateView.as_view(), name='proveedores_editar'),
    path('proveedor/proveedor/eliminar/<int:ProveedorID>/', ProveedorDeleteView.as_view(), name='proveedores_eliminar'),
    path('proveedor/proveedor/exportar', proveedores_download, name='exportar_proveedor_excel'),
    path('proveedor/proveedor/detalle/<int:ProveedorID>/', ProveedorDetailView.as_view(), name='detalle_proveedor'),

    path('proveedor/prenda/nueva/<int:proveedor_id>/', PrendaCreateView.as_view(), name='prenda_crear'),
    path('proveedor/prenda/editar/<int:pk>/', PrendaUpdateView.as_view(), name='prenda_editar'),
    path('proveedor/prenda/eliminar/<int:pk>/', PrendaDeleteView.as_view(), name='prenda_eliminar'),
]