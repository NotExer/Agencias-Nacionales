from django import forms
from .models import Calculadora
from apps.comercial.models import Clientes  # ✅
from apps.proveedor.models import Prenda

class PedidoCalculadoraForm(forms.Form):
    cliente = forms.ModelChoiceField(
        queryset=Clientes.objects.order_by('Nombre'),
        empty_label="Seleccione un cliente",
        widget=forms.Select(attrs={'class': 'input-user'})
    )

class CalculadoraAsignarForm(forms.ModelForm):
    def __init__(self, *args, proveedor=None, **kwargs):
        super().__init__(*args, **kwargs)
        if proveedor:
            self.fields['prenda'].queryset = proveedor.prendas.all()
        else:
            self.fields['prenda'].queryset = Prenda.objects.none()  

    class Meta:
        model = Calculadora
        fields = ['cliente', 'Proveedor_select', 'Proveedor', 'prenda', 'Forro', 'Lavado', 'Estampado', 'Cinta', 'Pegado', 'Cierre', 'Broche', 'Elastico', 'Boton', 'Fusionado', 'Confeccion', 'Plantrel', 'Velcro', 'Sesgo', 'Extra', 'Cantidad']
        labels = {
            'Forro': 'Forro de bolsillo',
            'Estampado' : 'Colores de estampado',
            'Confeccion': 'Costo de confección',
            'Cantidad': 'Cantidad de prendas',
        }
        widgets = {
            'cliente': forms.HiddenInput(),
            'Proveedor_select': forms.CheckboxInput(attrs={'class': 'input-user'}),
            'Proveedor': forms.Select(attrs={'class': 'input-user'}),
            'prenda': forms.Select(attrs={'class': 'input-user'}),
            'Cantidad': forms.NumberInput(attrs={'class': 'input-user', 'step': '0.01', 'min': '0'}),
            'Forro': forms.Select(attrs={'class': 'input-user'}),
            'Lavado': forms.Select(attrs={'class': 'input-user'}),
            'Estampado': forms.NumberInput(attrs={'class': 'input-user', 'step': '0.01', 'min': '0'}),
            'Cinta': forms.Select(attrs={'class': 'input-user'}),
            'Cierre': forms.Select(attrs={'class': 'input-user'}),
            'Broche': forms.NumberInput(attrs={'class': 'input-user', 'step': '0.01', 'min': '0'}),
            'Elastico': forms.Select(attrs={'class': 'input-user'}),
            'Boton': forms.Select(attrs={'class': 'input-user'}),
            'Fusionado': forms.Select(attrs={'class': 'input-user'}),
            'Confeccion': forms.NumberInput(attrs={'class': 'input-user', 'step': '0.01', 'min': '0'}),
            'Plantrel': forms.NumberInput(attrs={'class': 'input-user'}),
            'Velcro': forms.Select(attrs={'class': 'input-user'}),
            'Sesgo': forms.Select(attrs={'class': 'input-user'}),
            'Extra': forms.Textarea(attrs={'class': 'input-user', 'rows': 3, 'placeholder': 'Detalles adicionales'}),
        }
