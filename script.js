document.addEventListener("DOMContentLoaded", function() {
    let mediaRecorder;
    let audioChunks = [];

    // Código existente para animación de escritura del texto
    const textDisplay = document.getElementById('textDisplay');
    const textsToAnimate = [
        "Hola, bien, ¿y tu?",
        "Si, solo necesite ver unos datos de la empresa y quedaron listos",
        "Ya deje todos los papeles listos para ir a la reunion"
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
    document.getElementById('recordButton').addEventListener('click', function() {
        if (navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                mediaRecorder = new MediaRecorder(stream);
                mediaRecorder.start();

                mediaRecorder.addEventListener("dataavailable", event => {
                    audioChunks.push(event.data);
                });

                mediaRecorder.addEventListener("stop", () => {
                    const audioBlob = new Blob(audioChunks);
                    const audioUrl = URL.createObjectURL(audioBlob);
                    const audio = new Audio(audioUrl);
                    audio.play();
                });

                setTimeout(() => {
                    mediaRecorder.stop();
                }, 5000); // Detener grabación después de 5 segundos
            })
            .catch(error => {
                console.error("Error al acceder al micrófono: ", error);
            });
        } else {
            console.error("getUserMedia no está soportado en este navegador.");
        }
    });
});
