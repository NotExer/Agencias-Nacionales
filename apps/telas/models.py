from django.db import models



class Tela(models.Model):
    ID = models.AutoField(primary_key=True)
    Codigo = models.CharField(max_length=100)
    Tela = models.CharField(max_length=255)
    Precio = models.DecimalField( max_digits=10, decimal_places=2)
    FechaEdicion = models.DateTimeField(auto_now=True)
    Ancho = models.DecimalField(max_digits=10, decimal_places=2)
    Inventario = models.DecimalField(max_digits=10, decimal_places=2)
    Disponible = models.DecimalField(max_digits=10, decimal_places=2)
