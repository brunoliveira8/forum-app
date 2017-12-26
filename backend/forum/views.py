from rest_framework import viewsets
from rest_framework import filters

from .models import Topic, Question, Answer
from .serializers import TopicSerializer, QuestionSerializer, AnswerSerializer


# Create your views here.

class TopicViewSet(viewsets.ReadOnlyModelViewSet):
    """
    A simple ViewSet for viewing topics.
    """
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer
    filter_backends = (filters.SearchFilter, filters.OrderingFilter)
    search_fields = ('name', 'slug',)
    ordering_fields = ('name', 'slug',)
    ordering = ('slug',)


class QuestionViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for viewing questions.
    """
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    filter_backends = (filters.SearchFilter, filters.OrderingFilter)
    search_fields = ('title',)
    ordering_fields = ('created_at', 'title', 'updated_at',)
    ordering = ('created_at', 'title', 'updated_at',)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class AnswerViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for viewing answers.
    """
    queryset = Answer.objects.all()
    serializer_class = AnswerSerializer
    filter_backends = (filters.SearchFilter, filters.OrderingFilter)
    search_fields = ('text',)
    ordering_fields = ('created_at', 'updated_at',)
    ordering = ('created_at', 'updated_at',)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)