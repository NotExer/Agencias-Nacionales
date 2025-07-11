from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout
from .forms import PedidoCrearForm

@login_required
def PedidosHome(request):
    return render(request, "pedidos/pedidos_home.html")

def custom_logout(request):
    logout(request)
    return redirect('login')



@login_required
def crear_pedido(request):
    if request.method == 'POST':
        form = PedidoCrearForm(request.POST)
        if form.is_valid():
            cliente = form.cleaned_data['cliente']
            return redirect('pedidos:listado') 
    else:
        form = PedidoCrearForm()

    return render(request, 'pedidos/pedido_crear.html', {'form': form})