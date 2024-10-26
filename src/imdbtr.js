'use strict';

const figures = require('figures');
const ora = require('ora');
const api = require('./api.js');
const helpers = require('./helpers.js');

const imdbtr = params => {
  if (!params) {
    return false;
  }

  const query = helpers.buildQuery(params);
  const movie = api(query);

  if (!movie) {
    return false;
  }

  const values = Object.values(params).join(', ');
  const spinner = ora(`Searching for ${values}`).start();

  return movie.then(result => {
    spinner.stop();
    if (!result) {
      return console.log('Movie not found on IMDB :(');
    }

    const movieRes = `---
genre: ${result.Genre}
length: ${result.Runtime}
rating_imdb: ${result.imdbRating}
my_rating: 
date_watched: 
---

![poster](${result.Poster})

# ${result.Title}, ${result.Year}

${result.Plot}

## Featuring

- Actors: ${result.Actors}
- Directed by: ${result.Director}
    `;

    console.log(movieRes);
  }).catch(error => {
    spinner.stop();
    console.error('Something went wrong :(');
    console.error(error);
  });
};

module.exports = imdbtr;
