import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const UrlAnalytics = () => {
    const { shortId } = useParams();

    const [analyticsData, setAnalyticsData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleAnalytics = async (shortId) => {
        try {
            setLoading(true);
            setError("");

            const response = await axios.get(
                `${import.meta.env.VITE_API_BASE_URL}/api/url/analytics/${shortId}`
            );

            setAnalyticsData(response.data);
        } catch (error) {
            console.error(error);

            setError(
                error?.response?.data?.error ||
                "Failed to fetch analytics"
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (shortId) {
            handleAnalytics(shortId);
        }
    }, [shortId]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen text-xl font-semibold">
                Loading Analytics...
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen text-red-500 text-lg">
                {error}
            </div>
        );
    }

    const analytics = analyticsData?.analytics;
    const totalClicks = analyticsData?.totalClicks;

    return (
        <div className="max-w-5xl mx-auto p-6">
            <div className="bg-white shadow-lg rounded-lg p-6">
                <h1 className="text-3xl font-bold mb-6">
                    URL Analytics <a className='underline text-sm text-blue-500 ms-9' href="/urls">Back To List</a>
                </h1>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="border rounded-lg p-4">
                        <h2 className="text-gray-500 text-sm mb-1">
                            Short ID
                        </h2>
                        <p className="font-semibold text-lg">
                            {analytics?.shortId}
                        </p>
                    </div>

                    <div className="border rounded-lg p-4">
                        <h2 className="text-gray-500 text-sm mb-1">
                            Total Clicks
                        </h2>
                        <p className="font-semibold text-lg text-blue-600">
                            {totalClicks}
                        </p>
                    </div>
                </div>

                {/* Original URL */}
                <div className="border rounded-lg p-4 mb-6">
                    <h2 className="text-gray-500 text-sm mb-2">
                        Original URL
                    </h2>

                    <a
                        href={analytics?.redirectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline break-all"
                    >
                        {analytics?.redirectUrl}
                    </a>
                </div>

                {/* Dates */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="border rounded-lg p-4">
                        <h2 className="text-gray-500 text-sm mb-1">
                            Created At
                        </h2>

                        <p>
                            {analytics?.createdAt
                                ? new Date(
                                    analytics.createdAt
                                ).toLocaleString()
                                : "-"}
                        </p>
                    </div>

                    <div className="border rounded-lg p-4">
                        <h2 className="text-gray-500 text-sm mb-1">
                            Last Updated
                        </h2>

                        <p>
                            {analytics?.updatedAt
                                ? new Date(
                                    analytics.updatedAt
                                ).toLocaleString()
                                : "-"}
                        </p>
                    </div>
                </div>

                {/* Visit History */}
                <div>
                    <h2 className="text-xl font-semibold mb-4">
                        Visit History
                    </h2>

                    {!analytics?.visitHistory?.length ? (
                        <p className="text-gray-500">
                            No visits recorded yet.
                        </p>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full border border-gray-300">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="border px-4 py-2">
                                            #
                                        </th>
                                        <th className="border px-4 py-2">
                                            Visit Time
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {analytics.visitHistory.map(
                                        (visit, index) => (
                                            <tr
                                                key={visit._id}
                                                className="hover:bg-gray-50"
                                            >
                                                <td className="border px-4 py-2">
                                                    {index + 1}
                                                </td>

                                                <td className="border px-4 py-2">
                                                    {new Date(
                                                        Number(
                                                            visit.timestamp
                                                        )
                                                    ).toLocaleString()}
                                                </td>
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UrlAnalytics;