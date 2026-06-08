import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FormComponent = () => {
    const [url, setUrl] = useState('');
    const [shortenedUrl, setShortenedUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError('');
        setShortenedUrl('');

        // Empty validation
        if (!url.trim()) {
            setError('Please enter a URL');
            return;
        }

        // URL format validation
        try {
            new URL(url);
        } catch {
            setError('Please enter a valid URL');
            return;
        }

        setLoading(true);

        try {
            const response = await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/api/url`,
                { url }
            );

            const id = response.data.id;
            const generatedShortUrl = response.data.shortUrl ||
                `${import.meta.env.VITE_API_BASE_URL}/api/url/${id}`;

            setShortenedUrl(generatedShortUrl);
            navigate('/urls');

            setUrl('');
        } catch (err) {
            if (err.response) {
                switch (err.response.status) {
                    case 400:
                        setError(
                            err.response.data?.error ||
                            'Invalid request'
                        );
                        break;

                    case 404:
                        setError('API endpoint not found');
                        break;

                    case 500:
                        setError('Internal server error');
                        break;

                    default:
                        setError(
                            err.response.data?.error ||
                            'Something went wrong'
                        );
                }
            } else if (err.request) {
                setError('Unable to connect to server');
            } else {
                setError(err.message);
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <form
                onSubmit={handleSubmit}
                className="flex flex-col space-y-4 w-full max-w-md"
            >
                <input
                    type="text"
                    placeholder="Enter your URL"
                    value={url}
                    onChange={(e) => {
                        setUrl(e.target.value);
                        setError('');
                    }}
                    className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                {error && (
                    <p className="text-red-500 text-sm">
                        {error}
                    </p>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className={`font-bold py-2 px-4 rounded text-white transition ${loading
                        ? 'bg-blue-300 cursor-not-allowed'
                        : 'bg-blue-500 hover:bg-blue-700'
                        }`}
                >
                    {loading ? 'Shortening...' : 'Shorten'}
                </button>

                <div>
                    <a className='underline text-blue-700' href="/urls">Check all Urls</a>
                </div>

                {shortenedUrl && (
                    <div className="mt-4 p-4 border rounded-md bg-green-50">
                        <p className="text-green-700 font-medium mb-2">
                            Short URL Generated Successfully:
                        </p>

                        <a
                            href={shortenedUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline break-all"
                        >
                            {shortenedUrl}
                        </a>
                    </div>
                )}
            </form>
        </div>
    );
};

export default FormComponent;