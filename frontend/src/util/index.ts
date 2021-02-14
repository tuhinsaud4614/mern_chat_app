export function setToLocalStorage<T>(key: string, data: T): void {
  localStorage.setItem(key, JSON.stringify(data));
}

export function getFromLocalStorage<T>(key: string): T | null {
  const stData = localStorage.getItem(key);
  if (stData) {
    try {
      return JSON.parse(stData) as T;
    } catch (e) {
      return null;
    }
  }
  return null;
}

export function removeFromLocalStorage(key: string) {
  localStorage.removeItem(key);
}
