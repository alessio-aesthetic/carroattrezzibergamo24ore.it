
(() => {
  const key = 'privacy-preferences-v2';
  const root = document.createElement('section');
  root.setAttribute('aria-label', 'Privacy e cookie');
  const shadow = root.attachShadow({ mode: 'open' });
  const privacy = document.querySelector('a[href="/cookie/"],a[href="/privacy/"],a[href="/privacy"],a[href="/cookie"]');
  const ads = document.currentScript?.dataset.ads;
  let choice;
  try { choice = localStorage.getItem(key); } catch {}
  shadow.innerHTML = '<style>:host{position:fixed;inset:auto auto calc(4.75rem + env(safe-area-inset-bottom)) 12px;z-index:2147483000;color:#17212b;font:13px/1.4 system-ui}div{box-sizing:border-box;width:min(310px,calc(100vw - 24px));background:#fff;border:1px solid #ccd4dc;border-radius:12px;padding:11px 13px;box-shadow:0 5px 20px #1112}p{margin:4px 0 8px}button,a{font:inherit;color:#183a57}button{cursor:pointer;background:#f5f8fa;border:1px solid #aab9c6;border-radius:6px;padding:5px 8px}button+button{margin-left:6px}button:focus-visible,a:focus-visible{outline:2px solid #14569a;outline-offset:2px}[hidden]{display:none}</style><div><strong>Privacy e cookie</strong><p></p><button type="button"></button><button type="button" hidden>Consenti pubblicità</button></div><button type="button" hidden>Preferenze cookie</button>';
  const box = shadow.querySelector('div');
  const message = shadow.querySelector('p');
  const [dismiss, accept, reopen] = shadow.querySelectorAll('button');
  message.textContent = ads ? 'Gli strumenti pubblicitari si attivano solo se li consenti. ' : 'Il sito può usare tecnologie necessarie al funzionamento. ';
  if (privacy) {
    const link = document.createElement('a');
    link.href = privacy.href;
    link.textContent = 'Informativa';
    message.append(link);
  }
  dismiss.textContent = ads ? 'Solo necessari' : 'Chiudi';
  accept.hidden = !ads;
  const show = (visible) => { box.hidden = !visible; reopen.hidden = visible || !ads; };
  function enableAds() {
    if (!ads || document.getElementById('privacy-ads-tag')) return;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('js', new Date());
    window.gtag('config', ads);
    const tag = document.createElement('script');
    tag.id = 'privacy-ads-tag';
    tag.async = true;
    tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(ads);
    document.head.append(tag);
  }
  function save(value) {
    const wasAllowed = choice === 'allow';
    choice = value;
    try { localStorage.setItem(key, value); } catch {}
    show(false);
    if (value === 'allow') enableAds();
    if (wasAllowed && value !== 'allow') {
      window['ga-disable-' + ads] = true;
      window.gtag?.('consent', 'update', { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'denied' });
      location.reload();
    }
  }
  dismiss.onclick = () => save('necessary');
  accept.onclick = () => save('allow');
  reopen.onclick = () => { show(true); dismiss.focus(); };
  show(!choice);
  if (choice === 'allow') enableAds();
  document.body.append(root);
})();
