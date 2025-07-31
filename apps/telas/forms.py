from django import forms
from apps.telas.models import Tela
from apps.proveedor.models import Proveedor

class TelaForm(forms.ModelForm):
    class Meta:
        model = Tela
        fields = '__all__'
        widgets = {
            'Codigo': forms.TextInput(attrs={'class': 'input-user'}),
            'Tela': forms.TextInput(attrs={'class': 'input-user'}),
            'Precio': forms.NumberInput(attrs={'class': 'input-user'}),
            'Ancho': forms.NumberInput(attrs={'class': 'input-user'}),
            'Inventario': forms.NumberInput(attrs={'class': 'input-user'}),
            'Disponible': forms.NumberInput(attrs={'class': 'input-user'}),
            'Proveedor': forms.Select(attrs={'class': 'input-user'}),
            'Estado': forms.RadioSelect(choices=[(True, 'Activo'),(False, 'Inactivo')], attrs={'class': 'custom-radio'}),
            'Categoria': forms.Select(attrs={'class': 'input-user'}),
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # Aplica el filtro: solo proveedores que sean textileras
        self.fields['Proveedor'].queryset = Proveedor.objects.filter(Textilera=True)