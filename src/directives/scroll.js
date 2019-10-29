const bindings = new WeakMap();

export default {
  bind(el, binding) {
    const func = event => binding.value(event, el);
    bindings.set(el, func);
    window.addEventListener('scroll', func, { passive: true });
  },
  unbind(el) {
    window.removeEventListener('scroll', bindings.get(el), { passive: true });
  },
};
