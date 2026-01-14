"use client";

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ChevronLeft, Check, Home, PenTool, Shield, ArrowRight, Loader2 } from 'lucide-react';

type FormData = {
    serviceType: string;
    timeframe: string;
    address: string;
    name: string;
    email: string;
    phone: string;
    details: string;
};

export default function EstimatePage() {
    const [step, setStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState<FormData>({
        serviceType: '',
        timeframe: '',
        address: '',
        name: '',
        email: '',
        phone: '',
        details: ''
    });

    const updateForm = (key: keyof FormData, value: string) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    const handleNext = () => {
        // Basic validation
        if (step === 1 && !formData.serviceType) return;
        if (step === 2 && !formData.timeframe) return;
        setStep(prev => prev + 1);
    };

    const calculateProgress = () => {
        return ((step) / 4) * 100;
    };

    // Mobile-friendly Selection Card Component
    const SelectionCard = ({
        selected,
        onClick,
        icon: Icon,
        title,
        desc
    }: {
        selected: boolean;
        onClick: () => void;
        icon: any;
        title: string;
        desc?: string
    }) => (
        <div
            onClick={onClick}
            className={`relative p-5 rounded-xl border-2 cursor-pointer transition-all duration-200 flex items-center gap-4 group active:scale-[0.98]
        ${selected
                    ? 'border-orange-500 bg-orange-50/50 shadow-sm'
                    : 'border-slate-100 bg-white hover:border-orange-200'
                }`}
        >
            <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors
        ${selected ? 'bg-orange-500 text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-orange-100 group-hover:text-orange-600'}`}>
                <Icon size={24} />
            </div>
            <div className="flex-1">
                <h3 className={`font-bold text-lg ${selected ? 'text-slate-900' : 'text-slate-700'}`}>{title}</h3>
                {desc && <p className="text-sm text-slate-500 leading-tight mt-1">{desc}</p>}
            </div>
            {selected && (
                <div className="absolute top-4 right-4 text-orange-500">
                    <Check size={20} className="stroke-[3]" />
                </div>
            )}
        </div>
    );

    return (
        <main className="min-h-screen bg-slate-50">
            <Navbar />

            <div className="pt-24 pb-12 px-4 container max-w-2xl mx-auto">
                {/* Progress Bar */}
                <div className="mb-8 mt-4">
                    <div className="flex justify-between text-sm font-semibold text-slate-500 mb-2">
                        <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">Step {step} of 3</span>
                        <span className="text-orange-600">{Math.round(calculateProgress())}% Completed</span>
                    </div>
                    <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-orange-500 transition-all duration-500 ease-out"
                            style={{ width: `${calculateProgress()}%` }}
                        />
                    </div>
                </div>

                {/* Card Container */}
                <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden animate-fade-in">

                    {/* Header */}
                    <div className="p-6 md:p-8 border-b border-slate-100 bg-white">
                        {step > 1 && (
                            <button
                                onClick={() => setStep(prev => prev - 1)}
                                className="text-slate-400 hover:text-slate-600 flex items-center gap-1 text-sm font-medium mb-4 transition-colors"
                            >
                                <ChevronLeft size={16} /> Back
                            </button>
                        )}
                        <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
                            {step === 1 && "What do you need help with?"}
                            {step === 2 && "When do you need this done?"}
                            {step === 3 && "Where should we send the quote?"}
                            {step === 4 && "Review your details"}
                        </h1>
                        <p className="text-slate-500 mt-2 text-lg">
                            {step === 1 && "Select the service that best matches your needs."}
                            {step === 2 && "Help us understand your timeline urgency."}
                            {step === 3 && "We'll send your estimate here. No spam, ever."}
                            {step === 4 && "One last look before we get to work."}
                        </p>
                    </div>

                    {/* Body */}
                    <div className="p-6 md:p-8">

                        {/* STEP 1: Service Selection */}
                        {step === 1 && (
                            <div className="grid gap-4">
                                <SelectionCard
                                    title="Roof Replacement"
                                    desc="I need a completely new roof installed."
                                    icon={Home}
                                    selected={formData.serviceType === 'replacement'}
                                    onClick={() => updateForm('serviceType', 'replacement')}
                                />
                                <SelectionCard
                                    title="Roof Repair"
                                    desc="I have a leak or damaged shingles."
                                    icon={PenTool}
                                    selected={formData.serviceType === 'repair'}
                                    onClick={() => updateForm('serviceType', 'repair')}
                                />
                                <SelectionCard
                                    title="Gutter Services"
                                    desc="Cleaning, installation, or repair."
                                    icon={Loader2} // Just using a simple icon for now from imports
                                    selected={formData.serviceType === 'gutters'}
                                    onClick={() => updateForm('serviceType', 'gutters')}
                                />
                                <SelectionCard
                                    title="Inspection / Other"
                                    desc="I'm not sure, I need an expert opinion."
                                    icon={Shield}
                                    selected={formData.serviceType === 'inspection'}
                                    onClick={() => updateForm('serviceType', 'inspection')}
                                />
                            </div>
                        )}

                        {/* STEP 2: Timeframe */}
                        {step === 2 && (
                            <div className="grid gap-4">
                                {['Immediately (Emergency)', 'Within 1-2 Weeks', 'Within a Month', 'Flexible / Planning'].map((time) => (
                                    <label
                                        key={time}
                                        className={`flex items-center p-4 rounded-xl border-2 cursor-pointer transition-all hover:bg-slate-50
                      ${formData.timeframe === time
                                                ? 'border-orange-500 bg-orange-50/30'
                                                : 'border-slate-100'}`}
                                    >
                                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-4
                      ${formData.timeframe === time ? 'border-orange-500' : 'border-slate-300'}`}>
                                            {formData.timeframe === time && <div className="w-3 h-3 rounded-full bg-orange-500" />}
                                        </div>
                                        <input
                                            type="radio"
                                            name="timeframe"
                                            value={time}
                                            checked={formData.timeframe === time}
                                            onChange={(e) => updateForm('timeframe', e.target.value)}
                                            className="hidden"
                                        />
                                        <span className="font-semibold text-lg text-slate-700">{time}</span>
                                    </label>
                                ))}
                            </div>
                        )}

                        {/* STEP 3: Contact Details */}
                        {step === 3 && (
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Street Address</label>
                                    <input
                                        type="text"
                                        placeholder="123 Example St, Vancouver, WA"
                                        value={formData.address}
                                        onChange={(e) => updateForm('address', e.target.value)}
                                        className="w-full p-4 rounded-lg border border-slate-300 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all text-lg"
                                    />
                                </div>

                                <div className="grid md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                                        <input
                                            type="text"
                                            placeholder="John Doe"
                                            value={formData.name}
                                            onChange={(e) => updateForm('name', e.target.value)}
                                            className="w-full p-4 rounded-lg border border-slate-300 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all text-lg"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-slate-700 mb-2">Phone Number</label>
                                        <input
                                            type="tel"
                                            placeholder="(360) 555-0123"
                                            value={formData.phone}
                                            onChange={(e) => updateForm('phone', e.target.value)}
                                            className="w-full p-4 rounded-lg border border-slate-300 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all text-lg"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
                                    <input
                                        type="email"
                                        placeholder="john@example.com"
                                        value={formData.email}
                                        onChange={(e) => updateForm('email', e.target.value)}
                                        className="w-full p-4 rounded-lg border border-slate-300 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all text-lg"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Additional Details (Optional)</label>
                                    <textarea
                                        placeholder="Tell us about your roof issue..."
                                        rows={3}
                                        value={formData.details}
                                        onChange={(e) => updateForm('details', e.target.value)}
                                        className="w-full p-4 rounded-lg border border-slate-300 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all text-lg resize-none"
                                    />
                                </div>
                            </div>
                        )}

                        {/* ERROR MESSAGE Placeholder */}
                        {/* If validation fails, we can show it here, simplified for now to rely on disabled button */}

                    </div>

                    {/* Footer Actions */}
                    <div className="p-6 md:p-8 bg-slate-50 border-t border-slate-100 flex justify-end">
                        {step < 3 ? (
                            <button
                                onClick={handleNext}
                                disabled={(step === 1 && !formData.serviceType) || (step === 2 && !formData.timeframe)}
                                className="btn btn-primary w-full md:w-auto text-lg py-4 md:py-3 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
                            >
                                Continue <ArrowRight size={20} />
                            </button>
                        ) : (
                            <button
                                onClick={() => alert("This would submit the form in a real app! Values: " + JSON.stringify(formData))}
                                className="btn btn-primary w-full md:w-auto text-lg py-4 md:py-3 shadow-lg"
                            >
                                {isSubmitting ? 'Submitting...' : 'Get My Free Estimate'}
                            </button>
                        )}
                    </div>

                </div>

                <p className="text-center text-slate-400 text-sm mt-8 flex items-center justify-center gap-2">
                    <Shield size={14} /> Your information is secure and will never be shared.
                </p>

            </div>

            <Footer />
        </main>
    );
}
