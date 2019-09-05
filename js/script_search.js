$(document).ready(function () {

    $("#search").focus(function () {
        $(".search-box").addClass("border-searching");
        $(".search-icon").addClass("rotate");
    });
    $("#search").blur(function () {
        $(".search-box").removeClass("border-searching");
        $(".search-icon").removeClass("rotate");
    });

    $("#search").keyup(debounce(function (e) {
        if (e.which === 9) { e.preventDefault(); }  //alt-tab key

        if ($(this).val() !== "") {
            search_form($(this).val());
        }
        $(".go-icon").addClass("go-in");

    }, 850));

    $(".go-icon").click(function () {
        var movieTitle = $("#search").val();
        if (movieTitle.length !== 0) {
            search_form(movieTitle);
        }
        else {
            var x = document.querySelector("#nodata");
            x.innerHTML = "Can't find any matching results";
            x.style.display = "block";
        }
    });

    /*Search for movies*/
    async function search_form(title) {
       
        const url = baseUrl + "search/movie?api_key=" + apikey + "&query=" + title;
        document.querySelector(".headtitle").innerHTML = "Results for '" + title + "'";

        await fetch(url)
            .then((resp) => resp.json())
            .then(async (myJson) => {
                nowplaying(myJson);
                document.querySelector("#container").innerHTML = "";
            })
            .catch(error => showSnackbar("from search_form//" + error));

    }
});
