from rest_framework import serializers

from .models import Topic

# Create your serializers here.

class TopicSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Topic
        fields = '__all__'