from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout
from django.shortcuts import redirect
from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import ListView, CreateView, DetailView, UpdateView, DeleteView
from apps.proveedor.models import Proveedor
from apps.proveedor.forms import ProveedorForm
from django.urls import reverse_lazy
from openpyxl.styles import PatternFill
from openpyxl.utils import get_column_letter
from openpyxl import Workbook
from django.http import HttpResponse
from django.views.generic import CreateView
from apps.proveedor.models import Prenda
from apps.proveedor.forms import PrendaForm
from django.shortcuts import render, get_object_or_404, redirect
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json


@login_required
def ProveedorHome(request):
    return render(request, "proveedor/proveedor_home.html")

def custom_logout(request):
    logout(request)
    return redirect('login') 

class ProveedorListView(LoginRequiredMixin, ListView):
    model = Proveedor
    template_name = 'proveedor/Proveedor.html'
    context_object_name = 'proveedores'
    login_url = 'login'
    paginate_by = 25

    def get_queryset(self):
        queryset = super().get_queryset()

        ciudad = self.request.GET.get('ciudad')
        contacto = self.request.GET.get('contacto')
        nombre = self.request.GET.get('nombre')
        categoria = self.request.GET.get('categoria')
        orden = self.request.GET.get('orden')

        if ciudad:
            queryset = queryset.filter(Ciudad__icontains=ciudad)

        if contacto:
            queryset = queryset.filter(Contacto__icontains=contacto)

        if nombre:
            queryset = queryset.filter(Nombre__icontains=nombre)

        if categoria:
            queryset = queryset.filter(Categorias__icontains=categoria)

        if orden == 'asc':
            queryset = queryset.order_by('ID')
        elif orden == 'desc':
            queryset = queryset.order_by('-ID')

        return queryset

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['filtros'] = self.request.GET
        context['ciudades'] = Proveedor.objects.values_list('Ciudad', flat=True).distinct()
        context['contactos'] = Proveedor.objects.values_list('Contacto', flat=True).distinct()
        context['nombres'] = Proveedor.objects.values_list('Nombre', flat=True).distinct()

        # Obtener todas las categorías únicas desde los proveedores
        categorias_unicas = set()
        for proveedor in Proveedor.objects.exclude(Categorias__isnull=True).exclude(Categorias=''):
            categorias_unicas.update([cat.strip() for cat in proveedor.get_categorias_list()])

        context['categorias'] = sorted(categorias_unicas)
        return context

class ProveedorCreateView(LoginRequiredMixin, CreateView):
    model = Proveedor
    form_class = ProveedorForm
    template_name = 'proveedor/Proveedor_crear.html'
    context_object_name = 'Proveedor'
    login_url = "login"
    success_url = reverse_lazy('proveedores_list') 


class ProveedorUpdateView(LoginRequiredMixin, UpdateView):
    model = Proveedor
    form_class = ProveedorForm
    template_name = 'proveedor/Proveedor_editar.html'
    context_object_name = 'Proveedor'
    login_url = "login"
    success_url = reverse_lazy('proveedores_list') 
    pk_url_kwarg = 'ProveedorID'



class ProveedorDeleteView(LoginRequiredMixin, DeleteView):
    model = Proveedor
    template_name = 'proveedor/proveedor_eliminar.html'
    success_url = reverse_lazy('proveedores_list')
    pk_url_kwarg = 'ProveedorID'


class ProveedorDetailView(LoginRequiredMixin, DetailView):
    model = Proveedor
    template_name = 'proveedor/proveedor_detalle.html'
    context_object_name = 'Proveedor'
    pk_url_kwarg = 'ProveedorID'

@login_required
def proveedores_download(request):

    wb = Workbook()
    ws = wb.active
    ws.title = "Proveedores"

    columnas = [
        "Nit", "Nombre", "Teléfono", "Dirección", "Ciudad", "Contacto", "Correo",
        "Móvil", "Plazo", "Descuento", "Contado", "Categorías"
    ]
    ws.append(columnas)

    proveedores = Proveedor.objects.all()

    for idx, p in enumerate(proveedores, start=1):
        categorias = p.Categorias or ""  # ya es un string separado por comas
        fila = [
            p.Nit,
            p.Nombre,
            p.Telefono,
            p.Direccion,
            p.Ciudad,
            p.Contacto,
            p.Correo,
            p.Movil,
            p.Plazo,
            p.Descuento or "",
            p.get_Contado_display(),
            categorias
        ]
        ws.append(fila)

        if idx == 1:
            for col in range(1, len(fila) + 1):
                ws.cell(row=1, column=col).fill = PatternFill(start_color="ADD8E6", end_color="ADD8E6", fill_type="solid")

    for col_idx, col_cells in enumerate(ws.columns, start=1):
        max_length = 0
        for cell in col_cells:
            try:
                value = str(cell.value)
                if len(value) > max_length:
                    max_length = len(value)
            except:
                pass
        adjusted_width = max_length + 2
        ws.column_dimensions[get_column_letter(col_idx)].width = adjusted_width

    response = HttpResponse(
        content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    )
    response['Content-Disposition'] = 'attachment; filename=proveedores.xlsx'
    wb.save(response)
    return response



class PrendaCreateView(LoginRequiredMixin, CreateView):
    model = Prenda
    form_class = PrendaForm
    template_name = 'proveedor/prenda_crear.html'
    login_url = 'login'

    def dispatch(self, request, *args, **kwargs):
        self.proveedor = get_object_or_404(Proveedor, pk=kwargs['proveedor_id'])
        return super().dispatch(request, *args, **kwargs)

    def form_valid(self, form):
        form.instance.proveedor = self.proveedor
        return super().form_valid(form)

    def get_success_url(self):
        return reverse_lazy('proveedores_list')

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['proveedor'] = self.proveedor

        # Obtener las prendas del proveedor
        prendas = self.proveedor.prendas.all()

        # Determinar qué columnas mostrar
        mostrar_colores = any(
            item.get('color') for prenda in prendas
            for item in prenda.Referencia_color_talla_Costo_precio or []
        )
        mostrar_tallas = any(
            item.get('talla') for prenda in prendas
            for item in prenda.Referencia_color_talla_Costo_precio or []
        )
        mostrar_precios = any(
            item.get('precio') for prenda in prendas
            for item in prenda.Referencia_color_talla_Costo_precio or []
        )

        context.update({
            'mostrar_colores': mostrar_colores,
            'mostrar_tallas': mostrar_tallas,
            'mostrar_precios': mostrar_precios,
        })

        return context

def guardar_orden_prendas(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            orden = data.get('orden', [])

            for posicion, prenda_id in enumerate(orden, start=1):
                Prenda.objects.filter(ID=prenda_id).update(orden=posicion)

            return JsonResponse({'success': True})
        except Exception as e:
            return JsonResponse({'success': False, 'error': str(e)})
    return JsonResponse({'success': False, 'error': 'Método no permitido'}, status=405)

class PrendaUpdateView(LoginRequiredMixin, UpdateView):
    model = Prenda
    form_class = PrendaForm
    template_name = 'proveedor/prenda_editar.html'
    context_object_name = 'prenda'
    login_url = "login"
    success_url = reverse_lazy('proveedores_list')  # o puedes redirigir al proveedor específico
    pk_url_kwarg = 'PrendaID'


class PrendaDeleteView(LoginRequiredMixin, DeleteView):
    model = Prenda
    template_name = 'proveedor/prenda_eliminar.html'
    context_object_name = 'prenda'
    success_url = reverse_lazy('proveedores_list')
    login_url = "login"
    pk_url_kwarg = 'PrendaID'