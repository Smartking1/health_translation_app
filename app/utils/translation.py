from groq import Groq
from config import GROQ_API_KEY

# Initialize Groq client
client = Groq(api_key=GROQ_API_KEY)

def translate_text(text, target_language):
    try:
        # Create a prompt for translation
        prompt = (
            f"Translate the following text to {target_language}. "
            f"Provide only the translated text without any additional information or introduction. "
            f"Ensure the translation is accurate, especially for medical terms. "
            f"Text to translate: {text}"
        )

        # Call the Groq API
        response = client.chat.completions.create(
            messages=[{"role": "user", "content": prompt}],
            model="llama3-70b-8192"
        )

        # Extract and return the translated text
        translated_text = response.choices[0].message.content.strip()
        return translated_text
    except Exception as e:
        print(f"Error during translation: {e}")
        return None