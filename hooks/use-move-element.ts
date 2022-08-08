import { useEventListener } from '@bayzzer/hooks'
import { RefObject } from 'react'

export const useMoveElement = <T extends HTMLElement>(elementRef?: RefObject<T>) => {    
    var x = 0,
        y = 0,
        mousedown = false

    useEventListener('mousedown', (event) => {
        if(!elementRef) return  
        mousedown = true
        var element = event.target as HTMLElement
        x = element.offsetLeft - event.clientX
        y = element.offsetTop - event.clientY
    }, elementRef!)

    useEventListener('mouseup', () => {        
        mousedown = false
    }, elementRef!)

    useEventListener('mousemove', (event) => {
        if(!elementRef) return 
        if (mousedown) {
            var element = event.target as HTMLElement
            element.style.position = "absolute"
            element.style.left = `${event.clientX + x}px`
            element.style.top = `${event.clientY + y}px`
        }
    }, elementRef!)
}