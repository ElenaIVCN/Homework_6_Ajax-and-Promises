var root = 'https://games-app-siit.herokuapp.com';

fetch(root + '/games', {
    method: 'GET'
}).then(function(response){
    return response.json();
}).then(function(jsonResp) {
    for( let i = 0; i < jsonResp.length; i++ ) {
        $('#games').append($('<option>').text(jsonResp[i].title).val(jsonResp[i]._id));
//        console.log(jsonResp[i].title);
    }
});


$('#games').on('change', onCarSelected);
$('#delete').on('click', onDeleteClick);
$('#create').on('click', onCreateClick);
$('#update').on('click', onUpdateClick);

function onCarSelected() {
    console.log(this.value);

    fetch(root + '/games/' + this.value, {
        method: 'GET'
    }).then(function(response){
        return response.json();
    }).then(function(jsonResp) {
        $("#game_title").val(jsonResp.title);    
        $("#game_description").val(jsonResp.description);
        $("#game_rdate").val(jsonResp.releaseDate);
        $("#game_genre").val(jsonResp.genre);
        $("#game_publisher").val(jsonResp.publisher);
        $("#game_imageUrl").val(jsonResp.imageUrl);
    });
}

function onDeleteClick(event) {
    event.preventDefault();

    var gameId = $('#games').find(":selected").val();
    console.log(gameId);

    fetch(root + '/games/' + gameId, {
        method: 'DELETE'
    }).then(function(response) {
        console.log("game deletion status: '"+response.statusText+"'");
    });
}

function Game(options) {
    this.title = options.title,
    this.description = options.description,
    this.releaseDate = options.releaseDate,
    this.genre = options.genre,
    this.publisher = options.publisher,
    this.imageUrl = options.imageUrl
}

function onCreateClick(event) {
    event.preventDefault();

    var newGame = new Game({
        title: $("#game_title").val(),
        description: "description",
        releaseDate: $("#game_rdate").val(),
        genre: $("#game_genre").val(),
        publisher: $("#game_publisher").val(),
        imageUrl:
        "https://psmedia.playstation.com/is/image/psmedia/call-of-duty-wwii-two-column-01-ps4-eu-19apr17?$TwoColumn_Image$"
        });

    fetch(root + '/games/', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newGame)
    }).then(function(response) {
        console.log("game creation status: '"+response.statusText+"'");
    });
/*
    fetch(root + '/regenerate-games/', {
        method: 'GET'
    }).then(function(response) {
        console.log("game regenerate status: '"+response.statusText+"'");
    });
*/
}

function onUpdateClick(event) {
    event.preventDefault();
    
    var newGame = new Game({
        title: $("#game_title").val(),
        description: $("#game_description").val(),
        releaseDate: $("#game_rdate").val(),
        genre: $("#game_genre").val(),
        publisher: $("#game_publisher").val(),
        imageUrl: $("#game_publisher").val()
    });

    var gameId = $('#games').find(":selected").val();
    console.log(gameId);

    fetch(root + '/games/' + gameId, {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newGame)
    }).then(function(response) {
        console.log("game update status: '"+response.statusText+"'");
    });
}