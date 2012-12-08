from django.conf.urls import patterns, include, url

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'soundauth.views.home', name='home'),
    # url(r'^soundauth/', include('soundauth.foo.urls')),

    url(r'^admin/', include(admin.site.urls)),
)
