(function basicScrollTop() {

    var btnTop = document.querySelector("#goTop");

    var btntop = function () {
        if (window.scrollY >= 300) {
            btnTop.classList.add("is-visible");
        } else {
            btnTop.classList.remove("is-visible");
        }
    }

    var topScrollTo = function () {
        if (window.scrollY !== 0) {
            setTimeout(function () {
                window.scrollTo(0, window.scrollY - 30);
                topScrollTo();
            }, 10);
        }
    };

    window.addEventListener("scroll", btntop);
    btnTop.addEventListener("click", topScrollTo);

})();

// basicScrollTop();
