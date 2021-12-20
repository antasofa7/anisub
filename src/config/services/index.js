import callAPI from '../api';

const ROOT_API = 'https://testapi.my.id/';
export const IMG_URL = 'https://tetapi.my.id/images/anime/';

export async function getHotMovies() {
  const url = `${ROOT_API}/hot/season`;

  return callAPI({
    url,
    method: 'GET',
  });
}

export async function getAllNew() {
  const url = `${ROOT_API}/all/new`;

  return callAPI({
    url,
    method: 'GET',
  });
}

export async function getNewMovies() {
  const url = `${ROOT_API}/movie/new`;

  return callAPI({
    url,
    method: 'GET',
  });
}

export async function getNewSeries() {
  const url = `${ROOT_API}/episode/new`;

  return callAPI({
    url,
    method: 'GET',
  });
}

export async function getUpcomingAnimes() {
  const url = `${ROOT_API}/up/coming`;

  return callAPI({
    url,
    method: 'GET',
  });
}

export async function getAnimeByGenre() {
  const url = `${ROOT_API}/genres/animes`;

  return callAPI({
    url,
    method: 'GET',
  });
}

export async function getGenres() {
  const url = `${ROOT_API}/genres`;

  return callAPI({
    url,
    method: 'GET',
  });
}
