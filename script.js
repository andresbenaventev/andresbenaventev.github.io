document.addEventListener("DOMContentLoaded", function() {
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

        // Agregar evento ended para reiniciar el botón cuando termine el audio
        audio.addEventListener('ended', function() {
            playPauseButtons[index].textContent = 'Reproducir ' + (index + 1);
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
            audio.currentTime = 0;  // Reiniciar el audio al pausar
            button.textContent = 'Reproducir ' + index;
        }
    }

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    window.togglePlayPause = togglePlayPause;
});
