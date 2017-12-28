from rest_framework import serializers

from accounts.serializers import UserSerializer

from .models import Topic, Question, Answer

# Create your serializers here.

class TopicSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Topic
        fields = ('id', 'url', 'name', 'slug')


class QuestionSummarySerializer(serializers.HyperlinkedModelSerializer):
    owner = UserSerializer(read_only=True)
    topics_repr = TopicSerializer(source="topics",
        many=True,
        read_only=True
    )

    class Meta:
        model = Question
        fields = ('id', 'url', 'owner', 'title', 'description', 'topics_repr', 'created_at', 'updated_at',)


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
        fields = ('id', 'url', 'owner', 'title', 'description', 'topics', 'topics_repr', 'answers', 'created_at', 'updated_at',)
