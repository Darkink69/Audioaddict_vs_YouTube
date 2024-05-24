import { useEffect, useState } from "react";

export function useDebounce(value: string, delay: number = 500) {
    const [debounsed, setDebounced] = useState(value)

    useEffect(() => {
        const handler = setTimeout(() => setDebounced(value), delay)
        return () => clearInterval(handler)
    }, [value, delay])

    return debounsed
    
}