from django.db import models
from django.core.serializers.json import DjangoJSONEncoder


class Mess(models.Model):
    pub_date = models.DateField()
    mess_text = models.TextField()
    reads_boolean = models.BooleanField()

