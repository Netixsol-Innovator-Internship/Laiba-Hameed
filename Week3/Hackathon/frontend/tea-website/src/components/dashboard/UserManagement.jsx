"use client"

import { useSelector } from "react-redux"
import { getUser } from "../../redux/slices/auth/authSlice"
import {
  useGetAllUsersQuery,
  useChangeUserRoleMutation,
  useBlockUnblockUserMutation,
} from "../../redux/slices/admin/adminApi"
import { useState } from "react"
import Modal from "./Modal"

const UserManagement = () => {
  const user = useSelector(getUser)
  const [showConfirmModal, setShowConfirmModal] = useState(false)
  const [confirmAction, setConfirmAction] = useState(null)

  const { data, isLoading, error } = useGetAllUsersQuery()
  const users = data?.data || []

  const [changeUserRole, { isLoading: isChangingRole }] = useChangeUserRoleMutation()
  const [blockUnblockUser, { isLoading: isBlockingUser }] = useBlockUnblockUserMutation()

  const handleConfirmAction = () => {
    if (confirmAction) {
      confirmAction.action()
      setShowConfirmModal(false)
      setConfirmAction(null)
    }
  }

  const toggleBlock = async (userId, userName, isBlocked) => {
    setConfirmAction({
      title: isBlocked ? "Unblock User" : "Block User",
      message: `Are you sure you want to ${isBlocked ? "unblock" : "block"} ${userName}?`,
      action: async () => {
        try {
          await blockUnblockUser({ userId, blocked: !isBlocked }).unwrap()
        } catch (error) {
          console.error("Failed to block/unblock user:", error)
        }
      },
    })
    setShowConfirmModal(true)
  }

  const changeRole = async (userId, role, userName, currentRole) => {
    if (role === currentRole) return // No change needed

    setConfirmAction({
      title: "Change User Role",
      message: `Are you sure you want to change ${userName}'s role from ${currentRole} to ${role}?`,
      action: async () => {
        try {
          await changeUserRole({ userId, role }).unwrap()
        } catch (error) {
          console.error("Failed to change user role:", error)
        }
      },
    })
    setShowConfirmModal(true)
  }

  const getAvailableRoles = (targetUser) => {
    if (user?.role === "superAdmin") {
      // SuperAdmin can change anyone to any role except themselves
      if (targetUser._id === user._id) return []
      return ["user", "admin", "superAdmin"]
    } else if (user?.role === "admin") {
      // Admin can only manage users (not other admins or superAdmins)
      if (targetUser.role !== "user") return []
      return ["user", "admin"]
    }
    return []
  }

  const getRoleBadgeStyle = (role) => {
    switch (role) {
      case "superAdmin":
        return "bg-purple-100 text-purple-800 border-purple-200"
      case "admin":
        return "bg-blue-100 text-blue-800 border-blue-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  if (isLoading)
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading users...</p>
        </div>
      </div>
    )

  if (error)
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <div className="text-red-600 font-medium mb-2">Error Loading Users</div>
        <p className="text-red-500">{error.message}</p>
      </div>
    )

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">User Management</h1>
        <p className="text-gray-600">Manage user roles and permissions across your platform</p>
        <div className="mt-4 bg-white rounded-lg p-4 shadow-sm border">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span className="text-gray-600">
                Total Users: <span className="font-semibold text-gray-900">{users.length}</span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-gray-600">
                Admins:{" "}
                <span className="font-semibold text-gray-900">{users.filter((u) => u.role === "admin").length}</span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <span className="text-gray-600">
                Blocked: <span className="font-semibold text-gray-900">{users.filter((u) => u.blocked).length}</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {users.map((u) => (
          <div
            key={u._id}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200 h-80 flex flex-col"
          >
            {/* User Info Header */}
            <div className="flex items-start justify-between mb-4 flex-shrink-0">
              <div className="flex-1 min-w-0">
                <h3 className="text-lg font-semibold text-gray-900 mb-1 truncate">{u.name}</h3>
                <p className="text-gray-500 text-sm truncate">{u.email}</p>
              </div>
              <div className="flex flex-col items-end gap-2 flex-shrink-0">
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getRoleBadgeStyle(u.role)}`}>
                  {u.role}
                </span>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    u.blocked
                      ? "bg-red-100 text-red-700 border border-red-200"
                      : "bg-green-100 text-green-700 border border-green-200"
                  }`}
                >
                  {u.blocked ? "Blocked" : "Active"}
                </span>
              </div>
            </div>

            {/* Action Buttons - flex-grow to fill remaining space */}
            <div className="flex flex-col gap-3 pt-4 border-t border-gray-100 flex-grow justify-end">
              {/* Role Change Dropdown */}
              {getAvailableRoles(u).length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Change Role</label>
                  <select
                    value={u.role}
                    onChange={(e) => changeRole(u._id, e.target.value, u.name, u.role)}
                    disabled={isChangingRole}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed bg-white text-gray-900"
                  >
                    {getAvailableRoles(u).map((role) => (
                      <option key={role} value={role}>
                        {role.charAt(0).toUpperCase() + role.slice(1)}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {(user?.role === "superAdmin" || (user?.role === "admin" && u.role === "user")) &&
                u.role !== "superAdmin" && (
                  <button
                    onClick={() => toggleBlock(u._id, u.name, u.blocked)}
                    disabled={isBlockingUser}
                    className={`w-full px-4 py-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                      u.blocked
                        ? "bg-green-600 hover:bg-green-700 text-white"
                        : "bg-red-600 hover:bg-red-700 text-white"
                    }`}
                  >
                    {isBlockingUser ? "Processing..." : u.blocked ? "Unblock User" : "Block User"}
                  </button>
                )}
            </div>
          </div>
        ))}
      </div>

      {users.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">👥</div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Users Found</h3>
          <p className="text-gray-500">There are no users to manage at the moment.</p>
        </div>
      )}

      {showConfirmModal && (
        <Modal onClose={() => setShowConfirmModal(false)}>
          <div className="text-center">
            <h3 className="text-lg font-medium text-gray-900 mb-4">{confirmAction?.title}</h3>
            <p className="text-gray-600 mb-6">{confirmAction?.message}</p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={() => setShowConfirmModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmAction}
                className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Confirm
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}

export default UserManagement
