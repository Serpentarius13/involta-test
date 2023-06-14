import { Ref, onMounted } from "vue";

export const useIntersectionObserver = (
  target: Ref<HTMLElement | null | undefined>,
  callback: (...args: any[]) => any
) => {
  onMounted(() => {
    if (!target.value) return;
    const options = {
      root: null,
      rootMargin: "10px",
      threshold: 0.5,
    };

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        callback();
      }
    }, options);

    observer.observe(target.value);
  });
};
