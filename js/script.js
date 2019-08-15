let page = 0;

function getDocumentHeight() {
    const body = document.body;
    const html = document.documentElement;

    return Math.max(
        body.scrollHeight, body.offsetHeight,
        html.clientHeight, html.scrollHeight, html.offsetHeight
    );
};

function getScrollTop() {
    return (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
}

function addPage(page) {
    fetchPage(page);
}

addPage(++page);

window.onscroll = function () {
    if (getScrollTop() < getDocumentHeight() - window.innerHeight) return;
    addPage(++page);
};

async function fetchPage(page) {
    const container = document.getElementById('container');

    url = "https://api.themoviedb.org/3/movie/now_playing?api_key=bc50218d91157b1ba4f142ef7baaa6a0&page=" + page;
    await fetch(url, {
        method: 'get',
        async: false,
    }).then(function (res) {
        return res.json();
    }).then(async function (myJson) {

        array = JSON.stringify(myJson);
        var movies = JSON.parse(array);
        console.log(movies.results);


        for (var x = 0; x < movies.results.length; x++) {
            const card = document.createElement('div');
            card.setAttribute('class', 'card');

            //title
            const h1 = document.createElement('h3');
            h1.textContent = movies.results[x].title;
            card.appendChild(h1);

            //poster
            var img = document.createElement("img");
            img.setAttribute('class', 'img');
            if (movies.results[x].poster_path != null) {
                img.src = "https://image.tmdb.org/t/p/original" + movies.results[x].poster_path;
            }
            else {
                img.src = "https://amfnews.com/wp-content/uploads/2014/10/default-img-1000x600.gif";

            }
            card.appendChild(img);


            //Release year
            const release_year = document.createElement('h5');
            release_year.innerHTML = getYear(movies.results[x].release_date);
            card.appendChild(release_year);

            //Vote average
            const vote_average = document.createElement('h5');
            vote_average.innerHTML = movies.results[x].vote_average;
            card.appendChild(vote_average);

            //Overview
            const overview = document.createElement('p');
            overview.innerHTML = movies.results[x].overview;
            card.appendChild(overview);

            container.appendChild(card);

            const result = await getGenre(movies.results[x].genre_ids);

            console.log(result);

            // return result;
            // result.forEach(element => {
            //     console.log(element);
            // });
            // .then(function(val) {
            //     // you access the value from the promise here
            //     // console.log(result);
            //  });




        }
    })

}




// function fetchPage(page) {
//     const container = document.getElementById('container');

//     var request = new XMLHttpRequest();
//     request.open('GET', 'https://api.themoviedb.org/3/movie/now_playing?api_key=bc50218d91157b1ba4f142ef7baaa6a0&page=' + page, true);
//     request.onload = function () {

//         var movies = JSON.parse(this.response);
//         console.log(movies.results);

//         if (request.status >= 200 && request.status < 400) {

//             for (var x = 0; x < movies.results.length; x++) {
//                 const card = document.createElement('div');
//                 card.setAttribute('class', 'card');

//                 //title
//                 const h1 = document.createElement('h3');
//                 h1.textContent = movies.results[x].title;
//                 card.appendChild(h1);

//                 //poster
//                 var img = document.createElement("img");
//                 img.setAttribute('class', 'img');
//                 if (movies.results[x].poster_path != null) {
//                     img.src = "https://image.tmdb.org/t/p/original" + movies.results[x].poster_path;
//                 }
//                 else {
//                     img.src = "https://amfnews.com/wp-content/uploads/2014/10/default-img-1000x600.gif";

//                 }
//                 card.appendChild(img);

//                 //genre
//                 // console.log(movies.results[x].genre_ids);
//                 // console.log(getGenre(movies.results[x].genre_ids));
//                 getGenre(movies.results[x].genre_ids)
//                  .then(data =>  console.log("skata"+JSON.stringify(data))) // JSON-string from `response.json()` call
//                 //  .catch(error => console.error(error));

//                 //Release year
//                 const release_year = document.createElement('h5');
//                 release_year.innerHTML = getYear(movies.results[x].release_date);
//                 card.appendChild(release_year);

//                 //Vote average
//                 const vote_average = document.createElement('h5');
//                 vote_average.innerHTML = movies.results[x].vote_average;
//                 card.appendChild(vote_average);

//                 //Overview
//                 const overview = document.createElement('p');
//                 overview.innerHTML = movies.results[x].overview;
//                 card.appendChild(overview);

//                 container.appendChild(card);

//             }
//         } else {
//             const errorMessage = document.createElement('errormsg');
//             errorMessage.textContent = `Sorry, something went wrong!`;
//             app.appendChild(errorMessage);
//         }
//     }

//     request.send();

// }


function getYear(date) {
    var d = new Date(date);
    var n = d.getFullYear();
    return n;
}

async function getGenre(genres) {
    console.log(genres);
    let finalarray = [];
    var url = 'https://api.themoviedb.org/3/genre/movie/list?api_key=bc50218d91157b1ba4f142ef7baaa6a0';

    let dataend = await fetch(url, {
        method: 'get',
        async: false,
    }).then(function (res) {
        return res.json();
    }).then(function (myJson) {

        const genre_array = JSON.stringify(myJson);
        // console.log("SS" + genre_array);  //return ARRAY
        var contact = JSON.parse(genre_array);
        // console.log("id:" + contact.genres[0].id);
        genres.forEach(element => {
            // console.log("number//" + element);
            contact.genres.forEach(
                (e2) => {
                    if (element === e2.id)
                        finalarray.push(e2.name);
                }
            )
        });

        console.log("finalarray**" + finalarray);

        Promise.all(finalarray).then(function (results) {
            console.log(results);
            // Promise.resolve();
            console.log("res**" + results);
            return results;
        });

    })
        .catch(error => console.log(error));

    return dataend;
}

//  function  getGenre(genres) {
//     console.log(genres);
//     let finalarray = [];
//     var url = 'https://api.themoviedb.org/3/genre/movie/list?api_key=bc50218d91157b1ba4f142ef7baaa6a0';

//     var request = new XMLHttpRequest();
//     request.open('GET', url , true);
//     request.onload = function () {


//         if (request.status >= 200 && request.status < 400) {

//             var contact = JSON.parse(this.response);
//                     // console.log("id:" + contact.genres[0].id);
//                     genres.forEach(element => {
//                         // console.log("number//" + element);
//                         contact.genres.forEach(
//                             (e2) => {
//                                 if (element === e2.id)
//                                     finalarray.push(e2.name);
//                             }
//                         )
//                     });

//                      finalarray.map(number => {
//             console.log("****" + number);
//         });
//                     return finalarray
//         }
//     }

//     request.send();

// }

// function getGenre() {

//     var url = 'https://api.spacexdata.com/v2/launches/latest';

//     var result = fetch(url, {
//         method: 'get',
//     }).then(function (response) {
//         return response.json(); // pass the data as promise to next then block
//     }).then(function (data) {
//         var rocketId = data.rocket.rocket_id;

//         console.log(rocketId, '\n');

//         return fetch('https://api.spacexdata.com/v2/rockets/' + rocketId); // make a 2nd request and return a promise
//     })
//         .then(function (response) {
//             return response.json();
//         })
//         .catch(function (error) {
//             console.log('Request failed', error)
//         })


// }


function search_form(title) {
    console.log("///" + title);
    let data = { query: title };
    // let headers = new Headers();

    // headers.append('Content-Type', 'application/json');
    // headers.append('Accept', 'application/json');
  
    // headers.append('Access-Control-Allow-Origin', 'https://api.themoviedb.org');

    // fetch("https://api.themoviedb.org/3/search/movie?api_key=bc50218d91157b1ba4f142ef7baaa6a0", {
    //     method: "POST",
    //     mode: "no-cors",
    //     headers: headers,
    //     body: JSON.stringify(data)
    // })
    // .then(res => {
    //     console.log("Request complete! response:",  res.json());
    // });
    $.ajax({
        url: "http://api.themoviedb.org/3/search/movie?api_key=bc50218d91157b1ba4f142ef7baaa6a0",
        type: "POST",
        success: function (response) {
            var resp = JSON.parse(response)
            alert(resp.status);
        },
        error: function (xhr, status) {
            alert("error");
        }
    });

}
