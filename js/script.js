
let page = 0;
const container = document.getElementById("container");
const baseUrl = "https://api.themoviedb.org/3/";
const apikey = "bc50218d91157b1ba4f142ef7baaa6a0";
let totalPages = 1;
var stickyNavTop = $(".nav").offset().top;

async function fetchPage(page) {

    const url = baseUrl + "movie/now_playing?api_key=" + apikey + "&page=" + page;
   
    await fetch(url)
        .then((response) => {
            return response.json();
        }).then(async (myJson) => {
            nowplaying(myJson);
        })

}

function stickyNav() {
    var scrollTop = $(window).scrollTop();

    if (scrollTop > stickyNavTop) {
        $(".nav").addClass("sticky");
    } else {
        $(".nav").removeClass("sticky");
    }

}

$(function () {   
    $(".loader").fadeIn("slow");
    fetchPage(++page);

    window.addEventListener("scroll", throttle(stickyNav, 100));
    window.addEventListener("scroll", debounce(debouncescroll, 1000));

});



function throttle(fn, wait) {
    var time = Date.now();
    return function () {
        if ((time + wait - Date.now()) < 0) {
            fn();
            time = Date.now();
        }
    };
}

function debouncescroll() {
    if (getScrollTop() < getDocumentHeight() - window.innerHeight) {return;}
    if (page < totalPages) {
        fetchPage(++page);
        $(".loader").fadeIn("slow");
    }
    else {
        $(".loader").fadeOut("slow");
    }
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

function getScrollTop() {

    return (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
}


/*In theaters*/


function displayOverview(overview_text) {

    const hovercover = document.createElement("div");
    hovercover.className = "hover-cover";
    const hovercoversub = document.createElement("div");
    hovercoversub.className = "wrapper details";
    const hovercoversubtitle = document.createElement("h2");
    hovercoversubtitle.innerHTML = "Overview";
    hovercoversub.appendChild(hovercoversubtitle);
    const overview = document.createElement("p");
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


async function nowplaying(myJson) {

    let array = JSON.stringify(myJson);
    var movies = JSON.parse(array);

    var x = document.querySelector("#nodata");
    x.style.display = "none";

    if (movies.results.length !== 0) {
        totalPages = movies.total_pages;
       
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



function displayYearVotediv(release_date, average) {

    //date_average div
    const subdiv = document.createElement("div");
    //Release year
    const release_year = document.createElement("h5");
    release_year.className = "relcls";
    release_year.innerHTML = "<i class = 'fas fa-calendar-alt fa-lg' aria-hidden='true'></i>&nbsp&nbsp" + getYear(release_date);
    //Vote average
    const vote_average = document.createElement("h5");
    vote_average.className = "votecls";
    vote_average.innerHTML = "<i class = 'fas fa-star fa-lg' aria-hidden='true'></i>&nbsp" + average;
    subdiv.appendChild(release_year);
    subdiv.appendChild(vote_average);
    return subdiv;
}

function displayButtons(movieId) {

    const detailsbut = document.createElement("button");
    detailsbut.appendChild(document.createTextNode("More Info"));
    detailsbut.id = movieId;
    detailsbut.className = "open-modal";
    detailsbut.setAttribute("data-open", "modal");
    return detailsbut;
}
async function displayGenres(genreId) {

    let resultgen = await getGenre(genreId);

    var str = resultgen.toString()
    if (str.length > 0) {
        var output = str.split(",").map(function (w) {
            return "<span class='chip'>" + w + "</span>&nbsp";
        }).join("")
        return output;
    }
    else {
        return "<i class = 'fas fa-film fa-lg' aria-hidden='true'></i>&nbsp";
    }
}

function showSnackbar(message) {
    var x = document.getElementById("snackbar")
    x.className = "showerror";
    x.innerHTML = message;
    setTimeout(function () { x.className = x.className.replace("showerror", ""); }, 3000);
    $(".loader").fadeOut("slow");
}




function getYear(date) {

    var d = new Date(date);
    var n = d.getFullYear();
    return n;
}

async function getGenre(genres) {

    let moviegenres = [];
    const url = baseUrl + "genre/movie/list?api_key=" + apikey;

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

async function getTitle(movieid) {

    const url = baseUrl + "movie/" + movieid + "?api_key=" + apikey;
    await fetch(url)
        .then((resp) => resp.json())
        .then(function (data) {
            document.querySelector("#modaltitle span").innerHTML = data.title;
        })
        .catch(error => showSnackbar("from gettitle//" + error));
}


async function addVideo(movieid) {
    const url = baseUrl + "movie/" + movieid + "/videos?api_key=" + apikey;
    await fetch(url)
        .then((resp) => resp.json())
        .then(function (data) {
            if (data.results.length !== 0) {
                document.querySelector(".trailer").innerHTML = "<h3>Trailer</h3> <iframe id='videoarea' class='resp-iframe' src='https://www.youtube.com/embed/" + data.results[0].key + "' frameborder='0' allowfullscreen></iframe>";
            }
            else {
                document.querySelector(".trailer").innerHTML = "<h3>Trailer</h3> <p>Not Available</p>";
            }
        })
        .catch(error => showSnackbar("from addVideo//" + error));
}


async function addReview(movieid) {
    let page = 1;
    const url = baseUrl + "movie/" + movieid + "/reviews?api_key=" + apikey + "&page=" + page;
    document.querySelector(".review").innerHTML = "<h3>User Reviews</h3>";
    await fetch(url)
        .then((resp) => resp.json())
        .then(function (data) {
            if (data.results.length !== 0) {
                let reviews = data.results;
                return reviews.map(function (data) {
                    document.querySelector(".review").innerHTML = document.querySelector(".review").innerHTML + "<div class='user-comments'><div class='comment-meta'><i class='fas fa-user'></i>&nbspby " + data.author + "<span></span></div> <div class = 'review-cont'> <article>" + data.content + "</article><div class=' style='    text-align: right;    right: 0;    bottom: 0;    z-index: 2;    cursor: pointer;'>                <svg class='ipl-expander__icon expander-icon ' width='12' height='8' viewBox='0 0 12 8' xmlns='http://www.w3.org/2000/svg'><path d='M10.197 0L6 4.304 1.803 0 0 1.85 6 8l6-6.15' fill='#2572B3' fill-rule='evenodd'></path> </svg></div></div></div>";
                })
            }
            else {
                document.querySelector(".review").innerHTML = "<h3>User Reviews</h3> <p>Not Available</p>";
            }
        })
        .catch(error => showSnackbar("from addReview//" + error));
}

async function addSimilar(movieid) {
    let page = 1;
    document.querySelector(".similar").innerHTML = "<h3>Similar Movies</h3>";

    const carousel = document.createElement("div");
    carousel.className = "slider";

    const url = baseUrl + "movie/" + movieid + "/similar?api_key=" + apikey + "&page=" + page;
    await fetch(url)
        .then((resp) => resp.json())
        .then(function (data) {
            if (data.results.length !== 0) {
                let similar = data.results;
                return similar.map(function (data) {

                    const imagediv = document.createElement("div");
                    imagediv.className = "slide";
                    const img = document.createElement("img");
                    img.className = "card_image_similar";
                    if (data.poster_path != null) {
                        img.src = "https://image.tmdb.org/t/p/original" + data.poster_path;

                    }
                    else {
                        img.src = "https://amfnews.com/wp-content/uploads/2014/10/default-img-1000x600.gif";
                        img.height = 50;
                        img.width = 50;
                    }
                    imagediv.appendChild(img);

                    const titlelink = document.createElement("div");
                    titlelink.className = "overlay";
                    titlelink.innerHTML = "<a href = '#' class = 'linktitle' >" + data.title + "</a>";
                    imagediv.appendChild(titlelink);
                    carousel.appendChild(imagediv);

                    document.querySelector(".similar").appendChild(carousel);

                })
            } else {
                document.querySelector(".similar").innerHTML = "<h3>Similar Movies</h3> <p>Not Available</p>";
            }

        })
        .catch(error => showSnackbar("from addSimilar// " + error));
}

document.querySelectorAll(".review-cont article").forEach(function (o) {
    o.addEventListener("click", function (e) {
        $(e.target).toggleClass("expand");
    })
});





