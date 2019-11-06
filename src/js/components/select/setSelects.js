import Select from 'select-custom';
import addPlaceholder from './addPlaceholder';

class CustomSelect extends Select {
  constructor(select, props) {
    super(select, props);
    this.name = select.dataset.type || 'default';
  }

  // get selectedOptions() {
  //   return [...this.el.options].filter((option) => {
  //     if (option.selected && option.value !== 'placeholder') {
  //       return option;
  //     }
  //     return null;
  //   });
  // }

  init() {
    if (
      this.select.classList
      && this.select.classList.contains('custom-select')
    ) {
      return;
    }
    super.init();

    addPlaceholder.call(this);
  }
}

export default function setSelects() {
  const selects = [...document.querySelectorAll('.js-select')];
  if (!selects.length) return;

  const props = {
    default: {},
  };

  selects.forEach((select) => {
    const name = select.dataset.type || 'default';
    const customSelect = new CustomSelect(select, props[name]);
    customSelect.init();
  });
}
