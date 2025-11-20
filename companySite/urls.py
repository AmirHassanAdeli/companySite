from django.contrib import admin
from django.urls import path, include
from django.conf.urls.i18n import i18n_patterns
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    # برای تغییر زبان (ویو پیش‌فرض Django)
    path('i18n/', include('django.conf.urls.i18n')),
]

# مسیرهای چندزبانه
urlpatterns += i18n_patterns(
    path('admin/', admin.site.urls),
    path('', include('core.urls')),
    prefix_default_language=False,  # باعث می‌شود زبان پیش‌فرض بدون /fa/ باشد
)

# برای دسترسی به فایل‌های Static و Media در حالت توسعه
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATICFILES_DIRS[0])
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
