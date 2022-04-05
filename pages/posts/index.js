import useMediaReducer from 'app/reducers/useMedisReducer';
import React from 'react';
import SearchForm from './searchForm';
import SearchList from './searchList';

export default function Posts() {
    const [state, { search }] = useMediaReducer();
    const { data } = state;
    const loadingRef = React.useRef(false);
    const [loading, setLoading] = React.useState(false);
    const [list, setList] = React.useState(data);
    const [limit, setLimit] = React.useState(state.limit);
    const [term, setTerm] = React.useState(state.term);
    const [page, setPage] = React.useState(1);
    const [pages, setPages] = React.useState(1);

    const _OnChangeTerm = React.useCallback((e) => {
        if (loadingRef.current) {
            return;
        }
        setTerm(e.target.value);
    }, [loadingRef, setTerm]);

    const _OnChangeLimit = React.useCallback(e => {
        if (loadingRef.current) {
            return;
        }
        if (e.target.value === '') {
            setLimit('');
            return;
        }
        const n = parseInt(e.target.value);
        if (isNaN(n) || n < 0 || n > 200) {
            return;
        }
        setLimit(n);
    }, [loadingRef, setLimit])

    const _OnSearch = React.useCallback(async (e) => {
        e.preventDefault();
        if (loadingRef.current) {
            return;
        }
        loadingRef.current = true;
        setLoading(true);
        try {
            await search({
                limit,
                term
            });
        } finally {
            setLoading(false);
            loadingRef.current = false;
        }
    }, [loadingRef, setLoading, limit, term, search]);

    const _OnPageChange = React.useCallback((e) => {
        e.preventDefault();
        const page = parseInt(e.target.href.slice(e.target.href.indexOf('#') + 5));
        const offset = (page - 1) * 10;
        const end = offset + 10;
        setPage(page);
        if (data.length > end) {
            setList(data.slice(offset, end));
        } else {
            setList(data.slice(offset, data.length));
        }
    }, [setPage, data, setList])

    React.useEffect(() => {
        if (data.length > 10) {
            setList(data.slice(0, 10));
        } else {
            setList(data);
        }
        setPage(1);
        setPages(Math.ceil(data.length / 10));
    }, [data, setList, setPage]);

    return (
        <div className="page mt-5">
            <SearchForm limit={limit} term={term} loading={loading} _OnChangeTerm={_OnChangeTerm} _OnChangeLimit={_OnChangeLimit} _OnSearch={_OnSearch} />
            <SearchList list={list} page={page} pages={pages} _OnPageChange={_OnPageChange} />
        </div>
    )
}