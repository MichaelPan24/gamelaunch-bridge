// GitHub Pages is static hosting: inquiries are not sent to any server.
// Set an operator-approved business mailbox only after completing privacy notice.
// Until then, the forms are demonstrations and do not submit anything.
const BUSINESS_CONTACT_EMAIL = "";
(() => {
  for (const form of document.querySelectorAll('form[data-delivery]')) {
    const notice = document.createElement('p');
    notice.className = 'formfine';
    notice.setAttribute('role', 'status');
    notice.setAttribute('aria-live', 'polite');
    form.appendChild(notice);
    form.addEventListener('submit', event => {
      event.preventDefault();
      if (!form.reportValidity()) return;
      if (!BUSINESS_CONTACT_EMAIL) {
        notice.textContent = 'Contact email not configured yet. This is a public-preview form only; no information was submitted or stored.';
        notice.style.color = '#ffd08a';
        return;
      }
      const fields = Array.from(new FormData(form).entries())
        .filter(([key]) => key !== 'consent')
        .map(([key,value]) => `${key.replaceAll('_',' ')}: ${value}`)
        .join('\n');
      const type = form.getAttribute('name') === 'brands' ? 'Brand campaign inquiry' : 'Creator collaboration inquiry';
      notice.textContent = 'Your email application will open a draft. No form data was uploaded to this website. Please review the message before sending.';
      window.location.href = `mailto:${BUSINESS_CONTACT_EMAIL}?subject=${encodeURIComponent('GameLaunch Bridge — ' + type)}&body=${encodeURIComponent(fields)}`;
    });
  }
})();