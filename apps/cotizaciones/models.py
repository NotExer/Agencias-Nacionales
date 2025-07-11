from django.db import models
from apps.comercial.models import Clientes
from apps.proveedor.models import Proveedor
from apps.proveedor.models import Prenda



Forros = [
    ('Blue jean clasico hombre', 'Blue jean clasico hombre'),
    ('Blue jean pretina anatomica', 'Blue jean pretina anatomica'),
    ('Pantalon hombre', 'Pantalon hombre'),
    ('Pantalon dama', 'Pantalon dama'),
]


Precio_forros  = dict([
    ('Blue jean clasico hombre', 600 ),
    ('Blue jean pretina anatomica', 450 ),
    ('Pantalon hombre', 1250 ),
    ('Pantalon dama',  1250),
])


Lavado = [
    ('Blue jean clasico hombre', 'Blue jean clasico hombre'),
    ('Blue jean pretina anatomica', 'Blue jean pretina anatomica'),
    ('Pantalon hombre', 'Pantalon hombre'),
    ('Pantalon dama', 'Pantalon dama'),
]


Precio_lavado  = dict([
    ('Blue jean clasico hombre', 1000 ),
    ('Blue jean pretina anatomica', 1000 ),
    ('Pantalon hombre', 1000 ),
    ('Pantalon dama',  1000),
])


Precio_estampado  = dict([
    ('Blue jean clasico hombre', 1000 ),
    ('Blue jean pretina anatomica', 1000 ),
    ('Pantalon hombre', 1000 ),
    ('Pantalon dama',  1000),
])



Fusionado = [
    ('Camisa manga larga (Cuello + Banda + Perilla + Puños)', 'Camisa manga larga (Cuello + Banda + Perilla + Puños)'),
    ('Blusa manda 3/4 (Cuello + Banda + Perilla + Puños)', 'Blusa manda 3/4 (Cuello + Banda + Perilla + Puños)'),
    ('Pantalón súper vértigo', 'Pantalón súper vértigo'),

]


Precio_fusionado  = dict([
    ('Camisa manga larga (Cuello + Banda + Perilla + Puños)', 1450 ),
    ('Blusa manda 3/4 (Cuello + Banda + Perilla + Puños)', 1450 ),
    ('Pantalón súper vértigo', 1500 ),

])




class Calculadora(models.Model):
    cliente = models.ForeignKey(Clientes, on_delete=models.CASCADE)
    Proveedor_select = models.BooleanField(default=False)
    Proveedor = models.ForeignKey(Proveedor, on_delete=models.CASCADE)
    prenda = models.ForeignKey(Prenda, on_delete=models.CASCADE, null=True,  blank=True)
    Forro = models.CharField(choices=Forros, max_length=100, blank=True)
    Lavado = models.CharField(choices=Lavado, max_length=100, blank=True)
    Bordado = models.JSONField(blank=True, null=True)
    Estampado = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    Cinta = models.JSONField(blank=True, null=True)
    Pegado = models.JSONField(blank=True, null=True)
    Cierre = models.JSONField(blank=True, null=True)
    Broche = models.JSONField(blank=True, null=True)
    Elastico = models.JSONField(blank=True, null=True)
    Boton = models.JSONField(blank=True, null=True)
    Fusionado = models.CharField(choices=Fusionado, max_length=100, blank=True)