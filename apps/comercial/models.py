from django.db import models


OPCIONES_PRODUCTOS = [
    ('Botones', 'Botones'),
    ('Camisetas', 'Camisetas'),
    ('Calzado Agencias', 'Calzado Agencias'),
    ('Calzado Kondor', 'Calzado Kondor'),
    ('Epp', 'Epp'),
    ('Prendas de cabeza', 'Prendas de cabeza'),
]



class Clientes(models.Model):
    ESTADOS = [
        ('','Seleccione'),
        ('Activo', 'Activo'),
        ('Inactivo', 'Inactivo'),
        ('Omitir', 'Omitir'),
        ('liquidado', 'Liquidado'),
    ]

    SECTORES = [
        ('','Seleccione'),
        ('industrial', 'Industrial'),
        ('comercial', 'Comercial'),
        ('educativo', 'Educativo'),
        ('salud', 'Salud'),
        ('gubernamental', 'Gubernamental'),
        ('otro', 'Otro'),
    ]


    PRODUCTOS = [
        ('','Seleccione'),
        ('Camisetas', 'Camisetas'),
        ('Calzado de agencias', 'Calzado de agencias'),
        ('Calzado Kondor', 'Calzado Kondor'),
        ('EPP', 'EPP'),
        ('Prendas de cabeza', 'Prendas de cabeza'),

    ]
    VENDEDORES = [
        ('','Seleccionar'),
        ('Elizabeth Quintero Ramírez', 'Elizabeth Quintero Ramírez'),
        ('María Zulima Alvaran', 'María Zulima Alvaran'),
        ('Luz Extela Berrio Pino', 'Luz Extela Berrio Pino'),
        ('Luz Daniela Orozco Mesa', 'Luz Daniela Orozco Mesa'),
        ('Gladys Patricia Montoya Rúa','Gladys Patricia Montoya Rúa'),
        ('María Parra Restrepo','María Parra Restrepo'),
        ('Andres Felipe Alvarez','Andres Felipe Alvarez'),
        ('Aura Vanessa López García','Aura Vanessa López García'),
        ('María Parra Restrepo','María Parra Restrepo'),
        ('Ventas directas','Ventas directas'),
        ('Prospectos generales','Prospectos generales'),
    ]
    CONTACTO = [
        ('','Seleccionar'),
        ('Correo electronico', 'Correo electronico'),
        ('Llamada telefonica', 'Llamada telefonica'),
        ('WhatsApp', 'WhatsApp'),

    ]

    ID = models.AutoField(primary_key=True)  
    Nit = models.CharField(max_length=9, unique=True) #
    Razon = models.CharField("Razón social", max_length=200) #
    Nombre = models.CharField(max_length=100) #
    Sigla = models.CharField(max_length=20, blank=True) #
    Ciudad = models.CharField(max_length=100) #
    Direccion = models.CharField(max_length=200) #
    Telefono = models.CharField(max_length=20, blank=True) #
    Celular = models.CharField(max_length=20, blank=True)  #  
    Contacto = models.CharField(max_length=100, blank=True) #
    Cargo = models.CharField(max_length=100, blank=True) #
    Correo = models.EmailField(max_length=100) #
    CorreoExtra = models.EmailField(max_length=100, blank=True) #
    CorreoFactura = models.EmailField(max_length=100, blank=True) #
    Sector = models.CharField(max_length=50, choices=SECTORES, default='') #
    Productos = models.TextField(blank=True) 
    Pagina = models.CharField(max_length=200, blank=True) #
    Estado = models.CharField(max_length=20, choices=ESTADOS, default='') #
    Vendedor = models.CharField(max_length=50, choices=VENDEDORES ,default='') #
    TipoContacto = models.CharField(max_length=50, choices=CONTACTO ,default='') #
    Comentario = models.TextField(blank=True) 

    def __str__(self):
        return f"{self.Razon} ({self.Nit})"


    def get_productos_list(self):
        if not self.Productos:
            return []
        return [p.strip() for p in self.Productos.split(',')]
