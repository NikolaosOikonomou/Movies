const addMovieModal = document.getElementById('add-modal');
const startAddMovieBtn = document.querySelector('header button');
const backdrop = document.getElementById('backdrop');
const modalCancelBtn = addMovieModal.querySelector('.btn--passive');
const addMovieBtn = modalCancelBtn.nextElementSibling;
const userInputs = addMovieModal.querySelectorAll('input');
const initialDatabaseText = document.getElementById('entry-text');
const moviesDatabase = document.getElementById('movie-list');
const deleteMovieModal = document.getElementById('delete-modal');

const movies = [];


const showMovieModal = () => {
  addMovieModal.classList.add('visible');
  addBgColorHandler();
}

const hideMovieModal = () => {
  removeBgColorHandler();
  addMovieModal.classList.remove('visible');
}

const hideMovieDeletion = () => {
  removeBgColorHandler();
  deleteMovieModal.classList.remove('visible');
}

const addBgColorHandler = () => {
  backdrop.classList.add('visible');
}

const removeBgColorHandler = () => {
  backdrop.classList.remove('visible')
}

const clearUserMovieInputs = () => {
  for (const input of userInputs) {
    input.value = '';
  }
}

//  ------------- Close Modals ------------
const closeModalHandler = () => {
  clearUserMovieInputs();
  hideMovieModal();
  hideMovieDeletion();
}
// ---------End Close Modals ----------
//  -------------     ADD new Movie ------------
const addMovieHandler = () => {
  const titleValue = userInputs[0].value;
  const imgUrlValue = userInputs[1].value;
  const ratingValue = userInputs[2].value;

  if (
    titleValue.trim() === '' ||
    imgUrlValue.trim() === '' ||
    ratingValue.trim() === '' ||
    +ratingValue < 1 ||
    +ratingValue > 5
  ) {
    alert("Please enter valid values (rating between 1 - 5).");
    return
  }

  const newMovie = {
    id: Math.random().toString(),
    title: titleValue,
    img: imgUrlValue,
    rating: ratingValue
  }
  movies.push(newMovie);
  hideMovieModal();
  clearUserMovieInputs();
  updateUi();
  renderNewMovieElement(newMovie.id, newMovie.title, newMovie.img, newMovie.rating);
  console.log(movies);
}

const renderNewMovieElement = (id, title, img, rating) => {
  const newMovieElement = document.createElement('li');
  newMovieElement.className = ' movie-element';
  newMovieElement.innerHTML = `
    <div class="movie-element__image">
      <img src="${img}" alt="${title}">
    </div>
    <div class="movie-element__info">
      <h2>${title}</h2>
      <p> ${rating}/5 stars </p>
    </div>
  `
  newMovieElement.addEventListener('click', startDeleteMovieHandler.bind(null, id))
  moviesDatabase.append(newMovieElement);
}
// ------------- End Add new Movie----------
// ------------ Delete Movie ----------------------

const startDeleteMovieHandler = (movieId) => {
  addBgColorHandler();
  deleteMovieModal.classList.add('visible');
  const cancelDeletionBtn = deleteMovieModal.querySelector('.btn--passive');
  let confirmDeletionBtn = deleteMovieModal.querySelector('.btn--danger');
  
  confirmDeletionBtn.replaceWith(confirmDeletionBtn.cloneNode(true));
  confirmDeletionBtn = deleteMovieModal.querySelector('.btn--danger');

  cancelDeletionBtn.removeEventListener('click', hideMovieDeletion);
  cancelDeletionBtn.addEventListener('click', hideMovieDeletion);
  confirmDeletionBtn.addEventListener('click', deleteMovieHandler.bind(null, movieId));
}

const deleteMovieHandler = (movieId) => {
  let movieIndex = 0;
  for (const movie of movies) {
    if(movie.id === movieId){
      break;
    }
    movieIndex ++;
  }
  movies.splice(movieIndex, 1);
  moviesDatabase.children[movieIndex].remove();
  updateUi();
  hideMovieDeletion();
  console.log(movies);
}
// ------------- End Delete Movie-------------
// --------------  Udate Ui ------------------
const updateUi = () => {
  if (movies.length > 0) {
    initialDatabaseText.style.display = 'none';
  } else {
    initialDatabaseText.style.display = 'block';
  }
}

startAddMovieBtn.addEventListener('click', showMovieModal);
modalCancelBtn.addEventListener('click', closeModalHandler);
backdrop.addEventListener('click', closeModalHandler);
addMovieBtn.addEventListener('click', addMovieHandler);