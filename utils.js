const debounce = (func, delay = 1000) => {
    let timeoutId;
    return (...args) => {
        if (timeoutId) {
            clearInterval(timeoutId);
        }
        timeoutId = setTimeout(() => {
            func(...args);
        }, delay);
    }
}

const movieTemplate = (movieDetail) => {
    const dollars = parseInt(movieDetail.BoxOffice.slice(1).split(',').join(''));
    const metascore = parseInt(movieDetail.Metascore);
    const imdbRating = parseFloat(movieDetail.imdbRating);
    const imdbVotes = parseInt(movieDetail.imdbVotes.replace(/,/g, ''));
    const awards = movieDetail.Awards.split(' ').reduce((prev, word) => {
        const value = parseInt(word);

        if (isNaN(value)) {
            return prev;
        } else {
            return prev + value;
        }
    }, 0);

    return `
        <div class="card mb-3">
            <div class="row g-0">
                <div class="col-md-6">
                    <img src="${movieDetail.Poster}" class="img-fluid rounded-start h-100">
                </div>
                <div class="col-md-6">
                    <div class="card-body">
                        <h3 class="card-title mb-3">${movieDetail.Title}</h3>
                        <h5 class="mb-1"><small>Genre</small></h5>
                        <h6 class="mb-3 text-muted">${movieDetail.Genre}</h6>
                        <h5 class="mb-1"><small>Director</small></h5>
                        <h6 class="mb-3 text-muted">${movieDetail.Director}</h6>
                        <h5 class="mb-1"><small>Actors</small></h5>
                        <h6 class="mb-3 text-muted">${movieDetail.Actors}</h6>
                        <h5 class="mb-1"><small>Language</small></h5>
                        <h6 class="mb-3 text-muted">${movieDetail.Language}</h6>
                        <h5 class="mb-1"><small>Released on</small></h5>
                        <h6 class="mb-3 text-muted">${movieDetail.Released}</h6>
                        <p class="card-text">${movieDetail.Plot}</p>
                    </div>
                </div>
            </div>
        </div>
        <div data-value=${awards} class="alert alert-info d-flex align-items-center" role="alert">
            <div class="text-black">
                <h5 class="title text-muted">${movieDetail.Awards}</h5>
                <h6 class="subtitle"><i class="fas fa-award"></i> Awards</h6>
            </div>
        </div>
        <div data-value=${dollars} class="alert alert-info d-flex align-items-center" role="alert">
        <div class="text-black">
            <h5 class="title text-muted">${movieDetail.BoxOffice}</h5>
            <h6 class="subtitle"><i class="fas fa-dollar-sign"></i> Box Office</h6>
        </div>
    </div>
    <div data-value=${metascore} class="alert alert-info d-flex align-items-center" role="alert">
    <div class="text-black">
        <h5 class="title text-muted">${movieDetail.Metascore}</h5>
        <h6 class="subtitle"><i class="fa-solid fa-star"></i> Metascore</h6>
    </div>
  </div>
  <div data-value=${imdbRating} class="alert alert-info d-flex align-items-center" role="alert">
  <div class="text-black">
      <h5 class="title text-muted">${movieDetail.imdbRating}</h5>
      <h6 class="subtitle"><i class="fa-solid fa-users"></i> IMDB Rating</h6>
  </div>
</div>
<div data-value=${imdbVotes} class="alert alert-info d-flex align-items-center" role="alert">
<div class="text-black">
    <h5 class="title text-muted">${movieDetail.imdbVotes}</h5>
    <h6 class="subtitle"><i class="fa-solid fa-check-to-slot"></i> IMDB Votes</h6>
</div>
</div>`
}