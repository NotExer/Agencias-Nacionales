from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout
from django.shortcuts import redirect
from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import ListView, CreateView, DetailView, UpdateView, DeleteView
from apps.inventario.models import Insumos
from apps.inventario.forms import InsumosForm
from django.urls import reverse_lazy

@login_required
def InventarioHome(request):
    return render(request, "inventario/inventario_home.html")

def custom_logout(request):
    logout(request)
    return redirect('login') 


class InsumosListView(LoginRequiredMixin, ListView):
    model = Insumos
    template_name = 'inventario/insumos.html'
    context_object_name = 'insumos'
    login_url = "login"

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        categorias = [
            'cintas', 'cierres', 'botones', 'velcros', 'sesgos',
            'broches', 'cordones', 'elasticos', 'deslizadores',
            'fusionados', 'corte', 'forros', 'lavados'
        ]
        insumos_por_categoria = {}
        for cat in categorias:
            insumos_por_categoria[cat] = Insumos.objects.filter(categoria=cat)
        context['insumos_por_categoria'] = insumos_por_categoria
        return context



class InsumosCreateView(LoginRequiredMixin, CreateView):
    model = Insumos
    form_class = InsumosForm
    template_name = 'inventario/insumos_crear.html'
    context_object_name = 'insumos'
    login_url = "login"
    success_url = reverse_lazy('insumos_home') 


class InsumosDeleteView(LoginRequiredMixin, DeleteView):
    model = Insumos
    template_name = 'inventario/insumos_eliminar.html'
    success_url = reverse_lazy('insumos_home')
    pk_url_kwarg = 'insumoID'
    

class InsumosUpdateView(LoginRequiredMixin, UpdateView):
    model = Insumos
    form_class = InsumosForm
    template_name = 'inventario/insumos_editar.html'
    context_object_name = 'insumo'
    login_url = "login"
    success_url = reverse_lazy('insumos_home') 
    pk_url_kwarg = 'insumoID'
