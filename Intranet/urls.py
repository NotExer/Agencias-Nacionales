from django.contrib import admin
from django.urls import path
from apps.usuarios.views import login_view
from apps.main.views import home 
from django.urls import path, include 
from django.views.generic import RedirectView
from apps.main.views import custom_logout
from apps.bordados.views import BordadosHome
from apps.comercial.views import ComercialHome, ClienteDetailView, ClientesCreateView, ClientesDeleteView, ClientesListView, ClientesUpdateView, clientes_download
from apps.cotizaciones.views import PreciosHome, crear_calculadora, obtener_prendas_por_proveedor
from apps.inventario.views import InsumosListView, InsumosCreateView, InsumosDeleteView, InsumosUpdateView
from apps.consultas.views import ConsultasHome
from apps.cortes.views import CortesHome
from apps.cuentas.views import CuentasHome
from apps.facturacion.views import FacturacionHome
from apps.informes.views import InformesHome
from apps.inventario.views import InventarioHome
from apps.pedidos.views import PedidosHome, crear_pedido
from apps.planchas.views import PlanchasHome
from apps.produccion.views import ProduccionHome
from apps.proveedor.views import proveedores_download, ProveedorListView, ProveedorCreateView, ProveedorDeleteView, ProveedorDetailView, ProveedorUpdateView, ProveedorHome, PrendaCreateView, PrendaUpdateView, PrendaDeleteView, guardar_orden_prendas

from apps.remisiones.views import RemisionesHome
from apps.telas.views import TelasHome, TelaListView, TelaCreateView, TelaUpdateView, TelaDeleteView
from apps.trazos.views import TrazosHome
from django.conf import settings
from django.conf.urls.static import static
from apps.usuarios.views import crear_usuario, editar_usuario, lista_usuarios, resetear_contrasena_admin, modal_reset_password

urlpatterns = [
    path('admin/', admin.site.urls),
    path('login/', login_view, name='login'), 
    path('logout/', custom_logout, name='logout'),
    path('home/', home, name='home'),
    path('usuarios/', lista_usuarios, name='lista_usuarios'),
    path('usuarios/crear/', crear_usuario, name='crear_usuario'),
    path('usuarios/editar/<int:pk>/', editar_usuario, name='editar_usuario'),
    path('usuarios/<int:pk>/resetear-contrasena/', resetear_contrasena_admin, name='resetear_contrasena_admin'),
    path('usuarios/cambiarContrasena/<int:pk>/', modal_reset_password, name='modal_reset_password'),
    path('', RedirectView.as_view(url='/login/', permanent=False), name='login'),
    path('bordados/', BordadosHome, name='bordados_home'),
    path('comercial/', ComercialHome, name='comercial_home'),
    path('comercial/clientes', ClientesListView.as_view(), name='clientes_home'),
    path('comercial/clientes/crear', ClientesCreateView.as_view(), name='clientes_create'),
    path('comercial/clientes/editar/<int:ClienteID>/', ClientesUpdateView.as_view(), name='clientes_editar'),
    path('comercial/clientes/eliminar/<int:ClienteID>/', ClientesDeleteView.as_view(), name='clientes_eliminar'),
    path('comercial/cliente/detalle/<int:ClienteID>/', ClienteDetailView.as_view(), name='detalle_cliente'),
    path('comercial/clientes/exportar', clientes_download, name='clientes_download'),
    path('cotizaciones/precios/', PreciosHome, name='listas_precios'),
    path('cotizaciones/calculadora/crear/', crear_calculadora, name='crear_calculadora'), 
    path('ajax/obtener-prendas/', obtener_prendas_por_proveedor, name='ajax_obtener_prendas'),

    path('consultas/', ConsultasHome, name='consultas_home'),
    path('cortes/', CortesHome, name='cortes_home'),
    path('cuentas/', CuentasHome, name='cuentas_home'),
    path('facturacion/', FacturacionHome, name='facturacion_home'),
    path('informes/', InformesHome, name='informes_home'),
    path('inventario/', InventarioHome, name='inventario_home'),
    path('inventario/insumos', InsumosListView.as_view(), name='insumos_home'),
    path('inventario/insumos/crear', InsumosCreateView.as_view(), name='insumos_create'),
    path('inventario/insumos/editar/<int:insumoID>/', InsumosUpdateView.as_view(), name='insumos_editar'),
    path('inventario/insumos/eliminar/<int:insumoID>/', InsumosDeleteView.as_view(), name='insumos_eliminar'),
    path('pedidos/', PedidosHome, name='pedidos_home'),
    path('pedidos/crear/', crear_pedido, name='crear_pedido'),
    path('planchas/', PlanchasHome, name='planchas_home'),
    path('produccion/', ProduccionHome, name='produccion_home'),
    path('proveedor/', ProveedorHome, name='proveedor_home'),
    path('proveedor/proveedor/', ProveedorListView.as_view(), name='proveedores_list'),
    path('proveedor/proveedor/crear', ProveedorCreateView.as_view(), name='proveedores_create'),
    path('proveedor/proveedor/editar/<int:ProveedorID>/', ProveedorUpdateView.as_view(), name='proveedores_editar'),
    path('proveedor/proveedor/eliminar/<int:ProveedorID>/', ProveedorDeleteView.as_view(), name='proveedores_eliminar'),
    path('proveedor/proveedor/exportar', proveedores_download, name='exportar_preveedor_excel'),
    path('proveedor/proveedor/detalle/<int:ProveedorID>/', ProveedorDetailView.as_view(), name='detalle_proveedor'),
    path('proveedores/<int:proveedor_id>/prendas/nueva/', PrendaCreateView.as_view(), name='prenda_crear'),
    path('guardar-orden-prendas/', guardar_orden_prendas, name='guardar_orden_prendas'),
    path('proveedores/prenda/<int:PrendaID>/editar/', PrendaUpdateView.as_view(), name='prenda_editar'),
    path('proveedores/prenda/<int:PrendaID>/eliminar/', PrendaDeleteView.as_view(), name='prenda_eliminar'),
    path('remisiones/', RemisionesHome, name='remisiones_home'),
    path('telas/', TelasHome, name='telas_home'),
    path('telas/inventario/', TelaListView.as_view(), name='listar_telas'),
    path('telas/inventario/crear', TelaCreateView.as_view(), name='telas_crear'),
    path('telas/inventario/editar/<int:pk>/', TelaUpdateView.as_view(), name='telas_editar'),
    path('telas/inventario/eliminar/<int:pk>/', TelaDeleteView.as_view(), name='telas_eliminar'),
    path('trazos/', TrazosHome, name='trazos_home'),


]


urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)