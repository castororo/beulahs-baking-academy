// src/pages/TermsOfService.tsx
import React from "react";
import { motion } from "framer-motion";

const TermsOfService: React.FC = () => {
    return (
        <div className="min-h-screen pt-32 pb-20 px-6 bg-cream-100">
            <div className="max-w-4xl mx-auto">

                <motion.h1
                    className="text-4xl md:text-5xl font-bold costaline-font text-center mb-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    Terms of Service
                </motion.h1>

                <div className="leansans-regular text-lg leading-relaxed space-y-6 text-chocolate">

                    <p><strong>Last updated:</strong> 30/11/2025</p>

                    <p>
                        By using our website, enrolling in our courses, or purchasing our baked products,
                        you agree to the terms outlined below.
                    </p>

                    <h2 className="text-2xl font-bold costaline-font mt-8">1. Services We Provide</h2>
                    <p>Beulah Skill Training Academy offers:</p>

                    <ul className="list-disc pl-6 space-y-2">
                        <li>Online baking & craft courses</li>
                        <li>Government-recognized certificates (where applicable)</li>
                        <li>Homemade cakes, brownies, and baked items</li>
                    </ul>

                    <h2 className="text-2xl font-bold costaline-font mt-8">2. Payments & Orders</h2>
                    <p>
                        When placing an order or purchasing a course, you agree to provide accurate contact and
                        payment details.
                    </p>

                    <p>Orders may be canceled if incorrect details are provided or due to availability issues.</p>

                    <h2 className="text-2xl font-bold costaline-font mt-8">3. Refund Policy</h2>

                    <p><strong>Courses:</strong></p>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>Course fees are non-refundable once materials or videos are delivered.</li>
                        <li>Rescheduling is possible only before the course starts.</li>
                    </ul>

                    <p><strong>Baked Goods:</strong></p>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>No refunds once preparation has started.</li>
                        <li>Quality issues must be reported within 24 hours.</li>
                    </ul>

                    <h2 className="text-2xl font-bold costaline-font mt-8">4. User Responsibilities</h2>
                    <ul className="list-disc pl-6 space-y-2">
                        <li>Provide accurate information</li>
                        <li>Not misuse or reshare course materials</li>
                        <li>Not resell or copy website content</li>
                        <li>Use services responsibly and legally</li>
                    </ul>

                    <h2 className="text-2xl font-bold costaline-font mt-8">5. Intellectual Property</h2>
                    <p>
                        All content including course videos, images, materials, and branding belongs to
                        Beulah Skill Training Academy.
                        You may not copy, distribute, or upload materials publicly.
                    </p>

                    <h2 className="text-2xl font-bold costaline-font mt-8">6. Limitation of Liability</h2>
                    <p>We are not responsible for:</p>

                    <ul className="list-disc pl-6 space-y-2">
                        <li>Delays caused by emergencies or external factors</li>
                        <li>Allergic reactions if not disclosed at the time of order</li>
                        <li>Technical issues on the user’s device</li>
                        <li>Misuse of course materials</li>
                    </ul>

                    <p>
                        Our total liability is limited to the amount paid for the service or product.
                    </p>

                    <h2 className="text-2xl font-bold costaline-font mt-8">7. Termination</h2>
                    <p>We may suspend access if you:</p>

                    <ul className="list-disc pl-6 space-y-2">
                        <li>Violate these terms</li>
                        <li>Misuse website or course content</li>
                        <li>Engage in fraudulent or abusive activity</li>
                    </ul>

                    <h2 className="text-2xl font-bold costaline-font mt-8">8. Updates to These Terms</h2>
                    <p>We may update these Terms occasionally. Updates will be posted on this page.</p>

                    <h2 className="text-2xl font-bold costaline-font mt-8">9. Contact Us</h2>
                    <p>For questions regarding these Terms, contact us:</p>

                    <p>
                        <strong>Beulah Skill Training Academy</strong><br />
                        📩 Email: beulahjeniferjames@gmail.com<br />
                        📞 Phone: +917502699771
                    </p>

                </div>
            </div>
        </div>
    );
};

export default TermsOfService;
