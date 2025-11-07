# core/views.py
import re
import logging
from django.contrib import messages
from django.shortcuts import render, redirect
from .models import Service, Project, TeamMember
from .forms import ContactForm

logger = logging.getLogger(__name__)


def index(request):
    services = Service.objects.all()
    projects = Project.objects.all()
    team = TeamMember.objects.all()
    form = ContactForm(request.POST or None)

    if request.method == 'POST' and form.is_valid():
        form.save()
        messages.success(request, "✅ پیام شما با موفقیت ارسال شد!")
        return redirect('core:index')  # پاک کردن فرم و نمایش پیام

    context = {
        'services': services,
        'projects': projects,
        'team': team,
        'form': form,
    }
    return render(request, 'index.html', context)
