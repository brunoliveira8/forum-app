from django.contrib.auth.models import User

from rest_framework import serializers

from .models import Topic, Question, Answer

# Create your serializers here.

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username')


class TopicSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Topic
        fields = '__all__'


class QuestionSummarySerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Question
        fields = ('url', 'title', )


class AnswerSerializer(serializers.HyperlinkedModelSerializer):
    owner = UserSerializer(read_only=True)
    question = serializers.PrimaryKeyRelatedField(
        queryset=Question.objects.all()
    )
    question_repr = QuestionSummarySerializer(source="question",
        read_only=True
    )

    class Meta:
        model = Answer
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
    answers = AnswerSerializer(read_only=True, many=True)

    class Meta:
        model = Question
        fields = ('id','owner', 'title', 'description', 'topics', 'topics_repr', 'answers', 'created_at', 'updated_at',)
