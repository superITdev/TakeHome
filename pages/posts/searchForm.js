import React from 'react';

export default function SearchForm(props) {
    const { limit, term, loading, _OnChangeTerm, _OnChangeLimit, _OnSearch } = props;

    const disableSearch = !limit || !term;

    return (
        <form
            className="d-flex flex-row justify-content-between"
            onSubmit={_OnSearch}
        >
            <div className="d-flex flex-column">
                <div className="mb-2">
                    <label className="mr-2">
                        Term:
                    </label>
                    <input type="text"
                        name="term"
                        value={term}
                        onChange={_OnChangeTerm}
                        readOnly={loading}
                    />
                </div>
                <div>
                    <label className="mr-2">
                        Limit:
                    </label>
                    <input type="number"
                        name="limit"
                        value={limit}
                        maxLength={3}
                        onChange={_OnChangeLimit}
                        readOnly={loading}
                    />
                </div>
            </div>
            <div className="d-flex flex-column justify-content-end">
                <button onClick={_OnSearch} disabled={disableSearch}>
                    {loading ? 'Searching ...' : 'Search'}
                </button>
            </div>
        </form>
    )
}