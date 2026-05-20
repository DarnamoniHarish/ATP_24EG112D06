import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import {
  loadingClass,
  errorClass,
  articleGrid,
  articleCardClass,
  articleTitle,
  ghostBtn,
  tagClass,
  timestampClass,
} from "../styles/common";

function AdminArticles() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("ALL"); // ALL | ACTIVE | INACTIVE
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get("https://atp-24eg112d06.onrender.com/admin-api/articles", {
          withCredentials: true,
        });
        setArticles(res.data.payload);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load articles");
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  const formatDate = (date) =>
    new Date(date).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
    });

  const visible =
    filter === "ALL"
      ? articles
      : articles.filter((a) =>
          filter === "ACTIVE" ? a.isArticleActive : !a.isArticleActive
        );

  const counts = {
    ALL: articles.length,
    ACTIVE: articles.filter((a) => a.isArticleActive).length,
    INACTIVE: articles.filter((a) => !a.isArticleActive).length,
  };

  if (loading) return <p className={loadingClass}>Loading articles…</p>;
  if (error) return <p className={errorClass}>{error}</p>;

  return (
    <div>
      {/* ── Filter tabs ──────────────────────────────────── */}
      <div className="flex gap-2 mb-6">
        {["ALL", "ACTIVE", "INACTIVE"].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition ${
              filter === tab
                ? "bg-[#0066cc] text-white"
                : "bg-[#f5f5f7] text-[#6e6e73] hover:bg-[#ebebf0]"
            }`}
          >
            {tab.charAt(0) + tab.slice(1).toLowerCase()}{" "}
            <span className="opacity-70">({counts[tab]})</span>
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="text-sm text-[#a1a1a6] text-center py-10">
          No articles found.
        </p>
      ) : (
        <div className={articleGrid}>
          {visible.map((article) => (
            <div
              key={article._id}
              className={`${articleCardClass} rounded-2xl relative`}
            >
              {/* Status pill */}
              <span
                className={`absolute top-3 right-3 text-[10px] font-semibold px-2.5 py-1 rounded-full ${
                  article.isArticleActive
                    ? "bg-[#34c759]/10 text-[#248a3d]"
                    : "bg-[#ff3b30]/10 text-[#cc2f26]"
                }`}
              >
                {article.isArticleActive ? "Active" : "Deleted"}
              </span>

              {/* Category */}
              <span className={tagClass}>{article.category}</span>

              {/* Title */}
              <p className={articleTitle}>{article.title}</p>

              {/* Author */}
              <p className="text-xs text-[#6e6e73]">
                ✍️ {article.author?.firstName || "Unknown"}{" "}
                {article.author?.lastName || ""}
              </p>

              {/* Excerpt */}
              <p className="text-sm text-[#6e6e73] leading-relaxed">
                {article.content.slice(0, 80)}…
              </p>

              {/* Footer */}
              <div className="mt-auto pt-3 border-t border-[#e8e8ed]">
                <span className={timestampClass}>
                  {formatDate(article.createdAt)}
                </span>
              </div>

              {/* View link — only for active articles */}
              {article.isArticleActive && (
                <button
                  className={`${ghostBtn} text-left mt-1`}
                  onClick={() =>
                    navigate(`/article/${article._id}`, { state: article })
                  }
                >
                  Read article →
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminArticles;
