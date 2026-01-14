"use client";

import Link from 'next/link';
import { Facebook, MessageCircle, Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-slate-900 text-slate-300">
            {/* Main Footer Content */}
            <div className="container px-6 py-12 lg:py-16">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">

                    {/* Company Info */}
                    <div className="lg:col-span-1">
                        <div className="mb-6">
                            <img
                                src="/logo.png"
                                alt="Universal Quality Roofing"
                                className="h-16 w-auto object-contain brightness-0 invert opacity-90"
                            />
                        </div>
                        <p className="text-slate-400 mb-6 leading-relaxed">
                            Your trusted partner for roofing, construction, and remodeling services in Washington.
                        </p>

                        {/* Social Media */}
                        <div className="flex items-center gap-3">
                            <a
                                href="https://facebook.com/profile.php?id=100091521892847"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-slate-800 hover:bg-orange-500 p-3 rounded-lg transition-colors group"
                                aria-label="Facebook"
                            >
                                <Facebook size={20} className="text-slate-300 group-hover:text-white" />
                            </a>
                            <a
                                href="https://tiktok.com/@universalqualityroofing"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-slate-800 hover:bg-orange-500 p-3 rounded-lg transition-colors group"
                                aria-label="TikTok"
                            >
                                <svg
                                    className="w-5 h-5 text-slate-300 group-hover:text-white"
                                    fill="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-4">Quick Links</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link
                                    href="/"
                                    className="hover:text-orange-500 transition-colors inline-flex items-center gap-2"
                                >
                                    <span className="w-1 h-1 bg-orange-500 rounded-full"></span>
                                    Home
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/services"
                                    className="hover:text-orange-500 transition-colors inline-flex items-center gap-2"
                                >
                                    <span className="w-1 h-1 bg-orange-500 rounded-full"></span>
                                    Services
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/about"
                                    className="hover:text-orange-500 transition-colors inline-flex items-center gap-2"
                                >
                                    <span className="w-1 h-1 bg-orange-500 rounded-full"></span>
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/contact"
                                    className="hover:text-orange-500 transition-colors inline-flex items-center gap-2"
                                >
                                    <span className="w-1 h-1 bg-orange-500 rounded-full"></span>
                                    Contact Us
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/estimate"
                                    className="hover:text-orange-500 transition-colors inline-flex items-center gap-2"
                                >
                                    <span className="w-1 h-1 bg-orange-500 rounded-full"></span>
                                    Get Estimate
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-4">Our Services</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link
                                    href="/services#roofing"
                                    className="hover:text-orange-500 transition-colors inline-flex items-center gap-2"
                                >
                                    <span className="w-1 h-1 bg-orange-500 rounded-full"></span>
                                    Roofing Services
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/services#construction"
                                    className="hover:text-orange-500 transition-colors inline-flex items-center gap-2"
                                >
                                    <span className="w-1 h-1 bg-orange-500 rounded-full"></span>
                                    Construction
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/services#remodeling"
                                    className="hover:text-orange-500 transition-colors inline-flex items-center gap-2"
                                >
                                    <span className="w-1 h-1 bg-orange-500 rounded-full"></span>
                                    Remodeling
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-white font-bold text-lg mb-4">Contact Info</h3>
                        <ul className="space-y-4">
                            <li>
                                <a
                                    href="tel:+12067106754"
                                    className="hover:text-orange-500 transition-colors flex items-start gap-3"
                                >
                                    <Phone size={18} className="text-orange-500 flex-shrink-0 mt-1" />
                                    <div>
                                        <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">Call Us</div>
                                        <div className="font-semibold text-white">206-710-6754</div>
                                    </div>
                                </a>
                            </li>
                            <li>
                                <a
                                    href="mailto:info@universalqualityroofing.com"
                                    className="hover:text-orange-500 transition-colors flex items-start gap-3"
                                >
                                    <Mail size={18} className="text-orange-500 flex-shrink-0 mt-1" />
                                    <div>
                                        <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">Email</div>
                                        <div className="font-semibold text-white break-all">universalqualityroofingllc@hotmail.com</div>
                                    </div>
                                </a>
                            </li>
                            <li className="flex items-start gap-3">
                                <MapPin size={18} className="text-orange-500 flex-shrink-0 mt-1" />
                                <div>
                                    <div className="text-xs text-slate-500 uppercase tracking-wide mb-1">Location</div>
                                    <div className="font-semibold text-white">Washington State</div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-slate-800">
                <div className="container px-6 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500">
                        <p>
                            © {currentYear} Universal Quality Roofing LLC. All rights reserved.
                        </p>
                        <div className="flex items-center gap-6">
                            <Link href="/privacy" className="hover:text-orange-500 transition-colors">
                                Privacy Policy
                            </Link>
                            <Link href="/terms" className="hover:text-orange-500 transition-colors">
                                Terms of Service
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
