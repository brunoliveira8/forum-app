"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.11/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""
from django.conf.urls import url, include
from django.contrib import admin

from rest_framework import routers
from rest_framework.documentation import include_docs_urls
from rest_framework import permissions

from forum.views import TopicViewSet, QuestionViewSet, AnswerViewSet

router = routers.DefaultRouter(trailing_slash=False)
router.register(r'topics', TopicViewSet)
router.register(r'questions', QuestionViewSet)
router.register(r'answers', AnswerViewSet)

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^api-docs/', include_docs_urls(title='Forum App API',  permission_classes=(permissions.AllowAny,))),
    url(r'^api-auth/', include('djoser.urls')),
    url(r'^api-auth/', include('djoser.urls.authtoken')),
    url(r'^api/', include(router.urls)),
]
