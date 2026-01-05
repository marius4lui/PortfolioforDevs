"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

interface Venture {
    title: string;
    description: string;
    tag: string;
    url: string;
}

// Icons
const TrashIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /></svg>
);

const PlusIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="M12 5v14" /></svg>
);

const ArrowRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
);

const XIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
);

export default function SetupWizard() {
    const [step, setStep] = useState(1);
    const [username, setUsername] = useState("");

    // Ventures State
    const [ventures, setVentures] = useState<Venture[]>([
        { title: "My Agency", description: "High quality websites", tag: "AGENCY", url: "https://example.com" }
    ]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const addVenture = () => {
        setVentures([...ventures, { title: "", description: "", tag: "PROJECT", url: "" }]);
    };

    const updateVenture = (index: number, field: keyof Venture, value: string) => {
        const newVentures = [...ventures];
        newVentures[index][field] = value;
        setVentures(newVentures);
    };

    const removeVenture = (index: number) => {
        setVentures(ventures.filter((_, i) => i !== index));
    };

    const handleDismiss = async () => {
        try {
            const res = await fetch('/api/setup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ dismiss: true })
            });
            if (!res.ok) throw new Error('Failed to dismiss');
            window.location.reload();
        } catch (err) {
            console.error("Dismiss failed", err);
        }
    };

    const handleSubmit = async () => {
        setLoading(true);
        setError(null);

        try {
            const res = await fetch('/api/setup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, ventures })
            });

            if (!res.ok) throw new Error('Failed to update config');

            // Reload to apply changes
            window.location.reload();

        } catch (err) {
            setError('Something went wrong. Please edit src/lib/config.ts manually.');
            setLoading(false);
        }
    };

    // Step Content
    const renderStep1 = () => (
        <div className="wizard-step-content">
            <div className="step-header-wrapper">
                <h3 className="step-heading">Step 1: GitHub Profile</h3>
                <p className="step-desc">Enter your username to auto-fetch your bio and repos.</p>
            </div>

            <div className="input-group">
                <label htmlFor="username">GitHub Username</label>
                <input
                    type="text"
                    id="username"
                    placeholder="e.g. marius4lui"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="wizard-input main-input"
                    autoFocus
                />
            </div>
            <div className="wizard-footer">
                <button
                    className="wizard-btn primary"
                    disabled={!username}
                    onClick={() => setStep(2)}
                >
                    Next <ArrowRightIcon />
                </button>
            </div>
        </div>
    );

    const renderStep2 = () => (
        <div className="wizard-step-content">
            <div className="step-header-wrapper">
                <h3 className="step-heading">Step 2: Ventures (Optional)</h3>
                <p className="step-desc">Showcase your side projects or startups.</p>
            </div>

            <div className="ventures-list">
                {ventures.map((venture, i) => (
                    <div key={i} className="venture-row">
                        <div className="venture-row-header">
                            <span className="venture-index">#{i + 1}</span>
                            <button className="icon-btn delete" onClick={() => removeVenture(i)} title="Remove">
                                <TrashIcon />
                            </button>
                        </div>
                        <div className="venture-grid">
                            <input
                                placeholder="Title (e.g. My SaaS)"
                                value={venture.title}
                                onChange={(e) => updateVenture(i, 'title', e.target.value)}
                                className="wizard-input"
                            />
                            <input
                                placeholder="Tag (e.g. PRODUCT)"
                                value={venture.tag}
                                onChange={(e) => updateVenture(i, 'tag', e.target.value)}
                                className="wizard-input"
                            />
                            <input
                                placeholder="Description (Short & sweet)"
                                value={venture.description}
                                onChange={(e) => updateVenture(i, 'description', e.target.value)}
                                className="wizard-input full-width"
                            />
                            <input
                                placeholder="URL (https://...)"
                                value={venture.url}
                                onChange={(e) => updateVenture(i, 'url', e.target.value)}
                                className="wizard-input full-width"
                            />
                        </div>
                    </div>
                ))}

                <button className="add-btn-clean" onClick={addVenture}>
                    <PlusIcon /> Add Venture
                </button>
            </div>

            <div className="wizard-footer split">
                <button className="wizard-btn secondary" onClick={() => setStep(1)}>Back</button>
                <button
                    className="wizard-btn primary"
                    disabled={loading}
                    onClick={handleSubmit}
                >
                    {loading ? 'Building...' : 'Finish Setup'}
                </button>
            </div>
        </div>
    );

    return (
        <div className="wizard-overlay">
            <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="wizard-box-clean"
            >
                <div className="wizard-clean-header">
                    <div className="logo-badge">M4L</div>
                    <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                        <div className="progress-pills">
                            <div className={`pill ${step === 1 ? 'active' : ''}`}></div>
                            <div className={`pill ${step === 2 ? 'active' : ''}`}></div>
                        </div>
                        <button onClick={handleDismiss} className="icon-btn" title="Don't show again">
                            <XIcon />
                        </button>
                    </div>
                </div>

                {error && <div className="error-banner">{error}</div>}

                <AnimatePresence mode="wait">
                    <motion.div
                        key={step}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                        className="step-container"
                    >
                        {step === 1 ? renderStep1() : renderStep2()}
                    </motion.div>
                </AnimatePresence>

            </motion.div>
        </div>
    );
}
