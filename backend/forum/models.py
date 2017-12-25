from django.db import models
from django.utils.text import slugify
from django.contrib.auth.models import User

# Create your models here.

class Topic(models.Model):
    name = models.CharField(max_length=100, blank=False, unique=True)
    slug = models.SlugField()

    def __str__(self):
        return self.slug


class Question(models.Model):
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name="questions"
    )
    title = models.CharField(max_length=100, blank=False)
    description = models.TextField(blank=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return slugify(self.title)