// Validasi form Kontak. Mengembalikan objek { field: pesanError }.
// Objek kosong berarti semua field valid.

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const LIMITS = { nameMin: 3, messageMin: 10, messageMax: 500 };

export function validateField(name, rawValue) {
  const value = rawValue.trim();

  switch (name) {
    case 'nama':
      if (!value) return 'Nama wajib diisi.';
      if (value.length < LIMITS.nameMin) return `Nama minimal ${LIMITS.nameMin} karakter.`;
      return '';
    case 'email':
      if (!value) return 'Email wajib diisi.';
      if (!EMAIL_PATTERN.test(value)) return 'Format email belum benar. Contoh: rafi@email.com';
      return '';
    case 'pesan':
      if (!value) return 'Pesan wajib diisi.';
      if (value.length < LIMITS.messageMin) return `Pesan minimal ${LIMITS.messageMin} karakter.`;
      if (value.length > LIMITS.messageMax) return `Pesan maksimal ${LIMITS.messageMax} karakter.`;
      return '';
    default:
      return '';
  }
}

export function validateContact(values) {
  const errors = {};
  ['nama', 'email', 'pesan'].forEach((field) => {
    const message = validateField(field, values[field] ?? '');
    if (message) errors[field] = message;
  });
  return errors;
}
