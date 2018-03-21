from django.conf.urls import include, url
from rest_framework.routers import DefaultRouter
from . import views

# Create a router and register our viewsets with it.
router = DefaultRouter()
router.register(r'core', views.SnippetViewSet)
router.register(r'users', views.UserViewSet)

urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^employee$', views.index, name='index'),
    url(r'^demo$', views.DemoList, name='DemoList'),
]
