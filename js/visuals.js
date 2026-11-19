/* MUSIC EMPIRE — 3D-style interface icons (pure SVG, no dependencies) */

let SEQ = 1;
const uid = () => `v${(SEQ++).toString(36)}${Math.random().toString(36).slice(2, 5)}`;

function defs(id, stops, radial = false) {
  const tag = radial ? 'radialGradient' : 'linearGradient';
  const attrs = radial ? 'cx="35%" cy="25%" r="85%"' : 'x1="0" y1="0" x2="1" y2="1"';
  return `<${tag} id="${id}" ${attrs}>${stops.map(([o, c, a = 1]) => `<stop offset="${o}" stop-color="${c}" stop-opacity="${a}"/>`).join('')}</${tag}>`;
}

/**
 * Premium pseudo-3D icon. Every icon is lit from the top-left, sits on a
 * contact shadow and uses layered gradients so it reads as an object rather
 * than a flat glyph.
 */
export function icon3d(name, size = 22) {
  const main = uid();
  const alt = uid();
  const shine = uid();
  const shadow = `<ellipse cx="16" cy="28.7" rx="9.5" ry="2.1" fill="#000" opacity=".38"/>`;
  const wrap = (body, extra = '') => `<svg class="ic3d" width="${size}" height="${size}" viewBox="0 0 32 32" fill="none" aria-hidden="true"><defs>${extra}${defs(main, [[0, '#ffffff', .95], [.16, '#ffd0dd'], [.55, '#ff2e63'], [1, '#7d0b2c']])}${defs(alt, [[0, '#ffe9a8'], [.45, '#f5c451'], [1, '#8a5c12']])}${defs(shine, [[0, '#ffffff'], [1, '#ffffff', 0]], true)}</defs>${shadow}${body}</svg>`;
  const glass = `<ellipse cx="13" cy="11.5" rx="4.4" ry="2.6" fill="url(#${shine})" opacity=".42" transform="rotate(-22 13 11.5)"/>`;
  switch (name) {
    case 'disc':
    case 'vinyl':
    case 'music':
      return wrap(`<rect x="5" y="4" width="21" height="21" rx="3" fill="url(#${alt})" transform="rotate(-7 16 15)"/>
        <rect x="7.4" y="6.4" width="4" height="16" rx="1" fill="#fff" opacity=".18" transform="rotate(-7 16 15)"/>
        <circle cx="16" cy="15.5" r="8.6" fill="#0b0c12"/><circle cx="16" cy="15.5" r="7.1" stroke="#ffffff" stroke-opacity=".15" stroke-width=".6"/>
        <circle cx="16" cy="15.5" r="5.3" stroke="#ffffff" stroke-opacity=".11" stroke-width=".5"/>
        <circle cx="16" cy="15.5" r="3.1" fill="url(#${main})"/><circle cx="16" cy="15.5" r="1" fill="#0b0c12"/>
        <ellipse cx="12.8" cy="11.5" rx="3.7" ry="1.5" fill="#fff" opacity=".18" transform="rotate(-38 12.8 11.5)"/>`, '');
    case 'trophy':
    case 'award':
      return wrap(`<path d="M10 5h12v7.2a6 6 0 0 1-12 0z" fill="url(#${alt})"/>
        <path d="M10 6.4H6.2v3.2a4.4 4.4 0 0 0 4.6 4.4M22 6.4h3.8v3.2a4.4 4.4 0 0 1-4.6 4.4" stroke="url(#${alt})" stroke-width="2.2" stroke-linecap="round"/>
        <path d="M16 17.6v3.2" stroke="#8a5c12" stroke-width="2.2"/><path d="M11.4 24.6h9.2" stroke="url(#${alt})" stroke-width="2.6" stroke-linecap="round"/>
        <rect x="9.4" y="21.2" width="13.2" height="2.4" rx="1.2" fill="url(#${alt})"/>
        <path d="M12.2 7.2c2.8 1.5 4.6 1.5 7.4 0" stroke="#fff" stroke-opacity=".5" stroke-width="1.3" stroke-linecap="round"/>
        <circle cx="16" cy="10" r="1.4" fill="#fff" opacity=".65"/>`);
    case 'mic':
      return wrap(`<rect x="11.6" y="3.5" width="8.8" height="14" rx="4.4" fill="url(#${main})"/>
        <rect x="13" y="5.2" width="2.1" height="9.8" rx="1" fill="#fff" opacity=".3"/>
        <path d="M8.4 12.6a7.6 7.6 0 0 0 15.2 0" stroke="#c8ccd8" stroke-width="1.8" stroke-linecap="round"/>
        <path d="M16 20.2v4.4M12.4 26.2h7.2" stroke="#aeb4c4" stroke-width="1.9" stroke-linecap="round"/>
        <circle cx="16" cy="8.4" r="2.2" fill="#fff" opacity=".28"/>`);
    case 'headphones':
      return wrap(`<path d="M5.6 17v-2.8a10.4 10.4 0 0 1 20.8 0V17" stroke="url(#${main})" stroke-width="3" stroke-linecap="round"/>
        <rect x="3.4" y="15" width="6.2" height="9.2" rx="3" fill="url(#${main})"/><rect x="22.4" y="15" width="6.2" height="9.2" rx="3" fill="url(#${main})"/>
        <rect x="5" y="16.8" width="2.4" height="5.4" rx="1.2" fill="#fff" opacity=".24"/><rect x="24" y="16.8" width="2.4" height="5.4" rx="1.2" fill="#fff" opacity=".24"/>`);
    case 'guitar':
      return wrap(`<path d="M20.8 4.2l6.4 3.6-9.8 16.4-5.4-3z" fill="url(#${alt})"/>
        <path d="M13.2 20.2c2.2-1.2 4.4-.4 5.2 1.4.8 1.8.2 4.4-1.8 5.4-1.9 1-4.6.4-5.4-1.3-.8-1.7-.2-4.2 2-5.5z" fill="url(#${main})"/>
        <circle cx="13.4" cy="23.4" r="2.2" fill="#2a0a14"/><path d="M21.2 5.8l4 2.2M19 9.4l4 2.2" stroke="#0b0c12" stroke-width=".8" opacity=".55"/>`);
    case 'building':
    case 'studio':
    case 'company':
      return wrap(`<path d="M5 26V10.4l8.4-4.2v19.8z" fill="url(#${main})"/>
        <path d="M13.4 26V12l13.2 5v9z" fill="url(#${alt})"/>
        <path d="M8.2 12.4v11.4M10.6 12.4v11.4M17 17.4v6.4M19.8 18.4v5.4M22.6 19.4v4.4" stroke="#0b0c12" stroke-opacity=".35" stroke-width="1.3"/>
        <path d="M13.4 12l13.2 5v2.2l-13.2-5z" fill="#fff" opacity=".18"/>
        <path d="M5 10.4l8.4-4.2v2.1L5 12.5z" fill="#fff" opacity=".17"/>`);
    case 'stage':
    case 'festival':
      return wrap(`<rect x="3.2" y="20" width="25.6" height="5.2" rx="1.4" fill="#1a1d27"/>
        <rect x="5.4" y="9" width="21.2" height="11.4" rx="1.6" fill="#0c0e15"/>
        <rect x="6.8" y="10.4" width="18.4" height="8.4" rx="1" fill="url(#${main})" opacity=".9"/>
        <path d="M6.6 9V5.4h18.8V9" stroke="#c8ccd8" stroke-width="1.4"/><path d="M9 5.4v3M23 5.4v3" stroke="#c8ccd8" stroke-width="1.2"/>
        <path d="M10.6 25.2v2.4M21.4 25.2v2.4" stroke="#aeb4c4" stroke-width="1.6"/>
        <circle cx="9" cy="5" r="1.6" fill="url(#${alt})"/><circle cx="23" cy="5" r="1.6" fill="url(#${alt})"/>
        <path d="M4 27c4-2.4 8-1.4 12-2.8 4-1.4 8-.6 12-2.6" stroke="#ff2e63" stroke-width="1.1" opacity=".6"/>`);
    case 'star':
    case 'sparkle':
      return wrap(`<path d="M16 2.8l3.8 8.7 9.4.9-7.1 6.3 2.1 9.3L16 23.1 7.8 28l2.1-9.3-7.1-6.3 9.4-.9z" fill="url(#${alt})"/>
        <path d="M16 2.8l1.2 11.3 2.6-2.6z" fill="#fff" opacity=".5"/><path d="M16 23.1l-2.2 4.9L16 25z" fill="#6b4308" opacity=".45"/>
        <path d="M12.4 10.5l3.6-1.5-1 4z" fill="#fff" opacity=".3"/>`);
    case 'cash':
    case 'wallet':
      return wrap(`<ellipse cx="16" cy="24.2" rx="9.4" ry="3.1" fill="#8a5c12"/>
        <ellipse cx="16" cy="21.4" rx="9.4" ry="3.1" fill="url(#${alt})"/>
        <ellipse cx="16" cy="18.2" rx="9.4" ry="3.1" fill="#8a5c12"/>
        <ellipse cx="16" cy="15.4" rx="9.4" ry="3.1" fill="url(#${alt})"/>
        <ellipse cx="16" cy="15.2" rx="6.2" ry="1.7" fill="#fff" opacity=".18"/>
        <path d="M13 14.5h6M13 16.2h4.2" stroke="#8a5c12" stroke-width="1" stroke-linecap="round"/>`);
    case 'chart':
      return wrap(`<rect x="4.4" y="18.6" width="5.4" height="7.4" rx="1" fill="url(#${main})"/>
        <rect x="13.2" y="12.6" width="5.4" height="13.4" rx="1" fill="url(#${alt})"/>
        <rect x="22" y="6.6" width="5.4" height="19.4" rx="1" fill="url(#${main})"/>
        <path d="M4.4 18.6h5.4l3.4-6h5.4l3.4-6h5.4" stroke="#fff" stroke-opacity=".55" stroke-width="1.3" stroke-linecap="round"/>
        <path d="M4.4 26h23.4" stroke="#fff" stroke-opacity=".14" stroke-width="1"/>`);
    case 'heart':
      return wrap(`<path d="M16 27.2S4.6 20.4 4.6 12.6A6.4 6.4 0 0 1 16 8.6a6.4 6.4 0 0 1 11.4 4c0 7.8-11.4 14.6-11.4 14.6z" fill="url(#${main})"/>
        <path d="M9 11.4c.6-2 2.3-3 4.2-3" stroke="#fff" stroke-opacity=".55" stroke-width="1.6" stroke-linecap="round"/>`);
    case 'crown':
      return wrap(`<path d="M4.4 10.2l6 4.2L16 5.6l5.6 8.8 6-4.2-2.2 13.4H6.6z" fill="url(#${alt})"/>
        <path d="M6.6 23.6h18.8v3.2H6.6z" fill="#8a5c12"/><path d="M6.6 23.6h18.8v1.1H6.6z" fill="#fff" opacity=".18"/>
        <circle cx="16" cy="17.4" r="1.5" fill="#fff" opacity=".65"/>`);
    case 'diamond':
      return wrap(`<path d="M9 5.4h14l5 8.2L16 27.4 4 13.6z" fill="url(#${alt})"/>
        <path d="M9 5.4l-5 8.2h24l-5-8.2z" fill="#fff" opacity=".25"/>
        <path d="M12 13.6L16 27.4l4-13.8z" fill="#fff" opacity=".18"/><path d="M4 13.6h24" stroke="#fff" stroke-opacity=".3" stroke-width=".7"/>`);
    case 'key':
      return wrap(`<circle cx="11" cy="11" r="6.4" fill="none" stroke="url(#${alt})" stroke-width="3.4"/>
        <path d="M15.6 15.6L26 26M21 21l3-3M24 24l3-3" stroke="url(#${alt})" stroke-width="3" stroke-linecap="round"/>`);
    case 'pen':
      return wrap(`<path d="M6 26l2.2-7.4L21.4 5.4a2.8 2.8 0 0 1 4 4L12.2 22.6z" fill="url(#${main})"/>
        <path d="M6 26l2.2-7.4 5.2 5.2z" fill="#0b0c12"/><path d="M21.4 5.4l4 4" stroke="#fff" stroke-opacity=".35" stroke-width="1.3"/>`);
    case 'users':
      return wrap(`<circle cx="12" cy="10.4" r="5" fill="url(#${main})"/><path d="M3.6 26c.6-6 4-9.2 8.4-9.2s7.8 3.2 8.4 9.2z" fill="url(#${main})"/>
        <circle cx="22.4" cy="12" r="3.8" fill="url(#${alt})"/><path d="M18 26c.4-4.4 2.4-7 5.4-7 2.4 0 4.4 2 4.8 5.4z" fill="url(#${alt})"/>`);
    case 'megaphone':
      return wrap(`<path d="M4 13.4l17-7v19l-17-7z" fill="url(#${main})"/>
        <path d="M21 9.4c2.8 0 4.6 2.4 4.6 6.6S23.8 22.6 21 22.6z" fill="url(#${main})"/>
        <path d="M8 17.4v4.2a2.6 2.6 0 0 0 5.2 0v-2.6" stroke="#2a0a14" stroke-width="1.5" opacity=".55"/>
        <path d="M5.4 13.4l15.6-6.2v3L5.4 15.8z" fill="#fff" opacity=".2"/>`);
    case 'bus':
      return wrap(`<rect x="3.6" y="9" width="24.8" height="13" rx="3" fill="url(#${alt})"/>
        <rect x="5.6" y="11" width="20.8" height="5.4" rx="1.4" fill="#0c0e15" opacity=".8"/>
        <path d="M5.6 17.6h20.8" stroke="#8a5c12" stroke-width="1.2"/>
        <circle cx="9.4" cy="23.4" r="2.2" fill="#0b0c12"/><circle cx="22.6" cy="23.4" r="2.2" fill="#0b0c12"/>
        <path d="M12 11v5.4M18 11v5.4" stroke="#fff" stroke-opacity=".14" stroke-width="1"/>`);
    case 'globe':
      return wrap(`<circle cx="16" cy="16" r="12" fill="url(#${main})"/>
        <ellipse cx="16" cy="16" rx="5.6" ry="12" fill="none" stroke="#fff" stroke-opacity=".4" stroke-width="1.1"/>
        <path d="M4.4 13.4h23.2M4.4 19.4h23.2" stroke="#fff" stroke-opacity=".32" stroke-width="1.1"/>
        <ellipse cx="12.4" cy="11" rx="4" ry="2.4" fill="#fff" opacity=".22" transform="rotate(-25 12.4 11)"/>`);
    case 'calendar':
      return wrap(`<rect x="4" y="7" width="24" height="21" rx="3" fill="url(#${main})"/>
        <rect x="4" y="7" width="24" height="5.4" rx="3" fill="#7d0b2c"/><path d="M8.4 4.4v5M23.6 4.4v5" stroke="#c8ccd8" stroke-width="2" stroke-linecap="round"/>
        <path d="M8 16h16M8 21h16" stroke="#fff" stroke-opacity=".25" stroke-width="1.4"/>`);
    case 'sliders':
      return wrap(`<rect x="4" y="5" width="24" height="22" rx="4" fill="#11141c" stroke="#ffffff" stroke-opacity=".12"/>
        <path d="M9 10v12M16 10v12M23 10v12" stroke="#8a90a2" stroke-width="1.6"/>
        <circle cx="9" cy="13" r="3" fill="url(#${main})"/><circle cx="16" cy="20" r="3" fill="url(#${alt})"/><circle cx="23" cy="15" r="3" fill="url(#${main})"/>`);
    case 'tag':
      return wrap(`<path d="M17.8 3.8H26a2 2 0 0 1 2 2v8.2L15 26.4 5.6 17z" fill="url(#${alt})"/>
        <circle cx="22" cy="10" r="2.2" fill="#0b0c12"/><path d="M9 15.6l7.4 7.4" stroke="#fff" stroke-opacity=".25" stroke-width="1.2"/>`);
    case 'pin':
      return wrap(`<path d="M16 27.6S7 19.2 7 12.6A9 9 0 0 1 25 12.6c0 6.6-9 15-9 15z" fill="url(#${main})"/>
        <circle cx="16" cy="12.4" r="3.4" fill="#fff" opacity=".85"/><circle cx="16" cy="12.4" r="1.5" fill="#7d0b2c"/>`);
    case 'fire':
      return wrap(`<path d="M16 28c5 0 8.4-3.4 8.4-8 0-5.6-5.4-7.8-4.4-14.4-3.4 2.2-5.8 6.6-4.6 11.2-2.2-1.2-3.4-3.6-3.4-5.8-2.2 3.4-4.4 6.8-4.4 9 0 4.6 3.4 8 8.4 8z" fill="url(#${alt})"/>
        <path d="M16 26.8c1.8 0 3.2-1.4 3.2-3.4 0-2.6-2.2-3.8-1.8-6.6-2.2 1.4-3.8 3.8-3 6.4-1.2-.6-1.8-1.8-1.8-2.8-1 1.6-2 3.2-2 4.4 0 2.2 2.2 2 5.4 2z" fill="#fff" opacity=".38"/>`);
    case 'radio':
      return wrap(`<circle cx="16" cy="16" r="11.4" fill="#11141c" stroke="#ffffff" stroke-opacity=".14"/>
        <circle cx="16" cy="16" r="2.6" fill="url(#${main})"/>
        <path d="M9.4 9.4a9.4 9.4 0 0 0 0 13.2M22.6 9.4a9.4 9.4 0 0 1 0 13.2" stroke="url(#${main})" stroke-width="2.4" stroke-linecap="round"/>`);
    case 'film':
      return wrap(`<rect x="4" y="6" width="24" height="20" rx="3" fill="#11141c" stroke="#ffffff" stroke-opacity=".12"/>
        <rect x="6.4" y="8.4" width="19.2" height="15.2" rx="1.4" fill="url(#${main})" opacity=".28"/>
        <path d="M13 12.6l7 3.4-7 3.4z" fill="url(#${alt})"/><path d="M4 9.4h24M4 22.6h24" stroke="#fff" stroke-opacity=".2" stroke-width="1"/>`);
    case 'book':
      return wrap(`<path d="M5 6.4h8.4A2.6 2.6 0 0 1 16 9v17a4 4 0 0 0-4-4H5z" fill="url(#${alt})"/>
        <path d="M27 6.4h-8.4A2.6 2.6 0 0 0 16 9v17a4 4 0 0 1 4-4h7z" fill="url(#${main})"/>
        <path d="M8 10.4h4M8 14.4h4" stroke="#fff" stroke-opacity=".3" stroke-width="1"/>`);
    case 'scale':
      return wrap(`<path d="M16 4.4v22M7 8.4h18" stroke="url(#${alt})" stroke-width="2.2" stroke-linecap="round"/>
        <path d="M7 8.4L2.8 18h8.4zM25 8.4L20.8 18h8.4z" fill="url(#${alt})" opacity=".85"/>
        <path d="M11 26.6h10" stroke="url(#${alt})" stroke-width="2.4" stroke-linecap="round"/>`);
    case 'bolt':
      return wrap(`<path d="M18 2.6L6.4 18.4h7.4l-1.8 11L24.6 13h-7.4z" fill="url(#${alt})"/>
        <path d="M18 2.6L6.4 18.4h4.2l6-10z" fill="#fff" opacity=".35"/>`);
    case 'home':
      return wrap(`<path d="M3 15.4L16 4l13 11.4V27H3z" fill="url(#${main})"/>
        <path d="M12 27v-7.4h8V27" fill="#0b0c12" opacity=".75"/><path d="M3 15.4L16 4l13 11.4" stroke="#fff" stroke-opacity=".25" stroke-width="1.2"/>`);
    case 'search':
      return wrap(`<circle cx="13.6" cy="13.6" r="8.2" fill="none" stroke="url(#${main})" stroke-width="3.2"/>
        <path d="M19.8 19.8L27 27" stroke="url(#${alt})" stroke-width="3.8" stroke-linecap="round"/>`);
    case 'clock':
      return wrap(`<circle cx="16" cy="16" r="12" fill="url(#${main})"/><circle cx="16" cy="16" r="9.2" fill="#11141c"/>
        <path d="M16 10v6.4l4.4 2.6" stroke="url(#${alt})" stroke-width="2.2" stroke-linecap="round"/>`);
    case 'play':
      return wrap(`<circle cx="16" cy="16" r="12" fill="url(#${main})"/><path d="M13 10.4l9 5.6-9 5.6z" fill="#fff" opacity=".92"/>`);
    case 'check':
      return wrap(`<circle cx="16" cy="16" r="12" fill="url(#${alt})"/><path d="M9.4 16.2l4.4 4.4 8.8-9.2" stroke="#0b0c12" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>`);
    case 'plus':
      return wrap(`<circle cx="16" cy="16" r="12" fill="url(#${main})"/><path d="M16 9.4v13.2M9.4 16h13.2" stroke="#fff" stroke-width="3" stroke-linecap="round"/>`);
    case 'lock':
      return wrap(`<rect x="5" y="14" width="22" height="13" rx="3" fill="url(#${main})"/>
        <path d="M10 14v-3.4a6 6 0 0 1 12 0V14" stroke="#c8ccd8" stroke-width="2.4" fill="none"/>
        <circle cx="16" cy="20" r="1.8" fill="#0b0c12"/><path d="M16 21.4v2" stroke="#0b0c12" stroke-width="1.8"/>`);
    case 'door':
      return wrap(`<rect x="7" y="4" width="18" height="23" rx="2" fill="url(#${alt})"/><rect x="10" y="7" width="12" height="17" rx="1" fill="#1a1d27"/>
        <circle cx="20" cy="17" r="1.1" fill="#f5c451"/><path d="M7 27h18" stroke="#8a5c12" stroke-width="2"/>`);
    case 'food':
      return wrap(`<path d="M6 14h20l-2.2 11.4H8.2z" fill="url(#${main})"/><path d="M4.6 14h22.8" stroke="url(#${alt})" stroke-width="2.4" stroke-linecap="round"/>
        <path d="M10 10.8c0-2.4 2-2.8 2-5M16 10.8c0-2.4 2-2.8 2-5M22 10.8c0-2.4 2-2.8 2-5" stroke="#fff" stroke-opacity=".35" stroke-width="1.2" stroke-linecap="round"/>`);
    default:
      return wrap(`<circle cx="16" cy="16" r="11" fill="url(#${main})"/><circle cx="16" cy="16" r="4" fill="#0b0c12"/>
        <circle cx="16" cy="16" r="7.4" stroke="#fff" stroke-opacity=".28" stroke-width="1"/>`);
  }
}

/** Tiny 3D dot used in stat labels and lists. */
export function gem3d(color = 'var(--brand)', size = 12) {
  const id = uid();
  return `<svg class="gem3d" width="${size}" height="${size}" viewBox="0 0 16 16" aria-hidden="true"><defs><radialGradient id="${id}" cx="35%" cy="30%" r="75%"><stop offset="0" stop-color="#fff"/><stop offset=".35" stop-color="${color}"/><stop offset="1" stop-color="#05060a"/></radialGradient></defs><ellipse cx="8" cy="14" rx="5" ry="1.4" fill="#000" opacity=".4"/><circle cx="8" cy="8" r="6.2" fill="url(#${id})"/><circle cx="6" cy="5.8" r="1.7" fill="#fff" opacity=".55"/></svg>`;
}
