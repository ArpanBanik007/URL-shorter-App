import React, { useEffect, useState } from "react";
import axios from "axios";

function AllCollection() {
  const [urls, setUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalFetched, setTotalFetched] = useState(0);

  // Admin-only data fetch
  const fetchUrls = async (pageNo = 1) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token"); // ধরে নিচ্ছি JWT এখানে স্টোর করছো

      const res = await axios.get(
        `https://url-shorter-app.onrender.com/api/v1/url/admin/urls?page=${pageNo}&limit=10`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true, // যদি cookie-based auth হয়
        }
      );

      setUrls(res.data.data);
      setTotalFetched(res.data.data.length);
      setPage(pageNo);
    } catch (err) {
      console.error(err.response?.data || err.message);
      setUrls([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUrls(page);
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📋 All Shortened URLs</h1>

      {loading && <p>Loading...</p>}

      {!loading && urls.length === 0 && (
        <p className="text-gray-500">No URLs found.</p>
      )}

      {!loading && urls.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 rounded-lg">
            <thead>
              <tr className="bg-gray-100 border-b">
                <th className="p-2 text-left">Short Code</th>
                <th className="p-2 text-left">Original URL</th>
                <th className="p-2 text-left">Clicks</th>
                <th className="p-2 text-left">Created</th>
              </tr>
            </thead>
            <tbody>
              {urls.map((url) => (
                <tr
                  key={url._id}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="p-2 text-blue-500">
                    <a
                      href={`https://url-shorter-app.onrender.com/${url.short_code}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {url.short_code}
                    </a>
                  </td>
                  <td className="p-2 text-sm break-all">{url.original_url}</td>
                  <td className="p-2 font-semibold">{url.clicks}</td>
                  <td className="p-2 text-sm text-gray-600">
                    {new Date(url.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-4">
            <button
              disabled={page === 1}
              onClick={() => fetchUrls(page - 1)}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              ◀ Prev
            </button>
            <span>
              Page {page} — Showing {totalFetched} items
            </span>
            <button
              disabled={urls.length < 10}
              onClick={() => fetchUrls(page + 1)}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              Next ▶
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AllCollection;
