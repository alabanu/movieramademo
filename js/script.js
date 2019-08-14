let page = 0;

function getDocumentHeight() {
	const body = document.body;
	const html = document.documentElement;
	
	return Math.max(
		body.scrollHeight, body.offsetHeight,
		html.clientHeight, html.scrollHeight, html.offsetHeight
	);
};


function getScrollTop() {
	return (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
}

function addPage(page) {
	fetchPage(page);
}

addPage(++page);

window.onscroll = function() {
	if (getScrollTop() < getDocumentHeight() - window.innerHeight) return;
	addPage(++page);
};


function fetchPage(page) {
const container = document.getElementById('container');

var request = new XMLHttpRequest();
request.open('GET', 'https://api.themoviedb.org/3/movie/now_playing?api_key=bc50218d91157b1ba4f142ef7baaa6a0&page='+page, true);
request.onload = function () {

  // Begin accessing JSON data here
  var movies = JSON.parse(this.response);
  console.log(movies.results);

  if (request.status >= 200 && request.status < 400) {
   
    //   const p = document.createElement('p');
    //   results.overview = results.overview.substring(0, 300);
    //   p.textContent = `${results.overview}...`;

    //   container.appendChild(card);
    //   card.appendChild(h1);
    //   card.appendChild(p);
    // });
    for (var x = 0; x < movies.results.length; x++) {
        const card = document.createElement('div');
        card.setAttribute('class', 'card');
  
        const h1 = document.createElement('h1');
        h1.textContent = movies.results[x].title;
        container.appendChild(card);
        card.appendChild(h1);
      
    }
  } else {
    const errorMessage = document.createElement('errormsg');
    errorMessage.textContent = `Sorry, it's not working!`;
    app.appendChild(errorMessage);
  }
}

request.send();

}