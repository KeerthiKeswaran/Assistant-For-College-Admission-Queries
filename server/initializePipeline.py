from langchain_groq import ChatGroq
import os
from dotenv import load_dotenv
from langchain_core.prompts import PromptTemplate

def init_pipeline():
    load_dotenv()
    groq_api_key = os.getenv('GROQ_API_KEY')

    llmTranslate = ChatGroq(
        temperature=0.2,
        groq_api_key=groq_api_key,
        model_name="llama-3.1-8b-instant"
    )
    
    llmAdvisor = ChatGroq(
        temperature=0.2,
        groq_api_key=groq_api_key,
        model_name="gemma2-9b-it"
    )
    
    prompt_lang_role = PromptTemplate.from_template(
           """
            ### INSTRUCTION:
            You are a language translator, your job is to translate this {query} language to english.
            Don't return anything expect the translated language. Only return the translated sentence.
            """
           )
    chain_lang_detect = prompt_lang_role | llmTranslate
    
    prompt_advisor = PromptTemplate.from_template(
            """
            ### INSTRUCTION:
            You are an Academic Counselor providing personalized advice based on college information. 
            When responding to user queries, use the information from the provided results to offer the most 
            relevant and helpful advice. Focus on the top results that best match the user's query.
            You have been given a user query: {query} and a list of results: {results}. Use these to formulate 
            your response. Respond in the own query language without in a more natural way like a human.Make the response short and crisp.
            """
            )
    
    chain_advisor = prompt_advisor | llmAdvisor
    
    return chain_advisor, chain_lang_detect
