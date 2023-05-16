
// - - - - - - - - - - - - - - - definizione variabile in base ad album selezionato
const selectedAlbumId = new URLSearchParams(window.location.search).get("id");
console.log('id album selezionato:',selectedAlbumId);

// - - - - - - - - - - - - - - - GET fetch al window.onload
window.onload = async () => {
    try {
        const promise = await fetch('https://striveschool-api.herokuapp.com/api/deezer/album/75621062', {
        //const promise = await fetch('https://striveschool-api.herokuapp.com/api/deezer/album/'+selectedAlbumId, {
            //method:'',
            //body:,
            //*headers: {Authorization: ''}
            })
            if (promise.ok) {
                const selectedAlbum = await promise.json();
                console.log('album selezionato:',selectedAlbum);

                // - - - - - - - - - - - - - - - manipolazione DOM per inserimento album
                const albumContainer = document.getElementById('albumContainer');
                // - - - - - - - - - - - - - - - destrutturazione prodotto selezionato (selectedAlbum)
                const { id, title, cover, contributors, release_date, nb_tracks, duration, tracks } = selectedAlbum


                // - - - - - - - - - - - - - - - funzione trasforma album duration da secondi a formato hh:mm:ss
                function albumDurationFunction(_albumDuration) {
                    var //millisecondi = parseInt((_duration%1000)/100)
                        secondi = parseInt(_albumDuration%60)
                        , minuti = parseInt((_albumDuration/60)%60)
                        , ore = parseInt((_albumDuration/(60*60))%24);

                    ore = (ore < 10) ? "0" + ore : ore;
                    minuti = (minuti < 10) ? "0" + minuti : minuti;
                    secondi = (secondi < 10) ? "0" + secondi : secondi;
                
                    //return ore + ":" + minuti + ":" + secondi + "." + millisecondi;
                    return ore + ":" + minuti + ":" + secondi;
                }
                var albumDurationNew = albumDurationFunction(duration);


                albumContainer.innerHTML += `
                    <div class="col">
                        <p><b>Titolo album:</b> ${title}</p>
                        <p><b>Cover album:</b> <img src="${cover}" class="card-img-top w-25" alt="..."></p>
                        <p><b>Immagine artista:</b> <img src="${contributors[0].picture_small}" class="card-img-top w-25" alt="..."></p>
                        <p><b>Nome artista:</b> ${contributors[0].name}</p>
                        <p><b>Data album:</b> ${release_date.substr(0, 4)}</p>
                        <p><b>Numero brani:</b> ${nb_tracks} brani</p>
                        <p><b>Durata album:</b> ${albumDurationNew}</p>
                    </div>
                    `                

                // - - - - - - - - - - - - - - - manipolazione DOM per inserimento brani
                const songsContainer = document.getElementById('songsContainer');

                let tracksArray = tracks.data;
                console.log(tracksArray);
                for (i = 0; i < tracksArray.length; i++) {
                    let songTitle = tracksArray[i].title;
                    let songDuration = tracksArray[i].duration;
                    console.log(songTitle);
                    console.log(songDuration);
                
                    // - - - - - - - - - - - - - - - funzione trasforma song duration da secondi a formato hh:mm:ss
                    function songDurationFunction(_songDuration) {
                        var //millisecondi = parseInt((_duration%1000)/100)
                            secondi = parseInt(_songDuration%60)
                            , minuti = parseInt((_songDuration/60)%60)
                            //, ore = parseInt((_songDuration/(60*60))%24);

                        //ore = (ore < 10) ? "0" + ore : ore;
                        minuti = (minuti < 10) ? "0" + minuti : minuti;
                        secondi = (secondi < 10) ? "0" + secondi : secondi;
                    
                        //return ore + ":" + minuti + ":" + secondi + "." + millisecondi;
                        return minuti + ":" + secondi;
                    }
                    var songDurationNew = songDurationFunction(songDuration);


                    songsContainer.innerHTML += `
                    <div class="col-1">${i+1}</div><div class="col-9">${songTitle}</div><div class="col-2">${songDurationNew}</div>
                    `
                }
            }
            
            else {
                throw new Error("Richiesta non a buon fine")
            }
    }
    catch (error) {
        alert(error)
    }
}