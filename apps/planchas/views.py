from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout
from django.shortcuts import redirect

@login_required
def PlanchasHome(request):
    return render(request, "planchas/planchas_home.html")

def custom_logout(request):
    logout(request)
    return redirect('login') 