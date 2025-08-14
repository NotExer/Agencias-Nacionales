from django import forms
from apps.comercial.models import Clientes, OPCIONES_PRODUCTOS 

class Clientesform(forms.ModelForm):
  productos = forms.MultipleChoiceField(
    choices=OPCIONES_PRODUCTOS, 
    required=False,
    label='Productos de interés',
    widget=forms.SelectMultiple(attrs={
      'id': 'id_productos_original',
      'style': 'display:none;'
    })
  )

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
      'Contacto',
      'Cargo',
      'Correo',
      'CorreoExtra',
      'CorreoFactura',
      'Sector',
      'Pagina',
      'Estado',
      'Vendedor',
      'TipoContacto',
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
      'Contacto':'Nombre del contacto',
      'Cargo':'Cargo del contacto',
      'Correo':'Correo electrónico',
      'CorreoExtra':'Correo electrónico extra',
      'CorreoFactura':'Correo electrónico de facturación',
      'Sector':'Sector económico',
      'Pagina':'Página web',
      'Estado':'Estado del cliente',
      'Vendedor':'Vendedor asignado',
      'TipoContacto':'Tipo de contacto preferido',
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
      'Contacto': forms.TextInput(attrs={'class': 'input-user'}),
      'Cargo': forms.TextInput(attrs={'class': 'input-user'}),
      'Correo': forms.EmailInput(attrs={'class': 'input-user'}),
      'CorreoExtra': forms.EmailInput(attrs={'class': 'input-user'}),
      'CorreoFactura': forms.EmailInput(attrs={'class': 'input-user'}),
      'Sector': forms.Select(attrs={'class': 'input-user'}),
      'Pagina': forms.URLInput(attrs={'class': 'input-user'}),
      'Estado': forms.Select(attrs={'class': 'input-user'}),
      'Vendedor': forms.Select(attrs={'class': 'input-user'}),
      'TipoContacto': forms.Select(attrs={'class': 'input-user'}),
      'Comentario': forms.Textarea(attrs={'class': 'input-user'}),
    }

  def __init__(self, *args, **kwargs):
    super().__init__(*args, **kwargs)
    # Inicializa el campo 'productos' con los datos del modelo si el objeto ya existe
    if self.instance and self.instance.pk:
      self.fields['productos'].initial = self.instance.get_productos_list()

  def save(self, commit=True):
    # Obtiene el objeto del formulario sin guardarlo en la base de datos
    instance = super().save(commit=False)
    # Obtiene los productos seleccionados del formulario
    productos = self.cleaned_data.get('productos', [])
    # Convierte la lista de productos en una cadena separada por comas
    instance.Productos = ','.join(productos)
    # Si commit es True, guarda el objeto en la base de datos
    if commit:
      instance.save()
    return instance