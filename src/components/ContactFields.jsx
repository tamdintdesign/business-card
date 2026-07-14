import { Globe, Mail, Phone } from 'lucide-react';

function displayWebsite(url) {
  return url.replace(/^https?:\/\//, '');
}

function ContactRow({ icon: Icon, color, children }) {
  return (
    <div className="group flex items-center transition-all duration-200">
      <Icon
        size={20}
        className="mr-4 flex-shrink-0 transition-transform group-hover:scale-110"
        style={{ color }}
      />
      {children}
    </div>
  );
}

export function ContactFields({ card }) {
  const color = card.profileColor;

  return (
    <div className="space-y-4">
      <ContactRow icon={Mail} color={color}>
        <a
          href={`mailto:${card.email}`}
          className="flex-1 break-all text-sm font-normal text-gray-600 hover:text-gray-900"
        >
          {card.email}
        </a>
      </ContactRow>

      <ContactRow icon={Phone} color={color}>
        <a
          href={`tel:${card.phone}`}
          className="text-sm font-normal text-gray-600 hover:text-gray-900"
        >
          {card.phone}
        </a>
      </ContactRow>

      <ContactRow icon={Globe} color={color}>
        <a
          href={card.website}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 break-all text-sm font-normal text-gray-600 hover:text-gray-900"
        >
          {displayWebsite(card.website)}
        </a>
      </ContactRow>
    </div>
  );
}
