import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import {
  pageBackground,
  articleGrid,
  articleCardClass,
  articleTitle,
  ghostBtn,
  loadingClass,
  errorClass,
  timestampClass,
  tagClass,
} from "../styles/common";

function Home() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const res = await axios.get("https://atp-24eg112d06.onrender.com/auth/articles");
        if (res.status === 200) {
          setArticles(res.data.payload);
        }
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

  const goToArticle = (article) => {
    navigate(`/article/${article._id}`, { state: article });
  };

  const filtered = articles.filter(
    (a) =>
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.category.toLowerCase().includes(search.toLowerCase()) ||
      `${a.author?.firstName} ${a.author?.lastName}`
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div className={pageBackground}>
      {/* ── Hero ──────────────────────────────────────────────── */}
      <div className="border-b border-[#e8e8ed] px-6 py-20 text-center">
        <p className="text-[0.7rem] font-semibold uppercase tracking-widest text-[#0066cc] mb-3">
          MyBlog
        </p>
        <h1 className="text-5xl font-bold text-[#1d1d1f] tracking-tight leading-tight mb-4">
          Ideas worth reading.
        </h1>
        <p className="text-[#6e6e73] text-lg max-w-xl mx-auto mb-10">
          Explore articles written by authors across categories. No account
          needed — just read.
        </p>

        {/* Search */}
        <div className="max-w-sm mx-auto">
          <input
            type="text"
            placeholder="Search by title, category or author…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[#f5f5f7] border border-[#d2d2d7] rounded-full px-5 py-2.5 text-sm text-[#1d1d1f] placeholder:text-[#a1a1a6] focus:outline-none focus:border-[#0066cc] focus:ring-2 focus:ring-[#0066cc]/10 transition"
          />
        </div>
      </div>

      {/* ── Articles ──────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-6 py-14">
        {loading && <p className={loadingClass}>Loading articles…</p>}
        {error && <p className={errorClass}>{error}</p>}

        {!loading && !error && filtered.length === 0 && (
          <p className="text-center text-[#a1a1a6] text-sm py-16">
            {search ? "No articles match your search." : "No articles yet."}
          </p>
        )}

        {!loading && !error && filtered.length > 0 && (
          <>
            <p className="text-xs text-[#a1a1a6] mb-6">
              {filtered.length} article{filtered.length !== 1 ? "s" : ""}
            </p>

            <div className={articleGrid}>
              {filtered.map((article) => (
                <div
                  key={article._id}
                  className={`${articleCardClass} rounded-2xl`}
                  onClick={() => goToArticle(article)}
                >
                  {/* Category */}
                  <span className={tagClass}>{article.category}</span>

                  {/* Title */}
                  <p className={articleTitle}>{article.title}</p>

                  {/* Excerpt */}
                  <p className="text-sm text-[#6e6e73] leading-relaxed">
                    {article.content.slice(0, 90)}…
                  </p>

                  {/* Meta */}
                  <div className="mt-auto pt-3 border-t border-[#e8e8ed] flex items-center justify-between">
                    <span className="text-xs text-[#6e6e73] font-medium">
                      ✍️{" "}
                      {article.author?.firstName || "Author"}
                    </span>
                    <span className={timestampClass}>
                      {formatDate(article.createdAt)}
                    </span>
                  </div>

                  <button className={`${ghostBtn} text-left mt-1`}>
                    Read article →
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
