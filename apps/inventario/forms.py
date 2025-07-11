from django import forms
from .models import Insumos  # Asegúrate de que la ruta sea correcta

class InsumosForm(forms.ModelForm):
    class Meta:
        model = Insumos
        fields = [  
            'descripcion', 
            'inventario',
            'precio', 
            'fecha_edicion',
            'categoria']
        labels = {

            'descripcion': 'Nombre del insumo',
            'inventario': 'Cantidad en inventario',
            'precio': 'Precio',
            'fecha_edicion': 'Fecha de edición',
            'categoria': 'Categoría',
        }
        exclude = ['fecha_edicion']
        widgets = {

            'descripcion': forms.TextInput(attrs={'class': 'input-user'}),
            'inventario': forms.NumberInput(attrs={'class': 'input-user'}),
            'precio': forms.NumberInput(attrs={'class': 'input-user', 'step': '0.01'}),
            'fecha_edicion': forms.DateInput(attrs={'class': 'input-user', 'type': 'date'}),
            'categoria': forms.Select(attrs={'class': 'input-user'}),
        }
