export const useWindow = () => {
    const isDOM =  typeof window !== 'undefined' &&
    window.document &&
    window.document.documentElement
    
    return {
        isClient: isDOM,
        isServer: !isDOM,
    }
}