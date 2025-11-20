from django.urls import path
from . import views

app_name = 'core'

urlpatterns = [
    path('', views.index, name='index'),
    path('about/', views.about, name='about'),
    path('project/<int:pk>/', views.project_detail, name='project_detail'),
    path('service/<int:pk>/', views.service_detail, name='service_detail'),

]
