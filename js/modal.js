var interval = setInterval(function () {
    if (document.readyState === 'complete') {
        clearInterval(100);
        onReady();
    }
}, 100);


function onReady() {
    const openDivs = document.querySelectorAll("[data-open]");
    const closeDivs = document.querySelectorAll("[data-close]");
    const isVisible = "is-visible";

    for (const div of openDivs) {
        i = 1;
        div.addEventListener("click", function () {
            const modalId = this.dataset.open;
            $('body').css('overflow', 'hidden');

            if (i === 1) {
                getTitle(this.id);
                addVideo(this.id);
                addReview(this.id);
                addSimilar(this.id);
                i++;
            }
            document.getElementById(modalId).classList.add(isVisible);

        });

    }

    for (const div of closeDivs) {
        div.addEventListener("click", function () {
            $('body').css('overflow', 'auto');
            this.parentElement.parentElement.parentElement.classList.remove(isVisible);
        });
    }

    document.addEventListener("click", e => {
        if (e.target == document.querySelector(".modal.is-visible")) {
            $('body').css('overflow', 'auto');
            document.querySelector(".modal.is-visible").classList.remove(isVisible);
        }
    });

    document.addEventListener("keyup", e => {
        if (e.key == "Escape" && document.querySelector(".modal.is-visible")) {
            $('body').css('overflow', 'auto');
            document.querySelector(".modal.is-visible").classList.remove(isVisible);
        }
    });


    var posters = document.querySelectorAll(".poster-wrap");

    posters.forEach(poster => {
        var hovercover = poster.parentElement.querySelector(".hover-cover");
        poster.addEventListener('mouseover', () => {
            hovercover.classList.add("show");
        });

        poster.addEventListener('mouseleave', () => {
            hovercover.classList.remove("show");
        });

    });


    const dots = document.querySelectorAll('.review-cont article');
    dots.forEach(dot => dot.addEventListener('click', () => {
        dot.classList.toggle("expand");
    }));

}


