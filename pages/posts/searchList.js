import Link from 'next/link';
import React from 'react';

export default function SearchList(props) {
    const { list, page, pages, _OnPageChange } = props;

    return (
        <>
            {
                list.length === 0 &&
                <div className="d-flex flex-column justify-content-center align-items-center mt-5">
                    No data
                </div>
            }
            {
                list.length > 0 &&
                <div className="mt-5">
                    <table>
                        <thead>
                            <tr>
                                <th>No</th>
                                <th>Wrapper Type</th>
                                <th>Kind</th>
                                <th>Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list.map((item, i) => {
                                const no = (page - 1) * 10 + i + 1;
                                return <tr key={no}>
                                    <td className="pb-2 px-4">
                                        {no}
                                    </td>
                                    <td className="pb-2 px-4">
                                        {item.wrapperType}
                                    </td>
                                    <td className="pb-2 px-4">
                                        {item.kind}
                                    </td>
                                    <td className="pb-2 px-4">
                                        {item.wrapperType === 'track' && <Link href={`/posts/${item.trackId}`}>
                                            <a target="_blank" style={{ textDecoration: 'underline' }}>
                                                {item.trackName}
                                            </a>
                                        </Link>}
                                        {item.wrapperType === 'audiobook' && <Link href={`/posts/${item.collectionId}`}>
                                            <a target="_blank" style={{ textDecoration: 'underline' }}>
                                                {item.collectionName}
                                            </a>
                                        </Link>}
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                    <div className="mt-4 d-flex flex-row justify-content-center">
                        {(() => {
                            const items = [];
                            for (let i = 0; i < pages; i++) {
                                items.push(
                                    <a className="px-1"
                                        href={`#page${i + 1}`}
                                        onClick={_OnPageChange}
                                        style={{ textDecoration: page === (i + 1) ? 'underline' : 'none' }}
                                    >
                                        {i + 1}
                                    </a>
                                );
                            }
                            return items;
                        })()}
                    </div>
                </div>
            }
        </>
    )
}