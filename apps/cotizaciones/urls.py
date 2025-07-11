from django.urls import path
from apps.cotizaciones.views import PreciosHome
from django.conf import settings
from django.conf.urls.static import static
from apps.cotizaciones.views import crear_calculadora, obtener_prendas_por_proveedor

urlpatterns = [
    path('cotizaciones/precios/', PreciosHome, name='listas_precios'),
    path('cotizaciones/calculadora/crear/', crear_calculadora, name='crear_calculadora'), 
    path('ajax/obtener-prendas/', obtener_prendas_por_proveedor, name='ajax_obtener_prendas'),

]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

