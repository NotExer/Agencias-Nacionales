from django.db import models

OPCIONES_CONTADO = [
    ('contado', 'De Contado'),
    ('desconocido', 'Desconocido'),
]

OPCIONES_CATEGORIA = [
    ('Calzado Agenciales', 'Calzado Agenciales'),
    ('Calzado Kondor', 'Calzado Kondor'),
    ('Camisetas y terceros', 'Camisetas y terceros'),
    ('Epp', 'Epp'),
    ('Gastos', 'Gastos'),
    ('Transporte', 'Gastos de transporte'),
    ('Insumos', 'Insumos'),
    ('Insumos de calzado', 'Insumos de calzado'),
    ('Planta', 'Planta'),
    ('Seguridad', 'Seguridad'),
    ('Servicios', 'Servicios de confeccion'),
    ('Telas', 'Telas'),
]


CATEGORIA_PRENDA = [
    ('Pava', 'Pava'),
    ('Pijamas', 'Pijamas'),
    ('Sabanas', 'Sabanas'),
    ('Camisa manga larga', 'Camisa manga larga'),
    ('Camisa manga corta', 'Camisa manga corta'),
    ('Blusa manga larga', 'Blusa manga larga'),
    ('Pantalon sencillo', 'Pantalon sencillo'),
    ('Peto', 'Peto'),
    ('Delantal tipo guitarra', 'Delantal tipo guitarra'),
    ('Saco', 'Saco'),
    ('Delantal de linea', 'Delantal de linea'),
    ('Panalon dama', 'Pantalon dama'),
    ('Pantalon hombre', 'Pantalon hombre'),
    ('Overol sencillo', 'Overol sencillo'),
    ('Campo con ojo', 'Campo con ojo'),
    ('Blue jean', 'Blue jean'),
    ('Tapabocas', 'Tapabocas'),
    ('Cachucha', 'Cachucha'),
    ('Bombacho', 'Bombacho'),
    ('Mangas', 'Mangas'),
    ('Sudadera', 'Sudadera'),
    ('Gorro', 'Gorro'),
    ('Bermuda indigo', 'Bermuda indigo'),
    ('Bata', 'Bata'),
    ('Cobija', 'Cobija'),
    ('Funda', 'Funda'),
    ('Envolvedera', 'Envolvedera'),
    ('Pañuelo', 'Pañuelo'),
    ('Chompa', 'Chompa'),
    ('Tula', 'Tula'),
    ('Pantaloneta', 'Pantaloneta'),
    ('Talego', 'Talego'),
    ('Bolsillo G21', 'Bolsillo G21'),
]


CATEGORIA_PRENDA_PRECIOS  = dict([
    ('Pava', 1500 ),
    ('Pijamas', 1500 ),
    ('Sabanas', 1500 ),
    ('Camisa manga larga',  1500),
    ('Camisa manga corta',  1500),
    ('Blusa manga larga',  1500),
    ('Pantalon sencillo',  1500),
    ('Peto',  1500),
    ('Delantal tipo guitarra', 1500 ),
    ('Saco',  1500),
    ('Delantal de linea',  1500),
    ('Panalon dama',  1500),
    ('Pantalon hombre',  1500),
    ('Overol sencillo',  2500),
    ('Campo con ojo',  1500),
    ('Blue jean',  1500),
    ('Tapabocas',  1500),
    ('Cachucha',  1500),
    ('Bombacho',  1500),
    ('Mangas',  1500),
    ('Sudadera',  1500),
    ('Gorro',  1500),
    ('Bermuda indigo',  1500),
    ('Bata',  1500),
    ('Cobija',  1500),
    ('Funda',  1500),
    ('Envolvedera', 1500 ),
    ('Pañuelo',  1500),
    ('Chompa', 1500 ),
    ('Tula', 1500 ),
    ('Pantaloneta', 1500 ),
    ('Talego', 1500 ),
    ('Bolsillo G21',  1500),
])


class Proveedor(models.Model):
    ID = models.AutoField(primary_key=True)
    Nit = models.CharField(max_length=100)
    Nombre = models.CharField(max_length=255)
    Telefono = models.CharField(max_length=20)
    Direccion = models.CharField(max_length=255)
    Ciudad = models.CharField(max_length=100)
    Contacto = models.CharField(max_length=100)
    Correo = models.EmailField(max_length=100)
    Movil = models.CharField(max_length=20)
    Plazo = models.PositiveIntegerField()
    Descuento = models.CharField(max_length=100, blank=True, null=True)
    Contado = models.CharField(max_length=20, choices=OPCIONES_CONTADO, default='desconocido')
    Categorias = models.TextField(blank=True)  
    Textilera = models.BooleanField(default=False)


    def get_categorias_list(self):
        return self.Categorias.split(',') if self.Categorias else []

    def __str__(self):
        return f"{self.Nombre}"



class Prenda(models.Model):
    ID = models.AutoField(primary_key=True)
    proveedor = models.ForeignKey('Proveedor', on_delete=models.CASCADE, related_name='prendas')
    Imagen = models.ImageField(upload_to='prendas/', blank=False, null=False)
    descripcion = models.TextField(blank=False)
    Referencia_color_talla_Costo_precio = models.JSONField(blank=True, null=True)
    Categorias = models.CharField(choices=CATEGORIA_PRENDA, max_length=100, blank=True)
    Ficha = models.FileField(upload_to='fichas/', blank=False, null=False)
    Ultima_actualizacion = models.DateField(auto_now=True)


    def get_categorias_list(self):
        return self.Categorias.split(',') if self.Categorias else []
    
    def __str__(self):
        return f"{self.descripcion}"
    

    def get_precio_categoria(self):
        from .models import CATEGORIA_PRENDA_PRECIOS  
        return CATEGORIA_PRENDA_PRECIOS.get(self.Categorias.strip(), 0)