from django import forms
from proveedor.models import Proveedor
from apps.proveedor.models import Tela  # O el modelo donde defines las telas

class TelaForm(forms.ModelForm):
    class Meta:
        model = Tela
        fields = '__all__'  # o los campos específicos

    def __init__(self, *args, **kwargs):
        super(TelaForm, self).__init__(*args, **kwargs)
        # Filtra solo proveedores con Textilera=True
        self.fields['proveedor'].queryset = Proveedor.objects.filter(Textilera=True)