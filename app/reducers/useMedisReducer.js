import React from 'react';

const initState = {
    limit: 20,
    term: '',
    page: 1,
    data: [],
}

const handlers = {
    LOAD_REQUEST(state, action) {
        const { payload } = action;
        const { limit, term } = payload;
        if (state.limit !== limit || state.term !== term) {
            return {
                ...state,
                term: term,
                limit: limit,
            }
        }
        return state;
    },

    LOAD_SUCCESS(state, action) {
        const { payload } = action;
        const { limit, term, response } = payload;
        if (state.limit !== limit || state.term !== term) {
            return state;
        }
        return {
            ...state,
            data: response.results
        }
    }

};

function reducer(state, action) {
    const { type } = action;
    if (typeof handlers[type] === 'function') {
        return handlers[type](state, action);
    }
    return state;
}


export default function useMediaReducer() {
    const [state, dispatch] = React.useReducer(reducer, initState);
    const search = React.useCallback(async ({ term, limit }) => {
        dispatch({
            type: 'LOAD_REQUEST',
            payload: {
                term,
                limit,
            }
        });
        const response = await fetch(`https://itunes.apple.com/search?term=${term}&limit=${limit}`);
        dispatch({
            type: 'LOAD_SUCCESS',
            payload: {
                term,
                limit,
                response: await response.json()
            }
        })
    }, [dispatch]);

    const actions = React.useMemo(() => {
        return {
            search
        }
    }, [search]);

    return [state, actions];
}