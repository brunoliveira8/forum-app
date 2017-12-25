from django.contrib.auth.models import User

from rest_framework import serializers

from .models import Topic, Question

# Create your serializers here.

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username')


class TopicSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Topic
        fields = '__all__'


class QuestionSerializer(serializers.HyperlinkedModelSerializer):
    owner = UserSerializer(read_only=True)
    topics_repr = TopicSerializer(source="topics",
        many=True,
        read_only=True
    )
    topics = serializers.PrimaryKeyRelatedField(
        many=True,
        queryset=Topic.objects.all()
    )

    class Meta:
        model = Question
        fields = '__all__'