import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // ✅ navigate import

function HomePage() {
  const [longUrl, setLongUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate(); // ✅ navigate hook

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setShortUrl("");
    if (!longUrl.trim()) {
      setError("Please enter a valid URL.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/v1/url/shorten",
        { original_url: longUrl.trim() }
      );

      const shortCode = response.data.data?.shortUrl || "";
      const baseUrl = "http://localhost:8000";
      const fullShortUrl = shortCode.startsWith("http")
        ? shortCode
        : `${baseUrl}/${shortCode}`;

      if (shortCode) {
        setShortUrl(fullShortUrl);
        setLongUrl("");
      } else {
        setError("Failed to generate short URL. Please try again.");
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "An error occurred while processing your request."
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white max-w-lg w-full p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
          URL Shortener App
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label
            htmlFor="longUrl"
            className="block text-gray-700 font-semibold mb-1"
          >
            Enter your long URL
          </label>
          <input
            id="longUrl"
            type="url"
            placeholder="https://www.example.com/your/long/url"
            value={longUrl}
            onChange={(e) => setLongUrl(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded-md text-white font-semibold ${
              loading
                ? "bg-indigo-300 cursor-not-allowed"
                : "bg-indigo-600 hover:bg-indigo-700"
            } transition-colors duration-200`}
          >
            {loading ? "Generating..." : "Generate Short URL"}
          </button>
        </form>

        {error && (
          <p className="mt-4 text-red-600 font-medium text-center">{error}</p>
        )}

        {shortUrl && (
          <div className="mt-6 p-4 bg-green-100 rounded-md text-center break-words">
            <p className="text-gray-700 font-semibold mb-2">Short URL:</p>
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-600 hover:underline"
            >
              {shortUrl}
            </a>
          </div>
        )}

        {/* ✅ Navigate without page reload */}
        <div className="mt-8 text-center">
          <button
            onClick={() => navigate("/allLists")}
            className="text-sm text-blue-600 hover:underline"
          >
            View All Shortened URLs (Admin)
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
