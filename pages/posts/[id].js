import React from 'react';
import { useRouter } from 'next/router';

export default function Post({ post }) {
    const router = useRouter();
    if (router.isFallback) {
        return <div>
            Loading....
        </div>
    }
    return (
        <div>
            <table border={1}>
                <tbody>
                    <tr>
                        <td className="p-4">Wrapper Type</td>
                        <td className="p-4">{post.wrapperType}</td>
                    </tr>
                    {post.kind && <tr>
                        <td className="p-4">Kind</td>
                        <td className="p-4">{post.kind}</td>
                    </tr>}
                    {post.trackName && <tr>
                        <td className="p-4">
                            Track Name
                        </td>
                        <td className="p-4">
                            <a target="_blank" rel="noreferrer" href={post.trackViewUrl} className="text-decoration-underline">
                                {post.trackName}
                            </a>
                        </td>
                    </tr>}
                    {post.collectionName && <tr>
                        <td className="p-4">
                            Collection name
                        </td>
                        <td className="p-4">
                            <a target="_blank" rel="noreferrer" href={post.collectionViewUrl} className="text-decoration-underline">
                                {post.collectionName}
                            </a>
                        </td>
                    </tr>}
                    {post.artistName && <tr>
                        <td className="p-4">Artist Name</td>
                        <td className="p-4">
                            {post.artistViewUrl && <a target="_blank" rel="noreferrer" href={post.artistViewUrl} className="text-decoration-underline">
                                {post.artistName}
                            </a>}
                            {!post.artistViewUrl && post.artistName}
                        </td>
                    </tr>}
                    {post.description && <tr>
                        <td className="p-4">Description</td>
                        <td className="p-4" dangerouslySetInnerHTML={{ __html: post.description }} />
                    </tr>}
                </tbody>
            </table>
        </div>
    )
}

export async function getStaticPaths() {
    return {
        paths: [],
        fallback: true,
    }
}

export async function getStaticProps({ params }) {
    const res = await fetch(`https://itunes.apple.com/lookup?id=${params.id}`);
    const payload = await res.json();
    if (!payload.resultCount) {
        return {
            notFound: true
        }
    }
    return {
        props: {
            post: payload.results[0]
        },
        revalidate: 3600
    }
}