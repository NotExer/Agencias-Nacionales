from django import forms
from .models import Proveedor, OPCIONES_CATEGORIA, Prenda, CATEGORIA_PRENDA

class ProveedorForm(forms.ModelForm):
    categorias = forms.MultipleChoiceField(
        choices=OPCIONES_CATEGORIA,
        required=False,
        label='Categorías',
        widget=forms.SelectMultiple(attrs={
            'id': 'id_categorias_original',
            'style': 'display:none;'
        })
    )

    class Meta:
        model = Proveedor
        fields = [
            'Nit', 'Nombre', 'Telefono', 'Direccion', 'Ciudad', 'Contacto',
            'Correo', 'Movil', 'Plazo', 'Descuento', 'Contado', 'Textilera'
        ] 

        labels = {
            'Nit': 'Nit',
            'Nombre': 'Nombre completo',
            'Telefono': 'Teléfono',
            'Direccion': 'Dirección',
            'Ciudad': 'Ciudad',
            'Contacto': 'Nombre de contacto',
            'Correo': 'Correo electrónico',
            'Movil': 'Teléfono celular',
            'Plazo': 'Plazo de pago en días',
            'Descuento': 'Descuento a convenir',
            'Contado': 'Tipo de pago',
            'Textilera': 'El proveedor es una textilera'
        }

        widgets = {
            'Nit': forms.TextInput(attrs={'class': 'input-user'}),
            'Nombre': forms.TextInput(attrs={'class': 'input-user'}),
            'Telefono': forms.TextInput(attrs={'class': 'input-user'}),
            'Direccion': forms.TextInput(attrs={'class': 'input-user'}),
            'Ciudad': forms.TextInput(attrs={'class': 'input-user'}),
            'Contacto': forms.TextInput(attrs={'class': 'input-user'}),
            'Correo': forms.EmailInput(attrs={'class': 'input-user'}),
            'Movil': forms.TextInput(attrs={'class': 'input-user'}),
            'Plazo': forms.NumberInput(attrs={'class': 'input-user'}),
            'Descuento': forms.TextInput(attrs={'class': 'input-user'}),
            'Contado': forms.RadioSelect(attrs={'class': 'custom-radio'}),
            'Textilera': forms.CheckboxInput(attrs={'class': 'input-user'}),

        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        if self.instance and self.instance.pk:
            self.fields['categorias'].initial = self.instance.get_categorias_list()

    def save(self, commit=True):
        instance = super().save(commit=False)
        categorias = self.cleaned_data.get('categorias', [])
        instance.Categorias = ','.join(categorias)
        if commit:
            instance.save()
        return instance

class PrendaForm(forms.ModelForm):
    class Meta:
        model = Prenda
        fields = [
            'Imagen',
            'descripcion',
            'Referencia_color_talla_Costo_precio',
            'Categorias',
            'Ficha',
        ]
        labels = {
            'Imagen': 'Imagen de la prenda',
            'descripcion': 'Descripción',
            'Referencia_color_talla_Costo_precio': 'Combinaciones de Referencia, Color, Talla, Costo y Precio',
            'Categorias': 'Categoría',
            'Ficha': 'Ficha técnica',
        }
        widgets = {
            'Imagen': forms.ClearableFileInput(attrs={'class': 'input-user'}),
            'descripcion': forms.Textarea(attrs={'class': 'input-user', 'rows': 3}),
            'Categorias': forms.Select(attrs={'class': 'input-user'}),
            'Ficha': forms.ClearableFileInput(attrs={'class': 'input-user'}),
        }