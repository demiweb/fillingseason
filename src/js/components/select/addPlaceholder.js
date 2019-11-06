export default function addPlaceholder() {
  const HAS_PLACEHOLDER = 'has-placeholder';

  [...this.el.options].forEach((option) => {
    if (option.value === 'placeholder') {
      this.select.classList.add(HAS_PLACEHOLDER);
    }
  });

  this.el.addEventListener('change', (e) => {
    if (e.currentTarget.value !== 'placeholder') {
      this.select.classList.remove(HAS_PLACEHOLDER);
    }
  });
}
