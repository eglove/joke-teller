const button = document.getElementById('button');
const audioElement = document.getElementById('audio');

function toggleButton() {
	button.disabled = !button.disabled;
}

function tellMe(joke) {
	VoiceRSS.speech({
		key: '4961d960b9ba47edb7fceb20806cffda',
		src: joke,
		hl: 'en-us',
		v: 'Linda',
		r: 0,
		c: 'mp3',
		f: '44khz_16bit_stereo',
		ssml: false
	});
}

async function getJokes() {
	let joke = '';
	const apiUrl = 'https://sv443.net/jokeapi/v2/joke/Programming?blacklistFlags=nsfw,religious,political,racist,sexist';
	try {
		const response = await fetch(apiUrl);
		const data = await response.json();

		if(data.setup) {
			joke = `${data.setup} ... ${data.delivery}`;
		} else {
			joke = data.joke;
		}

		tellMe(joke);
		toggleButton();
	} catch (e) {
		console.log('Failed to get joke.', e);
	}
}

button.addEventListener('click', getJokes);
audioElement.addEventListener('ended', toggleButton);
