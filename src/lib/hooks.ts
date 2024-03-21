import { useEffect, useState } from "react"

export const useDebounce = <T>(value: T, delay=1000) => {
  const [dValue, setDValue] = useState<T>(value);

  useEffect(() => {
    console.log('Debounce useEffect!')
    const timerId = setTimeout(() => {
      setDValue(value);
    }, delay);

    return () => clearTimeout(timerId);
  }, [delay, value])
  
  return dValue;
}