import { useEffect, useState } from 'react'

export function useDebouncedValue<T>(inputValue: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState<T>(inputValue);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [inputValue, delay]);

  return debouncedValue;
}
