from django.conf.urls import patterns, include, url

from django.contrib import admin
admin.autodiscover()

from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.conf import settings

urlpatterns = patterns('',
    url(r'^', include('soundauth.core.urls')),

    # Admin
    url(r'^admin/', include(admin.site.urls)),

    # OpenId provider
    url(r'^openid/', include('openid_provider.urls')),
)

urlpatterns += staticfiles_urlpatterns()

urlpatterns += patterns('',
    url(r'^static/(?P<path>.*)$', 'django.views.static.serve', {'document_root': settings.STATIC_ROOT}),
)
