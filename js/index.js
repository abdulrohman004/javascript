const elMovieList = selectElement('.movies__list');
const elMovieTemplate = selectElement('#movie-template').content;

const elGenreSelect = selectElement(".filter-form__select");

const elMovieSearch = selectElement(".filter-form__input")


function renderGenresList(genre, element){
    const newLi = createDOM('li');
    newLi.className = 'movie-card__genre badge';
    newLi.textContent = genre;
    element.append(newLi);
}
function renderMoviesList(moviesArr, element){
    element.innerHTML = null;

    moviesArr.forEach((item) => {
        const movieTemplate = elMovieTemplate.cloneNode(true);
        selectElement('.movie-card__poster', movieTemplate).src = item.poster;
        selectElement(".movie-card__link", movieTemplate).textContent = item.title; 
        selectElement('.movie-card__overview', movieTemplate).textContent = item.overview;
        item.genres.forEach((genre) => { 
            renderGenresList(genre, selectElement('.movie-card__genres', movieTemplate));
        });
        selectElement(".movie-card__release-date", movieTemplate).textContent = convertTime(item.release_date);
        element.append(movieTemplate)
    });
}
function renderGenresSelect(arr, element){
    arr.forEach((item) =>{
        const newGenreOption = createDOM("option");
        newGenreOption.textContent = item.name;
        newGenreOption.value = item.name;
        element.append(newGenreOption);
    });
};
renderGenresSelect (genres, selectElement(".filter-form__select"));

renderMoviesList(films, elMovieList);

function handelSubmit(evt) {
    evt.preventDefault()
    if(elMovieSearch.value.trim() !== ''){
        let regex = new RegExp(elMovieSearch.value, 'gi')
        const searchedArr = films.filter(item => item.title.match(regex))
        renderMoviesList(searchedArr, elMovieList)
    }
    else {
        if(renderGenresSelect.value === "All") {
            renderMoviesList(films, elMovieList)
            return
        }
        const filteredArr = films.filter(item => item.genres.includes(renderGenresSelect.value))
        renderMoviesList(filteredArr, elMovieList)
    }
}


selectElement(".filter-form").addEventListener("submit", handelSubmit);
    







        
