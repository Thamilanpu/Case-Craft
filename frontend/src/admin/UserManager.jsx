import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar.jsx";
import { getAdminUsers, updateUserRole, deleteAdminUser } from "../api/adminApi.js";

const ADMIN_STORAGE_KEY = "cpc_admin_token";

const UserManager = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({ pages: 1, total: 0 });
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [updating, setUpdating] = useState(false);

  const fetchUsers = useCallback(async () => {
    const token = localStorage.getItem(ADMIN_STORAGE_KEY);
    if (!token) {
      navigate("/admin/login");
      return;
    }

    setLoading(true);
    try {
      const data = await getAdminUsers({ page, search, token });
      setUsers(data.data);
      setPagination(data.pagination);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [navigate, page, search]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleRoleChange = async (userId, newRole) => {
    const token = localStorage.getItem(ADMIN_STORAGE_KEY);
    if (!token) {
      navigate("/admin/login");
      return;
    }

    if (!window.confirm(`Change user role to ${newRole}?`)) return;

    setUpdating(true);
    try {
      await updateUserRole(userId, newRole, token);
      await fetchUsers();
      setSelectedUser(null);
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to update user role");
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async (id) => {
    const token = localStorage.getItem(ADMIN_STORAGE_KEY);
    if (!token) {
      navigate("/admin/login");
      return;
    }

    if (!window.confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
      return;
    }

    try {
      await deleteAdminUser(id, token);
      await fetchUsers();
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to delete user");
    }
  };

  return (
    <div className="mx-auto flex max-w-8xl flex-col gap-8 px-4 py-8 md:flex-row">
      <AdminSidebar />
      <main className="flex-1 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-slate-800">User Management</h1>
            <p className="text-sm text-slate-500">Manage users and assign admin access.</p>
          </div>
          <input
            type="search"
            placeholder="Search by name or email..."
            className="rounded-full border border-slate-200 px-4 py-2 text-sm"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>
        <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
          <table className="min-w-full divide-y divide-slate-100">
            <thead className="bg-slate-50 text-left text-xs font-semibold uppercase text-slate-500">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Email</th>
                <th className="px-4 py-3">Role</th>
                <th className="px-4 py-3">Joined</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-sm text-slate-600">
              {loading ? (
                <tr>
                  <td colSpan="5" className="px-4 py-6 text-center">
                    Loading users...
                  </td>
                </tr>
              ) : users.length === 0 ? (
                <tr>
                  <td colSpan="5" className="px-4 py-6 text-center">
                    No users found.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user._id} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-medium text-slate-800">{user.name}</td>
                    <td className="px-4 py-3">{user.email}</td>
                    <td className="px-4 py-3">
                      <span
                        className={
                          user.role === "admin"
                            ? "rounded-full bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-700"
                            : "rounded-full bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700"
                        }
                      >
                        {user.role || "user"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-slate-500">
                      {new Date(user.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 space-x-2">
                      <button
                        onClick={() => setSelectedUser(user)}
                        className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-200"
                      >
                        Manage
                      </button>
                      {user.role !== "admin" && (
                        <button
                          onClick={() => handleRoleChange(user._id, "admin")}
                          disabled={updating}
                          className="rounded-full bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-700 hover:bg-purple-100 disabled:opacity-60"
                        >
                          Make Admin
                        </button>
                      )}
                      {user.role === "admin" && (
                        <button
                          onClick={() => handleRoleChange(user._id, "user")}
                          disabled={updating}
                          className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 hover:bg-amber-100 disabled:opacity-60"
                        >
                          Remove Admin
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(user._id)}
                        className="rounded-full bg-rose-50 px-3 py-1 text-xs font-semibold text-rose-600 hover:bg-rose-100"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between text-sm text-slate-500">
          <p>
            Page {pagination.page || 1} of {pagination.pages || 1} • Total {pagination.total} users
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="rounded-full border border-slate-200 px-4 py-2 disabled:opacity-50"
            >
              Previous
            </button>
            <button
              onClick={() => setPage((p) => (p < (pagination.pages || 1) ? p + 1 : p))}
              disabled={page >= (pagination.pages || 1)}
              className="rounded-full border border-slate-200 px-4 py-2 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </main>
      {selectedUser && (
        <div className="fixed inset-0 z-20 flex items-center justify-center bg-black/60 px-4">
          <div className="max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-slate-800">User Details</h2>
                <p className="text-xs text-slate-500">{selectedUser.email}</p>
              </div>
              <button
                onClick={() => setSelectedUser(null)}
                className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-200"
              >
                Close
              </button>
            </div>
            <div className="space-y-4">
              <div className="space-y-2 text-sm">
                <div>
                  <span className="font-semibold text-slate-600">Name:</span>{" "}
                  <span className="text-slate-800">{selectedUser.name}</span>
                </div>
                <div>
                  <span className="font-semibold text-slate-600">Email:</span>{" "}
                  <span className="text-slate-800">{selectedUser.email}</span>
                </div>
                <div>
                  <span className="font-semibold text-slate-600">Role:</span>{" "}
                  <span
                    className={
                      selectedUser.role === "admin"
                        ? "text-purple-700 font-semibold"
                        : "text-slate-700"
                    }
                  >
                    {selectedUser.role || "user"}
                  </span>
                </div>
                <div>
                  <span className="font-semibold text-slate-600">Joined:</span>{" "}
                  <span className="text-slate-800">
                    {new Date(selectedUser.createdAt).toLocaleString()}
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-2 pt-4 border-t border-slate-200">
                {selectedUser.role !== "admin" ? (
                  <button
                    onClick={() => handleRoleChange(selectedUser._id, "admin")}
                    disabled={updating}
                    className="w-full rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white hover:bg-accent-dark disabled:opacity-60"
                  >
                    {updating ? "Updating..." : "Grant Admin Access"}
                  </button>
                ) : (
                  <button
                    onClick={() => handleRoleChange(selectedUser._id, "user")}
                    disabled={updating}
                    className="w-full rounded-full bg-amber-600 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-700 disabled:opacity-60"
                  >
                    {updating ? "Updating..." : "Remove Admin Access"}
                  </button>
                )}
                <button
                  onClick={() => {
                    setSelectedUser(null);
                    handleDelete(selectedUser._id);
                  }}
                  className="w-full rounded-full bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-600 hover:bg-rose-100"
                >
                  Delete User
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManager;

