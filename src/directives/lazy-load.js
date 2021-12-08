const event = new Event('visible');

const options = {
  root: null,
  rootMargin: '0px',
  threshold: 0.2,
};

const callback = (entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      observer.unobserve(entry.target);
      entry.target.dispatchEvent(event);
    }
  });
};

const observer = new IntersectionObserver(callback, options);

export default {
  mounted(el) {
    observer.observe(el);
  },
};
