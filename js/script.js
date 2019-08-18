
let page = 0;
const container = document.getElementById('container');
const baseUrl = 'https://api.themoviedb.org/3/';

$(function() {

    var stickyNavTop = $('.nav').offset().top;

    var stickyNav = function () {
        var scrollTop = $(window).scrollTop();

        if (scrollTop > stickyNavTop) {
            $('.nav').addClass('sticky');
        } else {
            $('.nav').removeClass('sticky');
        }
    };

    stickyNav();

    window.onload = function (e) {
        $(".loader").fadeIn("slow");
        addPage(++page);
    }

    var isActive = false; 
    window.onscroll = function () {
        stickyNav();
        if (getScrollTop() < getDocumentHeight() - window.innerHeight) return;
        isActive = true; 
        addPage(++page);
        $(".loader").fadeIn("slow");
    };

});

//infinite scrolling
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

/*In theaters*/
async function fetchPage(page) {

    url = baseUrl + 'movie/now_playing?api_key=bc50218d91157b1ba4f142ef7baaa6a0&page=' + page;
    await fetch(url, {
        method: 'get',
        async: true,
    }).then(response => {
        return response.json();
    }).then(async (myJson) => {

        array = JSON.stringify(myJson);
        var movies = JSON.parse(array);


        for (var x = 0; x < movies.results.length; x++) {
            card = document.createElement('li');
            card.className = 'cards_item';
        
            const carddiv = document.createElement('div');
            carddiv.className = 'card';

            //poster-wrap
            const imagewrapdiv = document.createElement('div');
            imagewrapdiv.className = 'poster-wrap';
            //poster
            const imagediv = document.createElement('div');
            imagediv.className = 'card_image_div';
            const img = document.createElement("img");
            img.className = 'card_image';
            if (movies.results[x].poster_path != null) {
                img.src = 'https://image.tmdb.org/t/p/original' + movies.results[x].poster_path;
            }
            else {
                img.src = 'https://amfnews.com/wp-content/uploads/2014/10/default-img-1000x600.gif';
                img.height = 439;
                img.width = 293;
            }
            imagediv.appendChild(img);
            
            imagewrapdiv.appendChild(imagediv);

            //overview
            const hovercover = document.createElement('div');
            hovercover.className = 'hover-cover';
            // hovercover.style = 'display: none';
            const hovercoversub = document.createElement('div');
            hovercoversub.className = 'wrapper details';
            const hovercoversubtitle = document.createElement('h2');
            hovercoversubtitle.innerHTML="Overview";
            hovercoversub.appendChild(hovercoversubtitle);
            const overview = document.createElement('p');
            overview.innerHTML = movies.results[x].overview;
            hovercoversub.appendChild(overview);
            hovercover.appendChild(hovercoversub);
            imagewrapdiv.appendChild(hovercover);

            carddiv.appendChild(imagewrapdiv);

            //title
            const h1 = document.createElement('h4');
            h1.className = 'titlecls';
            h1.textContent = movies.results[x].title;
            carddiv.appendChild(h1);

            //date_average div
            const subdiv = document.createElement('div');

            //Release year
            const release_year = document.createElement('h5');
            release_year.className ='relcls';
            release_year.innerHTML = '<i class = "fas fa-calendar-alt fa-lg" aria-hidden="true"></i>&nbsp&nbsp' + getYear(movies.results[x].release_date);
            
            //Vote average
            const vote_average = document.createElement('h5');
            vote_average.className ='votecls';
            vote_average.innerHTML = '<i class = "fas fa-star fa-lg" aria-hidden="true"></i>&nbsp' + movies.results[x].vote_average;
            subdiv.appendChild(release_year);
            subdiv.appendChild(vote_average);
            carddiv.appendChild(subdiv);

            //Genres
            const result = await getGenre(movies.results[x].genre_ids);
            var str = result.toString()
            var output = str.split(',').join(', ');

            const genres = document.createElement('div');
            genres.className = 'genrecls';
            genres.innerHTML = '<i class = "fas fa-film fa-lg" aria-hidden="true"></i>&nbsp' + output;
            carddiv.appendChild(genres);



            //separator
            const sep = document.createElement('hr');
            sep.sclassName = 'sep';
            carddiv.appendChild(sep);


            const detailsbut = document.createElement('button');
            detailsbut.appendChild(document.createTextNode("More Info"));
            detailsbut.className = 'open-modal';
            detailsbut.setAttribute('data-open', 'modal');

            carddiv.appendChild(detailsbut);

            card.appendChild(carddiv);

            
           

            //add videos
            addVideo(movies.results[x].id);
            //add reviews
            addReview(movies.results[x].id);
            //add similar
            addSimilar(movies.results[x].id);

            container.appendChild(card);
        }
        $(".loader").fadeOut("slow");
       
        // var s = document.createElement("script");
        // s.type = "text/javascript";
        // s.src = "js/modal.js";
        // $("body").append(s);
        // isActive = false;

    })

}

function getYear(date) {
    var d = new Date(date);
    var n = d.getFullYear();
    return n;
}

async function getGenre(genres) {

    let moviegenres = [];
    var url = baseUrl + 'genre/movie/list?api_key=bc50218d91157b1ba4f142ef7baaa6a0';

    let dataend = await fetch(url, {
        method: 'get',
        async: false,
    }).then((res) => {
        return res.json();
    }).then((genreJson) => {
        const genre_array = JSON.stringify(genreJson);
        var contact = JSON.parse(genre_array);
        genres.forEach(element => {
            contact.genres.forEach(
                (e2) => {
                    if (element === e2.id)
                        moviegenres.push(e2.name);
                }
            )
        });


        return Promise.all(moviegenres).then((results) => {
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
        .then((data) => {
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
        .catch((error) => {
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