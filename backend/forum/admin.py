from django.contrib import admin
from .models import Topic, Question, Answer

# Register your models here.

@admin.register(Topic)
class TopicAdmin(admin.ModelAdmin):
    prepopulated_fields = {"slug": ("name",)}


admin.site.register(Question)
admin.site.register(Answer)