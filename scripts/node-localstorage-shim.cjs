const values = new Map();

globalThis.localStorage = {
  getItem(key) {
    const normalizedKey = String(key);
    return values.has(normalizedKey) ? values.get(normalizedKey) : null;
  },
  setItem(key, value) {
    values.set(String(key), String(value));
  },
  removeItem(key) {
    values.delete(String(key));
  },
  clear() {
    values.clear();
  },
  key(index) {
    const keys = Array.from(values.keys());
    return keys[index] ?? null;
  },
  get length() {
    return values.size;
  },
};