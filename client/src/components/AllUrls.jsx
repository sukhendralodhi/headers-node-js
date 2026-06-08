import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const AllUrls = () => {
    const [urls, setUrls] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const getAllUrls = async () => {
        try {
            setLoading(true);
            setError('');

            const response = await axios.get(
                `${import.meta.env.VITE_API_BASE_URL}/api/url`
            );

            setUrls(response?.data?.data || []);
        } catch (err) {
            setError(
                err.response?.data?.message ||
                'Failed to fetch URLs'
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllUrls();
    }, []);

    const handleRedirect = (shortId) => {
        window.open(
            `${import.meta.env.VITE_API_BASE_URL}/api/url/${shortId}`,
            '_blank'
        );
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen text-xl">
                Loading...
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen text-red-500">
                {error}
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">
                All Shortened URLs <a className='underline text-sm text-blue-500 ms-9' href="/">Back To Home</a>
            </h1>

            {urls.length === 0 ? (
                <p className="text-gray-500">No URLs found.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full border border-gray-300">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border px-4 py-2">#</th>
                                <th className="border px-4 py-2">Click to visit</th>
                                <th className="border px-4 py-2">
                                    Analytics
                                </th>
                                <th className="border px-4 py-2">
                                    Total Visits
                                </th>
                                <th className="border px-4 py-2">
                                    Created At
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {urls.map((item, index) => (
                                <tr
                                    key={item._id}
                                    className="hover:bg-gray-50"
                                >
                                    <td className="border px-4 py-2">
                                        {index + 1}
                                    </td>

                                    <td className="border flex gap-4 px-4 py-2 font-medium">
                                        <a className='cursor-pointer text-blue-500 underline' onClick={() => handleRedirect(item.shortId)}>Visit ({item.shortId})</a>
                                    </td>

                                    <td className="border  px-4 py-2">
                                        <Link className='text-blue-500 underline' to={`/analytics/${item.shortId}`}>
                                            View Analytics
                                        </Link>
                                    </td>

                                    <td className="border px-4 py-2 text-center">
                                        {item.visitHistory?.length || 0}
                                    </td>

                                    <td className="border px-4 py-2">
                                        {new Date(
                                            item.createdAt
                                        ).toLocaleString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default AllUrls;