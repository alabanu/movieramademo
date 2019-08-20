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
        console.log("val://" + $(this).val());
        if ($(this).val() != "") {
            search_form($(this).val());
        }
        if ($(this).val().length > 0) {
            $(".go-icon").addClass("go-in");
        }
        else {
            $(".go-icon").removeClass("go-in");
        }
    }, 250));

    $(".go-icon").click(function () {
        var movie_title = $('#search').val();
        search_form(movie_title);
    });

    /*Search for movies*/
    function search_form(title) {
        console.log("call search");
        const url = baseUrl + 'search/movie?api_key=bc50218d91157b1ba4f142ef7baaa6a0&query=' + title;
        document.querySelector('.headtitle').innerHTML = 'Results for "' + title + '"';
        document.querySelector('#container').innerHTML = "";
        fetch(url)
            .then((resp) => resp.json())
            .then(async (myJson) => {
                nowplaying(myJson);
            })
            .catch((error) => {
                console.log(JSON.stringify(error));
            });

    }
});
