var character = 15;
const BASE_URL = "https://rickandmortyapi.com/api/character/";
var episodeNames = [];

const getNames = async () => {
	try {
		const data = await fetch(BASE_URL + character);
		const json = await data.json();
		return json.name;
	} catch (e) {
		console.log(e.message);
	}
};

const getImages = async () => {
	try {
		const data = await fetch(BASE_URL + character);
		const json = await data.json();
		return json.image;
	} catch (e) {
		console.log(e.message);
	}
};

const getEpisodeName = async () => {
    const EPISODE_URL = 'https://rickandmortyapi.com/api/episode/'
    try {
        const data = await fetch(BASE_URL + character);
		const json = await data.json();
        let episodes = json.episode;
        episodeNames = [];
        
        for (let i = 0; i < episodes.length; i++) {
            var episodeNumber = new URL(episodes[i]).pathname.substring(13,16);
            var result = parseInt(episodeNumber);
            const dataEpisode = await fetch(EPISODE_URL + result);
            const dataJson = await dataEpisode.json();
            episodeNames.push("<ul>" + "<li>" + dataJson.name + "</li>" + "</ul>");
        }
            return episodeNames.join("");

    } catch (e) {
		console.log(e.message);
	}
}

const loadData = async () => {
    character = Math.floor(Math.random() * 827);
	var img = document.getElementsByTagName('img')[0];
	img.src = await getImages();
    var title = document.getElementsByTagName('h1')[0];
    title = title.innerHTML = await getNames();
    var freitass = document.getElementsByTagName('h4')[0];
    freitass = freitass.innerHTML = ("<h3>Episodes:</h3> " +await getEpisodeName());
};

loadData();

const btn = document.getElementById('change-cat');
btn.addEventListener('click', loadData);