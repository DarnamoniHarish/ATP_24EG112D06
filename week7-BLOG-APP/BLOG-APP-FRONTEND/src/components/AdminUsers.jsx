import { useEffect, useState } from "react";
import axios from "axios";
import { loadingClass, errorClass } from "../styles/common";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("ALL"); // ALL | USER | AUTHOR

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.get("https://atp-24eg112d06.onrender.com/admin-api/users", {
        withCredentials: true,
      });
      setUsers(res.data.payload);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  const toggleBlock = async (user) => {
    const newStatus = !user.isUserActive;
    const action = newStatus ? "Unblock" : "Block";
    if (!window.confirm(`${action} ${user.firstName}?`)) return;

    try {
      const res = await axios.patch(
        `https://atp-24eg112d06.onrender.com/admin-api/user/${user._id}`,
        { isUserActive: newStatus },
        { withCredentials: true }
      );
      // update local state
      setUsers((prev) =>
        prev.map((u) => (u._id === user._id ? res.data.payload : u))
      );
    } catch (err) {
      alert(err.response?.data?.message || "Action failed");
    }
  };

  const visible =
    filter === "ALL" ? users : users.filter((u) => u.role === filter);

  const counts = {
    ALL: users.length,
    USER: users.filter((u) => u.role === "USER").length,
    AUTHOR: users.filter((u) => u.role === "AUTHOR").length,
  };

  if (loading) return <p className={loadingClass}>Loading users…</p>;
  if (error) return <p className={errorClass}>{error}</p>;

  return (
    <div>
      {/* ── Filter tabs ────────────────────────────────────── */}
      <div className="flex gap-2 mb-6">
        {["ALL", "USER", "AUTHOR"].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition ${
              filter === tab
                ? "bg-[#0066cc] text-white"
                : "bg-[#f5f5f7] text-[#6e6e73] hover:bg-[#ebebf0]"
            }`}
          >
            {tab === "ALL" ? "All" : tab === "USER" ? "Users" : "Authors"}{" "}
            <span className="opacity-70">({counts[tab]})</span>
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="text-sm text-[#a1a1a6] text-center py-10">
          No {filter === "ALL" ? "users" : filter.toLowerCase() + "s"} found.
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {visible.map((user) => (
            <div
              key={user._id}
              className="bg-white border border-[#e8e8ed] rounded-2xl px-5 py-4 flex items-center justify-between gap-4"
            >
              {/* Avatar + info */}
              <div className="flex items-center gap-4 min-w-0">
                {user.profileImageUrl ? (
                  <img
                    src={user.profileImageUrl}
                    alt=""
                    className="w-10 h-10 rounded-full object-cover border shrink-0"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-[#0066cc]/10 text-[#0066cc] flex items-center justify-center text-sm font-semibold shrink-0">
                    {user.firstName?.charAt(0).toUpperCase()}
                  </div>
                )}

                <div className="min-w-0">
                  <p className="text-sm font-semibold text-[#1d1d1f] truncate">
                    {user.firstName} {user.lastName}
                  </p>
                  <p className="text-xs text-[#6e6e73] truncate">{user.email}</p>
                </div>
              </div>

              {/* Right side */}
              <div className="flex items-center gap-3 shrink-0">
                {/* Role badge */}
                <span
                  className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${
                    user.role === "AUTHOR"
                      ? "bg-[#5856d6]/10 text-[#5856d6]"
                      : "bg-[#34c759]/10 text-[#248a3d]"
                  }`}
                >
                  {user.role}
                </span>

                {/* Active badge */}
                <span
                  className={`text-[10px] font-semibold px-2.5 py-1 rounded-full ${
                    user.isUserActive
                      ? "bg-[#34c759]/10 text-[#248a3d]"
                      : "bg-[#ff3b30]/10 text-[#cc2f26]"
                  }`}
                >
                  {user.isUserActive ? "Active" : "Blocked"}
                </span>

                {/* Block / Unblock */}
                <button
                  onClick={() => toggleBlock(user)}
                  className={`text-xs font-semibold px-4 py-1.5 rounded-full transition ${
                    user.isUserActive
                      ? "bg-[#ff3b30] text-white hover:bg-[#d62c23]"
                      : "bg-[#34c759] text-white hover:bg-[#248a3d]"
                  }`}
                >
                  {user.isUserActive ? "Block" : "Unblock"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminUsers;
