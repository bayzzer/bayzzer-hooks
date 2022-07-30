import { useImmutableReducer } from "@bayzzer/hooks"
import { ImmutableManage } from "bayzzer-tools"

export const ImmutableReducer = () => {
    interface State {
        layout: {
            theme: {
                current: string,
                list: string[]
            }
        },
        test: {
            value: string
        },
        other: {
            value: string
        },
        list: string[],
        pez: () => void
    }

    const _base: State = {
        layout: {
            theme: {
                current: "light",
                list: ["light", "dark"]
            }
        },
        test: {
            value: '--1'
        },
        other: {
            value: '--2'
        },
        list: [],
        pez: () => { console.log('pez') }
    }
    const immutable = new ImmutableManage().create

    const [state, dispatch] = useImmutableReducer(immutable, _base)   

    const immutableUseReducer = () => {
        //Immutable operation
        //@ts-ignore
        state.test.value = `value ${Math.random()}`
    }

    const mutableUseReducer = () => {
        dispatch((draft) => {
            draft.layout.theme.current = `theme ${Math.random()}`
            //draft.layout.theme.list.push(`${Math.random()}`)
            draft.test.value = `${Math.random()}`
            draft.pez = () => { console.log('pez update', Math.random()) }
            draft.list.push('new item')
        })
    }

    return (
        <>
            <span>Test useImmutableReducer</span>
            <div style={{ display: 'grid' }}>
                <button onClick={immutableUseReducer}>Immutable useReducer</button>
                <button onClick={mutableUseReducer}>Mutable useReducer</button>
            </div>
            <pre style={{ color: '#ce7ad3' }}>
                <code>{JSON.stringify(state, null, 2)}</code>
            </pre>            
        </>
    )
}