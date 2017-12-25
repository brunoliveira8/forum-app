from rest_framework import viewsets

from .models import Topic
from .serializers import TopicSerializer


# Create your views here.

class TopicViewSet(viewsets.ReadOnlyModelViewSet):
    """
    A simple ViewSet for viewing topics.
    """
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer