document.addEventListener("DOMContentLoaded", function() {
    let mediaRecorder;
    let audioChunks = [];
    let isRecording = false; // Nuevo estado para seguimiento de la grabación

    // Código existente para animación de escritura del texto
    const textDisplay = document.getElementById('textDisplay');
    const textsToAnimate = [
        "Hola Fran, ¿Cómo estás?",
        "Bien también. Una consulta, los archivos que estábamos viendo ayer ¿Pudiste terminarlos?",
        "Qué bueno, ¿estás lista para la próxima reunión?"
    ];
    let currentIndex = 0;
    let typingInterval;

    function typeText(textToAnimate) {
        currentIndex = 0;
        textDisplay.textContent = '';

        typingInterval = setInterval(function() {
            if (currentIndex < textToAnimate.length) {
                textDisplay.textContent += textToAnimate.charAt(currentIndex);
                currentIndex++;
            } else {
                clearInterval(typingInterval);
            }
        }, 100); // Ajusta la velocidad de escritura aquí
    }

    document.getElementById('startButton1').addEventListener('click', function() {
        typeText(textsToAnimate[0]);
    });

    document.getElementById('startButton2').addEventListener('click', function() {
        typeText(textsToAnimate[1]);
    });

    document.getElementById('startButton3').addEventListener('click', function() {
        typeText(textsToAnimate[2]);
    });

    // Funcionalidad de grabación de audio
    const recordButton = document.getElementById('recordButton');
    recordButton.addEventListener('click', function() {
        if (!isRecording) {
            // Iniciar grabación
            if (navigator.mediaDevices.getUserMedia) {
                navigator.mediaDevices.getUserMedia({ audio: true })
                .then(stream => {
                    mediaRecorder = new MediaRecorder(stream);
                    mediaRecorder.start();
                    isRecording = true;
                    recordButton.textContent = "Grabando..."; // Cambiar texto del botón

                    mediaRecorder.addEventListener("dataavailable", event => {
                        audioChunks.push(event.data);
                    });

                    mediaRecorder.addEventListener("stop", () => {
                        const audioBlob = new Blob(audioChunks);
                        const audioUrl = URL.createObjectURL(audioBlob);
                        const audio = new Audio(audioUrl);
                        audio.play();
                    });
                })
                .catch(error => {
                    console.error("Error al acceder al micrófono: ", error);
                });
            } else {
                console.error("getUserMedia no está soportado en este navegador.");
            }
        } else {
            // Detener grabación
            mediaRecorder.stop();
            isRecording = false;
            recordButton.textContent = "Grabar Audio"; // Restaurar texto del botón
        }
    });
});
