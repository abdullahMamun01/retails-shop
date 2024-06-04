
import { useState, useEffect } from 'react';

const useLocalStorage = (key, initialValue) => {
  const [state, setState] = useState(() => {
    // Initialize the state
    if (typeof window === 'undefined') {
      return initialValue;
    }

    try {
      const value = localStorage.getItem(key);
      // Check if the local storage already has any values,
      // otherwise initialize it with the passed initialValue
      return value ? JSON.parse(value) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const value = localStorage.getItem(key);
        if (value) {
          setState(JSON.parse(value));
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, [key]);

  const setValue = value => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      setState(value);
    } catch (error) {
      console.log(error);
    }
  };

  return [state, setValue];
};

export default useLocalStorage;
