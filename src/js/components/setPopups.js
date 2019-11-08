import Popup from 'popup-simple';
import { debounce } from 'throttle-debounce';
import { IS_ACTIVE, NO_SCROLL } from '../constants';

const IS_RELATIVE = 'is-relative';
const HAS_RELATIVE_HEADER = 'has-relative-header';

class MyPopup extends Popup {
  constructor(options) {
    super(options);
    this.overlay = null;
    this.out = document.querySelector('.out');
    this.state = {};
    this.dom = {
      header: document.querySelector('.header'),
      out: document.querySelector('.out'),
    };
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

  makeHeaderFixed() {
    if (this.dom.out) this.dom.out.classList.remove(HAS_RELATIVE_HEADER);
    if (this.dom.header) this.dom.header.classList.remove(IS_RELATIVE);
  }

  makeHeaderRelative() {
    if (window.pageYOffset > 0) document.documentElement.scrollTop = 0;
    if (this.dom.out) this.dom.out.classList.add(HAS_RELATIVE_HEADER);
    if (this.dom.header) this.dom.header.classList.add(IS_RELATIVE);
  }

  onOpen() {
    this.state.open = true;
    if (this.btn) this.btn.classList.add(IS_ACTIVE);

    if (this.popup.classList && this.popup.classList.contains('popup__wrap')) return;
    this.addOverlay();
    this.centerPopup();
    this.handleOverflow();
  }

  onClose() {
    if (this.btn) this.btn.classList.remove(IS_ACTIVE);
    this.removeOverlay();
    this.btns.forEach((btn) => {
      btn.classList.remove(IS_ACTIVE);
    });

    this.makeHeaderFixed();
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
    this.makeHeaderFixed();
    this.state.open = false;
  }

  centerPopup() {
    if (!this.state.open) return;
    if (this.popup.classList && this.popup.classList.contains('popup__wrap')) return;
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

  handleOverflow() {
    if (!this.state.open) return;
    if (this.popup.classList && this.popup.classList.contains('popup__wrap')) return;

    const { top, height } = this.popup.getBoundingClientRect();
    const headerHeight = this.dom.header.offsetHeight;
    this.isOverflowing = top + height + headerHeight >= window.innerHeight;


    if (this.isOverflowing) {
      document.body.classList.remove(NO_SCROLL);
      this.makeHeaderRelative();
    } else {
      if (this.options.toggleBodyClass) document.body.classList.add(NO_SCROLL);
      this.makeHeaderFixed();
    }
  }

  resize() {
    this.centerPopup();
    this.handleOverflow();
  }

  openTarget(target) {
    this.name = target.dataset.popup;
    this.popup = target;
    this.btn = document.querySelector(`.js-popup-open[data-popup-target="${this.name}"]`);

    if (!this.popup) return;
    this.closeBtns = [...this.popup.querySelectorAll('.js-popup-close')];

    const openedPopups = [...document.querySelectorAll(`.js-popup:not([data-popup="${this.name}"])`)];

    if (openedPopups.length > 0) {
      openedPopups.forEach((popup) => {
        popup.classList.remove(IS_ACTIVE);
      });
    }

    this.popup.classList.add(IS_ACTIVE);
    if (this.options.toggleBodyClass) {
      document.body.classList.add(NO_SCROLL);
    }

    if (this.onOpen) {
      this.onOpen();
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

  _resize() {
    this.onResize = debounce(200, this.resize.bind(this));
    window.addEventListener('resize', this.onResize);
  }

  _handleActivePopup() {
    [this.openPopup] = this.popups.filter((popup) => popup.classList
      && popup.classList.contains(IS_ACTIVE));

    if (!this.openPopup) return;

    this.state.open = true;
    this.popup = this.openPopup;
    this.name = this.popup.dataset.popup;
    this.btn = document.querySelector(`.js-popup-open[data-popup-target="${this.name}"]`);

    if (this.options.toggleBodyClass) document.body.classList.add(NO_SCROLL);
    if (this.popup.classList && this.popup.classList.contains('popup__wrap')) return;
    this.addOverlay();
    this.centerPopup();
  }

  init() {
    super.init();
    this._createOverlay();
    this._handleOverlayClick();
    this._resize();
    this._handleActivePopup();
  }
}

const popup = new MyPopup({
  // closeOnOverlayClick: false,
});
export default popup;
