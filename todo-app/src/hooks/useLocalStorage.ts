import { useEffect, useState } from 'react'

export function useLocalStorage<T>(key : string, initialValue : T) {
  const [value, setValue] = useState<T>(() => {
    const saved = localStorage.getItem(key);
    if(saved){
      return JSON.parse(saved);
    }
    
    return initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}