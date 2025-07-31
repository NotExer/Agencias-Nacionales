from django.db import models
from apps.proveedor.models import Proveedor  # Asegúrate de importar el modelo


# Corrección del nombre de la variable
CATEGORIA_TELAS = [
    ('Anifluidos', 'Anifluidos'),
    ('Dacron', 'Dacron'),
    ('Drill', 'Drill'),
    ('Entretela', 'Entretela'),
    ('Flex', 'Flex'),
    ('Gabardina', 'Gabardina'),
    ('Genero', 'Genero'),
    ('Indigo', 'Indigo'),
    ('Oxford', 'Oxford'),
    ('Rib', 'Rib'),
    ('Twill', 'Twill'),
    
]

class Tela(models.Model):
    ID = models.AutoField(primary_key=True)
    Proveedor = models.ForeignKey(Proveedor,on_delete=models.CASCADE, related_name='telas')
    Codigo = models.CharField(max_length=100)
    Tela = models.CharField(max_length=255)
    Precio = models.DecimalField(max_digits=10, decimal_places=0)
    FechaEdicion = models.DateTimeField(auto_now=True)
    Ancho = models.DecimalField(max_digits=10, decimal_places=0)
    Inventario = models.DecimalField(max_digits=10, decimal_places=0)
    Disponible = models.DecimalField(max_digits=10, decimal_places=0)
    Estado = models.BooleanField(default=True)
    Categoria = models.CharField(max_length=100, choices=CATEGORIA_TELAS)
