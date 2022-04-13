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
	"audio/Sound1.mp3",
	"audio/Sound2.mp3",
	"audio/Sound3.mp3",
	"audio/Sound4.mp3"
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

	disablePads();
	changePadCursor("auto");

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
	if(!_data.playerCanPlay)
	return
	let soundId;
	_console.pads.forEach((pad, key) => {
		if(pad === e.target)
			soundId = key
	})
	e.target.classList.add("game_pad--active");

	_data.sounds[soundId].play();
	_data.playerSequence.push(soundId);

	setTimeout(() => {
		e.target.classList.remove("game_pad--active");
	
		const currentMove = _data.playerSequence.length - 1;
	
		if (_data.playerSequence[currentMove] !== _data.gameSequence[currentMove]){
			_data.playerCanPlay = false;
			disablePads();
			resetOrPlayAgain();
		} else if(currentMove === _data.gameSequence.length - 1) {
			newColor();
			playSequence();
		}
		waitForPlayerClick();		
	}, 250)
}

_console.pads.forEach(pad => {
	pad.addEventListener("click", padListener);
});

const startGame = () => {
	blink("--", () => {
		newColor();
		playSequence();
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
	let counter = 0,
		padOn = true

	_data.playerSequence = [];
	_data.playerCanPlay = false;

	changePadCursor("auto");

	const interval = setInterval(() => {
		if(!_data.gameOn){
			clearInterval(interval);
			disablePads();
			return
		}
		if(padOn){
			if(counter === _data.gameSequence.length){
				clearInterval(interval);
				disablePads();
				waitForPlayerClick();
				changePadCursor("pointer");
				_data.playerCanPlay = true;
				return
			}
			const sndId = _data.gameSequence[counter];
			const pad = _console.pads[sndId];

			_data.sounds[sndId].play();
			pad.classList.add("game_pad--active");
			counter++;
		} else{
			disablePads();
		}
		padOn = !padOn;
	}, 750)
}

//text aparece enquanto pisca e callback a funcao que vai ser executada apos
const blink = (text, callback) => {
	let counter = 0,
		on = true;

	_console.counter.innerHTML = text;

	const interval = setInterval(() => {
		if(!_data.gameOn){
			clearInterval(interval);
			_console.counter.classList.remove("console_counter--on");
			return;
		}
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
	clearTimeout(_data.timeout);

	_data.timeout = setTimeout(() => {
		if(!_data.playerCanPlay)
			return
	
		disablePads();
		resetOrPlayAgain();
	}, 5000)
}

const resetOrPlayAgain = () => {
	_data.playerCanPlay = false;

	if(_data.strict){
		blink("!!", () => {
			_data.score = 0;
			_data.gameSequence = [];
			startGame()
		})
	} else {
		blink("!!", () => {
			setScore();
			playSequence()
		})
	}
}

const changePadCursor = (cursorType) => {
	_console.pads.forEach(pad => {
		pad.style.cursor = cursorType
	})
}

const disablePads = () => {
	_console.pads.forEach(pad => {
		pad.classList.remove("game_pad--active")
	})
}