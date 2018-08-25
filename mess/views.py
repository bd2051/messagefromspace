from django.http import HttpResponse
from django.shortcuts import render
from mess.models import Mess
from django.core import serializers
from django.db.models import Q

def index(request):
    return render(request, 'index.html')

def mark_reads(request):
    mess_id = request.GET.get('id', '')
    reads_mess_item = Mess.objects.get(pk=mess_id)
    reads_mess_item.reads_boolean = 'True'
    reads_mess_item.save()
    return HttpResponse()

def get_messages(request):
    last_id = int(request.GET.get('last_id', '')) + 1
    get_mess = Mess.objects.filter(Q(pk__gte=last_id) & Q(reads_boolean='False'))
    response = serializers.serialize("json", get_mess)
    return HttpResponse(response, content_type='application/json')
