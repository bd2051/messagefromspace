# Generated by Django 2.1 on 2018-08-24 13:06

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Mess',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('pub_date', models.DateField()),
                ('mess_text', models.TextField()),
                ('reads_boolean', models.BooleanField()),
            ],
        ),
    ]