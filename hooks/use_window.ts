import { useState } from "react"
import { useEventListener, useIsomorphicLayoutEffect } from "."
interface WindowProperties {
    width: number
    height: number
    isClient: boolean | HTMLElement
    isServer: boolean | HTMLElement
}

export function useWindowSize(): WindowProperties {

    const isDOM = typeof window !== 'undefined' &&
        window.document &&
        window.document.documentElement

    const [windowProperties, setWindowProperties] = useState<WindowProperties>({
        width: 0,
        height: 0,
        isClient: isDOM,
        isServer: !isDOM,
    })

    const handleSize = () => {
        setWindowProperties({
            ...windowProperties,
            width: window.innerWidth,
            height: window.innerHeight
        })
    }

    useEventListener('resize', handleSize)
    
    useIsomorphicLayoutEffect(() => {
        handleSize()
    }, [])

    return windowProperties
}