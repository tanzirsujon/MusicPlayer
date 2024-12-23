

let homeimg1 = document.getElementById('hm1');
let homeimg2 = document.getElementById('hm2');
let searchimg1 = document.getElementById('search1');
let searchimg2 = document.getElementById('search2');
let a = document.getElementById('a1');
let a2 = document.getElementById('a23');
let searchimg3 = document.getElementsByClassName('inpimg')[0];

let audiSongs = document.querySelector(".songlist");

let searchinput1 = document.getElementById('inp1');

searchimg3.style.display = 'none';




let change1 = () => {

    if (a.contains(homeimg1)) {
        homeimg1.style.display = 'none';
        homeimg2.style.display = 'inline';
        searchimg2.style.display = 'inline';
        searchimg1.style.display = 'none';
        searchinput1.style.display = 'inline';
        searchimg3.style.display = 'inline';


    }
}
let change2 = () => {

    if (a2.contains(searchimg2)) {
        homeimg1.style.display = 'block';
        homeimg2.style.display = 'none';
        searchimg2.style.display = 'none';
        searchimg1.style.display = 'block';
        searchinput1.style.display = 'none';
        searchimg3.style.display = 'none';
    }
}



a2.addEventListener('click', change1);
a.addEventListener('click', change2);





let hover = () => {
    document.getElementById('btnimg').style.filter = 'invert(1)';
    document.getElementById('btnspan').style.color = 'white';
    document.getElementById('btnimg').classList.add("transbtn1");
    document.getElementById('btnspan').classList.add('transbtn1');
    // alert('hover')
}
let unhover = () => {
    document.getElementById('btnimg').style.filter = 'invert(50%)';
    document.getElementById('btnspan').style.color = 'grey';

    // alert('hover')
}
document.getElementsByClassName('btn1')[0].addEventListener('mouseover', hover);
document.getElementsByClassName('btn1')[0].addEventListener('mouseout', unhover);


// ******* audio part start from 
let audio = new Audio();

// code of playing the music
let playmusic = (track) => {
    audio.src = track;
    audio.play();

    // songtitle.innerHTML = decodeURI(track);
    play1.src = "./resources/songimg/pause.png";



}
let getsongs = (async () => {
    let audi = await fetch("/api/songs/");

    let respone = await audi.json();

    for (const value of Object.values(respone)) {

        document.getElementsByClassName('songlist')[0].innerHTML +=`
        <div class="eachsongholder"><img src="./resources/9040477_music_note_beamed_icon.svg" alt="">
        <a href="${value}">
        ${value.split('/')[2]}
        </a>
        </div> `


    }

    Array.from(audiSongs.getElementsByTagName('a')).forEach((e) => {

        e.addEventListener("click", (h) => {
            h.preventDefault();
            playmusic(e.getAttribute('href'));

            playbar1.style.top = '90%';



        })
    })

    //code for changeing the Play and pause button

    play1.addEventListener("click", () => {

        if (audio.paused) {

            audio.play(audio);


            play1.src = "./resources/songimg/pause.png";

        }
        else {
            audio.pause();
            play1.src = "./resources/songimg/play.svg";
        }





    })
    //code for next 

    next.addEventListener('click', () => {

      


    })
    //code for  previous
    previous.addEventListener('click', () => {


    })

    //for autoplay the next song
    // try {
    //     let v = document.querySelector('.songname').innerHTML;

    //     audio.addEventListener('ended', () => {
    //         let index = songslist1.indexOf(audio.src.split("/").slice(-1)[0]);
    //         if (songslist1.length > (index + 1)) {
    //             playmusic(songslist1[index + 1]);
    //         }
    //     })

    // }
    // catch (error) {
    //     console.log(error);
    // }



    const seekBar = document.getElementById('seekBar');

    // Update the seek bar as the audio plays
    audio.addEventListener('timeupdate', function () {
        const currentTime = audio.currentTime;
        const duration = audio.duration;
        seekBar.value = (currentTime / duration) * 100;

        const currentMinutes = Math.floor(currentTime / 60);
        const currentSeconds = Math.floor(currentTime % 60);
        const durationMinutes = Math.floor(duration / 60);
        const durationSeconds = Math.floor(duration % 60);

        const currentTimeString = `${currentMinutes}:${currentSeconds < 10 ? '0' : ''}${currentSeconds} `;
        const durationTimeString = `${durationMinutes}:${durationSeconds < 10 ? '0' : ''}${durationSeconds} `;

        songduration.innerHTML = `${currentTimeString} : ${durationTimeString} `;
    });

    // Seek the audio when user interacts with the seek bar
    seekBar.addEventListener('input', function () {
        const seekTime = (audio.duration * (seekBar.value / 100));
        audio.currentTime = seekTime;
    });





})()






document.querySelector('.hamandcross').addEventListener('click', function () {


    document.querySelector('.left').classList.toggle('left1');
    if (document.querySelector('.left').classList.contains('left1')) {
        document.querySelector('#ham1').style.display = 'none';
        document.querySelector('#cross1').style.display = 'inline';

    }



    else {
        document.querySelector('#ham1').style.display = 'inline';
        document.querySelector('#cross1').style.display = 'none';
    }



})

let funinp = (e) => {
    document.querySelector('#leftid').classList.remove('left1');
    document.querySelector('#ham1').style.display = 'inline';
    document.querySelector('#cross1').style.display = 'none';



}

searchimg1.addEventListener('click', funinp);

// document.querySelector('#cross1').addEventListener('click', () => {
//     searchinput1.style.display = 'none';
//     searchimg3.style.display = 'none';
//     // document.querySelector('#ham1').style.display = 'inline';
//     // document.querySelector('#cross1').style.display = 'none';


// })

let hovfun = () => {
    document.querySelector('.disno').style.top = '60px';
    // console.log('clicked');
}
let rhovfun = () => {
    document.querySelector('.disno').style.top = '-80px';


}

document.querySelector('.pro1').addEventListener('click', hovfun);
// document.querySelector('.pro1').removeEventListener('dblclick', hovfun);
arrowbtn.addEventListener('click', rhovfun);


