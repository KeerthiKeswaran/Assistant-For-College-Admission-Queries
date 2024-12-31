import speech_recognition as sr
import time
from langchain_groq import ChatGroq
import os
from dotenv import load_dotenv

load_dotenv()
groq_api_key = os.getenv('GROQ_API_KEY')

llm = ChatGroq(
    temperature=0, 
    groq_api_key=groq_api_key, 
    model_name="Llama-3.1-70b-Versatile"
)

def recognize_speech_from_mic(recognizer, mic):
    """Transcribe speech from microphone."""
    with mic as source:
        audio = recognizer.listen(source, phrase_time_limit=4)
        try:
            text = recognizer.recognize_google(audio)
            print(text, end=' ', flush=True)
            return text  
        except sr.UnknownValueError:
            print(".", end=' ', flush=True)
            return None
        except sr.RequestError:
            print("Sorry, there was an error with the speech recognition service.")
            return None

def main():
    recognizer = sr.Recognizer()
    mic = sr.Microphone()
    print("Starting real-time transcription. Press Ctrl+C to stop.")
    accumulated_text = ""
    start_time = time.time()
    
    while True:
        recognized_text = recognize_speech_from_mic(recognizer, mic)
        if recognized_text:
            accumulated_text += recognized_text + " "  
            start_time = time.time()  
        if time.time() - start_time > 1:
            break
    if accumulated_text:
        response = llm.invoke(accumulated_text)
        print("Response from ChatGroq:", response.content)
    else:
        print("No speech was recognized.")

if __name__ == "__main__":
    main()