import Popup from 'popup-simple';
import { debounce } from 'throttle-debounce';
import { IS_ACTIVE, NO_SCROLL } from '../constants';

class MyPopup extends Popup {
  constructor(options) {
    super(options);
    this.overlay = null;
    this.out = document.querySelector('.out');
    this.state = {};
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
    if (this.overlay && this.overlay.parentNode) {
      this.overlay.parentNode.removeChild(this.overlay);
    }
  }

  onOpen() {
    this.state.open = true;
    this.btn.classList.add(IS_ACTIVE);
    this.addOverlay();
    this.centerPopup();
  }

  onClose() {
    this.btn.classList.remove(IS_ACTIVE);
    this.removeOverlay();
    this.btns.forEach((btn) => {
      btn.classList.remove(IS_ACTIVE);
    });
    this.state.open = false;
  }

  closeAll() {
    this.popups.forEach((popup) => {
      popup.classList.remove(IS_ACTIVE);
    });

    this.btns.forEach((btn) => {
      btn.classList.remove(IS_ACTIVE);
    });

    document.body.classList.remove(NO_SCROLL);

    this.removeOverlay();
    this.state.open = false;
  }

  centerPopup() {
    if (!this.state.open) return;
    if (!window.matchMedia('(min-width: 576px)').matches) {
      if (this.popup) {
        this.popup.style.marginTop = '';
        this.popup.style.marginLeft = '';
      }
      return;
    }

    if (this.popup.classList && this.popup.classList.contains('popup')) {
      const { width, height } = {
        width: this.popup.offsetWidth,
        height: this.popup.offsetHeight,
      };

      this.popup.style.marginTop = `${-height / 2}px`;
      this.popup.style.marginLeft = `${-width / 2}px`;
    }
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

      this.closeAll();
    });
  }

  resize() {
    this.centerPopup();
  }

  _resize() {
    this.onResize = debounce(200, this.resize.bind(this));
    window.addEventListener('resize', this.onResize);
  }

  init() {
    super.init();
    this._createOverlay();
    this._handleOverlayClick();
    this._resize();
  }
}

const popup = new MyPopup({
  closeOnOverlayClick: false,
});
export default popup;
