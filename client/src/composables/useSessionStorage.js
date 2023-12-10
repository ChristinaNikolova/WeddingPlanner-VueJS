import { ref, watch } from 'vue';

function useSessionStorage(key, initialValue) {
  const storedItem = sessionStorage.getItem(key);
  const value = ref(storedItem ? JSON.parse(storedItem) : initialValue);

  watch(value, (newValue) => {
    // login, register and logout
    sessionStorage.setItem(key, JSON.stringify(newValue));
  });
  // refresh page
  return value;
}

export default useSessionStorage;
