
function displayposterhover() {
    var posters = document.querySelectorAll(".poster-wrap");

    posters.forEach((poster) => {
        var hovercover = poster.parentElement.querySelector(".hover-cover");
        poster.addEventListener("mouseover", () => {
            hovercover.classList.add("show");
        });

        poster.addEventListener("mouseleave", () => {
            hovercover.classList.remove("show");
        });

    });

}

async function getTitle(movieid) {

    const url = baseUrl + "movie/" + movieid + "?api_key=" + apikey;
    await fetch(url)
        .then((resp) => resp.json())
        .then(function (data) {
            document.querySelector("#modaltitle span").innerHTML = data.title;
        })
        .catch((error) => showSnackbar("from gettitle//" + error));
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
        .catch((error) => showSnackbar("from addVideo//" + error));
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
        .catch((error) => showSnackbar("from addReview//" + error));
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
        .catch((error) => showSnackbar("from addSimilar// " + error));
}


function modalCreate(obj, flag){
    
    obj.addEventListener("click", function () {
        const modalId = this.dataset.open;
        $("body").css("overflow", "hidden");
        $(".modal-dialog").css("visibility", "visible");

        if ( i=== 1) {
            getTitle(this.id);
            addVideo(this.id);
            addReview(this.id);
            addSimilar(this.id);
            i++;
        }

        document.getElementById(modalId).classList.add(flag);

    });
}

function closemodal(div, isVisible){
    div.addEventListener("click", function () {
        this.parentElement.parentElement.parentElement.classList.remove(isVisible);
    });
}

function onReady() {
    const openDivs = document.querySelectorAll("[data-open]");
    const closeDivs = document.querySelectorAll("[data-close]");
    const isVisible = "is-visible";
    
    for (const div of openDivs) {
        i = 1;
        modalCreate(div, isVisible);
    }

    for (const div of closeDivs) {
        closemodal(div, isVisible);
    }

    document.addEventListener("click", (e) => {
        if (e.target === document.querySelector(".modal.is-visible")) {
            $("body").css("overflow", "auto");
            document.querySelector(".modal.is-visible").classList.remove(isVisible);
        }
    });

    document.addEventListener("keyup", (e) => {
        if (e.key === "Escape" && document.querySelector(".modal.is-visible")) {
            $("body").css("overflow", "auto");
            document.querySelector(".modal.is-visible").classList.remove(isVisible);
        }
    });

    const dots = document.querySelectorAll(".review-cont article");
    dots.forEach((dot) => dot.addEventListener("click", () => {
        dot.classList.toggle("expand");
    }));

}

var interval = setInterval(function () {
    displayposterhover();
    if (document.readyState === "complete") {
        clearInterval(1000);
        onReady();
    }
}, 1000);


function myfonction() {
    // $(".fa-spinner").fadeOut();
    document.getElementById("spin").remove();
    $(".open-modal").innerHTML = "More info";
}



