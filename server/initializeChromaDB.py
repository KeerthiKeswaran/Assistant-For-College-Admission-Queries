import asyncpg
import pandas as pd
import uuid
import chromadb
import os
from dotenv import load_dotenv

load_dotenv()
DATABASE_URL = os.getenv('DATABASE_URL')
client = chromadb.PersistentClient("CollegeData")

async def get_db_connection():
    connection = await asyncpg.connect(DATABASE_URL)
    return connection

async def fetch_college_data_from_db():
    try:
        connection = await get_db_connection()
        query = """
            SELECT * FROM colleges
            """
        records = await connection.fetch(query)
        columns = [
            'id', 'name', 'website', 'location', 'type', 'established_year', 'accreditation', 'courses_offered',
            'admission_type', 'entrance_exam',	'entrance_exam_percentile',	'class_12_percentile'
        ]
        df = pd.DataFrame(records, columns=columns)
        await connection.close()
        return df
    except Exception as e:
        print(f"Error fetching data: {e}")
        return pd.DataFrame()

async def initialize_chromadb(collection_name: str = "colleges"):
    df = await fetch_college_data_from_db()
    print("Data Fetched!")
    if df.empty:
        print("No data to load into ChromaDB.")
        return None
    collection = client.get_or_create_collection(name=collection_name)

    if not collection.count():
        for _, row in df.iterrows():
            try:
                document_text = (
                    f"College Name: {row['name']}\n"
                    f"Location: {row['location']}\n"
                    f"Accreditation: {row['accreditation']}\n"
                    f"Courses Offered: {row['courses_offered']}\n"
                    f"Established Year: {row['established_year']}\n"
                    f"Type: {row['type']}\n"
                    f"Website: {row['website']}\n"
                    f"Admission-Type: {row['admission_type']}\n"
                    f"entrance_exam: {row['entrance_exam']}\n"
                    f"entrance_exam_percentile: {row['entrance_exam_percentile']}\n"
                    f"Class_12_Percentage: {row['class_12_percentile']}\n"
                )

                collection.add(
                    documents=[document_text],
                    metadatas={"Link": row["website"]},
                    ids=[str(uuid.uuid4())]
                )
            except Exception as e:
                print(f"An error occurred while adding a document to ChromaDB: {e}")
    else:
        print("Data already exists in the collection.")
    return collection 
