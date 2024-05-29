document.addEventListener("DOMContentLoaded", function() {
    // Código existente para abrir la cámara
    if (navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices.getUserMedia({ video: true })
        .then(function(stream) {
            var video = document.getElementById('videoElement');
            video.srcObject = stream;
        })
        .catch(function(error) {
            console.error("Error al acceder a la cámara: ", error);
        });
    } else {
        console.error("getUserMedia no está soportado en este navegador.");
    }

    // Código para la animación de escritura del texto
    const textDisplay = document.getElementById('textDisplay');
    const textsToAnimate = [
        "Hola, bien, ¿y tú?",
        "Sí, solo necesité ver unos datos de la empresa y quedaron listos",
        "Ya dejé todos los papeles listos para ir a la reunión"
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
});
