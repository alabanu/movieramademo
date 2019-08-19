<!DOCTYPE html>

<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>MovieRama</title>
  <link rel="apple-touch-icon" sizes="180x180" href="images/favicon/apple-touch-icon.png">
  <link rel="icon" type="image/png" sizes="32x32" href="images/favicon/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="images/favicon/favicon-16x16.png">
  <link rel="manifest" href="images/favicon/site.webmanifest">
  <link href="http://fonts.googleapis.com/css?family=Roboto" rel="stylesheet" />
  <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.9.0/css/all.min.css" rel="stylesheet" />
  <link rel="stylesheet" href="css/style.css" type="text/css" media="all" />
</head>

<body>
  <div class="wrapper">
    <div class="header">
      <a href="index.html" class="logo">
        <img src="https://bcassetcdn.com/asset/logo/f9cac9c8-7022-4ff8-9e34-59bb108fd94a/logo?v=4&text=movierama" />
      </a>
    </div>
    <div class="nav">
      <div class="container">
        <div class="search-box">
          <div class="search-icon">
            <i class="fas fa-search search-icon"></i>
          </div>
          <form class="search-form"  onSubmit="return false;" id="position">
            <input type="text" placeholder="Search" id="search" autocomplete="off">
          </form>
          <svg class="search-border" version="1.1" xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"
            x="0px" y="0px" viewBox="0 0 671 111" style="enable-background:new 0 0 671 111;" xml:space="preserve">
            <path class="border" d="M335.5,108.5h-280c-29.3,0-53-23.7-53-53v0c0-29.3,23.7-53,53-53h280"></path>
            <path class="border" d="M335.5,108.5h280c29.3,0,53-23.7,53-53v0c0-29.3-23.7-53-53-53h-280"></path>
          </svg>
          <div class="go-icon">
            <i class="fa fa-arrow-right"></i>
          </div>
        </div>
      </div>
    </div>
    <div id="main">
      <h1 class="headtitle">Now playing</h1>
      <div id="loading">
        <img id="loading-image" class="loader" src="images/buff.gif" alt="Loading..." />
      </div>
      <ul class="cards" id="container">
      </ul>
    </div>
    <button id="goTop">top</button>
    <div>
      <div class="modal" id="modal">
        <div class="modal-dialog">
          <header class="modal-header" id="modaltitle">
            <span>Title</span>
            <button class="close-modal" aria-label="close modal" data-close> </button>
          </header>
          <section class="modal-content">
            <div class="modal-container">
              <div class="row trailer">
                <div class="cell"></div>
              </div>
              <div class="row review">
                <div class="cell"></div>
              </div>
              <div class="row similar">
                <div class="cell"></div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>

    <script src="https://code.jquery.com/jquery-3.4.1.min.js"
      integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo=" crossorigin="anonymous"></script>
    <script src="js/script.js"></script>
    <script src="js/script_search.js"></script>
    <script type="text/javascript" src="js/modal.js"></script>
    <script type="text/javascript" src="js/scrollToTop.js"></script>
</body>

</html>