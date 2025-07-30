from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.views.generic import ListView
from django.contrib.auth import logout
from django.shortcuts import redirect
from apps.telas.forms import TelaForm
from .models import Tela
from django.contrib import messages
from django.shortcuts import render, redirect
from django.views.generic import ListView, CreateView, UpdateView, DeleteView
from django.urls import reverse_lazy
from django.contrib.auth.mixins import LoginRequiredMixin
from apps.proveedor.models import Prenda
from .forms import TelaForm


@login_required
def TelasHome(request):
    return render(request, "telas/telas_home.html")

def custom_logout(request):
    logout(request)
    return redirect('login') 

class TelaListView(LoginRequiredMixin, ListView):
    model = Prenda
    template_name = 'telas/telas_listar.html'
    context_object_name = 'telas'
    login_url = "login"

    def get_queryset(self):
        return Prenda.objects.filter(proveedor__Textilera=True)


class TelaCreateView(LoginRequiredMixin, CreateView):
    model = Prenda
    form_class = TelaForm
    template_name = 'telas/telas_crear.html'
    context_object_name = 'tela'
    login_url = "login"
    success_url = reverse_lazy('listar_telas')


class TelaUpdateView(LoginRequiredMixin, UpdateView):
    model = Prenda
    form_class = TelaForm
    template_name = 'telas/telas_editar.html'
    context_object_name = 'tela'
    login_url = "login"
    success_url = reverse_lazy('listar_telas')
    pk_url_kwarg = 'pk'  # Esto está bien si usas <int:pk> en la URL


class TelaDeleteView(LoginRequiredMixin, DeleteView):
    model = Prenda
    template_name = 'telas/telas_eliminar.html'
    context_object_name = 'tela'
    login_url = "login"
    success_url = reverse_lazy('listar_telas')
    pk_url_kwarg = 'pk'