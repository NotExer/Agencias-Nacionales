from django.urls import path
from apps.comercial.views import clientes_download ,ComercialHome, ClienteDetailView, ClientesCreateView, ClientesUpdateView, ClientesDeleteView, ClientesListView


urlpatterns = [
    path('comercial/', ComercialHome, name='comercial_home'),
    path('comercial/clientes', ClientesListView, name='clientes_home'),
    path('comercial/clientes/crear', ClientesCreateView.as_view(), name='clientes_create'),
    path('comercial/clientes/editar/<int:ClienteID>/', ClientesUpdateView.as_view(), name='clientes_editar'),
    path('comercial/clientes/eliminar/<int:ClienteID>/', ClientesDeleteView.as_view(), name='clientes_eliminar'),
    path('comercial/clientes/exportar', clientes_download, name='clientes_download'),
    path('comercial/cliente/detalle/<int:ClienteID>/', ClienteDetailView.as_view(), name='detalle_cliente'),
]

