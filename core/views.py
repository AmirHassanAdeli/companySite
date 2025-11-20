import logging
from django.contrib import messages
from django.shortcuts import render, redirect
from django.views.decorators.http import require_http_methods

from .models import Service, Project, TeamMember
from .forms import ContactForm

from django.shortcuts import get_object_or_404

logger = logging.getLogger(__name__)


@require_http_methods(["GET", "POST"])
def index(request):
    """صفحه اصلی سایت + پردازش فرم تماس"""

    # بارگذاری داده‌ها (QuerySet بهینه)
    services = Service.objects.all()
    projects = Project.objects.all()
    team = TeamMember.objects.all()

    # جلوگیری از ارسال اسپم ساده با یک "honeypot"
    honeypot = request.POST.get("website", "")
    if honeypot:
        logger.warning("🚫 Spam detected (honeypot field is filled).")
        messages.error(request, "⚠️ درخواست شما نامعتبر است.")
        return redirect("core:index")

    # فرم تماس
    form = ContactForm(request.POST or None)

    if request.method == "POST":
        if form.is_valid():
            contact = form.save()

            logger.info(
                f"📨 پیام جدید: {contact.name} ({contact.phone}) - {contact.created_at}"
            )

            messages.success(request, "✅ پیام شما با موفقیت ارسال شد!")
            return redirect("core:index")  # PRG pattern (جلوگیری از ارسال دوباره فرم)

        else:
            logger.warning(f"❌ خطا در فرم تماس: {form.errors.as_json()}")
            messages.error(request, "⚠️ لطفاً اطلاعات را به درستی وارد کنید.")

    context = {
        "services": services,
        "projects": projects,
        "team": team,
        "form": form,
    }
    return render(request, "index.html", context)


def about(request):
    return render(request, 'partials/about.html')


def project_detail(request, pk):
    project = get_object_or_404(Project, pk=pk)

    context = {
        "project": project
    }
    return render(request, "partials/project_detail.html", context)


def service_detail(request, pk):
    service = get_object_or_404(Service, pk=pk)

    return render(request, "partials/service_detail.html", {
        "service": service
    })
