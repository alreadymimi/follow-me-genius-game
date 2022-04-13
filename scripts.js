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
	strict: document.querySelector(".strict"),
	start: document.querySelector(".start"),
	pads: document.querySelectorAll(".game_pad")
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
	_console.counter.classList.toggle("console_counter--on")
	_console.counter.innerHTML = "--"

	_data.strict = false;
	_data.playerCanPlay = false;
	_data.score = 0;
	_data.gameSequence = [];
	_data.playerSequence = [];

	disablePads()
	_console.led.classList.remove("console_led--active")
});

_console.strict.addEventListener("click", () => {
	if(!_data.gameOn)
	return;	
	_data.strict = _console.led.classList.toggle("console_led--active")
});

_console.start.addEventListener("click", () => {
	startGame()
});

const padListener = (e) => {

}

_console.pads.forEach(pad => {
	pad.addEventListener("click", padListener);
});

const startGame = () => {
	blink("--", () => {
		newColor()
	})
}

const setScore = () => {
	const score = _data.score.toString();
	const display = "00".substring(0, 2 - score.length) + score;
	_console.counter.innerHTML = display;
}

const newColor = () => {
	_data.gameSequence.push(Math.floor(Math.random() * 4));
	_data.score++;

	setScore();
}

const playSequence = () => {

}

//text é o que aparece enquanto pisca e callback a funcao que vai ser executada apos
const blink = (text, callback) => {
	let counter = 0,
		on = true;

	_console.counter.innerHTML = text;

	const interval = setInterval(() => {
		if(on) {
			_console.counter.classList.remove("console_counter--on")
		}else {
			_console.counter.classList.add("console_counter--on")
			if(++counter === 3){
				clearInterval(interval);
				callback();
			}
		}
		on = !on;
	}, 250);
}

const waitForPlayerClick = () => {

}

const resetOrPlayAgain = () => {

}

const changePadCursor = (cursorType) => {

}

const disablePads = () => {
	_console.pads.forEach(pad => {
		pad.classList.remove("game_pad--active")
	})
}