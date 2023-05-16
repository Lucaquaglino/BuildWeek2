const artistUrl = 'https://striveschool-api.herokuapp.com/api/deezer/search?q=';
var progProcess;

var dataPlaylist;
var audio;

window.onload = () => {

    let artist = new URLSearchParams(location.search).get('artist');

   // startProgress();
    fetch(`${artistUrl}${artist}`)
    .then(response => response.json())
    .then(({data}) => {
        data.sort((e1,e2) => e1.rank > e2.rank ? -1 : 1);
        data.forEach((element, index) =>{ 
            console.table(element);
            let domEl = domElement(element, index +1);
            document.querySelector('#playlist-1').appendChild(domEl);
           
    });
    dataPlaylist = data;
      //  ultimateProgress();
    })
    .catch(error => {
        showMessage('Errore recupero dati artista.');
        console.error(error);
    });


    document.getElementById('play').onclick = () => {
        
        playAll();
       
    };

    audio = document.getElementById('music-player');
};

function showMessage(message){

}

function startProgress(){
    progProcess = setInterval(incrementProgress, 50);
    
}

function ultimateProgress(){
    clearInterval(this.progProcess);
    progProcess = setInterval(incrementProgress, 5);
}

function incrementProgress(){
    let progress = document.getElementsByClassName('progress-bar')[0];
    let prog = 0;//Number(progress.getAttribute('aria-valuenow'));
    
    if(prog < 100){
        prog++;
        progress.setAttribute('aria-valuenow', String(prog));
        progress.style = `width:${prog}%`;
    }else{
        setTimeout(()=>document.getElementsByClassName('progress')[0].style = 'display:none', 800);
        clearInterval(this.progProcess);
    }
}


function domElement(artistData, index){
    let col = document.createElement('div');
    col.classList = 'col-12 my-2';

    let card = document.createElement('div');
    card.classList = 'd-flex flex-row align-items-center';
    col.appendChild(card);

    let num = document.createElement('h4');
    num.innerText = index;
    num.classList = 'w-15 mx-4';
    card.appendChild(num);

    let img = document.createElement('img');
    img.classList = 'img-fluid';
    card.appendChild(img);
    img.src = artistData.album.cover;

    let title = document.createElement('h4');
    title.classList = 'title mx-4';
    title.innerText = artistData.title_short;
    card.appendChild(title);

    let rank = document.createElement('h6');
    rank.classList = 'mx-3';
    rank.innerText = artistData.rank;
    card.appendChild(rank);

    col.onclick = () => {
        audio.src = artistData.preview;
        audio.load();
        audio.play();
    };

 /*   
   let button = document.createElement('button');
   button.innerText = 'PLAY';

   card.appendChild(button);

  let playing = false;
  let p;

   button.onclick = () => {
    if(selected && selected != button){
        selected.innerText = 'Play';
    }
    selected = button;
    button.innerText = !playing ? 'Pause' : 'Play';
    if(p){
        foo = p;
        if(playing){
         foo.pause();
        
            
        }else{
        foo.restart();
        }
        playing = !playing;
        return;
}
    stopPlaylist();
    if(foo){
    
        foo.stop();
        }
     foo = new Sound([artistData.preview], 100, true);
    foo.start();
    p = foo;
    playing = !playing;
    
   };

 */

    return col;
}

var selected;
var foo;

function SoundButton(sound, button){
    this.sound = sound;
    this.button = button;
    this.p = false;

    this.start = function(){
        p = true;
        sound.start();
        button.innerText = 'Pause'
    }

    this.play = function(){
        sound.restart;
        p = true;
        button.innerText = 'Pause'
    }

    this.pause = function(){
        p= false;
        sound.pause();
        button.innerText = 'Play'
    }

}

function Sound(source, volume, loop)
{
    this.source = source;
    this.volume = volume;
    this.loop = loop;
    var son;
    this.son = son;
    this.finish = false;
    var src;
    this.src = src;
    var index = 0;

   

    this.restart = function(){
        this.son.play();
    }

    this.pause = function(){
        this.son.pause();
    }

    this.stop = function()
    {
       // document.body.removeChild(this.son);
       this.son.pause();
       this.son.currentTime = 0;
    }
    this.start = function()
    {
        if (this.finish) return false;
      //  this.son = document.createElement("audio");
      this.son = document.getElementById('music-player');
       // this.son.setAttribute("src", this.source);
       // this.son.setAttribute("hidden", "true");
        this.son.setAttribute("volume", this.volume);
        this.son.setAttribute("autoplay", "true");
     //   this.son.setAttribute("loop", this.loop);

      
            let source = document.createElement('source');
            this.src = source;
            source.setAttribute('src', this.source[index]);
            source.setAttribute('type', 'audio/mpeg');
            this.son.appendChild(source);

            this.son.addEventListener('ended', () =>{
                this.next();
            });
                
            
        
        document.body.appendChild(this.son);
    }

    this.next = function(){
        if(index == source.length){
            return;
        }
        index++;
        this.src.setAttribute('src', this.source[index]);
        this.son.pause();
        this.son.load();
        this.son.play();
    }

    this.remove = function()
    {
        document.body.removeChild(this.son);
        this.finish = true;
    }
    this.play = function(volume, loop)
    {
        this.finish = false;
        this.volume = volume;
        this.loop = loop;
    }
}

var tracks = [];
var playIndex = 0;

var playing = false;
var play;

function stopPlaylist(){
    document.getElementById('play').innerText = 'Play';
    if(play){
        play.stop();
    }
}

function playAll(){
    if(foo){
        foo.stop();
        }
   document.getElementById('play').innerText = !playing ? 'Pausa': 'Play';
    if(play){
        playing ? play.pause() : play.restart();
        playing = !playing;
        return;
    }
    playing = true;
    
    play = new Sound(dataPlaylist.map(element => element.preview),100, true);
    play.start();
   
}