from django import forms
from .models import Calculadora
from apps.comercial.models import Clientes
from apps.proveedor.models import Prenda, Proveedor
from apps.telas.models import Tela

class PedidoCalculadoraForm(forms.Form):
    cliente = forms.ModelChoiceField(
        queryset=Clientes.objects.order_by('Nombre'),
        empty_label="Seleccione un cliente",
        widget=forms.Select(attrs={'class': 'input-user'})
    )


class CalculadoraAsignarForm(forms.ModelForm):
    def __init__(self, *args, proveedor=None, **kwargs):
        super().__init__(*args, **kwargs)

        # La lógica se invierte aquí
        # Verifica si el formulario ya tiene datos (es decir, fue enviado con POST)
        if self.data.get('Proveedor_select') == 'on':
            # Si 'Proveedor_select' es True, muestra las prendas del proveedor seleccionado
            if proveedor:
                self.fields['prenda'].queryset = proveedor.prendas.all()
            else:
                self.fields['prenda'].queryset = Prenda.objects.none()
        else:
            # Si 'Proveedor_select' es False, muestra solo las prendas del proveedor con ID 1
            try:
                proveedor_id_1 = Proveedor.objects.get(ID=1)
                self.fields['prenda'].queryset = proveedor_id_1.prendas.all()
            except Proveedor.DoesNotExist:
                self.fields['prenda'].queryset = Prenda.objects.none()

        self.fields['tela'].queryset = Tela.objects.filter(Estado=True).order_by('Tela')

    class Meta:
        model = Calculadora
        fields = [
            'cliente', 'Proveedor_select', 'Proveedor', 'prenda',
            'Cantidad', 'Descripcion', 'tela', 'PromedioCorte',
            'Forro', 'Lavado', 'Bordado', 'Estampado', 'Cinta', 'Pegado',
            'Cierre', 'Broche', 'Elastico', 'Boton', 'Fusionado',
            'Confeccion', 'Plantrel', 'Velcro', 'Sesgo', 'Extra', 'Precio_total',
        ]
        labels = {
            'tela': 'Tipo de Tela',
            'PromedioCorte': 'Promedio de Corte',
            'Descripcion': 'Descripción',
            'Forro': 'Forro de bolsillo',
            'Estampado': 'Costo del estampado',
            'Confeccion': 'Costo de confección',
            'Cantidad': 'Cantidad de prendas',
            'Precio_total': 'Precio total',
            'Bordado': 'Bordado',
            'Cinta': 'Cinta',
            'Pegado': 'Pegado',
            'Cierre': 'Cierre',
            'Broche': 'Broche',
            'Elastico': 'Elástico',
            'Boton': 'Botón',
            'Plantrel': 'Plantrel',
            'Velcro': 'Velcro',
            'Sesgo': 'Sesgo',
            'Extra': 'Costo Extra',
        }
        widgets = {
            'cliente': forms.HiddenInput(),
            'Proveedor_select': forms.CheckboxInput(attrs={'class': 'input-user'}),
            'Proveedor': forms.Select(attrs={'class': 'input-user'}),
            'prenda': forms.Select(attrs={'class': 'input-user'}),
            'Cantidad': forms.NumberInput(attrs={'class': 'input-user', 'step': '0.01', 'min': '0'}),
            'Descripcion': forms.TextInput(attrs={'class': 'input-user'}),
            'tela': forms.Select(attrs={'class': 'input-user'}),
            'PromedioCorte': forms.NumberInput(attrs={'class': 'input-user', 'step': '0.01', 'min': '0'}),
            'Forro': forms.Select(attrs={'class': 'input-user'}),
            'Lavado': forms.Select(attrs={'class': 'input-user'}),
            'Estampado': forms.NumberInput(attrs={'class': 'input-user', 'step': '0.01', 'min': '0'}),
            'Fusionado': forms.Select(attrs={'class': 'input-user'}),
            'Confeccion': forms.NumberInput(attrs={'class': 'input-user', 'step': '0.01', 'min': '0'}),
            'Precio_total': forms.NumberInput(attrs={'class': 'input-user', 'readonly': 'readonly'}),
            
            # Widgets para campos JSON (ocultos, ya que se llenan con JS)
            'Bordado': forms.HiddenInput(),
            'Cinta': forms.HiddenInput(),
            'Pegado': forms.HiddenInput(),
            'Cierre': forms.HiddenInput(),
            'Broche': forms.HiddenInput(),
            'Elastico': forms.HiddenInput(),
            'Boton': forms.HiddenInput(),
            'Plantrel': forms.HiddenInput(),
            'Velcro': forms.HiddenInput(),
            'Sesgo': forms.HiddenInput(),
            'Extra': forms.HiddenInput(),
        }