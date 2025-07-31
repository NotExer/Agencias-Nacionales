from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.views.generic import ListView
from django.contrib.auth import logout
from django.shortcuts import redirect
from apps.telas.forms import TelaForm
from apps.telas.models import Tela
from django.shortcuts import render, redirect
from django.views.generic import ListView, CreateView, UpdateView, DeleteView
from django.urls import reverse_lazy
from django.contrib.auth.mixins import LoginRequiredMixin
from .forms import TelaForm


@login_required
def TelasHome(request):
    return render(request, "telas/telas_home.html")

def custom_logout(request):
    logout(request)
    return redirect('login') 

class TelaListView(LoginRequiredMixin, ListView):
    model = Tela
    template_name = 'telas/telas_listar.html'
    context_object_name = 'telas'
    login_url = "login"


class TelaCreateView(LoginRequiredMixin, CreateView):
    model = Tela
    form_class = TelaForm
    template_name = 'telas/telas_crear.html'
    context_object_name = 'tela'
    login_url = "login"
    success_url = reverse_lazy('listar_telas')


class TelaUpdateView(LoginRequiredMixin, UpdateView):
    model = Tela
    form_class = TelaForm
    template_name = 'telas/telas_editar.html'
    context_object_name = 'tela'
    login_url = "login"
    success_url = reverse_lazy('listar_telas')
    pk_url_kwarg = 'pk' 


class TelaDeleteView(LoginRequiredMixin, DeleteView):
    model = Tela
    template_name = 'telas/telas_eliminar.html'
    context_object_name = 'tela'
    login_url = "login"
    success_url = reverse_lazy('listar_telas')
    pk_url_kwarg = 'pk' 