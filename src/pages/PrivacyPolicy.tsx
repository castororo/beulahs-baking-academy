// src/pages/PrivacyPolicy.tsx
import React from "react";
import { motion } from "framer-motion";

const PrivacyPolicy: React.FC = () => {
    return (
        <div className="min-h-screen pt-32 pb-20 px-6 bg-cream-100">
            <div className="max-w-4xl mx-auto">

                <motion.h1
                    className="text-4xl md:text-5xl font-bold costaline-font text-center mb-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    Privacy Policy
                </motion.h1>

                <div className="leansans-regular text-lg leading-relaxed space-y-6 text-chocolate">

                    <p><strong>Last updated:</strong> 30/11/2025</p>

                    <p>
                        Beulah Skill Training Academy (“we”, “our”, “us”) is committed to protecting your privacy.
                        This Privacy Policy explains how we collect, use, and safeguard your information when you
                        use our website or services.
                    </p>

                    <h2 className="text-2xl font-bold costaline-font mt-8">1. Information We Collect</h2>
                    <p>We may collect the following information when you voluntarily submit it:</p>

                    <ul className="list-disc pl-6 space-y-2">
                        <li>Name</li>
                        <li>Email address</li>
                        <li>Phone number</li>
                        <li>Course registration details</li>
                        <li>Order or booking information</li>
                        <li>Messages sent through contact forms or WhatsApp</li>
                    </ul>

                    <p>
                        We also receive general website usage information such as device type and pages viewed.
                        We <strong>do not collect cookies.</strong>
                    </p>

                    <h2 className="text-2xl font-bold costaline-font mt-8">2. How We Use Your Information</h2>
                    <p>We use your information to:</p>

                    <ul className="list-disc pl-6 space-y-2">
                        <li>Provide our courses and services</li>
                        <li>Process orders and payments</li>
                        <li>Respond to your inquiries</li>
                        <li>Issue certificates where applicable</li>
                        <li>Improve our offerings and customer experience</li>
                    </ul>

                    <h2 className="text-2xl font-bold costaline-font mt-8">3. Sharing Your Information</h2>
                    <p>We do not sell your personal data.</p>
                    <p>We may share information only with:</p>

                    <ul className="list-disc pl-6 space-y-2">
                        <li>Payment processors (if used)</li>
                        <li>Delivery partners (only when needed to fulfill an order)</li>
                        <li>Government authorities if legally required</li>
                    </ul>

                    <h2 className="text-2xl font-bold costaline-font mt-8">4. Data Security</h2>
                    <p>
                        We take reasonable steps to safeguard your information. However, no online method is
                        100% secure, and we cannot guarantee absolute protection.
                    </p>

                    <h2 className="text-2xl font-bold costaline-font mt-8">5. Your Rights</h2>
                    <p>You may contact us to:</p>

                    <ul className="list-disc pl-6 space-y-2">
                        <li>Request access to the information we hold</li>
                        <li>Update incorrect information</li>
                        <li>Request deletion of your data</li>
                    </ul>

                    <h2 className="text-2xl font-bold costaline-font mt-8">6. Third-Party Links</h2>
                    <p>
                        Our website may contain links to third-party platforms (Instagram, order forms, etc.).
                        We are not responsible for their privacy practices.
                    </p>

                    <h2 className="text-2xl font-bold costaline-font mt-8">7. Changes to This Policy</h2>
                    <p>
                        We may update this Privacy Policy periodically. Any changes will be posted on this page.
                    </p>

                    <h2 className="text-2xl font-bold costaline-font mt-8">8. Contact Us</h2>
                    <p>If you have questions about this policy, contact us:</p>

                    <p>
                        <strong>Beulah Skill Training Academy</strong><br />
                        📩 Email: beulahskilltrainingacademy@gmail.com<br />
                        📞 Phone: 7502699771
                    </p>

                </div>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
