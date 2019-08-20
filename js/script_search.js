$(document).ready(function () {
    $("#search").focus(function () {
        $(".search-box").addClass("border-searching");
        $(".search-icon").addClass("si-rotate");
    });
    $("#search").blur(function () {
        $(".search-box").removeClass("border-searching");
        $(".search-icon").removeClass("si-rotate");
    });

    $("#search").keypress(debounce(function (e) {
        if (e.which == 9) { e.preventDefault(); }  //alt-tab key
    
        if ($(this).val() != "") {
            search_form($(this).val());
        }

        $(".go-icon").addClass("go-in");
        // var x = document.querySelector("#nodata");
        // x.innerHTML = "Can't find any matching results";
        // x.style.display = "block";

    }, 250));

    $(".go-icon").click(function () {
        var movie_title = $('#search').val();
        if (movie_title.length != 0) {
            search_form(movie_title);
        }
        else {
            var x = document.querySelector("#nodata");
            x.innerHTML = "Can't find any matching results";
            x.style.display = "block";
        }
    });

    /*Search for movies*/
    async function search_form(title) {
    
        const url = baseUrl + 'search/movie?api_key='+apikey+'&query=' + title;
        document.querySelector('.headtitle').innerHTML = 'Results for "' + title + '"';
        document.querySelector('#container').innerHTML = "";
        await fetch(url)
            .then((resp) => resp.json())
            .then(async (myJson) => {
                nowplaying(myJson);
            })
            .catch(error => showSnackbar("from search_form//" + error));

    }
});
