# Generated by Django 3.0.2 on 2020-10-22 16:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_auto_20201022_1949'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='is_superuser',
            field=models.BooleanField(default=False, help_text='Super user', verbose_name='Superuser'),
        ),
    ]
