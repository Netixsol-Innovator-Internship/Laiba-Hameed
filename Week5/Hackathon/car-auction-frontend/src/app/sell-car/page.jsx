import SellCarForm from '@/components/CarFormPage/CarForm'
import YourInfoForm from '@/components/CarFormPage/YourInfoForm'
import PageBreadcrumb from '@/components/common/PageBreadcrumb'
import Footer from '@/components/Layouts/Footer'
import Header from '@/components/Layouts/Header'
import React from 'react'

const AuctionCar = () => {
    return (
        <div className='flex flex-col jusitfy-between'>
            <Header />
            <PageBreadcrumb
                title="Sell Your Car"
                description="Manage your account, track your bids, and view your vehicles"
                breadcrumbItems={[
                    { label: "Home", href: "/" },
                    { label: "Sell Your Car", href: null }
                ]}
            />
            <div className='py-12 flex flex-col items-center'>
                {/* Page Heading */}
                <h1 className="text-[48px] font-bold text-left my-4 w-2xl">Tell us about your car</h1>
                <p className="text-[#535353] text-left text-lg max-w-2xl mx-auto mb-10">
                    Please give us some basics about yourself and car you’d like to sell.
                    We’ll also need details about the car’s title status as well as 50 photos that
                    highlight the car’s exterior and interior condition.
                    <br />
                    <br />
                    We’ll respond to your application within a business day, and we work with you to build a custom and professional listing and get the auction live.
                </p>
                <YourInfoForm/>
                <SellCarForm />
            </div>
            <Footer />
        </div>
    )
}

export default AuctionCar