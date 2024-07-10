import { useEffect, useState } from "react";

export const useDebounce = async(value, delay = 500, fn) => {
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => clearTimeout(timeout)
    }, [value, delay]);

    return debouncedValue;
}