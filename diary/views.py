from django.shortcuts import render
from django.views import generic 
from django.http import HttpResponse

def index(request):
    return render(request, "diary/index.html")

class Home(generic.View):

    def get(self, request, *args, **kwargs):
        return HttpResponse('Hello, World!')


