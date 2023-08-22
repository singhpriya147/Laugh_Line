// for fetching random jokes
async function fetchAnyJoke() {
  try {
    const response = await fetch(
      `https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw,religious,political,racist,sexist,explicit`
    );
    const data = await response.json();
    console.log(data);

    // check if any flags are true
    const trueFlags = Object.keys(data.flags).filter(
      (flag) => data.flags[flag]
    );

     
    if (data && data.type === 'single' && data.joke ) {
      //  return data.joke;
      return { joke: data.joke, trueFlags };
    } else if (
      data &&
      data.type === 'twopart' &&
      data.setup &&
      data.delivery 
     
    ) {
      return { joke: `${data.setup}\n${data.delivery}`, trueFlags };
    } else {
      return { joke: 'No joke found.', trueFlags };
    }

  } catch (error) {
    console.error('Error fetching jokes:', error);
    return {
      joke: 'Failed to fetch jokes. Please try again later.',
      trueFlags: [],
    };
  }
}









// for displaying random jokes

async function displayAnyJoke() {
  const jokeContainer = document.getElementById('jokeContainer');

 
const revealButton = document.getElementById('revealButton');
  const flagsContainer = document.getElementById('flagsContainer');


  jokeContainer.innerHTML = 'loading..';
   jokeContainer.classList.remove('blur');
 flagsContainer.textContent = ''; 

  const { joke, trueFlags } = await fetchAnyJoke();

  jokeContainer.textContent = joke;

  


  if (trueFlags.length > 0) {

     jokeContainer.classList.add('blur'); // Add the blur class if there are true flags
     revealButton.style.display = 'block';

    flagsContainer.textContent = `
   
    ${trueFlags.join(' ,')}`;
    flagsContainer.style.display = 'block';


  } else {
      revealButton.style.display = 'none';
    flagsContainer.style.display = 'none';
  }

  // Check if the current joke is hearted and add the "hearted" class accordingly
  const heartedJokes = JSON.parse(localStorage.getItem('heartedJokes')) || [];
  const heartBtn = document.getElementById('heartBtn');
  if (heartedJokes.includes(joke)) {
    heartBtn.classList.add('hearted');
  } else {
    heartBtn.classList.remove('hearted');
  }



revealButton.addEventListener('click', () => {
  const jokeContainer = document.getElementById('jokeContainer');
  jokeContainer.classList.remove('blur'); // Remove the blur class when revealing jokes
  revealButton.style.display = 'none'; // Hide the reveal button after clicking
});
}













// fetching joke from specific category

async function fetchJoke(category) {
  try {
    const response = await fetch(`https://v2.jokeapi.dev/joke/${category}`);
    const data = await response.json();
    console.log(data);

    // check if any flags are true
    const trueFlags = Object.keys(data.flags).filter(
      (flag) => data.flags[flag]
    );

    if (data && data.type === 'single' && data.joke) {
      return { joke: data.joke, trueFlags };
    } else if (data && data.type === 'twopart' && data.setup && data.delivery) {
      return { joke: `${data.setup}\n${data.delivery}`, trueFlags };
    } else {
      return { joke: 'No joke found.', trueFlags };
    }
  } catch (error) {
    console.error('Error fetching jokes:', error);
    return {
      joke: 'Failed to fetch jokes. Please try again later.',
      trueFlags: [],
    };
  }
}

// displaying the jokes from specific categroy

async function displayJokes(category) {
  const jokeContainer = document.getElementById('jokeContainer');

  const revealButton = document.getElementById('revealButton');

  const flagsContainer = document.getElementById('flagsContainer');

  jokeContainer.innerHTML = 'loading..';
  jokeContainer.classList.remove('blur');
  flagsContainer.textContent = '';
 
  const { joke, trueFlags } = await fetchJoke(category);

  jokeContainer.textContent = joke;

  if (trueFlags.length > 0) {
    jokeContainer.classList.add('blur'); // Add the blur class if there are true flags
    revealButton.style.display = 'block';

    flagsContainer.textContent = `
   
    ${trueFlags.join(' ,')}`;
    flagsContainer.style.display = 'block';
  } else {
    revealButton.style.display = 'none';
    flagsContainer.style.display = 'none';
  }

  // Check if the current joke is hearted and add the "hearted" class accordingly
  const heartedJokes = JSON.parse(localStorage.getItem('heartedJokes')) || [];
  const heartBtn = document.getElementById('heartBtn');
  if (heartedJokes.includes(joke)) {
    heartBtn.classList.add('hearted');
  } else {
    heartBtn.classList.remove('hearted');
  }



revealButton.addEventListener('click', () => {
  const jokeContainer = document.getElementById('jokeContainer');
  jokeContainer.classList.remove('blur'); // Remove the blur class when revealing jokes
  revealButton.style.display = 'none'; // Hide the reveal button after clicking
});

 
}






const DadJokes=async()=>{

   const response = await fetch('https://icanhazdadjoke.com', {
     method: 'GET',
     headers: {
       Accept: 'application/json',
     },
   });

   const data = await response.json();
   console.log(data);

   if(data && data.joke){
    return data.joke;
   }
   else{
    return "no joke found";
   }
// } catch (error) {
//   console.error(error);
   
// }
}

async  function displayDadJokes(){
  const jokeContainer = document.getElementById('jokeContainer');
  jokeContainer.innerHTML = 'loading..';
  const  joke= await DadJokes();
jokeContainer.classList.remove('blur');
  jokeContainer.textContent = joke;


flagsContainer.style.display = 'none';
 revealButton.style.display = 'none';


  const heartedJokes = JSON.parse(localStorage.getItem('heartedJokes')) || [];
  const heartBtn = document.getElementById('heartBtn');
  if (heartedJokes.includes(joke)) {
    heartBtn.classList.add('hearted');
  } else {
    heartBtn.classList.remove('hearted');
  }


}














//  for copying the jokes to clipboard for sharing purposes

const copyToClipboard = async () => {
  const jokeText = document.getElementById('jokeContainer').innerText;

  try {
    await navigator.clipboard.writeText(jokeText);
    console.log(' copied to clipboard');
  } catch (error) {
    console.error(' fail to copy', error);
  }
};

// for deleteing jokes from local storage

function deleteHeartedJokes() {
  localStorage.removeItem('heartedJokes');
}

let currentJokeIndex = 0;

function displayNextJoke() {
  const heartedJokes = JSON.parse(localStorage.getItem('heartedJokes')) || [];
  if (heartedJokes.length > 0) {
    currentJokeIndex = (currentJokeIndex + 1) % heartedJokes.length;
    // Check if the current joke is hearted and add the "hearted" class accordingly
    const currentJokeText = heartedJokes[currentJokeIndex];
    const heartBtn = document.getElementById('heartBtn');
    if (
      currentJokeText === document.getElementById('jokeContainer').textContent
    ) {
      heartBtn.classList.add('hearted');
    } else {
      heartBtn.classList.remove('hearted');
    }
    displayHeartedJokes();
  }
}

function displayPreviousJoke() {
  const heartedJokes = JSON.parse(localStorage.getItem('heartedJokes')) || [];
  if (heartedJokes.length > 0) {
    currentJokeIndex =
      (currentJokeIndex - 1 + heartedJokes.length) % heartedJokes.length;
    // Check if the current joke is hearted and add the "hearted" class accordingly
    const currentJokeText = heartedJokes[currentJokeIndex];
    const heartBtn = document.getElementById('heartBtn');
    if (
      currentJokeText === document.getElementById('jokeContainer').textContent
    ) {
      heartBtn.classList.add('hearted');
    } else {
      heartBtn.classList.remove('hearted');
    }
    displayHeartedJokes();
  }
}

function displayHeartedJokes() {
  const jokeContainer = document.getElementById('jokeContainer');
  jokeContainer.innerHTML = '';

  const heartedJokes = JSON.parse(localStorage.getItem('heartedJokes')) || [];
  if (heartedJokes.length === 0) {
    jokeContainer.textContent = 'No hearted jokes found.';
    // Remove the "hearted" class to reset the heart icon color
    document.getElementById('heartBtn').classList.remove('hearted');
    // Reset the currentJokeIndex
    currentJokeIndex = 0;
  } else {
    // Show the left and right arrow icons
    jokeContainer.innerHTML = `
      <i class="fa-solid fa-arrow-left" id="prevBtn"></i>
      <p>${heartedJokes[currentJokeIndex]}</p>
      <i class="fa-solid fa-arrow-right" id="nextBtn"></i>
       <i class="fa fa-trash" aria-hidden="true" id="deleteBtn"></i>
    `;

    // Check if the current joke is hearted and add the "hearted" class accordingly
    const currentJokeText = heartedJokes[currentJokeIndex];
    const heartBtn = document.getElementById('heartBtn');
    if (currentJokeText === jokeContainer.textContent) {
      heartBtn.classList.add('hearted');
    } else {
      heartBtn.classList.remove('hearted');
    }

    // Add event listeners for the arrow buttons
    document
      .getElementById('nextBtn')
      .addEventListener('click', displayNextJoke);
    document
      .getElementById('prevBtn')
      .addEventListener('click', displayPreviousJoke);
  }

  document.getElementById('heartBtn').classList.toggle('hearted');
}

document.getElementById('heartBtn').addEventListener('click', () => {
  const jokeContainer = document.getElementById('jokeContainer');
  const jokeText = jokeContainer.innerText;

  // check if already stored in local storage
  const heartedJokes = JSON.parse(localStorage.getItem('heartedJokes')) || [];

  if (!heartedJokes.includes(jokeText)) {
    // If the joke is not in heartedJokes, add it
    heartedJokes.push(jokeText);
    localStorage.setItem('heartedJokes', JSON.stringify(heartedJokes));
    // document.getElementById('heartBtn').classList.add('hearted');
  } else {
    // If the joke is already in heartedJokes, remove it
    const updatedHeartedJokes = heartedJokes.filter(
      (joke) => joke !== jokeText
    );
    localStorage.setItem('heartedJokes', JSON.stringify(updatedHeartedJokes));
    // document.getElementById('heartBtn').classList.remove('hearted');
  }
  document.getElementById('heartBtn').classList.toggle('hearted');
});



document.addEventListener('DOMContentLoaded', () => {
  displayAnyJoke();
});

document.getElementById('anyBtn').addEventListener('click', () => {
  // displayJokes('any');
 displayAnyJoke();

});
// document.getElementById('darkBtn').addEventListener('click', () => {
//   displayJokes('dark');
// });
document.getElementById('punBtn').addEventListener('click', () =>{displayJokes('Pun');
});
document.getElementById('spookyBtn').addEventListener('click', () => {
  displayJokes('Spooky');
});
document.getElementById('CodingBtn').addEventListener('click', () => {
  displayJokes('Programming');
});
// document.getElementById('ChristmasBtn').addEventListener('click', () => {
//   displayJokes('Christmas');
// });

document.getElementById('dadJokesBtn').addEventListener('click', () => {
 displayDadJokes();
});


document.getElementById('copyBtn').addEventListener('click', () => {
  copyToClipboard();
});

// document.getElementById('deleteBtn').addEventListener('click', () => {
//   deleteHeartedJokes();
// });

document.getElementById('likedJokes').addEventListener('click', () => {
  displayHeartedJokes();
});
