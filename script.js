document.addEventListener("DOMContentLoaded", function() {
    // Código de cámara
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

    // Código de audio
    var audioElements = [
        document.getElementById('audioElement1'),
        document.getElementById('audioElement2'),
        document.getElementById('audioElement3')
    ];

    var playPauseButtons = [
        document.getElementById('playPauseButton1'),
        document.getElementById('playPauseButton2'),
        document.getElementById('playPauseButton3')
    ];

    var currentTimeDisplays = [
        document.getElementById('currentTime1'),
        document.getElementById('currentTime2'),
        document.getElementById('currentTime3')
    ];

    var durationDisplays = [
        document.getElementById('duration1'),
        document.getElementById('duration2'),
        document.getElementById('duration3')
    ];

    audioElements.forEach((audio, index) => {
        audio.addEventListener('loadedmetadata', function() {
            durationDisplays[index].textContent = formatTime(audio.duration);
        });

        audio.addEventListener('timeupdate', function() {
            currentTimeDisplays[index].textContent = formatTime(audio.currentTime);
        });

        audio.addEventListener('ended', function() {
            playPauseButtons[index].textContent = 'Traducir ' + (index + 1);
        });
    });

    function togglePlayPause(index) {
        var audio = audioElements[index - 1];
        var button = playPauseButtons[index - 1];

        if (audio.paused) {
            audio.play();
            button.textContent = 'Stop';
        } else {
            audio.pause();
            audio.currentTime = 0;
            button.textContent = 'Traducir ' + index;
        }
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    window.togglePlayPause = togglePlayPause;

    // Código de transcripción y texto animado
    let mediaRecorder;
    let audioChunks = [];
    let isRecording = false;

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
        }, 100);
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

    const recordButton = document.getElementById('recordButton');
    recordButton.addEventListener('click', function() {
        if (!isRecording) {
            if (navigator.mediaDevices.getUserMedia) {
                navigator.mediaDevices.getUserMedia({ audio: true })
                .then(stream => {
                    mediaRecorder = new MediaRecorder(stream);
                    mediaRecorder.start();
                    isRecording = true;
                    recordButton.textContent = "Grabando...";

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
            mediaRecorder.stop();
            isRecording = false;
            recordButton.textContent = "Grabar Audio";
        }
    });
});
