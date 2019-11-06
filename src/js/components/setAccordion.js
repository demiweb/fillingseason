import { IS_ACTIVE } from '../constants';

class Accordion {
  init() {
    document.addEventListener('click', this._toggleAccordion.bind(this));
  }

  _toggleAccordion(e) {
    this.title = e.target.closest(`.${Accordion.classNames.title}`);
    if (!this.title) return;

    e.preventDefault();

    this.wrap = this.title.closest(`.${Accordion.classNames.wrap}`);
    this.name = this.title.getAttribute('data-accordion-title');
    this.content = this.name
      ? this.wrap.querySelector(`[data-accordion-item="${this.name}"]`)
      : this.title.nextElementSibling;


    this.title.classList.toggle(IS_ACTIVE);
    this.content.classList.toggle(IS_ACTIVE);

    // slideToggle(this.content);

    if (this.onToggle) {
      this.onToggle();
    }
  }
}

Accordion.classNames = {
  wrap: 'js-accordion',
  title: 'js-accordion-title',
  content: 'js-accordion-content',
};

export default function setAccordion() {
  const accordion = new Accordion();
  accordion.init();
}
