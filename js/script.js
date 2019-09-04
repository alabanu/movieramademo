
let page = 0;
const container = document.getElementById("container");
const baseUrl = "https://api.themoviedb.org/3/";
const apikey = "bc50218d91157b1ba4f142ef7baaa6a0";
let totalPages = 1;
var stickyNavTop = $(".nav").offset().top;

function getScrollTop() {

    return (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
}


async function nowplaying(myJson) {

    const array = JSON.stringify(myJson);
    var movies = JSON.parse(array);

    var x = document.querySelector("#nodata");
    x.style.display = "none";

    if (movies.results.length !== 0) {
        totalPages = movies.totalPages;
       
        for (let i = 0; i < movies.results.length; i++) {
            let card = document.createElement("li");
            card.className = "cards_item";

            const carddiv = document.createElement("div");
            carddiv.className = "card slide-top";

            //poster-wrap
            const imagewrapdiv = document.createElement("div");
            imagewrapdiv.className = "poster-wrap";
            //poster
            var imagediv = displayPoster(movies.results[i].poster_path);
            imagewrapdiv.appendChild(imagediv);

            //overview
            var hovercover = displayOverview(movies.results[i].overview);
            imagewrapdiv.appendChild(hovercover);
            carddiv.appendChild(imagewrapdiv);

            //title
            const h1 = document.createElement("h4");
            h1.className = "titlecls";
            h1.textContent = movies.results[i].title;
            carddiv.appendChild(h1);

            //Release year + average
            var subdiv = displayYearVotediv(movies.results[i].release_date, movies.results[i].vote_average);
            carddiv.appendChild(subdiv);

            //Genres
            const genre = document.createElement("div");
            genre.className = "genrecls";
            genre.innerHTML = await displayGenres(movies.results[i].genre_ids);
            carddiv.appendChild(genre);

            //Separator 
            const sep = document.createElement("hr");
            sep.sclassName = "sep";
            carddiv.appendChild(sep);

            //Button more info
            var detailsbut = displayButtons(movies.results[i].id);
            carddiv.appendChild(detailsbut);
            card.appendChild(carddiv);
            container.appendChild(card);
        }
    } else {
        var x = document.getElementById("nodata");
        if (x.style.display === "none") {
            x.innerHTML = "No results";
            x.style.display = "block";
        } else {
            x.style.display = "none";
        }
    }
    $(".loader").fadeOut("slow");

}


/*In theaters*/
async function fetchPage(page) {

    let url = baseUrl + "movie/now_playing?api_key=" + apikey + "&page=" + page;
    await fetch(url)
        .then((response) => {
            return response.json();
        }).then(async (myJson) => {
            nowplaying(myJson);
        })

}


function debouncescroll() {
    if (getScrollTop() < getDocumentHeight() - window.innerHeight) return;
    if (page < totalPages) {
        fetchPage(++page);
        $(".loader").fadeIn("slow");
    }
    else {
        $(".loader").fadeOut("slow");
    }
}

$(function () {

    window.onload = function (e) {
        $(".loader").fadeIn("slow");
        fetchPage(++page);
    }

    window.addEventListener("scroll", throttle(stickyNav, 100));
    window.addEventListener("scroll", debounce(debouncescroll, 1000));

});


function stickyNav() {
    var scrollTop = $(window).scrollTop();

    if (scrollTop > stickyNavTop) {
        $(".nav").addClass("sticky");
    } else {
        $(".nav").removeClass("sticky");
    }

}

function throttle(fn, wait) {
    var time = Date.now();
    return function () {
        if ((time + wait - Date.now()) < 0) {
            fn();
            time = Date.now();
        }
    };
}



function debounce(func, wait, immediate) {

    var timeout;
    return function () {
        var context = this, args = arguments;
        var later = function () {
            timeout = null;
            if (!immediate) {func.apply(context, args)};
        };
        var callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) {func.apply(context, args)};
    };
};

//infinite scrolling
function getDocumentHeight() {

    const body = document.body;
    const html = document.documentElement;

    return Math.max(
        body.scrollHeight, body.offsetHeight,
        html.clientHeight, html.scrollHeight, html.offsetHeight
    );
}



function displayOverview(overview_text) {

    const hovercover = document.createElement('div');
    hovercover.className = 'hover-cover';
    const hovercoversub = document.createElement('div');
    hovercoversub.className = 'wrapper details';
    const hovercoversubtitle = document.createElement('h2');
    hovercoversubtitle.innerHTML = "Overview";
    hovercoversub.appendChild(hovercoversubtitle);
    const overview = document.createElement('p');
    overview.innerHTML = overview_text;
    hovercoversub.appendChild(overview);
    hovercover.appendChild(hovercoversub);
    return hovercover;
}



function displayPoster(poster_path) {

    //poster
    const imagediv = document.createElement("div");
    imagediv.className = "card_image_div";
    const img = document.createElement("img");
    img.className = "card_image";
    if (poster_path != null) {
        img.src = "https://image.tmdb.org/t/p/original" + poster_path;
    }
    else {
        img.src = "https://amfnews.com/wp-content/uploads/2014/10/default-img-1000x600.gif";
        img.height = 439;
        img.width = 293;
    }
    imagediv.appendChild(img);
    return imagediv;
}




function displayYearVotediv(release_date, average) {

    //date_average div
    const subdiv = document.createElement('div');
    //Release year
    const release_year = document.createElement('h5');
    release_year.className = 'relcls';
    release_year.innerHTML = '<i class = "fas fa-calendar-alt fa-lg" aria-hidden="true"></i>&nbsp&nbsp' + getYear(release_date);
    //Vote average
    const vote_average = document.createElement('h5');
    vote_average.className = 'votecls';
    vote_average.innerHTML = '<i class = "fas fa-star fa-lg" aria-hidden="true"></i>&nbsp' + average;
    subdiv.appendChild(release_year);
    subdiv.appendChild(vote_average);
    return subdiv;
}

function displayButtons(movieId) {

    const detailsbut = document.createElement('button');
    detailsbut.appendChild(document.createTextNode("More Info"));
    detailsbut.id = movieId;
    detailsbut.className = 'open-modal';
    detailsbut.setAttribute('data-open', 'modal');
    return detailsbut;
}
async function displayGenres(genreId) {

    let resultgen = await getGenre(genreId);

    var str = resultgen.toString()
    if (str.length > 0) {
        var output = str.split(',').map(function (w) {
            return '<span class="chip">' + w + '</span>&nbsp';
        }).join('')
        return output;
    }
    else {
        return '<i class = "fas fa-film fa-lg" aria-hidden="true"></i>&nbsp';
    }
}



function getYear(date) {

    var d = new Date(date);
    var n = d.getFullYear();
    return n;
}

async function getGenre(genres) {

    let moviegenres = [];
    let url = baseUrl + 'genre/movie/list?api_key=' + apikey;

    let dataend = await fetch(url)
        .then((res) => {
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
        .catch(error => showSnackbar("from getGenre//" + error));

    return dataend;
}


/*View movie details*/


function showSnackbar(message) {
    var x = document.getElementById("snackbar")
    x.className = "showerror";
    x.innerHTML = message;
    setTimeout(function () { x.className = x.className.replace("showerror", ""); }, 3000);
    $(".loader").fadeOut("slow");
}




