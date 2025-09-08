import Link from 'next/link'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '../ui/breadcrumb'


export default function PageBreadcrumb({
    title = "Auction",
    description = "Lorem ipsum dolor sit amet consectetur. At in pretium semper vitae eu eu mus.",
    breadcrumbItems = [
        { label: "Home", href: "/" },
        { label: "Auction", href: null } 
    ]
}) {
    return (
        <section className="bg-[#C6D8F9] pt-10">
            <div className="container mx-auto px-4">
                <div className="text-center">
                    {/* Page Title */}
                    <h1 className="text-4xl md:text-5xl font-josefin Josefin-Sans font-bold text-[#2E3D83] mb-4">
                        {title}
                    </h1>

                    {/* Decorative Line */}
                    <div className="w-16 h-1 bg-[#2E3D83] mx-auto mb-10"></div>

                    {/* Description */}
                    <p className="text-[#545677] text-lg mb-8 max-w-2xl mx-auto">
                        {description}
                    </p>

                    {/* Breadcrumb Navigation */}
                    <Breadcrumb className="flex items-center justify-center w-full">
                        <BreadcrumbList className={'flex items-center justify-center bg-[#BBD0F6] py-2 px-4'} >
                            {breadcrumbItems.map((item, index) => (
                                <div key={index} className='flex items-center'>
                                    <BreadcrumbItem>
                                        {item.href ? (
                                            <BreadcrumbLink asChild>
                                                <Link href={item.href} className="text-gray-600 hover:text-gray-800">
                                                    {item.label}
                                                </Link>
                                            </BreadcrumbLink>
                                        ) : (
                                            <BreadcrumbPage className="text-[#2E3D83] font-medium">
                                                {item.label}
                                            </BreadcrumbPage>
                                        )}
                                    </BreadcrumbItem>
                                    {index < breadcrumbItems.length - 1 && <BreadcrumbSeparator />}
                                </div>
                            ))}
                        </BreadcrumbList>
                    </Breadcrumb>
                </div>
            </div>
        </section>
    )
}
