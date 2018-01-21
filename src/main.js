/*
 * MultiTasking Cubes - Games Demos
 * Copyright (C) 2017-2018 - Miguel Reboiro-Jato, Andrés Vieira Vázquez,
 * Adolfo Piñón Blanco, Hugo López-Fernández, Rosalía Laza Fidalgo,
 * Reyes Pavón Rial, Francisco Otero Lamas, Adrián Varela Pomar,
 * Carlos Spuch Calvar, and Tania Rivera Baltanás
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */
// eslint-disable-next-line import/no-unresolved
import 'pixi';
import 'p2';


import GameConfig from '@sing-group/mtc-games/src/game/GameConfig';
import GameBuilder from '@sing-group/mtc-games/src/game/GameBuilder';
import VerbalFluencyGameMetadata from '@sing-group/mtc-games/src/game/verbal_fluency/VerbalFluencyGameMetadata';
import VerbalFluencyGameCallback from '@sing-group/mtc-games/src/game/verbal_fluency/VerbalFluencyGameCallback';
import RecognitionGameMetadata from '@sing-group/mtc-games/src/game/recognition/RecognitionGameMetadata';
import RecognitionGameCallback from '@sing-group/mtc-games/src/game/recognition/RecognitionGameCallback';

let locale;

if (window.navigator.languages) {
  locale = window.navigator.languages[0].substr(0, 2).toLowerCase();
} else {
  locale = window.navigator.language.substr(0, 2).toLowerCase();
}

switch (locale) {
  case 'en':
    locale = 'en_US';
    break;
  case 'es':
    locale = 'es_ES';
    break;
  case 'gl':
    locale = 'gl_ES';
    break;
  default:
    locale = 'en_US';
}

const builder = new GameBuilder();

// region Test VerbalFluency
const gameConfig1 = GameConfig.forMetadata(
  new VerbalFluencyGameMetadata(),
  VerbalFluencyGameCallback.buildWith({
    gameStarted() {
      console.log('Verbal Fluency started');
    },
    gameFinished() {
      console.log('Verbal Fluency finished');
    },
    wordReset() {
      console.log('Verbal Fluency word checked');
    },
    wordChecked() {
      console.log('Verbal Fluency word reset');
    }
  })
);
gameConfig1.width = 800;
gameConfig1.height = 600;
gameConfig1.time = 60;
gameConfig1.domId = 'div1';
gameConfig1.locale = locale;

builder.buildGame(gameConfig1);

// endregion

// region Test RecognitionGame
const gameConfig2 = GameConfig.forMetadata(
  new RecognitionGameMetadata(),
  RecognitionGameCallback.buildWith({
    gameStarted() {
      console.log('Recognition started');
    },
    gameFinished() {
      console.log('Recognition finished');
    }
  })
);
gameConfig2.width = 800;
gameConfig2.height = 600;
gameConfig2.time = 60;
gameConfig2.domId = 'div2';
gameConfig2.locale = locale;
gameConfig2.timePerElement = 3;
gameConfig2.numberOfElements = 2;
gameConfig2.numberOfTries = 2;
gameConfig2.responseIntroduction = RecognitionGameMetadata.RESPONSE_TYPES[0];

builder.buildGame(gameConfig2);

// endregion