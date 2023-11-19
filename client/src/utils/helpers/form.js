// import { classNames, styleNames } from '../constants/global';

// function isButtonDisabled(inputs, errors) {
//   return Object.values(inputs).some(x => !x) || errors.some(x => x);
// };

function scrollToTop() {
  window.scrollTo({ behavior: 'smooth', top: 0 });
};

// function cancelForm(target) {
//   let targetElement = '';

//   if (target.classList.contains(classNames.FORM_WIDTH)) {
//     targetElement = target.parentElement;
//   }
//   else {
//     targetElement = target.parentElement.parentElement.parentElement;
//   }

//   targetElement.style.display = styleNames.NONE;
// }

export default {
  scrollToTop,
};
