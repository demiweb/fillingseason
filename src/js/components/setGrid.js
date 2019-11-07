class Grid {
  constructor(grid) {
    this.grid = grid;
    this.items = [...grid.children];
    this.scaleState = grid.dataset.scale || 'vertical';
  }

  get lastItem() {
    return this.items[this.items.length - 1];
  }

  scaleLastItem() {
    this.lastItem.style.width = '100%';
  }

  scaleLeftItem() {
    this.sclaleItem = this.items[this.items.length - 3];

    this.scaleImg = this.sclaleItem.querySelector('.product-img__img');
    const style = window.getComputedStyle(this.scaleImg);
    const { width, height } = this.scaleImg.getBoundingClientRect();
    const paddingTop = `${Math.round((height / width) * 100 * 2)}%`;

    this.scaleImg.style.paddingTop = `calc(${paddingTop} + 1em)`;
    this.lastItem.style.float = 'right';
  }

  _setGrid() {
    if (this.scaleState === 'horizontal') this.scaleLastItem();
    if (this.scaleState === 'vertical') this.scaleLeftItem();
  }

  init() {
    if (this.items.length % 2 === 0 || this.items.length < 2) return;
    this._setGrid();
  }
}

export default function setGrid() {
  const layouts = [...document.querySelectorAll('.js-grid')];
  if (!layouts.length) return;

  layouts.forEach((layout) => {
    const grid = new Grid(layout);
    grid.init();
  });
}
