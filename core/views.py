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

    if request.method == 'POST':
        if form.is_valid():
            contact = form.save()
            logger.info(f"📨 پیام جدید از {contact.name} ({contact.phone}) در {contact.created_at}")
            messages.success(request, "✅ پیام شما با موفقیت ارسال شد!")
            return redirect('core:index')
        else:
            logger.warning(f"❌ خطا در ارسال فرم تماس: {form.errors.as_json()}")
            messages.error(request, "⚠️ لطفاً اطلاعات را به درستی وارد کنید.")

    context = {
        'services': services,
        'projects': projects,
        'team': team,
        'form': form,
    }
    return render(request, 'index.html', context)
