
let page = 0;
const container = document.getElementById('container');
const baseUrl = 'https://api.themoviedb.org/3/';


window.onload = function(e){ 
    $(".loader").fadeIn("slow");
    addPage(++page);
}

/*In theaters*/
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


window.onscroll = function () {
    if (getScrollTop() < getDocumentHeight() - window.innerHeight) return;
    addPage(++page);
    $(".loader").fadeIn("slow");
};

async function fetchPage(page) {

    url = baseUrl + 'movie/now_playing?api_key=bc50218d91157b1ba4f142ef7baaa6a0&page=' + page;
    await fetch(url, {
        method: 'get',
        async: true,
    }).then(response => {
        return response.json();
    }).then(async function (myJson) {

        array = JSON.stringify(myJson);
        var movies = JSON.parse(array);
       
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
                img.src = 'https://image.tmdb.org/t/p/original' + movies.results[x].poster_path;
            }
            else {
                img.src = 'https://amfnews.com/wp-content/uploads/2014/10/default-img-1000x600.gif';
            }
            card.appendChild(img);


            //Release year
            const release_year = document.createElement('h5');
            release_year.innerHTML = getYear(movies.results[x].release_date);
            card.appendChild(release_year);

            //Genres
            const result = await getGenre(movies.results[x].genre_ids);
            const genres = document.createElement('div');
            genres.innerHTML = result;
            card.appendChild(genres);

            //Vote average
            const vote_average = document.createElement('h5');
            vote_average.innerHTML = movies.results[x].vote_average;
            card.appendChild(vote_average);

            //Overview
            const overview = document.createElement('p');
            overview.innerHTML = movies.results[x].overview;
            card.appendChild(overview);

            container.appendChild(card);
            
            

            //add videos
            addVideo(movies.results[x].id);
            //add reviews
            addReview(movies.results[x].id);
            //add similar
            addSimilar(movies.results[x].id);


        }
        $(".loader").fadeOut("slow");

    })

}

function getYear(date) {
    var d = new Date(date);
    var n = d.getFullYear();
    return n;
}

async function getGenre(genres) {

    let finalarray = [];
    var url = baseUrl + 'genre/movie/list?api_key=bc50218d91157b1ba4f142ef7baaa6a0';

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


        return Promise.all(finalarray).then(function (results) {
            return results;
        });

    })
        .catch(error => console.log(error));

    return dataend;
}



/*Search for movies*/
function search_form(title) {

    const url = baseUrl + 'search/movie?api_key=bc50218d91157b1ba4f142ef7baaa6a0&query=' + title;
    fetch(url)
        .then((resp) => resp.json())
        .then(function (data) {
            let authors = data.results;
            console.log(authors);
            return authors.map(function (author) {
                let li = createNode('li'),
                    img = createNode('img'),
                    span = createNode('span');
                // span.innerHTML = `${author.name.first} ${author.name.last}`;
                append(li, img);
                append(li, span);
                append(ul, li);
            })
        })
        .catch(function (error) {
            console.log(JSON.stringify(error));
        });

}




/*View movie details*/

function addVideo(movieid) {
    const url = baseUrl + 'movie/' + movieid + '/videos?api_key=bc50218d91157b1ba4f142ef7baaa6a0';
    fetch(url)
        .then((resp) => resp.json())
        .then(function (data) {
            let authors = data.results;
            console.log(authors);
            return authors.map(function (author) {
                let li = createNode('li'),
                    img = createNode('img'),
                    span = createNode('span');
                // span.innerHTML = `${author.name.first} ${author.name.last}`;
                append(li, img);
                append(li, span);
                append(ul, li);
            })
        })
        .catch(function (error) {
            console.log(JSON.stringify(error));
        });
}


function addReview(movieid) {
    let page = 1;
    const url = baseUrl + 'movie/' + movieid + '/reviews?api_key=bc50218d91157b1ba4f142ef7baaa6a0&page=' + page;
    fetch(url)
        .then((resp) => resp.json())
        .then(function (data) {
            let authors = data.results;
            console.log(authors);
            return authors.map(function (author) {
                let li = createNode('li'),
                    img = createNode('img'),
                    span = createNode('span');
                // span.innerHTML = `${author.name.first} ${author.name.last}`;
                append(li, img);
                append(li, span);
                append(ul, li);
            })
        })
        .catch(function (error) {
            console.log(JSON.stringify(error));
        });
}

function addSimilar(movieid) {
    let page = 1;
    const url = baseUrl + 'movie/' + movieid + '/similar?api_key=bc50218d91157b1ba4f142ef7baaa6a0&page=' + page;
    fetch(url)
        .then((resp) => resp.json())
        .then(function (data) {
            let authors = data.results;
            console.log("//similar//" + authors);
            return authors.map(function (author) {
                let li = createNode('li'),
                    img = createNode('img'),
                    span = createNode('span');
                // span.innerHTML = `${author.name.first} ${author.name.last}`;
                append(li, img);
                append(li, span);
                append(ul, li);
            })
        })
        .catch(function (error) {
            console.log(JSON.stringify(error));
        });
}