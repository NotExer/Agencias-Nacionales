from django.urls import path
from . import views
from apps.telas.views import TelaListView, TelaCreateView, TelaUpdateView, TelaDeleteView

urlpatterns = [
    path('telas/', views.TelasHome, name='telas_home'),
    path('telas/inventario/', TelaListView.as_view(), name='listar_telas'),
    path('telas/inventario/crear', TelaCreateView.as_view(), name='telas_crear'),
    path('telas/inventario/editar/<int:pk>/', TelaUpdateView.as_view(), name='telas_editar'),
    path('telas/inventario/eliminar/<int:pk>/', TelaDeleteView.as_view(), name='telas_eliminar'),
    
]