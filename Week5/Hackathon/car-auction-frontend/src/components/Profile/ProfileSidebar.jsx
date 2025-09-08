import { cn } from "@/lib/utils"

export default function ProfileSidebar({ activeTab, onTabChange }) {
  const tabs = [
    { id: 'personal-info', label: 'Personal Information', icon: '' },
    { id: 'my-cars', label: 'My Cars', icon: '' },
    { id: 'my-bids', label: 'My Bids', icon: '' },
    { id: 'wishlist', label: 'Wishlist', icon: '' }
  ]

  return (
    <div className="w-64 bg-white border-r border-gray-200">
      <div className="p-6">
        <nav className="space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center space-x-3",
                activeTab === tab.id
                  ? "bg-blue-50 text-indigo-700 border-r-4 border-yellow-500"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
              )}
            >
              <span className="text-lg">{tab.icon}</span>
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  )
}