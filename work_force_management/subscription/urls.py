from django.conf.urls import include, url
from rest_framework.routers import DefaultRouter
from . import views, addtocart
from .views_details import plan_views
from .services.controllers import subscription, cart, company_profile
from .services.controllers import checkout
from .services.session import SessionMgmt

# Create a router and register our viewsets with it.

#router = DefaultRouter()
#router.register(r'core', views.SnippetViewSet)
#router.register(r'users', views.UserViewSet)


urlpatterns = [
    #url(r'^', include(router.urls)),
    url(r'^login/user$', SessionMgmt.login_user, name='login_user'),
    url(r'^logout/user$', SessionMgmt.logout_user, name='logout_user'),
    url(r'^addtocart$', cart.add_to_cart, name='add_to_cart'),
    url(r'^push_plan_details$', plan_views.Push_plan_details, name='Push_plan_details'),
    url(r'^fetch_plan_details$', subscription.fetch_plan_details, name='fetch_plan_details'),
    url(r'^push_company_profile$', subscription.push_company_profile, name='push_company_profile'),
    #url(r'^addtocart$', views.add_to_cart, name='add_to_cart'),
    url(r'^fetch_company_profile$', subscription.fetch_company_profile, name='fetch_company_profile'),
    url(r'^checkout$', checkout.checkout, name='checkout'),
    url(r'^heartbeat/addcompany$', company_profile.push_company_profile_heartbeat, name='company_profile'),
    # url(r'^link$', views.AddLinkList, name='AddLinkList'),
    # url(r'^news$', views.NewsList, name='NewsList'),
   
    #url(r'^music$', views.Music, name='Music'),
]
