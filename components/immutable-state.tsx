import {
    useImmutableState
} from '@bayzzer/hooks'

export const ImmutableState = () => {
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

    const [todos, setTodos] = useImmutableState(_base)

    const testImmutableFromUseState = () => {
        //Immutable operation
        //@ts-ignore
        todos.list.push('test state immutable')
    }

    const mutableUseState = () => {
        //Mutable operation
        setTodos(draft => {
            draft.test.value = `${Math.random()}`
        })
    }

    return (
        <>
            <span>Test useImmutableState</span>
            <div style={{ display: 'grid' }}>
                <button onClick={testImmutableFromUseState}>Immutable useState</button>
                <button onClick={mutableUseState}>Mutable useState</button>
            </div>
            <pre style={{ color: '#ce7ad3' }}>
                <code>
                    {
                        JSON.stringify(todos, null, 2)
                    }
                </code>
            </pre>
        </>
    )
}