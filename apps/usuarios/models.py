# En tu archivo models.py

from django.db import models
from django.contrib.auth.models import User


CARGO_CHOICES = [
    ('vendedor', 'Vendedor'),
    ('administrador', 'Administrador'),
    ('gerente', 'Gerente'),
    ('soporte', 'Soporte'),
]

class Usuario(models.Model):

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    telefono = models.CharField(max_length=20, blank=True, null=True)
    cargo = models.CharField(max_length=20, choices=CARGO_CHOICES, default='vendedor')
    foto = models.ImageField(upload_to='fotos_usuarios/')

    def __str__(self):
        return self.user.username