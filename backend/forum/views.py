from rest_framework import viewsets

from .models import Topic, Question
from .serializers import TopicSerializer, QuestionSerializer


# Create your views here.

class TopicViewSet(viewsets.ReadOnlyModelViewSet):
    """
    A simple ViewSet for viewing topics.
    """
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer


class QuestionViewSet(viewsets.ModelViewSet):
    """
    A simple ViewSet for viewing questions.
    """
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)