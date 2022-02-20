from fnmatch import translate
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from googletrans import Translator

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
