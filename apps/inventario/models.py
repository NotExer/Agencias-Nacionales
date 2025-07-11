from django.db import models

CATEGORIA = [
    ('cintas', 'Cintas'),
    ('cierres', 'Cierres'),
    ('botones', 'Botones'),
    ('velcros', 'Velcros'),
    ('sesgos', 'Sesgos'),
    ('broches', 'Broches'),
    ('cordones', 'Cordones'),
    ('elasticos', 'Elasticos'),
    ('deslizadores', 'Deslizadores'),
    ('fusionados', 'Fusionados'),
    ('corte', 'Corte'),
    ('forros', 'Forros'),
    ('lavados', 'Lavados'),
]

class Insumos(models.Model):
    ID = models.AutoField(primary_key=True)  
    descripcion = models.CharField(max_length=200)
    inventario = models.DecimalField(decimal_places=2 , max_digits=20)
    precio = models.DecimalField(max_digits=12, decimal_places=0)
    fecha_edicion = models.DateField(auto_now=True)
    categoria = models.CharField(max_length=50, choices=CATEGORIA)

    def __str__(self):
        return f"{self.categoria}: {self.descripcion}"
