from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout
from django.shortcuts import redirect

@login_required
def BordadosHome(request):
    return render(request, "bordados/bordados_home.html")

def custom_logout(request):
    logout(request)
    return redirect('login') 






