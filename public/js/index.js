// Object to store DOM elements
const elements = {
    homeIconDefault: document.getElementById('hm1'),
    homeIconActive: document.getElementById('hm2'),
    searchIconDefault: document.getElementById('search1'),
    searchIconActive: document.getElementById('search2'),
    searchInputIcon: document.querySelector('.inpimg'),
    navigationToggle1: document.getElementById('a1'),
    navigationToggle2: document.getElementById('a23'),
    searchInputField: document.getElementById('inp1'),
    songListContainer: document.querySelector('.songlist'),
    playButton: document.getElementById('play1'),
    progressBar: document.getElementById('seekBar'),
    songDurationDisplay: document.getElementById('songduration'),
    nextButton: document.getElementById('next'),
    previousButton: document.getElementById('previous'),
    playbackBar: document.getElementById('playbar1'),
    menuToggle: document.querySelector('.hamandcross'),
    sidePanel: document.querySelector('.left'),
    hamburgerIcon: document.getElementById('ham1'),
    closeIcon: document.getElementById('cross1'),
    profileMenuButton: document.querySelector('.pro1'),
    dropdownArrowButton: document.getElementById('arrowbtn'),
    dropdownMenu: document.querySelector('.disno'),
    volumeControl: document.getElementById('audioSound'),
};
elements.searchInputIcon.style.display = 'none';

// Object to manage audio player functionality
const audioPlayer = {
    audioInstance: new Audio(),
    currentTrackIndex: 0,
    trackList: [],

    // Play a specific track
    playTrack(trackUrl) {
        this.audioInstance.src = trackUrl;
        this.audioInstance.play();
        elements.playButton.src = "./resources/songimg/pause.png";
    },

    // Toggle between play and pause
    togglePlayPause() {
        if (this.audioInstance.paused) {
            this.audioInstance.play();
            elements.playButton.src = "./resources/songimg/pause.png";
        } else {
            this.audioInstance.pause();
            elements.playButton.src = "./resources/songimg/play.svg";
        }
    },

    // Play the next track
    playNextTrack() {
        if (this.currentTrackIndex < this.trackList.length - 1) {
            this.currentTrackIndex++;
            this.playTrack(this.trackList[this.currentTrackIndex]);
        }
    },

    // Play the previous track
    playPreviousTrack() {
        if (this.currentTrackIndex > 0) {
            this.currentTrackIndex--;
            this.playTrack(this.trackList[this.currentTrackIndex]);
        }
    },
};

// Function to add event listeners
const setupEventListeners = () => {
    // Navigation toggles
    elements.navigationToggle1.addEventListener('click', () => {
        elements.homeIconDefault.style.display = 'block';
        elements.homeIconActive.style.display = 'none';
        elements.searchIconActive.style.display = 'none';
        elements.searchIconDefault.style.display = 'block';
        elements.searchInputField.style.display = 'none';
        elements.searchInputIcon.style.display = 'none';
    });

    elements.navigationToggle2.addEventListener('click', () => {
        elements.homeIconDefault.style.display = 'none';
        elements.homeIconActive.style.display = 'inline';
        elements.searchIconActive.style.display = 'inline';
        elements.searchIconDefault.style.display = 'none';
        elements.searchInputField.style.display = 'inline';
        elements.searchInputIcon.style.display = 'inline';
    });

    // Play/pause button
    elements.playButton.addEventListener('click', () => audioPlayer.togglePlayPause());

    // Next and previous buttons
    elements.nextButton.addEventListener('click', () => audioPlayer.playNextTrack());
    elements.previousButton.addEventListener('click', () => audioPlayer.playPreviousTrack());

    // Progress bar interaction
    elements.progressBar.addEventListener('input', () => {
        const seekTime = audioPlayer.audioInstance.duration * (elements.progressBar.value / 100);
        audioPlayer.audioInstance.currentTime = seekTime;
    });

    // Volume control interaction
    elements.volumeControl.addEventListener('input', () => {
        const volume = elements.volumeControl.value / 100;
        audioPlayer.audioInstance.volume = volume;
    });

    // Side panel toggle
    elements.menuToggle.addEventListener('click', () => {
        elements.sidePanel.classList.toggle('left1');
        if (elements.sidePanel.classList.contains('left1')) {
            elements.hamburgerIcon.style.display = 'none';
            elements.closeIcon.style.display = 'inline';
        } else {
            elements.hamburgerIcon.style.display = 'inline';
            elements.closeIcon.style.display = 'none';
        }
    });

    // Profile dropdown menu
    elements.profileMenuButton.addEventListener('click', () => {
        elements.dropdownMenu.style.top = '60px';
    });

    elements.dropdownArrowButton.addEventListener('click', () => {
        elements.dropdownMenu.style.top = '-155px';
    });
};

// Function to fetch and display songs
const loadSongs = async () => {
    try {
        const response = await fetch("/api/songs/");
        const tracks = await response.json();
        audioPlayer.trackList = Object.values(tracks);

        // Populate the song list
        elements.songListContainer.innerHTML = audioPlayer.trackList
            .map(
                (track) => `
            <div class="song-item">
                <img src="./resources/9040477_music_note_beamed_icon.svg" alt="Music Note">
                <a href="${track}">${track.split('/').pop()}</a>
            </div>`
            )
            .join("");

        // Add click event to each song link
        const songLinks = Array.from(elements.songListContainer.getElementsByTagName('a'));
        songLinks.forEach((link, index) => {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                audioPlayer.currentTrackIndex = index;
                audioPlayer.playTrack(link.getAttribute('href'));
                elements.playbackBar.style.top = '90%';
            });
        });

        // Automatically play the next song when the current one ends
        audioPlayer.audioInstance.addEventListener('ended', () => audioPlayer.playNextTrack());

        // Update progress bar and song duration display
        audioPlayer.audioInstance.addEventListener('timeupdate', () => {
            const { currentTime, duration } = audioPlayer.audioInstance;
            elements.progressBar.value = (currentTime / duration) * 100;

            const formatTime = (time) => {
                const minutes = Math.floor(time / 60);
                const seconds = Math.floor(time % 60).toString().padStart(2, '0');
                return `${minutes}:${seconds}`;
            };

            elements.songDurationDisplay.innerText = `${formatTime(currentTime)} / ${formatTime(duration)}`;
        });
    } catch (error) {
        console.error("Error loading songs:", error);
    }
};

// Initialize the app
const initializeApp = () => {
    setupEventListeners();
    loadSongs();
};

initializeApp();
