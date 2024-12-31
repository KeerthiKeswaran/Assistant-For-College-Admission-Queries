# Career-Advisor: Assistant for College Admission Queries

## Overview  
**Career-Advisor** is an intelligent, interactive system designed to assist students with their college admission-related queries. By leveraging advanced Natural Language Processing (NLP), semantic search, and machine learning, it provides precise and insightful responses to user inquiries about colleges, courses, admissions, and more.

This project aims to bridge the gap between students and relevant information, reducing time spent searching and ensuring reliable answers.

---

## Features  
- **Interactive Client Application**: Accepts text and voice queries from users. (Voice to be implemented)  
- **Query Gateway**: Routes queries through appropriate handlers based on type (text or voice).  
- **Preprocessing and Filtering**: Detects hate speech, identifies language, and ensures query relevance.  
- **Language Translation**: Converts non-English queries into English for further processing.  
- **Semantic Search**: Utilizes ChromaDB for accurate information retrieval from the database.  
- **AI Model Processing**: Implements transfer learning for precise and dynamic response generation.  
- **Database Operations**: Efficient storage and retrieval of information for ongoing model improvement.

---

## System Architecture  
The system follows a modular pipeline approach for query handling and response generation.

1. **Client Application**  
   - Users input queries via a web or mobile interface.  
   - Supports both text and voice inputs.

2. **Query Gateway**  
   - Directs queries to appropriate handlers based on input type.

3. **Preprocessing Module**  
   - Detects hate speech and inappropriate content.  
   - Identifies the language of the query.

4. **Language Processing**  
   - Translates non-English queries into English using machine translation APIs.  
   - Passes English queries directly to the semantic search engine.

5. **Semantic Search**  
   - Leverages **ChromaDB** for querying structured data.  
   - Finds the most relevant responses using vector similarity.

6. **AI Model Processing**  
   - Employs a fine-tuned transformer model to generate responses.  
   - Ensures context-aware, accurate answers.

7. **Database Operations**  
   - Stores query logs for analytics.  
   - Updates models periodically for enhanced accuracy.

---

## Installation  
### Prerequisites  
- Node.js (>=16.x)  
- Python (>=3.9)

### Steps  
1. Clone the repository:  
   ```bash
   git clone https://github.com/KeerthiKeswaran/Career-Advisor-Assistant-For-College-Admission-Queries.git
   cd Career-Advisor
   ```

2. Install dependencies:  
   ```bash
   # Backend dependencies
   cd server
   pip install -r requirements.txt

   # Frontend dependencies
   cd ../client
   npm install
   ```

3. Set up environment variables:  
   - Create a `.env` file in both `server` and `client` directories.  
   - Add relevant variables (e.g., API keys, database URLs).

4. Start the server and client:  
   ```bash
   # Start backend
   cd server
   uvicorn main:app --reload

   # Start frontend
   cd ../client
   npm run dev
   ```

5. Open the application in your browser at `http://localhost:5173`.

---

## Usage  
1. Launch the application and input your query in text or voice.  
2. The system processes the query and displays a detailed response.  
3. For voice queries, ensure the microphone permissions are enabled.

---

## Technologies Used  
### Frontend  
- React.js (with TypeScript)  
- Tailwind CSS  
- Framer Motion (for animations)  

### Backend  
- Node.js  
- Express.js  
- MongoDB  

### NLP & AI  
- Python (for preprocessing)  
- ChromaDB (semantic search)  
- Transfer learning with Transformer-based models  

---

## Screenshots  
### Home Page  
*Insert a screenshot of the homepage here.*

### Query Interface  
*Insert a screenshot of the query interface here.*

---

## Challenges Faced  
- Optimizing semantic search for large datasets.  
- Handling multi-lingual queries with consistent accuracy.  
- Ensuring a seamless user experience across platforms.

---

## Future Enhancements  
- Integration with more languages for better global accessibility.  
- A mobile application for on-the-go query resolution.  
- Addition of real-time admission updates.  
- AI-driven insights and analytics for users.

---

## Contributing  
We welcome contributions!  
1. Fork the repository.  
2. Create a new branch for your feature:  
   ```bash
   git checkout -b feature-name
   ```  
3. Commit your changes and push them to your branch.  
4. Create a pull request.

---

## License  
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

---

## Authors  
- **[Your Name](https://github.com/KeerthiKeswaran)** - Project Lead & Developer  
