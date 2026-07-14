export function generateVCard(card) {
  return `BEGIN:VCARD
VERSION:3.0
FN:${card.name}
TITLE:${card.title}
TEL:${card.phone}
EMAIL:${card.email}
URL:${card.website}
END:VCARD`;
}

export function downloadVCard(card) {
  const vcard = generateVCard(card);
  const blob = new Blob([vcard], { type: 'text/vcard;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${card.name.replace(/\s+/g, '_')}.vcf`;
  link.rel = 'noopener';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
