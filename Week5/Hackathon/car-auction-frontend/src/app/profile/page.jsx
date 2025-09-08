'use client'

import PageBreadcrumb from '@/components/common/PageBreadcrumb'
import Footer from '@/components/Layouts/Footer'
import Header from '@/components/Layouts/Header'
import MyBids from '@/components/Profile/MyBids'
import MyCars from '@/components/Profile/MyCars'
import PersonalInformation from '@/components/Profile/PersonalInformation'
import ProfileSidebar from '@/components/Profile/ProfileSidebar'
import Wishlist from '@/components/Profile/Wishlist'
import { getUser } from '@/redux/slices/auth/authSlice'
import { useGetUserQuery } from '@/redux/slices/users/usersApi'
import { useState } from 'react'
import { useSelector } from 'react-redux'

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState('personal-info')

  // ✅ Get user object from Redux store
  const currUser = useSelector(getUser)
  const userId = currUser?._id   

  const { data : user, error, isLoading } = useGetUserQuery(userId, {
    skip: !userId, 
  })

  const renderTabContent = () => {
    if (isLoading) return <p>Loading...</p>
    if (error) return <p className="text-red-500">Failed to load user data</p>
    if (!user) return <p>No user data found</p>

    switch (activeTab) {
      case 'personal-info':
        return <PersonalInformation user={user} />
      case 'my-cars':
        return <MyCars myCars={user.myCars} />
      case 'my-bids':
        return <MyBids bids={user.bids} />
      case 'wishlist':
        return <Wishlist wishlists={user.wishlists} />
      default:
        return <PersonalInformation user={user} />
    }
  }

  const getTabTitle = () => {
    switch (activeTab) {
      case 'personal-info':
        return 'Personal Information'
      case 'my-cars':
        return 'My Cars'
      case 'my-bids':
        return 'My Bids'
      case 'wishlist':
        return 'Wishlist'
      default:
        return 'Personal Information'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <PageBreadcrumb
        title="Profile"
        description="Manage your account, track your bids, and view your vehicles"
        breadcrumbItems={[
          { label: "Home", href: "/" },
          { label: "Profile", href: null }
        ]}
      />

      <main className="container mx-auto px-4 py-8">
        <div className="flex min-h-screen">
          {/* Left Sidebar - Navigation */}
          <ProfileSidebar activeTab={activeTab} onTabChange={setActiveTab} />

          {/* Right Content Area */}
          <div className="flex-1 pl-8">
            <div className="bg-white rounded-lg shadow-sm min-h-full">
              <div className="p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">{getTabTitle()}</h1>
                {renderTabContent()}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
