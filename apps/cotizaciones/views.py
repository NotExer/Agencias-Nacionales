from django.contrib.auth.decorators import login_required
from django.contrib.auth import logout
from django.shortcuts import redirect
from django.shortcuts import render, redirect
from apps.inventario.models import Insumos
from apps.proveedor.models import Prenda, CATEGORIA_PRENDA_PRECIOS
from apps.cotizaciones.models import Precio_forros, Precio_lavado, Precio_fusionado, Precio_estampado
from .forms import PedidoCalculadoraForm, CalculadoraAsignarForm
from apps.proveedor.models import Proveedor
from django.http import JsonResponse
from django.views.decorators.http import require_GET

@login_required
def CotizacionesHome(request):
    return render(request, "cotizaciones/cotizaciones_home.html")

def custom_logout(request):
    logout(request)
    return redirect('login') 

@login_required
def PreciosHome(request):
    return render(request, "cotizaciones/precios_home.html")


@login_required
def crear_calculadora(request):
    cliente_form = PedidoCalculadoraForm(request.POST or None)
    calculadora_form = None
    cliente_seleccionado = None

    cintas = list(Insumos.objects.filter(categoria='cintas').values('ID', 'descripcion', 'precio'))
    cierres = list(Insumos.objects.filter(categoria='cierres').values('ID', 'descripcion', 'precio'))
    elasticos = list(Insumos.objects.filter(categoria='elasticos').values('ID', 'descripcion', 'precio'))
    botones = list(Insumos.objects.filter(categoria='botones').values('ID', 'descripcion', 'precio'))
    velcros = list(Insumos.objects.filter(categoria='velcros').values('ID', 'descripcion', 'precio'))
    sesgos = list(Insumos.objects.filter(categoria='sesgos').values('ID', 'descripcion', 'precio'))

    if request.method == 'POST' and cliente_form.is_valid():
        cliente_seleccionado = cliente_form.cleaned_data['cliente']
        proveedor_id = request.POST.get('Proveedor')
        proveedor = Proveedor.objects.filter(pk=proveedor_id).first() if proveedor_id else None
        calculadora_form = CalculadoraAsignarForm(request.POST, proveedor=proveedor)

        if calculadora_form.is_valid():
            calculadora = calculadora_form.save(commit=False)
            calculadora.cliente = cliente_seleccionado
            calculadora.save()
            return redirect('home')

    elif request.method == 'POST':
        cliente_seleccionado = request.POST.get('cliente')
        calculadora_form = CalculadoraAsignarForm(initial={'cliente': cliente_seleccionado})

    return render(request, 'cotizaciones/calculadora_crear.html', {
        'form': cliente_form,
        'calculadora_form': calculadora_form,
        'cliente_seleccionado': cliente_seleccionado,
        'cintas': cintas, 
        'cierres': cierres,  
        'elasticos': elasticos,
        'botones': botones,
        'velcros': velcros,
        'sesgos': sesgos,
    })


@login_required
def obtener_prendas_por_proveedor(request):
    # Obtiene el proveedor_id de los parámetros de la URL
    proveedor_id = request.GET.get('proveedor_id')
    
    prendas = Prenda.objects.all()

    # Aplica la lógica de filtrado
    if proveedor_id:
        try:
            proveedor = Proveedor.objects.get(id=proveedor_id)
            prendas = prendas.filter(proveedor=proveedor)
        except Proveedor.DoesNotExist:
            # Si el proveedor no existe, no devuelve ninguna prenda
            prendas = Prenda.objects.none()

    prendas_data = []
    for p in prendas:
        # Aquí puedes agregar la lógica para calcular la categoría y precio
        # Asumiendo que CATEGORIA_PRENDA_PRECIOS, Precio_forros, etc., están definidos
        # en algún lugar de tu código o importados.
        categoria = p.Categorias.split(',')[0].strip() if p.Categorias else ''
        precio = CATEGORIA_PRENDA_PRECIOS.get(categoria, 0)
        
        prendas_data.append({
            'id': p.ID,
            'descripcion': p.descripcion,
            'precio': precio,
        })

    return JsonResponse({
        'prendas': prendas_data,
        'precios_forro': Precio_forros,
        'precios_lavado': Precio_lavado,
        'precios_fusionado': Precio_fusionado,
        'precios_estampado': Precio_estampado,  
    })
