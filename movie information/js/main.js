$(document).ready(() => {
  var searchText = "";

    $('#searchBtn').click(e => {
        searchText = $('#movieName').val();
        getMovies(searchText,1);
        e.preventDefault();
      
    })


  
});
   function getPage()
   {
    var page=  $(event.target).text()
    searchText = $('#movieName').val();
    getMovies(searchText, page);
    $("button.btn-dark").removeClass("btn-dark");
   }

function getMovies(searchText,pageNum) {

    $.ajax({
        url: 'http://www.omdbapi.com/?apikey=773cfc38&s=' + searchText+'&type=movie&page='+pageNum,
        beforeSend: function() {
          $('#movies').html('Loading data from the server ...');
        },
        success: function(response) {

            let movies = response.Search;
            let output = '';
            for (movie of movies) {

                output += `
                <div class="col-md-3 card">
                  <div class="well text-center">
                    <img src="${movie.Poster}" class="card-img-top"  alt="${movie.Title}">
                    <h5  class="card-title">${movie.Title}</h5>
                    <a onclick="movieSelected('${movie.imdbID}')" class="btn btn-primary" href="#">Movie Details</a>
                  </div>
                </div>
              `;
            }
            $('#movies').html(output);
            var intPage = parseInt(pageNum)
            var pag='';
            var numberOfPages = Math.ceil(response.totalResults/10);
            if (numberOfPages>10)
            {
              for (var i =1 ;i<10 ;i++)
            {
              pag +=`<button class="btn btn-light" onclick="getPage()">${i}</button>`
            }
            pag +='<span>...</span>'
            pag +=`<button class="btn btn-light" onclick="getPage()">${numberOfPages}</button>`

            $('#pagination').html(pag);

            }
            else {
            for (var i =1 ;i<numberOfPages ;i++)
            {
              pag +=`<button class="btn btn-light" onclick="getPage()">${i}</button>`
            }
            $('#pagination').html(pag);
          }
          $(`button:nth-child(${intPage})`).addClass("btn-dark");

        },
        error: function (xhr, ajaxOptions, thrownError) {
          alert(xhr.status);
          alert(thrownError);
        }
    });
}



function movieSelected(id) {
    sessionStorage.setItem('movieId', id);
    window.location = 'movie.html';
 
}

function getMovie() {
    let movieId = sessionStorage.getItem('movieId');


    $.ajax({
      url: 'http://www.omdbapi.com/?apikey=773cfc38&i=' + movieId,
      beforeSend: function() {
        $('#movie').html('Loading the data from the server ...');
      },
      success: function(response) {

        console.log(response);
        let movie = response;

        let output = `
    <div class="row">
      <div class="col-md-4">
        <img src="${movie.Poster}" class="thumbnail">
      </div>
      <div class="col-md-8">
        <h2>${movie.Title}</h2>
        <ul class="list-group">
          <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
          <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
          <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
          <li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
          <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
          <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
          <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
        </ul>
      </div>
    </div>
    <div class="row">
      <div class="well">
        <h3>Plot</h3>
        ${movie.Plot}
        <hr>
        <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn btn-primary">View IMDB</a>
        <a href="index.html" class="btn btn-default">Go Back To Search</a>
      </div>
    </div>
  `;

        $('#movie').html(output);


      },
      error: function (xhr, ajaxOptions, thrownError) {
        alert(xhr.status);
        alert(thrownError);
      }
  });
    

        
}
