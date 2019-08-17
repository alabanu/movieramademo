

$(document).ready(function() {

   
    const openEls = document.querySelectorAll("[data-open]");
    const closeEls = document.querySelectorAll("[data-close]");
    const isVisible = "is-visible";
    
    for (const el of openEls) {
        el.addEventListener("click", function () {
            const modalId = this.dataset.open;
            document.getElementById(modalId).classList.add(isVisible);
        });
    }
    
    for (const el of closeEls) {
        el.addEventListener("click", function () {
            this.parentElement.parentElement.parentElement.classList.remove(isVisible);
        });
    }
    
    document.addEventListener("click", e => {
        if (e.target == document.querySelector(".modal.is-visible")) {
            document.querySelector(".modal.is-visible").classList.remove(isVisible);
        }
    });
    
    document.addEventListener("keyup", e => {
        // if we press the ESC
        if (e.key == "Escape" && document.querySelector(".modal.is-visible")) {
            document.querySelector(".modal.is-visible").classList.remove(isVisible);
        }
    });
    

    
    $("body").append('</div><div class="modal" id="modal"> <div class="modal-dialog"><header class="modal-header"> The header of the first modal<button class="close-modal" aria-label="close modal" data-close> </button>            </header>            <section class="modal-content">              <p><strong>Press ?, ESC, or click outside of the modal to close it</strong></p>              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo repellendus reprehenderit accusamus totam ratione! Nesciunt, nemo dolorum recusandae ad ex nam similique dolorem ab perspiciatis qui. Facere, dignissimos. Nemo, ea.</p>            </section>          </div>');

    $(".poster-wrap").hover(function () {
        $(this).find('.hover-cover').toggle(); 
     });
   
    }); 