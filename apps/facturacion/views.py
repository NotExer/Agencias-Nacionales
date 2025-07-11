from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout
from django.shortcuts import redirect

@login_required
def FacturacionHome(request):
    return render(request, "facturacion/facturacion_home.html")

def custom_logout(request):
    logout(request)
    return redirect('login') 

