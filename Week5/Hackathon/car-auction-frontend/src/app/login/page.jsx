import PageBreadcrumb from '@/components/common/PageBreadcrumb'
import LoginForm from '@/components/Forms/LoginForm'
import Footer from '@/components/Layouts/Footer'
import Header from '@/components/Layouts/Header'
import React from 'react'

const LoginPage = () => {
    return (
        <div>
            <Header />
            <PageBreadcrumb
                title="Login"
                description="Lorem ipsum dolor sit amet consectetur. At in pretium semper vitae eu eu mus."
                breadcrumbItems={[
                    { label: "Home", href: "/" },
                    { label: "Login", href: null }
                ]}
            />
            <LoginForm/>
            <Footer />
        </div>
    )
}

export default LoginPage