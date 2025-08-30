# Healthcare Translation Web App

## Overview
The **Healthcare Translation Web App** is a web-based prototype designed to facilitate real-time, multilingual translation between patients and healthcare providers. The app converts spoken input into text, provides a live transcript, and offers a translated version with audio playback. It leverages **Generative AI** for language translation and **speech recognition** for transcription.

This README provides an overview of the project's **code structure**, **frameworks used**, **APIs integrated**, and **AI tools** employed. The app is deployed on **Render** and uses the **Llama 3-70b-8192 model** for translation.

**Live Demo:** [https://health-translation-app.onrender.com/](https://health-translation-app.onrender.com/)

---

## Code Structure

### 1. **Root Directory**
- `run.py`: The entry point for the Flask app. Initializes and runs the application.
- `requirements.txt`: Lists all Python dependencies required for the app.
- `render.yaml`: Configuration file for deployment on Render.
- `README.md`: This documentation file.

### 2. **App Directory**
- `app/`: Contains the main application logic.
  - `__init__.py`: Initializes the Flask app and registers blueprints.
  - `main.py`: Defines the Flask app and its configurations.
  - `routes.py`: Contains all the routes for the web app (e.g., `/translate`, `/speak`).
  - `utils/`: Utility functions for core functionalities.
    - `speech_to_text.py`: Handles speech-to-text conversion using the Web Speech API.
    - `translation.py`: Manages text translation using the Groq Llama 3-70b-8192 model.
    - `audio_playback.py`: Converts translated text to audio using the `gTTS` library.
  - `static/`: Contains static files (CSS, JS, audio).
    - `css/`: Stylesheets for the frontend.
    - `js/`: JavaScript files for frontend interactivity.
  - `templates/`: HTML templates for the frontend.
    - `index.html`: The main frontend interface.

---

## Frameworks Used

### 1. **Backend**
- **Flask**: A lightweight Python web framework used to build the backend of the app.
- **Gunicorn**: A production-ready WSGI server used to run the Flask app in deployment.

### 2. **Frontend**
- **HTML/CSS**: For structuring and styling the web interface.
- **JavaScript**: For handling real-time interactions (e.g., speech recognition, API calls).

---

## APIs Used

### 1. **Web Speech API**
- Used for **real-time speech-to-text conversion** in the browser.
- Captures spoken input and converts it into text for translation.

### 2. **Groq API**
- Used for **text translation** using the **Llama 3-70b-8192 model**.
- Translates the transcribed text into the target language selected by the user.

### 3. **gTTS (Google Text-to-Speech)**
- Used for **audio playback** of translated text.
- Converts translated text into speech and plays it back to the user.

---

## AI Tools Used

### 1. **Llama 3-70b-8192 Model (via Groq)**
- A **Generative AI model** used for accurate and context-aware translation.
- Handles translation of medical terms and general text.

### 2. **Web Speech API**
- Provides **speech recognition capabilities** directly in the browser.
- Converts spoken input into text for further processing.

---

## Key Features

### 1. **Real-Time Transcription**
- Converts spoken input into text using the Web Speech API.
- Displays the transcribed text in real-time.

### 2. **Real-Time Translation**
- Translates the transcribed text into the target language using the Groq Llama 3-70b-8192 model.
- Displays the translated text in real-time.

### 3. **Audio Playback**
- Converts translated text into speech using the `gTTS` library.
- Allows users to listen to the translated text.

### 4. **Dual Transcript Display**
- Shows both the original transcript and the translated text side by side.

### 5. **Language Selection**
- Allows users to select the input and output languages for translation.

### 6. **Progress Indicators**
- Displays spinners during transcription, translation, and audio generation to indicate progress.

---

## Security Features

### 1. **HTTPS**
- Ensures all communication between the client and server is encrypted.

### 2. **Environment Variables**
- Stores sensitive information (e.g., API keys) securely using environment variables.

### 3. **Input Validation**
- Validates and sanitizes user inputs to prevent injection attacks.

### 4. **Error Logging**
- Logs errors during transcription, translation, and audio generation for debugging.

---

## Deployment on Render

The app is deployed on **Render**. Below are the steps to deploy the app:

### 1. **Create a `render.yaml` File**
Define the service configuration in `render.yaml`:

```yaml
services:
  - type: web
    name: health-translation-app
    runtime: python
    buildCommand: pip install -r requirements.txt
    startCommand: gunicorn run:app
    envVars:
      - key: GROQ_API_KEY
        value: your_groq_api_key
      - key: SECRET_KEY
        value: your_secret_key
```

### 2. **Push Code to GitHub**
Push your code to a GitHub repository.

### 3. **Deploy on Render**
1. Go to the [Render Dashboard](https://dashboard.render.com/).
2. Click **New > Web Service**.
3. Connect your GitHub repository.
4. Select the repository and branch to deploy.
5. Render will automatically detect your `render.yaml` file and deploy your app.

---

## How to Run Locally

1. **Clone the Repository**:
   ```bash
   git clone https://github.com/your-username/healthcare-translation-app.git
   cd healthcare-translation-app
   ```

2. **Install Dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

3. **Set Environment Variables**:
   - Create a `.env` file and add the required variables (e.g., `GROQ_API_KEY`).

4. **Run the App**:
   ```bash
   python run.py
   ```

5. **Access the App**:
   - Open your browser and navigate to `http://localhost:5000`.

---






## Contact

For questions or feedback, please contact:
- **Name**: [Kingsley Ibekwe]
- **Email**: [kingsleyibekwe.c@gmail.com]

---

