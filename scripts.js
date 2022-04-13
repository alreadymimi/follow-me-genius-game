const _data = {
	gameOn: false,
	timeout: undefined,
	sounds: [],

	strict: false,
	playerCanPlay: false,
	score: 0,
	gameSequence: [],
	playerSequence: []
};

const _console = {
	counter: document.querySelector(".console_counter"),
	switch: document.querySelector(".console_btn-switch"),
	led: document.querySelector(".console_led"),
	strict: document.querySelector(".console_btn strict"),
	start: document.querySelector(".console_btn start"),
	pads: document.querySelectorAll(".game")
}

const _soundUrls = [
	"audio/simonSound1.mp3",
	"audio/simonSound2.mp3",
	"audio/simonSound3.mp3",
	"audio/simonSound4.mp3"
];

_soundUrls.forEach(sndPath => {
	const audio = new Audio(sndPath);
	_data.sounds.push(audio);
});

_console.switch.addEventListener("click", () => {
	_data.gameOn = _console.switch.classList.toggle("console_btn-switch--on")
});

_console.strict.addEventListener("click", () => {

});

_console.start.addEventListener("click", () => {

});

const padListener = (e) => {

}

_console.pads.forEach(pad => {
	pad.addEventListener("click", padListener);
});

const startGame = () => {

}

const setScore = () => {

}

const newColor = () => {

}

const playSequence = () => {

}

const blink = (text, callback) => {

}

const waitForPlayerClick = () => {

}

const resetOrPlayAgain = () => {

}

const changePadCursor = (cursorType) => {

}

const disablePads = () => {

}