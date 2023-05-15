const artistUrl = 'https://striveschool-api.herokuapp.com/api/deezer/search?q=';
var progProcess;

window.onload = () => {

    let artist = new URLSearchParams(location.search).get('artist');

   // startProgress();
    fetch(`${artistUrl}${artist}`)
    .then(response => response.json())
    .then(({data}) => {
        data.sort((e1,e2) => e1.rank > e2.rank ? -1 : 1);
        data.forEach((element, index) =>{ 
            console.table(element);
            let domEl = domElement(element, index);
            document.querySelector('.row').appendChild(domEl);
    });
      //  ultimateProgress();
    })
    .catch(error => {
        showMessage('Errore recupero dati artista.');
        console.error(error);
    });

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
    col.classList = 'col-12';

    let card = document.createElement('div');
    card.classList = 'd-flex flex-row align-items-center';
    col.appendChild(card);

    let num = document.createElement('h4');
    num.innerText = index;
    num.classList = 'w-15';
    card.appendChild(num);

    let img = document.createElement('img');
    img.classList = 'img-fluid';
    card.appendChild(img);
    img.src = artistData.album.cover;

    let title = document.createElement('h4');
    title.classList = 'title';
    title.innerText = artistData.title_short;
    card.appendChild(title);

    let rank = document.createElement('h6');
    rank.innerText = artistData.rank;
    card.appendChild(rank);

    
   let button = document.createElement('button');
   button.innerText = 'PLAY';

   card.appendChild(button);

  

   button.onclick = () => {
    if(foo){
    foo.stop();
    }
     foo = new Sound(artistData.preview, 100, true);
    foo.start();
   };

 

    return col;
}

var foo;

function Sound(source, volume, loop)
{
    this.source = source;
    this.volume = volume;
    this.loop = loop;
    var son;
    this.son = son;
    this.finish = false;
    this.stop = function()
    {
        document.body.removeChild(this.son);
    }
    this.start = function()
    {
        if (this.finish) return false;
        this.son = document.createElement("embed");
        this.son.setAttribute("src", this.source);
        this.son.setAttribute("hidden", "true");
        this.son.setAttribute("volume", this.volume);
        this.son.setAttribute("autostart", "true");
        this.son.setAttribute("loop", this.loop);
        document.body.appendChild(this.son);
    }
    this.remove = function()
    {
        document.body.removeChild(this.son);
        this.finish = true;
    }
    this.init = function(volume, loop)
    {
        this.finish = false;
        this.volume = volume;
        this.loop = loop;
    }
}