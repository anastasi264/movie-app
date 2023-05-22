export const createSlug = (text: string) => (
  text.replace(/[^a-zA-Z0-9\s]/g, "").replaceAll(' ', '-').toLowerCase()
);
