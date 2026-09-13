// Google Forms wiring. Fill these in once the forms exist (see README → Website → Forms).
// Use the "Send → <> Embed" URL from Google Forms; it ends with /viewform?embedded=true
window.DOTTAB_FORMS = {
    feedback: 'https://docs.google.com/forms/d/e/1FAIpQLScrzu3rrlnIfeq9tDyv5bkY32HlEKX8HURFGwwLu7FA6-iRmg/viewform?embedded=true',
    uninstall: 'https://docs.google.com/forms/d/e/1FAIpQLScFQvFKysLqUOSvSRmhnIITRYRthomuIRK90WFzFYSaSi8Waw/viewform?embedded=true',
    // Optional: a "Version" short-answer question's entry id (from the pre-filled link) so bug reports carry the version automatically
    versionEntry: '', // e.g. 'entry.123456789'
};

/** Puts the form in #form-slot if configured, otherwise shows the fallback (mailto). */
window.mountForm = function (kind) {
    const url = window.DOTTAB_FORMS[kind];
    const slot = document.getElementById('form-slot');
    const fallback = document.getElementById('form-fallback');
    if (!url || !slot) return;
    const v = new URLSearchParams(location.search).get('v');
    const entry = window.DOTTAB_FORMS.versionEntry;
    const src = url + (v && entry ? `&${entry}=${encodeURIComponent(v)}` : '');
    const f = document.createElement('iframe');
    f.src = src; f.title = 'Form'; f.loading = 'lazy';
    f.setAttribute('frameborder', '0'); f.setAttribute('marginheight', '0'); f.setAttribute('marginwidth', '0');
    slot.appendChild(f);
    slot.hidden = false;
    if (fallback) fallback.hidden = true;
};
