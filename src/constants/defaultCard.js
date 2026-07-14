export const STORAGE_KEY = 'businessCardInfo';

/** Empty defaults — first launch asks the user for their own info */
export const DEFAULT_CARD = {
  name: '',
  title: '',
  email: '',
  phone: '',
  website: 'https://growth4u.co',
  profileColor: '#0A84FF',
};

export const PROFILE_COLORS = [
  '#0A84FF',
  '#34C759',
  '#FF9F0A',
  '#FF453A',
  '#BF5AF2',
  '#64D2FF',
];

export function isProfileComplete(card) {
  return Boolean(card?.name?.trim() && card?.email?.trim() && card?.phone?.trim());
}
