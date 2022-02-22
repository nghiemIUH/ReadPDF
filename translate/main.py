from fnmatch import translate
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from googletrans import Translator
from gtts import gTTS
import random
import string

app = FastAPI()
origins = ['*']

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

translate = Translator()


@app.get("/")
async def root(text):
    result = translate.translate(text, src='en', dest='vi')
    return {'result': result.text}


@app.get("/speak/")
async def speak(text):
    tts = gTTS(text)
    name = ''.join(random.choice(string.ascii_uppercase + string.digits)
                   for _ in range(5))
    tts.save(f'{name}.mp3')
    return FileResponse(path=name+'.mp3', media_type='text/mp3', filename='test.mp3')
