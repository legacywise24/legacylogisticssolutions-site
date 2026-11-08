(function () {
  'use strict';
  var STORAGE_KEY = 'lw_offer_seen';
  var CAP_MS = 30 * 24 * 60 * 60 * 1000; // 30 days
  var DELAY_MS = 45000; // 45 seconds
  var shown = false;
  var timer = null;

  function capIsActive() {
    try {
      var raw = window.localStorage.getItem(STORAGE_KEY);
      if (!raw) return false;
      var seenAt = parseInt(raw, 10);
      if (isNaN(seenAt)) return false;
      return (Date.now() - seenAt) < CAP_MS;
    } catch (e) {
      return false;
    }
  }

  function markSeen() {
    try {
      window.localStorage.setItem(STORAGE_KEY, String(Date.now()));
    } catch (e) {}
  }

  // Do not show at all while the 30-day cap is active.
  if (capIsActive()) return;

  function sourcePageSlug() {
    var path = window.location.pathname || '/';
    path = path.replace(/\/+$/, '');
    var file = path.slice(path.lastIndexOf('/') + 1) || 'index';
    file = file.replace(/\.html?$/i, '');
    if (!file) file = 'index';
    return encodeURIComponent(file);
  }

  function dismiss(card) {
    markSeen();
    if (card && card.parentNode) card.parentNode.removeChild(card);
  }

  function showOffer() {
    if (shown) return;
    shown = true;
    if (timer) { clearTimeout(timer); timer = null; }
    document.removeEventListener('mouseout', onExitIntent);
    // Showing counts as seen for the 30-day cap, as does dismissing.
    markSeen();

    var style = document.createElement('style');
    style.textContent = '#lw-offer-card{position:fixed;right:20px;bottom:20px;z-index:9999;width:340px;max-width:calc(100vw - 40px);background:#0f2747;color:#ffffff;border:1px solid #c9a227;border-top:4px solid #c9a227;border-radius:12px;box-shadow:0 12px 32px rgba(0,0,0,.35);padding:20px 20px 16px;font-family:Arial,Helvetica,sans-serif;text-align:left;box-sizing:border-box}#lw-offer-card h2{margin:0 28px 8px 0;font-size:20px;line-height:1.25;color:#ffffff}#lw-offer-card p{margin:0 0 14px;font-size:15px;line-height:1.55;color:#e8ecf3}.lw-offer-button{display:block;text-align:center;background:#c9a227;color:#0f2747;text-decoration:none;font-weight:bold;font-size:16px;padding:11px 14px;border-radius:8px}.lw-offer-button:hover{background:#d9b64a}.lw-offer-close{position:absolute;top:8px;right:10px;background:transparent;border:0;color:#ffffff;font-size:22px;line-height:1;cursor:pointer;padding:4px}.lw-offer-dismiss{display:block;margin:10px auto 0;background:transparent;border:0;color:#c9cdd6;text-decoration:underline;font-size:13px;cursor:pointer;padding:4px}';
    document.head.appendChild(style);

    var card = document.createElement('div');
    card.id = 'lw-offer-card';
    card.setAttribute('role', 'dialog');
    card.setAttribute('aria-label', 'Before you go - free cost-reduction audit offer');

    var closeButton = document.createElement('button');
    closeButton.type = 'button';
    closeButton.className = 'lw-offer-close';
    closeButton.setAttribute('aria-label', 'Close offer');
    closeButton.textContent = '\u00d7';
    closeButton.addEventListener('click', function () { dismiss(card); });

    var heading = document.createElement('h2');
    heading.textContent = 'Before you go \u2014';

    var body = document.createElement('p');
    body.textContent = 'Get a free cost-reduction audit. We review your supply, shipping, and service spend and find the savings \u2014 our fee is 50% of verified first-year savings only, and $0 if we find none.';

    var button = document.createElement('a');
    button.className = 'lw-offer-button';
    button.textContent = 'Request a Free Audit';
    button.href = 'https://tally.so/r/NqD4rl?utm_source=website&utm_medium=exit-offer&utm_campaign=cost-audit&source_page=' + sourcePageSlug();
    button.target = '_blank';
    button.rel = 'noopener';

    var dismissButton = document.createElement('button');
    dismissButton.type = 'button';
    dismissButton.className = 'lw-offer-dismiss';
    dismissButton.textContent = 'No thanks';
    dismissButton.addEventListener('click', function () { dismiss(card); });

    card.appendChild(closeButton);
    card.appendChild(heading);
    card.appendChild(body);
    card.appendChild(button);
    card.appendChild(dismissButton);
    document.body.appendChild(card);
  }

  function onExitIntent(event) {
    if (!event.relatedTarget && event.clientY <= 0) showOffer();
  }

  document.addEventListener('mouseout', onExitIntent);
  timer = setTimeout(showOffer, DELAY_MS);
})();
