# En tu archivo forms.py

from django import forms
from django.contrib.auth.models import User
from .models import Usuario

# Formulario para CREAR un usuario (incluye la contraseña)
class UsuarioForm(forms.ModelForm):
    username = forms.CharField(max_length=150, required=True, label='Nombre de Usuario',
                               widget=forms.TextInput(attrs={'class': 'input-user', 'placeholder': 'Nombre de Usuario'}))
    email = forms.EmailField(required=True, label='Correo Electrónico',
                             widget=forms.EmailInput(attrs={'class': 'input-user', 'placeholder': 'Correo Electrónico'}))
    password = forms.CharField(widget=forms.PasswordInput, required=True, label='Contraseña')
    
    class Meta:
        model = Usuario
        fields = ['username', 'email', 'password', 'telefono', 'cargo', 'foto']
        labels = {
            'telefono': 'Teléfono',
            'cargo': 'Cargo',
            'foto': 'Foto de Perfil',
        }
        widgets = {
            'telefono': forms.TextInput(attrs={'class': 'input-user', 'placeholder': 'Teléfono'}),
            'cargo': forms.Select(attrs={'class': 'input-user', 'placeholder': 'Cargo'}),
            'foto': forms.ClearableFileInput(attrs={'class': 'input-user'}),
        }
        
    def save(self, commit=True):
        # Lógica para crear el usuario y el perfil
        user = User.objects.create_user(
            username=self.cleaned_data['username'],
            email=self.cleaned_data['email'],
            password=self.cleaned_data['password']
        )
        usuario_profile = Usuario.objects.create(
            user=user,
            telefono=self.cleaned_data.get('telefono'),
            cargo=self.cleaned_data.get('cargo'),
            foto=self.cleaned_data.get('foto')
        )
        return usuario_profile

# ---
# Formulario para EDITAR un usuario (sin el campo de contraseña)
class UsuarioEditForm(forms.ModelForm):
    username = forms.CharField(max_length=150, required=True, label='Nombre de Usuario',
                               widget=forms.TextInput(attrs={'class': 'input-user', 'placeholder': 'Nombre de Usuario'}))
    email = forms.EmailField(required=True, label='Correo Electrónico',
                             widget=forms.EmailInput(attrs={'class': 'input-user', 'placeholder': 'Correo Electrónico'}))

    class Meta:
        model = Usuario
        fields = ['username', 'email', 'telefono', 'cargo', 'foto']
        labels = {
            'telefono': 'Teléfono',
            'cargo': 'Cargo',
            'foto': 'Foto de Perfil',
        }
        widgets = {
            'telefono': forms.TextInput(attrs={'class': 'input-user', 'placeholder': 'Teléfono'}),
            'cargo': forms.Select(attrs={'class': 'input-user', 'placeholder': 'Cargo'}),
            'foto': forms.ClearableFileInput(attrs={'class': 'input-user'}),
        }

    def save(self, commit=True):
        usuario = super().save(commit=False)
        user = usuario.user
        
        user.username = self.cleaned_data['username']
        user.email = self.cleaned_data['email']
        
        if commit:
            user.save()
            usuario.save()
        return usuario