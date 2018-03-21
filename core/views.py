from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
from django.contrib.auth.models import User
from rest_framework import generics, permissions, renderers, viewsets, status
from rest_framework.decorators import api_view, detail_route
from rest_framework.response import Response
from rest_framework.reverse import reverse
from rest_framework.views import APIView
from core.models import Snippet, Demo
#from core.forms import CoreForm
#from core.models import Employeeofficial
#from core.models import Employeepersonal
#from core.models import Employee
from core.permissions import IsOwnerOrReadOnly
from core.serializers import SnippetSerializer, UserSerializer, DemoSerializer
from django.views.decorators.csrf import csrf_exempt

def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")


class SnippetViewSet(viewsets.ModelViewSet):
    """
    This viewset automatically provides `list`, `create`, `retrieve`,
    `update` and `destroy` actions.

    Additionally we also provide an extra `highlight` action.
    """
    queryset = Snippet.objects.all()
    serializer_class = SnippetSerializer
    permission_classes = (
        permissions.IsAuthenticatedOrReadOnly,
        IsOwnerOrReadOnly, )

    @detail_route(renderer_classes=[renderers.StaticHTMLRenderer])
    def highlight(self, request, *args, **kwargs):
        snippet = self.get_object()
        return Response(snippet.highlighted)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class UserViewSet(viewsets.ReadOnlyModelViewSet):
    """
    This viewset automatically provides `list` and `detail` actions.
    """
    queryset = User.objects.all()

@csrf_exempt
@api_view(['GET', 'POST'])
def DemoList(request):
    if request.method == 'GET':
        print ('================get============')
        demo = Demo.objects.all()
        serializer = DemoSerializer(demo,many=True)
        return Response(serializer.data)
    if request.method == 'POST':
        print ('===============post==========')
        serializer = DemoSerializer(data=request.data)
        print (serializer)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

