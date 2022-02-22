from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from googletrans import Translator
from gtts import gTTS
import random
import string
from django.conf import settings
import os

translate = Translator()


class Translate(APIView):
    def get(self, request):
        result = translate.translate(request.GET['text'], src='en', dest='vi')
        return Response({'result': result.text}, status=status.HTTP_200_OK)


class Speak(APIView):

    def get(self, request):
        tts = gTTS(request.GET['text'])
        name = ''.join(random.choice(string.ascii_uppercase + string.digits)
                       for _ in range(5)) + '.mp3'
        tts.save(os.path.join(settings.MEDIA_ROOT, name))
        return Response({'result': name})


class Delete(APIView):
    def get(self, request):
        name = request.GET['name']
        os.remove(os.path.join(settings.MEDIA_ROOT, name))
        return Response(status=status.HTTP_200_OK)
