export const trackPageView = (path) => {
  if (window.gtag) {
    window.gtag('config', 'G-H9GF4C67EJ', {
      page_path: path,
    });
  }
};