from django.conf.urls import url

from . import views

app_name = 'mess'

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url('api/mark_read', views.mark_reads, name='mark_reads'),
    url('api/get_messages', views.get_messages, name='get_messages'),
]