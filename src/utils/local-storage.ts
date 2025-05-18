export function setItemLocalStorage(key: string, value: unknown) {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
}

export function getItemLocalStorage(key: string) {
  if (typeof window !== "undefined") {
    const value = localStorage.getItem(key);
    if (value) {
      return JSON.parse(value);
    }
  }
  return null;
}
