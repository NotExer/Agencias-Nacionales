from django import forms
from apps.comercial.models import Clientes # Asegúrate de que esta ruta sea correcta

class Clientesform(forms.ModelForm):
    class Meta:
        model = Clientes
        fields = [
            'Nit',
            'Razon',
            'Nombre',
            'Sigla',
            'Ciudad',
            'Direccion',
            'Telefono',
            'Celular',
            'Contacto',  # Actualizado de 'Contacto'
            'Cargo',
            'Correo',
            'CorreoExtra',
            'CorreoFactura',
            'Sector',
            'Productos', # Se agregó este campo que faltaba en el form
            'Pagina',
            'Estado',
            'Vendedor',
            'TipoContacto', # Actualizado de 'Contacto'
            'Comentario',
        ]
        labels = {
            'Nit':'Nit',
            'Razon':'Razón social',
            'Nombre':'Nombre comercial',
            'Sigla':'Sigla',
            'Ciudad':'Ciudad',
            'Direccion':'Dirección',
            'Telefono':'Teléfono fijo',
            'Celular':'Teléfono celular',
            'Contacto':'Nombre del contacto', # Actualizado
            'Cargo':'Cargo del contacto',
            'Correo':'Correo electrónico',
            'CorreoExtra':'Correo electrónico extra',
            'CorreoFactura':'Correo electrónico de facturación',
            'Sector':'Sector económico',
            'Productos': 'Productos de interés', # Etiqueta agregada
            'Pagina':'Página web',
            'Estado':'Estado del cliente', # Ligeramente mejorado
            'Vendedor':'Vendedor asignado', # Ligeramente mejorado
            'TipoContacto':'Tipo de contacto preferido', # Actualizado
            'Comentario':'Comentario',
        }
        widgets = {
            'Nit': forms.TextInput(attrs={'class': 'input-user', 'maxlength': '9'}),
            'Razon' :forms.TextInput(attrs={'class': 'input-user'}),
            'Nombre': forms.TextInput(attrs={'class': 'input-user'}),
            'Sigla': forms.TextInput(attrs={'class': 'input-user'}),
            'Ciudad': forms.TextInput(attrs={'class': 'input-user'}),
            'Direccion': forms.TextInput(attrs={'class': 'input-user'}),
            'Telefono': forms.TextInput(attrs={'class': 'input-user'}),
            'Celular': forms.TextInput(attrs={'class': 'input-user'}),
            'Contacto': forms.TextInput(attrs={'class': 'input-user'}), # Actualizado
            'Cargo': forms.TextInput(attrs={'class': 'input-user'}),
            'Correo': forms.EmailInput(attrs={'class': 'input-user'}),
            'CorreoExtra': forms.EmailInput(attrs={'class': 'input-user'}),
            'CorreoFactura': forms.EmailInput(attrs={'class': 'input-user'}),
            'Sector': forms.Select(attrs={'class': 'input-user'}),
            'Productos': forms.Select(attrs={'class': 'input-user'}), # Widget agregado
            'Pagina': forms.URLInput(attrs={'class': 'input-user'}), # Cambiado a URLInput
            'Estado': forms.Select(attrs={'class': 'input-user'}),
            'Vendedor': forms.Select(attrs={'class': 'input-user'}),
            'TipoContacto': forms.Select(attrs={'class': 'input-user'}), # Widget agregado
            'Comentario': forms.Textarea(attrs={'class': 'input-user'}),
        }