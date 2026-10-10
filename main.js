// Lightweight inquiry flow for the static GitHub Pages site.
// No submission API or storage. Visitor reviews and sends the draft in their email app.
const BUSINESS_CONTACT_EMAIL = "1102847670py@gmail.com";
(() => {
  for (const form of document.querySelectorAll('form[data-delivery="email-draft"]')) {
    const notice = document.createElement('p');
    notice.className = 'formfine';
    notice.setAttribute('role', 'status');
    notice.setAttribute('aria-live', 'polite');
    form.appendChild(notice);

    form.addEventListener('submit', event => {
      event.preventDefault();
      if (!form.reportValidity()) return;

      const fields = Array.from(new FormData(form).entries())
        .filter(([key]) => key !== 'consent')
        .map(([key, value]) => `${key.replaceAll('_', ' ')}: ${String(value).trim()}`)
        .join('\n');

      const type = form.getAttribute('name') === 'brands'
        ? 'Brand campaign inquiry'
        : 'Creator collaboration inquiry';

      const subject = encodeURIComponent('GameLaunch Bridge — ' + type);
      const body = encodeURIComponent(
        'Hello GameLaunch Bridge,\n\n' + fields
        + '\n\nI understand sending this email is voluntary and that this website itself does not upload or store my form entries.'
      );
      const mailto = `mailto:${BUSINESS_CONTACT_EMAIL}?subject=${subject}&body=${body}`;

      notice.innerHTML = 'Opening your email application with a draft. <strong>Your message has not been sent.</strong> Review it and press Send in your email app. If no email app opens, send your inquiry directly to <a href="mailto:1102847670py@gmail.com">1102847670py@gmail.com</a>.';
      notice.style.color = '#d4ffa0';
      window.location.href = mailto;
    });
  }
})();