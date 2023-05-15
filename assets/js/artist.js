const artistUrl = 'https://striveschool-api.herokuapp.com/api/deezer/search?q=';


window.onload = () => {

    let artist = new URLSearchParams(location.search).get('artist');
    fetch(`${artistUrl}${artist}`)
    .then(response => response.json())
    .then(data => {
        console.table(data);
    })
    .catch(error => {
        showMessage('Errore recupero dati artista.');
        console.error(error);
    });

};

function showMessage(message){

}