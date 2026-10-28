// Runs before first paint, so keep it tiny and dependency free.
// 1. "js" lets CSS hide scroll reveals only when JavaScript can show them again.
// 2. An explicit theme choice from a previous visit is applied before the first paint.
;(function () {
  var root = document.documentElement
  if ('IntersectionObserver' in window) root.classList.add('js')
  try {
    var theme = localStorage.getItem('theme')
    if (theme === 'light' || theme === 'dark') root.setAttribute('data-theme', theme)
  } catch (error) {
    // Storage blocked: fall back to the system theme.
  }
})()
