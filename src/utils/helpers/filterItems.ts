export const getImage = (poster: string | null | undefined) => (
  poster
    ? `https://image.tmdb.org/t/p/original/${poster}` 
    : 'https://linnea.com.ar/wp-content/uploads/2018/09/404PosterNotFound-400x559.jpg'
);

export const getVote = (vote: number | null | undefined) => (
  vote
   ? +vote.toFixed(1)
   : 'no rating'
);

export const getYearFromFullDate = (date: string) => date.slice(0, 4);

export const getTvYears = (releaseDate: string, endDate: string ) => {
  const start = getYearFromFullDate(releaseDate);
  const end = getYearFromFullDate(endDate);

  if (start === end) {
    return start;
  }

  return `${start} - ${end}`;
};



