from django import forms
from django.db import models
from apps.comercial.models import Clientes

class PedidoCrearForm(forms.Form):
    cliente = forms.ModelChoiceField(
        queryset=Clientes.objects.order_by('Razon'),
        empty_label="Seleccione un cliente",
        widget=forms.Select(attrs={'class': 'form-control'})
    )

