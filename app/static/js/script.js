// Speech recognition setup
let recognition;
let isRecording = false;

// Initialize speech recognition
function initSpeechRecognition() {
    if ('webkitSpeechRecognition' in window) {
        recognition = new webkitSpeechRecognition();
        recognition.continuous = true; // Continuously listen
        recognition.interimResults = true; // Show interim results

        // Set the initial input language from the dropdown
        const inputLanguage = document.getElementById('input-language').value;
        recognition.lang = inputLanguage;

        recognition.onstart = function () {
            console.log('Speech recognition started.');
            document.getElementById('speech-progress').style.display = 'flex';
            document.getElementById('start-speaking').style.display = 'none';
            document.getElementById('stop-speaking').style.display = 'inline-block';
            isRecording = true;
        };

        recognition.onresult = async function (event) {
            let interimTranscript = '';
            let finalTranscript = '';

            // Process all results
            for (let i = event.resultIndex; i < event.results.length; i++) {
                const transcript = event.results[i][0].transcript;
                if (event.results[i].isFinal) {
                    finalTranscript += transcript + ' ';
                } else {
                    interimTranscript += transcript;
                }
            }

            // Update the original transcript display
            document.getElementById('original').innerText = finalTranscript || interimTranscript;

            // Translate the transcript in real-time
            if (finalTranscript.trim() !== '') {
                console.log('Final transcript:', finalTranscript);
                await translate(finalTranscript);
            }
        };

        recognition.onerror = function (event) {
            console.error('Speech recognition error:', event.error);
            stopRecording();
        };

        recognition.onend = function () {
            console.log('Speech recognition ended.');
            if (isRecording) {
                recognition.start(); // Restart recording if still active
            } else {
                document.getElementById('speech-progress').style.display = 'none';
                document.getElementById('start-speaking').style.display = 'inline-block';
                document.getElementById('stop-speaking').style.display = 'none';
            }
        };
    } else {
        console.error('Your browser does not support Speech Recognition. Please try Chrome or Edge.');
        alert('Your browser does not support Speech Recognition. Please try Chrome or Edge.');
    }
}

// Translation function
async function translate(text) {
    const outputLanguage = document.getElementById('output-language').value;
    const translationProgress = document.getElementById('translation-progress');

    if (!text || text.trim() === '') {
        console.error('No text provided for translation.');
        return;
    }

    // Show progress spinner
    if (translationProgress) {
        translationProgress.style.display = 'flex';
    }

    try {
        console.log('Sending translation request:', { text, target_language: outputLanguage });

        const response = await fetch('/translate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text, target_language: outputLanguage })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Received translation response:', data);

        if (data.error) {
            console.error('Translation error:', data.error);
        } else {
            // Update the translated text display
            document.getElementById('translated').innerText = data.translated_text;
            console.log('Translated text:', data.translated_text);
        }
    } catch (error) {
        console.error('Translation error:', error);
    } finally {
        // Hide progress spinner
        if (translationProgress) {
            translationProgress.style.display = 'none';
        }
    }
}

// Start recording
function startRecording() {
    console.log('Start recording button clicked.');
    if (recognition) {
        recognition.start();
    } else {
        initSpeechRecognition();
        recognition.start();
    }
}

// Stop recording
function stopRecording() {
    console.log('Stop recording button clicked.');
    if (recognition) {
        isRecording = false;
        recognition.stop();
    }
}

// Text-to-speech function
async function speak() {
    const text = document.getElementById('translated').innerText;
    const outputLanguage = document.getElementById('output-language').value;
    const audioProgress = document.getElementById('audio-progress');

    if (!text || text.trim() === '') {
        console.error('No translated text to speak.');
        alert('There is no translated text to speak.');
        return;
    }

    // Show progress spinner
    if (audioProgress) {
        audioProgress.style.display = 'flex';
    }

    try {
        console.log('Sending text-to-speech request:', { text, language: outputLanguage });

        const response = await fetch('/speak', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text, language: outputLanguage })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Received text-to-speech response:', data);

        const audioPlayer = document.getElementById('audioPlayer');

        // Add a timestamp to prevent caching
        const timestamp = new Date().getTime();
        audioPlayer.src = `${data.audio_file}?t=${timestamp}`;

        // Play the audio
        audioPlayer.play();
        console.log('Playing audio:', audioPlayer.src);
    } catch (error) {
        console.error('Text-to-speech error:', error);
        alert('An error occurred while generating speech. Please try again.');
    } finally {
        // Hide progress spinner
        if (audioProgress) {
            audioProgress.style.display = 'none';
        }
    }
}

// Add event listeners when the document loads
document.addEventListener('DOMContentLoaded', function () {
    console.log('Document loaded.');
    // Initialize speech recognition
    initSpeechRecognition();

    // Add event listeners for buttons
    document.getElementById('start-speaking').addEventListener('click', startRecording);
    document.getElementById('stop-speaking').addEventListener('click', stopRecording);

    // Add event listener for speak button
    document.getElementById('speakBtn').addEventListener('click', speak);

    // Update recognition language when input language changes
    document.getElementById('input-language').addEventListener('change', function () {
        console.log('Input language changed to:', this.value);
        if (recognition) {
            recognition.lang = this.value;
        }
    });
});