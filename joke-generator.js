// Random Joke Generator using JokeAPI
// API: https://jokeapi.dev/

const fetch = require('node-fetch');

/**
 * Fetches a random joke from JokeAPI
 * @param {string} type - 'single' or 'twopart' (default: any)
 * @returns {Promise<string>} - The joke text
 */
async function getRandomJoke(type = 'any') {
  try {
    const url = `https://v2.jokeapi.dev/joke/Any?type=${type}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.statusCode}`);
    }

    const data = await response.json();

    if (data.error) {
      throw new Error('Failed to fetch joke');
    }

    // Format the joke based on type
    if (data.type === 'single') {
      return data.joke;
    } else if (data.type === 'twopart') {
      return `${data.setup}\n\n${data.delivery}`;
    }

    return 'Could not format joke';
  } catch (error) {
    console.error('Error fetching joke:', error.message);
    return 'Sorry, could not fetch a joke at this time.';
  }
}

/**
 * Fetches multiple random jokes
 * @param {number} count - Number of jokes to fetch (default: 5)
 * @returns {Promise<array>} - Array of jokes
 */
async function getMultipleJokes(count = 5) {
  const jokes = [];
  for (let i = 0; i < count; i++) {
    const joke = await getRandomJoke();
    jokes.push(joke);
  }
  return jokes;
}

// Main execution
async function main() {
  console.log('🎭 Random Joke Generator\n');
  console.log('Getting a random joke...\n');

  const joke = await getRandomJoke();
  console.log(joke);
  console.log('\n---\n');

  // Get multiple jokes
  console.log('Getting 3 more jokes...\n');
  const multipleJokes = await getMultipleJokes(3);
  multipleJokes.forEach((joke, index) => {
    console.log(`Joke ${index + 1}:\n${joke}\n`);
  });
}

// Run if this is the main module
if (require.main === module) {
  main();
}

module.exports = { getRandomJoke, getMultipleJokes };
