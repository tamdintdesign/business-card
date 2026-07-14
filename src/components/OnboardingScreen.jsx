import { useState } from 'react';
import { PROFILE_COLORS } from '../constants/defaultCard';

export function OnboardingScreen({ initialValues, accentColor, onSave, onCancel }) {
  const [form, setForm] = useState({
    name: initialValues.name || '',
    title: initialValues.title || '',
    email: initialValues.email || '',
    phone: initialValues.phone || '',
    website: initialValues.website || 'https://growth4u.co',
    profileColor: initialValues.profileColor || accentColor || '#0A84FF',
  });

  const isEditing = Boolean(initialValues?.name?.trim());

  const update = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave({
      name: form.name.trim(),
      title: form.title.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      website: form.website.trim() || 'https://growth4u.co',
      profileColor: form.profileColor,
    });
  };

  const canSubmit =
    form.name.trim() && form.email.trim() && form.phone.trim() && form.title.trim();

  return (
    <div className="flex min-h-screen w-full flex-col bg-white px-6 py-10">
      <div className="mx-auto w-full max-w-md flex-1">
        <p className="text-sm font-medium text-gray-400">Growth4u Connect</p>
        <h1 className="mt-2 text-2xl font-bold tracking-tight text-gray-900">
          Your digital card
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Enter your details once. Your QR code will let others save your
          contact.
        </p>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4">
          <label className="block">
            <span className="mb-1.5 block text-xs font-medium text-gray-500">
              Full name *
            </span>
            <input
              type="text"
              required
              autoComplete="name"
              value={form.name}
              onChange={(event) => update('name', event.target.value)}
              placeholder="Mustapha Amraoui"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-xs font-medium text-gray-500">
              Job title *
            </span>
            <input
              type="text"
              required
              autoComplete="organization-title"
              value={form.title}
              onChange={(event) => update('title', event.target.value)}
              placeholder="Web Designer"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-xs font-medium text-gray-500">
              Email *
            </span>
            <input
              type="email"
              required
              autoComplete="email"
              value={form.email}
              onChange={(event) => update('email', event.target.value)}
              placeholder="you@growth4u.co"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-xs font-medium text-gray-500">
              Phone *
            </span>
            <input
              type="tel"
              required
              autoComplete="tel"
              value={form.phone}
              onChange={(event) => update('phone', event.target.value)}
              placeholder="+212 6…"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
            />
          </label>

          <label className="block">
            <span className="mb-1.5 block text-xs font-medium text-gray-500">
              Website
            </span>
            <input
              type="url"
              autoComplete="url"
              value={form.website}
              onChange={(event) => update('website', event.target.value)}
              placeholder="https://growth4u.co"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
            />
          </label>

          <div>
            <span className="mb-2 block text-xs font-medium text-gray-500">
              Accent color
            </span>
            <div className="flex flex-wrap gap-3">
              {PROFILE_COLORS.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => update('profileColor', color)}
                  className={`h-9 w-9 rounded-full transition-transform ${
                    form.profileColor === color
                      ? 'scale-110 ring-2 ring-offset-2 ring-gray-400'
                      : ''
                  }`}
                  style={{ backgroundColor: color }}
                  aria-label={`Choose color ${color}`}
                />
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={!canSubmit}
            className="mt-4 w-full rounded-xl px-4 py-3.5 text-sm font-semibold text-white transition-opacity disabled:opacity-40"
            style={{ backgroundColor: form.profileColor }}
          >
            {isEditing ? 'Save changes' : 'Create my card'}
          </button>
        </form>

        {isEditing && onCancel ? (
          <button
            type="button"
            onClick={onCancel}
            className="mt-4 w-full text-center text-sm text-gray-400"
          >
            Cancel
          </button>
        ) : null}
      </div>
    </div>
  );
}
