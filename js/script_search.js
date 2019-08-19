$(document).ready(function () {
    $("#search").focus(function () {
        $(".search-box").addClass("border-searching");
        $(".search-icon").addClass("si-rotate");
    });
    $("#search").blur(function () {
        $(".search-box").removeClass("border-searching");
        $(".search-icon").removeClass("si-rotate");
    });

    $("#search").keyup(debounce(function () {
        
        if ($(this).val() != ""){
            search_form($(this).val());
        }
        if ($(this).val().length > 0) {
            $(".go-icon").addClass("go-in");
        }
        else {
            $(".go-icon").removeClass("go-in");
        }
    }, 100));

    $(".go-icon").click(function () {
        search_form("god");
    });

    function search_form(title) {
        console.log("calll search");
        const url = baseUrl + 'search/movie?api_key=bc50218d91157b1ba4f142ef7baaa6a0&query=' + title;
        fetch(url)
            .then((resp) => resp.json())
            .then((data) => {
                let authors = data.results;
                console.log(authors);
                return authors.map(function (author) {
                    // let li = createNode('li'),
                    //     img = createNode('img'),
                    //     span = createNode('span');
                    // // span.innerHTML = `${author.name.first} ${author.name.last}`;
                    // append(li, img);
                    // append(li, span);
                    // append(ul, li);
                })
            })
            .catch((error) => {
                console.log(JSON.stringify(error));
            });

    }
});
