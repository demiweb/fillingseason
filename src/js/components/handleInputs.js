import { HAS_FOCUS, HAS_TEXT } from '../constants';

const INPUT = 'js-input';
const BTN = 'js-input-btn';

class Input {
  constructor() {
    this.inputs = [...document.querySelectorAll(`.${INPUT}`)];
  }

  get wrap() {
    if (this.input) return this.input.closest('.input') || this.input.closest('.textarea');
    if (this.btn) return this.btn.closest('.input') || this.btn.closest('.textarea');
    return null;
  }

  get passwordInputs() {
    return this.inputs.filter((input) => input.dataset.type === 'password');
  }

  get textInputs() {
    return this.inputs.filter((input) => input.dataset.type !== 'password');
  }

  checkValue() {
    if (this.input.value.length >= 1) {
      this.wrap.classList.add(HAS_TEXT);
    } else {
      this.wrap.classList.remove(HAS_TEXT);
    }
  }

  onFocusHandler(e) {
    this.input = e.target.closest(`.${INPUT}`);
    if (!this.input) return;

    this.wrap.classList.add(HAS_FOCUS);
    this.checkValue();
  }

  onBLurHandler(e) {
    if (this.wrap) this.wrap.classList.remove(HAS_FOCUS);
  }

  onInputHandler(e) {
    this.input = e.target.closest(`.${INPUT}`);
    if (!this.input) return;

    this.checkValue();
  }

  onCLickHandler(e) {
    this.btn = e.target.closest(`.${BTN}`);
    this.input = null;
    if (!this.btn) return;
    e.preventDefault();

    this.input = this.wrap.querySelector(`.${INPUT}`);

    if (this.input.dataset.type === 'password') {
      const types = ['password', 'text'];

      this.input.type = types.filter((type) => type !== this.input.type);
    } else {
      this.input.value = '';
      this.checkValue();
    }
  }

  _addListeners() {
    if (this.textInputs.length > 0) {
      this.onFocus = this.onFocusHandler.bind(this);
      this.onInput = this.onInputHandler.bind(this);
      this.onCLick = this.onCLickHandler.bind(this);
      this.onBLur = this.onBLurHandler.bind(this);

      document.addEventListener('focus', this.onFocus, true);
      document.addEventListener('input', this.onInput, true);
      document.addEventListener('click', this.onCLick);
      document.addEventListener('blur', this.onBLur, true);
    }

    if (this.passwordInputs.length > 0) {
      this.onCLick = this.onCLickHandler.bind(this);

      document.addEventListener('click', this.onCLick);
    }
  }

  _addInputClasses() {
    if (!this.textInputs.length) return;

    this.textInputs.forEach((input) => {
      this.input = input;
      this.checkValue();
    });
  }

  init() {
    if (!this.inputs.length) return;
    this._addInputClasses();
    this._addListeners();
  }
}

export default function handleInputs() {
  const input = new Input();
  input.init();
}
