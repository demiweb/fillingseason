import 'core-js/features/symbol';
import 'core-js/features/array/from';
import 'core-js/features/promise';
import 'intersection-observer';
import './lib/polyfill';
import Stickyfill from 'stickyfilljs';

import sayHello from './lib/sayHello';
import setHTMLClassNames from './components/setHTMLClassNames';
import setLazy from './components/setLazy';
import { setVhProperty } from './helpers';
import popup from './components/setPopups';
import setOutPadding from './components/setOutPadding';
import toggleMenu from './components/toggleMenu';
import setAccordion from './components/setAccordion';
import setSelects from './components/select/setSelects';
import handleInputs from './components/handleInputs';
import setGrid from './components/setGrid';

document.addEventListener('DOMContentLoaded', () => {
  sayHello();
  setHTMLClassNames();
  setLazy();
  setVhProperty();
  const elements = document.querySelectorAll('.js-sticky-polyfill');
  Stickyfill.add(elements);

  popup.init();
  setOutPadding();
  toggleMenu();
  setAccordion();
  setSelects();
  handleInputs();
  setGrid();
});
