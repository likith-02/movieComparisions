const makeOption = (movie) => {
    const img = (movie.Poster !== 'N/A') ? movie.Poster : '';
    return `
    <div class="container d-flex flex-row justify-content-start align-items-center p-0 option">
    <img src="${img}"
        class="img-fluid rounded">
    <div class="container text-wrap">
        <h6 class="mb-0">${movie.Title}</h6>
        <p><small class="text-muted">${movie.Year} film</small></p>
    </div>
    </div>
    `
};

const fetchMovieData = async (movieId) => {
    const config = {
        params: {
            apikey: '6996a6c',
            i: movieId
        }
    };

    const movie = await axios.get(`http://www.omdbapi.com/`, config);
    return movie.data;
};

const runComparision = () => {
    const leftSideStats = document.querySelectorAll(
        '.autocomplete .movieDetail .alert'
    );
    const rightSideStats = document.querySelectorAll(
        '.autocompleteOne .movieDetail .alert'
    );
    console.log(leftSideStats);
    leftSideStats.forEach((leftStat, index) => {
        const rightStat = rightSideStats[index];

        const leftSideValue = parseInt(leftStat.dataset.value);
        const rightSideValue = parseInt(rightStat.dataset.value);

        if (rightSideValue > leftSideValue) {
            leftStat.classList.remove('alert-info', 'alert-danger', 'alert-success');
            leftStat.classList.add('alert-danger');
            rightStat.classList.remove('alert-info', 'alert-danger', 'alert-success');
            rightStat.classList.add('alert-success');
        } else if (rightSideValue < leftSideValue) {
            rightStat.classList.remove('alert-info', 'alert-danger', 'alert-success');
            rightStat.classList.add('alert-danger');
            leftStat.classList.remove('alert-info', 'alert-danger', 'alert-success');
            leftStat.classList.add('alert-success');
        } else {
            leftStat.classList.remove('alert-info', 'alert-danger', 'alert-success');
            leftStat.classList.add('alert-info');
            rightStat.classList.remove('alert-info', 'alert-danger', 'alert-success');
            rightStat.classList.add('alert-info');
        }
    });
}

let leftMovie = null;
let rightMovie = null;

const renderMovie = async (movie, root, side) => {
    const movieDetail = await fetchMovieData(movie.imdbID);
    const summaryElement = root.querySelector('.movieDetail');
    summaryElement.innerHTML = movieTemplate(movieDetail);
    if (side === 'left') {
        leftMovie = movieDetail;
    } else if (side === 'right') {
        rightMovie = movieDetail;
    };

    if (rightMovie && leftMovie) {
        runComparision();
    };
}

const fetchSearchData = async (query) => {
    try {
        const config = {
            params: {
                apikey: '6996a6c',
                s: query
            }
        };

        const movies = await axios.get('http://www.omdbapi.com/', config);
        return movies.data.Search;
    } catch {
        alert('Movie not found!!');
    }
};

const info = document.querySelector('.information');

const autoCompleteConfig = {
    renderOption(movie) {
        return makeOption(movie);
    },
    onSelectOption(movie, root, side) {
        info.classList.add('hide');
        renderMovie(movie, root, side);
    },
    inputValue(movie) {
        return movie.Title;
    },
    fetchData(query) {
        return fetchSearchData(query);
    }
};

autocomplete({
    ...autoCompleteConfig,
    root: document.querySelector('.autocomplete'),
    side: 'right'
});

autocomplete({
    ...autoCompleteConfig,
    root: document.querySelector('.autocompleteOne'),
    side: 'left'
});

const dropdown = document.querySelector('.dropdown');
const input = document.querySelector('input');
const options = document.querySelector('.dropdown-menu');

document.addEventListener('click', event => {
    if (!dropdown.contains(event.target)) {
        options.classList.remove('show');
        options.classList.add('hide');
    }
    else if (input.value) {
        options.classList.add('show');
        options.classList.remove('hide');
    }
});


