import 'core-js/features/symbol';
import 'core-js/features/array/from';
import 'core-js/features/promise';
import 'intersection-observer';
import './lib/polyfill';

import sayHello from './lib/sayHello';
import setHTMLClassNames from './components/setHTMLClassNames';
import setLazy from './components/setLazy';
import { setVhProperty } from './helpers';
import setPopups from './components/setPopups';
import setOutPadding from './components/setOutPadding';
// import toggleMenu from './components/toggleMenu';


document.addEventListener('DOMContentLoaded', () => {
  sayHello();
  setHTMLClassNames();
  setLazy();
  setVhProperty();
  setPopups();
  setOutPadding();
  // toggleMenu();
});
