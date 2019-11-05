import Popup from 'popup-simple';
import { IS_ACTIVE, NO_SCROLL } from '../constants';

class MyPopup extends Popup {
  constructor(options) {
    super(options);
    this.overlay = null;
    this.out = document.querySelector('.out');
  }
  // eslint-disable-next-line
  get btns() {
    return [...document.querySelectorAll('.js-popup-open')];
  }


  addOverlay() {
    if (!this.out) return;
    this.out.appendChild(this.overlay);
  }

  removeOverlay() {
    if (!this.overlay) return;
    this.overlay.parentNode.removeChild(this.overlay);
  }

  onOpen() {
    this.btn.classList.add(IS_ACTIVE);
    this.addOverlay();
  }

  onClose() {
    this.btn.classList.remove(IS_ACTIVE);
    this.removeOverlay();
    this.btns.forEach((btn) => {
      btn.classList.remove(IS_ACTIVE);
    });
  }

  _createOverlay() {
    this.overlay = document.createElement('div');
    this.overlay.className = 'overlay';
    const out = document.querySelector('.out');
  }

  _handleOverlayClick() {
    document.addEventListener('click', (e) => {
      const overlay = e.target.closest('.overlay');
      if (!overlay) return;


      this.popups.forEach((popup) => {
        popup.classList.remove(IS_ACTIVE);
      });

      this.btns.forEach((btn) => {
        btn.classList.remove(IS_ACTIVE);
      });

      document.body.classList.remove(NO_SCROLL);

      this.removeOverlay();
    });
  }

  init() {
    super.init();
    this._createOverlay();
    this._handleOverlayClick();
  }
}

export default function setPopups() {
  const popup = new MyPopup({
    closeOnOverlayClick: false,
  });
  popup.init();
}
