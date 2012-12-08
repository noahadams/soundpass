from django.conf.urls import patterns, include, url


urlpatterns = patterns('',
    url(r'^/?$', 'django.views.generic.simple.direct_to_template', {'template': 'home.html'}, name='home'),
    url(r'^login/?$', 'django.contrib.auth.views.login', {'template_name': 'login.html'}, name='login'),
    url(r'^logout/?$', 'django.contrib.auth.views.logout', {'template_name': 'logout.html'}, name='logout'),

)

