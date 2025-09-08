import Link from 'next/link'

export default function Footer() {
    return (
        <footer className="bg-slate-900 text-white py-12 w-full">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {/* Company Info */}
                    <div>
                        <div className="flex items-center space-x-2 mb-4">
                            <div className="w-8 h-8 bg-orange-500 rounded flex items-center justify-center">
                                <span className="text-white font-bold text-lg">🚗</span>
                            </div>
                            <span className="text-xl font-bold">Car Finance</span>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Your trusted partner for finding quality vehicles through our secure
                            auction platform. We connect buyers with sellers nationwide.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-semibold mb-4 text-lg">Quick Links</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/about" className="text-gray-400 hover:text-orange-400 transition-colors">About Us</Link></li>
                            <li><Link href="/how-it-works" className="text-gray-400 hover:text-orange-400 transition-colors">How It Works</Link></li>
                            <li><Link href="/sell" className="text-gray-400 hover:text-orange-400 transition-colors">Sell Your Car</Link></li>
                            <li><Link href="/financing" className="text-gray-400 hover:text-orange-400 transition-colors">Financing</Link></li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="font-semibold mb-4 text-lg">Services</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/live-auctions" className="text-gray-400 hover:text-orange-400 transition-colors">Live Auctions</Link></li>
                            <li><Link href="/buy-now" className="text-gray-400 hover:text-orange-400 transition-colors">Buy Now</Link></li>
                            <li><Link href="/inspection" className="text-gray-400 hover:text-orange-400 transition-colors">Vehicle Inspection</Link></li>
                            <li><Link href="/warranty" className="text-gray-400 hover:text-orange-400 transition-colors">Warranty</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="font-semibold mb-4 text-lg">Support</h3>
                        <ul className="space-y-2 text-sm">
                            <li><Link href="/help" className="text-gray-400 hover:text-orange-400 transition-colors">Help Center</Link></li>
                            <li><Link href="/contact" className="text-gray-400 hover:text-orange-400 transition-colors">Contact Us</Link></li>
                            <li><Link href="/terms" className="text-gray-400 hover:text-orange-400 transition-colors">Terms of Service</Link></li>
                            <li><Link href="/privacy" className="text-gray-400 hover:text-orange-400 transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-slate-700 mt-8 pt-8 text-center">
                    <p className="text-gray-400 text-sm">
                        Copyright 2024 All Rights Reserved.
                    </p>
                </div>
            </div>
        </footer>
    )
}