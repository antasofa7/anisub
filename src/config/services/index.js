import callAPI from '../api';

const ROOT_API = 'https://testapi.my.id';

export async function getHotMovies() {
  const url = `${ROOT_API}/hot/season`;
  return callAPI({
    url,
    method: 'GET',
  });
}

export async function getMoreHotMovies(page) {
  const url = `${ROOT_API}/hot/season/${page}`;

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

export async function getMoreAllNew(page) {
  const url = `${ROOT_API}/all/new/${page}`;

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

export async function getMoreNewMovies(page) {
  const url = `${ROOT_API}/movie/new/${page}`;

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

export async function getMoreNewSeries(page) {
  const url = `${ROOT_API}/episode/new/${page}`;

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

export async function getMoreUpcomingAnimes(page) {
  const url = `${ROOT_API}/up/coming/${page}`;

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

export async function getAnimeById(animeId) {
  const url = `${ROOT_API}/anime/${animeId}`;

  return callAPI({
    url,
    method: 'GET',
  });
}

export async function getMoreEpisodes(animeId, page) {
  const url = `${ROOT_API}/anime/${animeId}/episode/${page}`;

  return callAPI({
    url,
    method: 'GET',
  });
}

export async function getPlaylistyByGenre(genreID) {
  const url = `${ROOT_API}/genre/${genreID}/animes/0`;

  return callAPI({
    url,
    method: 'GET',
  });
}

export async function getMorePlaylistyByGenre(genreID, page) {
  const url = `${ROOT_API}/genre/${genreID}/animes/${page}`;

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

export async function getSearch(searchParams) {
  const url = `${ROOT_API}/search/${searchParams}`;

  return callAPI({
    url,
    method: 'GET',
  });
}

export async function getRecommendation() {
  const url = `${ROOT_API}/recommendation`;

  return callAPI({
    url,
    method: 'GET',
  });
}
