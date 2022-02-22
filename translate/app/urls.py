from django.urls import path
from . import views

urlpatterns = [
    path('', views.Translate.as_view()),
    path('speak/', views.Speak.as_view()),
    path('delete/', views.Delete.as_view())
]
