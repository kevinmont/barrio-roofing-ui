import Link from 'next/link';
import { ArrowRight, CheckCircle, Shield } from 'lucide-react';

const Hero = () => {
    return (
        <section className="relative min-h-[90vh] flex items-start lg:items-center pt-6 lg:pt-0 pb-12 box-border overflow-hidden bg-slate-50">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-slate-100/50 skew-x-12 translate-x-32" />
            <div className="absolute top-20 right-20 w-64 h-64 bg-orange-200/20 rounded-full blur-3xl" />
            <div className="absolute bottom-10 left-10 w-96 h-96 bg-blue-200/10 rounded-full blur-3xl" />

            <div className="container relative z-10 grid lg:grid-cols-2 gap-12 items-center px-6">
                <div className="space-y-8 animate-fade-in">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-50 text-orange-600 font-semibold text-sm border border-orange-100">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                        </span>
                        #1 Rated Roofing Contractor in WA
                    </div>

                    <h1 className="heading-xl">
                        Protect Your Home With <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-orange-600" style={{ color: 'hsl(var(--color-accent))' }}>
                            Top-Tier Roofing
                        </span>
                    </h1>

                    <p className="text-lead">
                        Experience the Universal Quality Roofing difference. We provide hassle-free roof replacement and repair with a focus on quality, transparency, and 5-star customer service.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <Link href="/estimate" className="btn btn-primary text-lg px-8">
                            Get Free Estimate <ArrowRight size={20} />
                        </Link>
                        <Link href="/services" className="btn btn-secondary text-lg px-8">
                            View Services
                        </Link>
                    </div>

                    <div className="pt-8 flex items-center gap-8 text-sm font-medium text-slate-500 border-t border-slate-200">
                        <div className="flex items-center gap-2">
                            <CheckCircle size={18} className="text-orange-500" />
                            Licensed & Insured
                        </div>
                        <div className="flex items-center gap-2">
                            <Shield size={18} className="text-orange-500" />
                            Lifetime Warranty
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="flex text-yellow-400">★★★★★</div>
                            500+ Happy Clients
                        </div>
                    </div>
                </div>

                <div className="relative">
                    <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3] group">
                        <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/0 transition-colors duration-500" />
                        {/* Placeholder for Hero Image - would be replaced by actual image */}
                        <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400">
                            <img
                                src="https://images.unsplash.com/photo-1632759145351-1d592919f522?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                                alt="Modern house roof"
                                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                            />
                        </div>

                        {/* Floating Card */}
                        <div className="absolute bottom-0 left-0 bg-white p-4 rounded-tr-xl flex items-center gap-4 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center text-green-600">
                                <Shield size={24} />
                            </div>
                            <div>
                                <p className="text-sm text-slate-500">Project Status</p>
                                <p className="font-bold text-slate-800">Completed on Time</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
