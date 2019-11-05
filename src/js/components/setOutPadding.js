import { debounce } from 'throttle-debounce';


export default function setOutPadding() {
  const out = document.querySelector('.out');
  const header = document.querySelector('.header');
  const hero = document.querySelector('.hero');
  if (!hero || !out || !header) return;

  function setPadding() {
    const paddingTop = header.offsetHeight + hero.offsetHeight;
    out.style.paddingTop = `${paddingTop}px`;
  }

  setPadding();

  const onResize = debounce(200, setPadding);

  window.addEventListener('resize', onResize);
}
