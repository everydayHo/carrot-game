'use strict';

import PopUp from './popup.js';
import { GameBuilder, Reason } from './game.js';
import * as sound from './sound.js';

const gameFinshBanner = new PopUp();

const game = new GameBuilder()
	.gameDuration(5)
	.carrotCount(6)
	.bugCount(8)
	.build();
game.setGameListener((reason) => {
	let message;
	switch (reason) {
		case Reason.cancel:
			message = 'Replay?';
			sound.playAlert();
			break;
		case Reason.win:
			message = 'YOU WON';
			sound.playWin();
			break;
		case Reason.lose:
			message = 'YOU LOST';
			sound.playBug();
			break;
		default:
			throw new Error('not valid reason');
	}
	gameFinshBanner.showWithText(message);
});

gameFinshBanner.setClickListener(() => {
	game.start();
});
