import { useParams, useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../store/authStore";
import {
  articlePageWrapper,
  articleHeader,
  articleCategory,
  articleMainTitle,
  articleAuthorRow,
  authorInfo,
  articleContent,
  articleFooter,
  articleActions,
  editBtn,
  deleteBtn,
  loadingClass,
  errorClass,
  inputClass,
  commentsWrapper,
  commentCard,
  commentHeader,
  commentUserRow,
  avatar,
  commentUser,
  commentTime,
  commentText,
  ghostBtn,
} from "../styles/common.js";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

function ArticleByID() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();

  const user = useAuth((state) => state.currentUser);
  const isAuthenticated = useAuth((state) => state.isAuthenticated);

  const [article, setArticle] = useState(location.state || null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // If article already passed via state, use it
    if (article) return;

    // Otherwise fetch from public endpoint (no auth needed)
    const getArticle = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `http://localhost:5000/auth/articles/${id}`
        );
        setArticle(res.data.payload);
      } catch (err) {
        setError(
          err.response?.data?.message || "Article not found or unavailable."
        );
      } finally {
        setLoading(false);
      }
    };

    getArticle();
  }, [id]);

  const formatDate = (date) =>
    new Date(date).toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      dateStyle: "medium",
      timeStyle: "short",
    });

  // Author: soft-delete / restore article
  const toggleArticleStatus = async () => {
    const newStatus = !article.isArticleActive;
    const confirmMsg = newStatus ? "Restore this article?" : "Delete this article?";
    if (!window.confirm(confirmMsg)) return;

    try {
      const res = await axios.patch(
        "http://localhost:5000/author-api/article",
        { articleId: article._id, isArticleActive: newStatus },
        { withCredentials: true }
      );
      setArticle(res.data.payload);
      toast.success(res.data.message);
    } catch (err) {
      const msg = err.response?.data?.message;
      toast.error(msg || "Operation failed");
    }
  };

  // Author: navigate to edit page
  const editArticle = (articleObj) => {
    navigate("/edit-article", { state: articleObj });
  };

  // User: post comment
  const addComment = async (commentObj) => {
    commentObj.articleId = article._id;
    try {
      const res = await axios.put(
        "http://localhost:5000/user-api/articles",
        commentObj,
        { withCredentials: true }
      );
      if (res.status === 200) {
        toast.success("Comment added!");
        setArticle(res.data.payload);
        reset();
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to add comment");
    }
  };

  if (loading) return <p className={loadingClass}>Loading article…</p>;
  if (error) return <p className={`${errorClass} max-w-2xl mx-auto mt-16`}>{error}</p>;
  if (!article) return null;

  return (
    <div className={articlePageWrapper}>
      {/* ── Header ──────────────────────────────────────────── */}
      <div className={articleHeader}>
        <span className={articleCategory}>{article.category}</span>

        <h1 className={`${articleMainTitle} uppercase`}>{article.title}</h1>

        <div className={articleAuthorRow}>
          <div className={authorInfo}>
            ✍️ {article.author?.firstName || "Author"}
          </div>
          <div>{formatDate(article.createdAt)}</div>
        </div>
      </div>

      {/* ── Content ─────────────────────────────────────────── */}
      <div className={articleContent}>{article.content}</div>

      {/* ── Author actions ──────────────────────────────────── */}
      {user?.role === "AUTHOR" && (
        <div className={articleActions}>
          <button className={editBtn} onClick={() => editArticle(article)}>
            Edit
          </button>
          <button className={deleteBtn} onClick={toggleArticleStatus}>
            {article.isArticleActive ? "Delete" : "Restore"}
          </button>
        </div>
      )}

      {/* ── User: comment form ──────────────────────────────── */}
      {user?.role === "USER" && (
        <div className={articleActions}>
          <form
            onSubmit={handleSubmit(addComment)}
            className="w-full flex flex-col gap-3"
          >
            <input
              type="text"
              {...register("comment", { required: true })}
              className={inputClass}
              placeholder="Write your comment here…"
            />
            <button
              type="submit"
              className="bg-[#0066cc] text-white px-5 py-2 rounded-full text-sm hover:bg-[#004499] transition w-fit"
            >
              Add Comment
            </button>
          </form>
        </div>
      )}

      {/* ── Guest prompt ────────────────────────────────────── */}
      {!isAuthenticated && (
        <div className="mt-8 bg-[#f5f5f7] rounded-2xl px-6 py-5 text-center">
          <p className="text-sm text-[#6e6e73] mb-3">
            Want to leave a comment?{" "}
            <button
              className={ghostBtn}
              onClick={() => navigate("/login")}
            >
              Sign in
            </button>{" "}
            or{" "}
            <button
              className={ghostBtn}
              onClick={() => navigate("/register")}
            >
              create an account
            </button>
            .
          </p>
        </div>
      )}

      {/* ── Comments ────────────────────────────────────────── */}
      <div className={commentsWrapper}>
        <h3 className="text-base font-semibold text-[#1d1d1f] mb-2">
          Comments ({article.comments?.length || 0})
        </h3>

        {article.comments?.length === 0 && (
          <p className="text-[#a1a1a6] text-sm text-center py-6">
            No comments yet. Be the first!
          </p>
        )}

        {article.comments?.map((commentObj, index) => {
          const name =
            commentObj.user?.firstName ||
            commentObj.user?.email ||
            "User";
          const firstLetter = name.charAt(0).toUpperCase();

          return (
            <div key={index} className={commentCard}>
              <div className={commentHeader}>
                <div className={commentUserRow}>
                  <div className={avatar}>{firstLetter}</div>
                  <div>
                    <p className={commentUser}>{name}</p>
                    <p className={commentTime}>
                      {formatDate(commentObj.createdAt || new Date())}
                    </p>
                  </div>
                </div>
              </div>
              <p className={commentText}>{commentObj.comment}</p>
            </div>
          );
        })}
      </div>

      {/* ── Footer ──────────────────────────────────────────── */}
      <div className={articleFooter}>
        Last updated: {formatDate(article.updatedAt)}
      </div>
    </div>
  );
}

export default ArticleByID;
