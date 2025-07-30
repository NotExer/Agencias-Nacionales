from django import forms
from apps.proveedor.models import Proveedor


class TelaForm(forms.ModelForm):
    class Meta:
        model = Proveedor
        fields = '__all__'
        widgets = {
            'Codigo': forms.TextInput(attrs={'class': 'input-user'}),
            'Tela': forms.TextInput(attrs={'class': 'input-user'}),
            'Precio': forms.NumberInput(attrs={'class': 'input-user'}),
            'Ancho': forms.NumberInput(attrs={'class': 'input-user'}),
            'Inventario': forms.NumberInput(attrs={'class': 'input-user'}),
            'Disponible': forms.NumberInput(attrs={'class': 'input-user'}),
        }

    def __init__(self, *args, **kwargs):
        super(TelaForm, self).__init__(*args, **kwargs)

        self.fields['proveedor'].queryset = Proveedor.objects.filter(Textilera=True)