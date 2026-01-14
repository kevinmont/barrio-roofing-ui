"use client";

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowRight, Check, Home, Hammer, PaintBucket, Shield, Award, Clock } from 'lucide-react';

export default function ServicesPage() {
    const services = [
        {
            id: 'roofing',
            title: 'Roofing Services',
            icon: Home,
            description: 'Professional roofing solutions for residential and commercial properties',
            image: 'https://images.unsplash.com/photo-1632759145351-1d592919f522?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            features: [
                'Roof Replacement & Installation',
                'Roof Repairs & Maintenance',
                'Emergency Leak Repairs',
                'Roof Inspections',
                'Gutter Installation & Cleaning',
                'Shingle & Tile Roofing',
                'Flat Roof Systems',
                'Storm Damage Restoration'
            ],
            benefits: [
                'Lifetime Warranty Available',
                'Licensed & Insured',
                '24/7 Emergency Service',
                'Free Estimates'
            ]
        },
        {
            id: 'construction',
            title: 'Construction Services',
            icon: Hammer,
            description: 'Complete construction solutions from foundation to finish',
            image: '/construction2.jpeg',
            features: [
                'New Home Construction',
                'Commercial Building',
                'Room Additions',
                'Deck & Patio Construction',
                'Foundation Work',
                'Structural Repairs',
                'Framing & Carpentry',
                'Concrete & Masonry'
            ],
            benefits: [
                'Expert Project Management',
                'Quality Materials',
                'On-Time Completion',
                'Detailed Planning'
            ]
        },
        {
            id: 'remodeling',
            title: 'Remodeling Services',
            icon: PaintBucket,
            description: 'Transform your space with our expert remodeling services',
            image: '/remodeling.jpeg',
            features: [
                'Kitchen Remodeling',
                'Bathroom Renovation',
                'Basement Finishing',
                'Interior Design',
                'Flooring Installation',
                'Cabinet Installation',
                'Painting & Drywall',
                'Custom Millwork'
            ],
            benefits: [
                'Custom Designs',
                'Premium Finishes',
                'Transparent Pricing',
            ]
        }
    ];

    return (
        <main className="min-h-screen bg-slate-50">
            <Navbar />

            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-20 lg:py-32">
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00em0wIDI0YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00eiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>

                <div className="container px-6 relative z-10">
                    <div className="max-w-3xl mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                            Our Services
                        </h1>
                        <p className="text-xl text-slate-300 mb-8">
                            Comprehensive solutions for all your roofing, construction, and remodeling needs
                        </p>
                        <div className="flex flex-wrap justify-center gap-4">
                            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                                <Shield className="text-orange-500" size={20} />
                                <span className="text-sm font-semibold">Licensed & Insured</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                                <Award className="text-orange-500" size={20} />
                                <span className="text-sm font-semibold">Award Winning</span>
                            </div>
                            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                                <Clock className="text-orange-500" size={20} />
                                <span className="text-sm font-semibold">24/7 Support</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Sections */}
            <div className="container px-6 py-16 lg:py-24">
                {services.map((service, index) => {
                    const Icon = service.icon;
                    const isEven = index % 2 === 0;

                    return (
                        <section id={service.id} key={service.id} className={`mb-24 last:mb-0 ${index > 0 ? 'pt-24 border-t border-slate-200' : ''}`}>
                            <div className={`grid lg:grid-cols-2 gap-12 items-center ${!isEven ? 'lg:flex-row-reverse' : ''}`}>
                                {/* Image */}
                                <div className={`${!isEven ? 'lg:order-2' : ''}`}>
                                    <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
                                        <img
                                            src={service.image}
                                            alt={service.title}
                                            className="w-full h-[400px] object-cover transform group-hover:scale-105 transition-transform duration-700"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                                        <div className="absolute bottom-6 left-6 right-6">
                                            <div className="flex items-center gap-3 bg-white/95 backdrop-blur-sm px-4 py-3 rounded-xl w-fit">
                                                <div className="bg-orange-500 p-2 rounded-lg">
                                                    <Icon className="text-white" size={24} />
                                                </div>
                                                <span className="font-bold text-slate-900">{service.title}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className={`${!isEven ? 'lg:order-1' : ''}`}>
                                    <div className="inline-flex items-center gap-2 bg-orange-50 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                                        <Icon size={16} />
                                        {service.title}
                                    </div>

                                    <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                                        {service.description}
                                    </h2>

                                    {/* Features Grid */}
                                    <div className="grid sm:grid-cols-2 gap-3 mb-8">
                                        {service.features.map((feature, idx) => (
                                            <div key={idx} className="flex items-start gap-2">
                                                <Check className="text-orange-500 flex-shrink-0 mt-1" size={18} />
                                                <span className="text-slate-600">{feature}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Benefits */}
                                    <div className="bg-slate-100 rounded-xl p-6 mb-6">
                                        <h3 className="font-bold text-slate-900 mb-4">Why Choose Us?</h3>
                                        <div className="grid sm:grid-cols-2 gap-3">
                                            {service.benefits.map((benefit, idx) => (
                                                <div key={idx} className="flex items-center gap-2">
                                                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                                                    <span className="text-sm text-slate-700 font-medium">{benefit}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* CTA Buttons */}
                                    <div className="flex flex-col sm:flex-row gap-4">
                                        <Link
                                            href="/estimate"
                                            className="btn btn-primary text-center"
                                        >
                                            Get Free Estimate <ArrowRight size={20} />
                                        </Link>
                                        <a
                                            href="tel:+12067106754"
                                            className="btn btn-secondary text-center"
                                        >
                                            Call: 206-710-6754
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </section>
                    );
                })}
            </div>

            {/* CTA Section */}
            <section className="bg-gradient-to-r from-orange-500 to-orange-600 py-16 lg:py-20">
                <div className="container px-6">
                    <div className="max-w-3xl mx-auto text-center text-white">
                        <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                            Ready to Start Your Project?
                        </h2>
                        <p className="text-xl text-orange-50 mb-8">
                            Get a free, no-obligation estimate today and see why homeowners trust Universal Quality Roofing
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link
                                href="/estimate"
                                className="bg-white text-orange-600 hover:bg-slate-50 font-bold px-8 py-4 rounded-lg transition-colors inline-flex items-center justify-center gap-2"
                            >
                                Get Free Estimate <ArrowRight size={20} />
                            </Link>
                            <a
                                href="tel:+12067106754"
                                className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-bold px-8 py-4 rounded-lg transition-colors inline-flex items-center justify-center gap-2"
                            >
                                Call Now: 206-710-6754
                            </a>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}
