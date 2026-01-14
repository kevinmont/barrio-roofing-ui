"use client";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Phone } from 'lucide-react';

const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleSubmenu = (menu: string) => {
        setOpenSubmenu(openSubmenu === menu ? null : menu);
    };

    return (
        <>
            <nav
                className={`sticky top-0 w-full z-40 transition-all duration-300 bg-white shadow-sm border-b border-slate-100 h-[100px] flex items-center`}
            >
                <div className="container flex items-center justify-between px-6 max-w-7xl mx-auto h-full">

                    {/* Left Side: Logo */}
                    <Link href="/" className="flex items-center gap-1 group relative z-50">
                        <div className="relative w-45 h-30 flex items-center">
                            <img src="/logo.png" alt="Universal Quality Roofing" className="w-full h-full object-contain" />
                        </div>
                    </Link>

                    {/* Right Side: Phone + Hamburger */}
                    <div className="flex items-center gap-6">

                        {/* Contact Info (Desktop Only) */}
                        <div className="hidden sm:flex flex-col items-end text-right">
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-1">
                                Call for a Free Quote
                            </span>
                            <a
                                href="tel:+12067106754"
                                className="text-2xl font-bold text-[#1e3a8a] hover:text-orange-500 transition-colors leading-none"
                            >
                                206-710-6754
                            </a>
                        </div>

                        {/* Hamburger Button (Always Visible) */}
                        <button
                            className="p-2 text-slate-800 hover:text-orange-500 transition-colors z-50"
                            onClick={() => setIsMenuOpen(true)}
                        >
                            <Menu size={36} strokeWidth={1.5} />
                        </button>

                    </div>

                </div>
            </nav>

            {/* FULL SCREEN OVERLAY MENU */}
            <div
                className={`fixed inset-0 bg-white z-50 transform transition-transform duration-300 ease-out flex flex-col
          ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
            >
                {/* Overlay Header */}
                <div className="h-[100px] flex items-center justify-between px-6 shadow-sm">
                    {/* Logo within Menu */}
                    <div className="w-45 h-30 flex items-center opacity-80 decoration-slice">
                        <img src="/logo.png" alt="Universal Quality Roofing" className="w-full h-full object-contain" />
                    </div>

                    <button
                        onClick={() => setIsMenuOpen(false)}
                        className="p-2 text-slate-800 hover:text-red-500 transition-colors"
                    >
                        <X size={40} strokeWidth={1.5} />
                    </button>
                </div>

                {/* Menu Items */}
                <div className="flex-1 overflow-y-auto py-8 px-6 flex flex-col items-end text-right space-y-2">

                    <Link
                        href="/services"
                        className="text-xl font-bold text-slate-900 uppercase tracking-wide hover:text-orange-600 py-3"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Services
                    </Link>

                    <Link
                        href="/about"
                        className="text-xl font-bold text-slate-900 uppercase tracking-wide hover:text-orange-600 py-3"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        About Us
                    </Link>

                    <Link
                        href="/contact"
                        className="text-xl font-bold text-slate-900 uppercase tracking-wide hover:text-orange-600 py-3 mb-6"
                        onClick={() => setIsMenuOpen(false)}
                    >
                        Contact Us
                    </Link>

                    {/* CTA Button in Menu */}
                    <div className="mt-8 flex items-center border-2 border-[#1e3a8a] rounded-lg overflow-hidden group w-fit self-end">
                        <div className="p-3 bg-white text-[#1e3a8a] group-hover:bg-slate-50">
                            <Phone size={24} />
                        </div>
                        <a href="tel:+12067106754" className="bg-[#1e3a8a] text-white font-bold text-lg px-6 py-3 hover:bg-[#152865] transition-colors">
                            206-710-6754
                        </a>
                    </div>

                </div>
            </div>
        </>
    );
};

export default Navbar;
