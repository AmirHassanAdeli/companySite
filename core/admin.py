from django.contrib import admin
from .models import Service, Project, TeamMember, Contact


# -------------------- Service Admin --------------------
@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ("title", "order", "icon")
    list_editable = ("order",)
    search_fields = ("title", "description")
    list_filter = ("order",)
    ordering = ("order", "id")
    list_per_page = 20


# -------------------- Project Admin --------------------
@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("title", "short_description", "order", "icon", "demo_url", "github_url")
    list_editable = ("order",)
    search_fields = ("title", "description", "technologies")
    list_filter = ("order",)
    ordering = ("order", "id")
    list_per_page = 20

    def technologies_list(self, obj):
        return "، ".join(obj.get_technologies_list())

    technologies_list.short_description = "تکنولوژی‌ها"


# -------------------- Team Member Admin --------------------
@admin.register(TeamMember)
class TeamMemberAdmin(admin.ModelAdmin):
    list_display = ("name", "position", "order")
    list_editable = ("order",)
    search_fields = ("name", "position", "bio")
    ordering = ("order", "id")
    list_per_page = 20


# -------------------- Contact Messages Admin --------------------
@admin.register(Contact)
class ContactAdmin(admin.ModelAdmin):
    list_display = ("name", "phone", "created_at", "short_message")
    search_fields = ("name", "phone", "message")
    list_filter = ("created_at",)
    ordering = ("-created_at",)
    list_per_page = 20
    readonly_fields = ("name", "phone", "message", "created_at")  # مهم: پیام قابل ویرایش نیست

    def short_message(self, obj):
        return obj.message[:40] + "..." if len(obj.message) > 40 else obj.message

    short_message.short_description = "خلاصه پیام"
