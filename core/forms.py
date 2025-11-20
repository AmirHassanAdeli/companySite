import re
from django import forms
from .models import Contact
from django.utils.translation import gettext_lazy as _


class ContactForm(forms.ModelForm):
    class Meta:
        model = Contact
        fields = ['name', 'phone', 'message']
        widgets = {
            'name': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': _("نام شما")
            }),
            'phone': forms.TextInput(attrs={
                'class': 'form-control',
                'placeholder': _("شماره تماس")
            }),
            'message': forms.Textarea(attrs={
                'class': 'form-control',
                'placeholder': _("پیام شما"),
                'rows': 4
            }),
        }
        error_messages = {
            'name': {
                'required': _("وارد کردن نام ضروری است."),
            },
            'phone': {
                'required': _("شماره تماس ضروری است."),
            },
            'message': {
                'required': _("متن پیام را وارد کنید."),
            },
        }

    # پاک‌سازی نام
    def clean_name(self):
        name = self.cleaned_data['name'].strip()
        return re.sub(r'\s+', ' ', name)

    # پاک‌سازی و اعتبارسنجی شماره
    def clean_phone(self):
        phone = self.cleaned_data['phone'].strip()

        if not re.match(r'^[0-9۰-۹\-\+\s]+$', phone):
            raise forms.ValidationError(_("شماره تماس معتبر نیست."))

        # مثال از حداقل طول شماره
        if len(phone.replace(" ", "")) < 8:
            raise forms.ValidationError(_("شماره تماس بسیار کوتاه است."))

        return phone

    # پاک‌سازی پیام
    def clean_message(self):
        message = self.cleaned_data['message'].strip()
        return re.sub(r'\s+', ' ', message)
