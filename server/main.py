from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from initializeChromaDB import initialize_chromadb
from initializePipeline import init_pipeline
from langdetect import detect

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["*"],
)

async def init_chromadb_and_models():
    collection = await initialize_chromadb() 
    print("Initialized ChromaDB !!")
    responseModel, translationModel = init_pipeline()
    print("Initialized Models!!")
    return collection, responseModel, translationModel

@app.on_event("startup")
async def startup():
    global collection, responseModel, translationModel
    collection, responseModel, translationModel = await init_chromadb_and_models()

def translate_text(queryToTranslate):
    translated_text = ""
    def is_english(text):
        try:
            lang = detect(text)
            return lang == 'en'
        except Exception as e:
            print(f"Error detecting language: {e}")
            return False
    if is_english(queryToTranslate)==False:
        trans = translationModel.invoke({"query": str(queryToTranslate)})
        translated_text = trans.content
    if(translated_text!=""): return translated_text
    return queryToTranslate

class Search(BaseModel):
    query : str
    
@app.post("/GetResult")
async def semantic_search(req : Search):
    query = req.query
    query_translated = translate_text(query)
    resultedData = collection.query(query_texts=query_translated, n_results=10).get('documents','metadatas')
    response = responseModel.invoke({"query": str(query), "results": resultedData})
    return {"results" : response.content}
    
@app.get("/status")
async def status():
    return {"status" : "active"}
    
    

