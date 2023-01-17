const storage = window.localStorage;

export const getItem = (key, initialValue = '') => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  } catch (error) {
    console.error(error);
    return initialValue;
  }
};

export const setItem = (key, value) => {
  try {
    storage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(error);
  }
};

export const removeItem = (key) => {
  try {
    storage.removeItem(key);
  } catch (error) {
    console.error(error);
  }
};
