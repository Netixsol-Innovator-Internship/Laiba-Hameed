import PageBreadcrumb from '@/components/common/PageBreadcrumb'
import RegisterForm from '@/components/Forms/RegisterForm'
import Footer from '@/components/Layouts/Footer'
import Header from '@/components/Layouts/Header'
import React from 'react'

const RegisterPage = () => {
    return (
        <div>
            <Header />
            <PageBreadcrumb
                title="Register"
                description="Lorem ipsum dolor sit amet consectetur. At in pretium semper vitae eu eu mus."
                breadcrumbItems={[
                    { label: "Home", href: "/" },
                    { label: "Register", href: null }
                ]}
            />
            <RegisterForm />
            <Footer />
        </div>
    )
}

export default RegisterPage