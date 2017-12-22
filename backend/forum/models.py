from django.db import models

# Create your models here.

class Topic(models.Model):
    name = models.CharField(max_length=100, blank=False, unique=True)
    slug = models.SlugField()

    def __str__(self):
        return self.slug