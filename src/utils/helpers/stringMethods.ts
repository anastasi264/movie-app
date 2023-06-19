export const capitalizeFirstLetter = (text: string) => (
  text.slice(0, 1).toUpperCase() + text.slice(1)
);

export const createSlug = (text: string) => (
  text.replace(/[^a-zA-Z0-9\s]/g, "").replaceAll(' ', '-').toLowerCase()
);
