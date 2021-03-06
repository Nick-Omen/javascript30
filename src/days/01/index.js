import './style.sass';
import CommonChallenge from '../00';
import clap from './assets/clap.wav';
import hihat from './assets/hihat.wav';
import kick from './assets/kick.wav';
import openhat from './assets/openhat.wav';
import boom from './assets/boom.wav';
import ride from './assets/ride.wav';
import snare from './assets/snare.wav';
import tom from './assets/tom.wav';
import tink from './assets/tink.wav';

const DRUM_BUTTONS = {
  65: {
    key: 'a',
    keyCode: 65,
    name: 'clap',
    audio: clap,
    order: 1
  },
  83: {
    key: 's',
    keyCode: 83,
    name: 'hihat',
    audio: hihat,
    order: 2
  },
  68: {
    key: 'd',
    keyCode: 68,
    name: 'kick',
    audio: kick,
    order: 3
  },
  70: {
    key: 'f',
    keyCode: 70,
    name: 'openhat',
    audio: openhat,
    order: 4
  },
  71: {
    key: 'g',
    keyCode: 71,
    name: 'boom',
    audio: boom,
    order: 5
  },
  72: {
    key: 'h',
    keyCode: 72,
    name: 'ride',
    audio: ride,
    order: 6
  },
  74: {
    key: 'j',
    keyCode: 74,
    name: 'snare',
    audio: snare,
    order: 7
  },
  75: {
    key: 'k',
    keyCode: 75,
    name: 'tom',
    audio: tom,
    order: 8
  },
  76: {
    key: 'l',
    keyCode: 76,
    name: 'tink',
    audio: tink,
    order: 9
  },
};

const PRESETS = {
  0: [
    { keyCode: 75 },
    { keyCode: 75 },
    { keyCode: 76 },
  ],
  1: [
    { keyCode: 71 },
    { keyCode: 70 },
    { keyCode: 71, timeout: 200 },
    { keyCode: 71, timeout: 300 },
    { keyCode: 72 },
  ],
};

class Challenge01 extends CommonChallenge {
  constructor() {
    super();
    this.__template = `<div class="drum-kit">
<ul class="button-list">${Challenge01.renderButtons()}</ul>
<ul class="button-list">${Challenge01.renderPresets()}</ul>
</div>`;
  }

  static renderButtons() {
    const objKeys = Object.keys(DRUM_BUTTONS);
    const order = objKeys.map(key => DRUM_BUTTONS[key].order).sort();

    return order.map(order => {
      let drumButton = DRUM_BUTTONS[objKeys.find(k => DRUM_BUTTONS[k].order === order)];
      return '' +
        `<li class="button-list-item">
          <button class="drum-button" data-key="${drumButton.keyCode}">
            <span class="drum-button-key">${drumButton.key}</span>
            <span class="drum-button-name">${drumButton.name}</span>
          </button>
        </li>`;
    }).join('');
  }

  static renderPresets() {
    return Object.keys(PRESETS).map(k => {
      return '' +
        `<li class="button-list-item">
          <button class="preset-button" data-preset-id="${k}">
            <span class="preset-button-text preset-button-text-index">Preset #${k}</span>
            <span data-value="play" class="preset-button-text preset-button-text-play">Play</span>
            <span data-value="stop" class="preset-button-text preset-button-text-stop">Stop</span>
          </button>
        </li>`;
    });
  }

  static onKeyUp(e) {
    Challenge01.activateDrum(e.keyCode);
  }

  static onClick(e) {
    Challenge01.activateDrum(parseInt(e.currentTarget.getAttribute('data-key'), 10), e.currentTarget);
  }

  static activateDrum(key, node) {

    if (key && DRUM_BUTTONS[key]) {

      if (!node) {
        node = document.querySelector(`button[data-key="${key}"]`);
      }

      node.classList.add('is-playing');

      const audio = new Audio(DRUM_BUTTONS[key].audio);

      audio.play();

      setTimeout(() => {
        node.classList.remove('is-playing');
      }, 200);
    }
  }

  static playPreset(preset, presetId) {
    const toPlay = preset.shift();

    Challenge01.activateDrum(toPlay.keyCode);

    if (preset.length > 0) {
      setTimeout(() => {
        Challenge01.playPreset(preset, presetId);
      }, toPlay.timeout || 400);
    } else {
      document.querySelector(`button[data-preset-id="${presetId}"]`).classList.remove('is-playing');
    }
  }

  static onPresetClick(e) {
    const button = e.currentTarget;
    const presetId = parseInt(button.getAttribute('data-preset-id'), 10);
    button.classList.add('is-playing');

    if (typeof(presetId) === 'number' && !isNaN(presetId)) {
      Challenge01.playPreset(PRESETS[presetId].slice(), presetId);
    } else {
      button.classList.remove('is-playing');
    }
  }

  static enableListeners() {
    window.addEventListener('keyup', Challenge01.onKeyUp);

    const buttons = document.querySelectorAll('.drum-button');

    Array.from(buttons).forEach(button => {
      button.addEventListener('click', Challenge01.onClick);
    });

    const presetButtons = document.querySelectorAll('.preset-button');

    Array.from(presetButtons).forEach(button => {
      button.addEventListener('click', Challenge01.onPresetClick);
    });
  }

  onInit() {
    Challenge01.enableListeners();
  }
}

export default new Challenge01();
