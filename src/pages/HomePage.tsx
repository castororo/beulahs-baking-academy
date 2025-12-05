// src/pages/HomePage.tsx
import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Hero } from "@/components/Hero";
import { Button as UiButton } from "@/components/ui/button";
import TestimonialsMarquee from "@/components/TestimonialsMarquee";
import { FAQAccordion } from "@/components/FAQAccordion";
import { useNavigate } from "react-router-dom";
import { useAnimationEffects } from "@/hooks/use-animation-effects";
import { useButtonLoading } from "@/hooks/use-button-loading";
import styles from "./HomePage.module.css";
import { Loader2 } from "lucide-react";

import freshdesert from "@/assets/shop.jpg";
import Bakingclass from "@/assets/home.jpg";
import workshopsData from "@/data/workshops.json";

import yummyblondies from "@/assets/blondie.png";
import yummybrownies from "@/assets/brownies2.png";
import deliciouscupcakes from "@/assets/Delicious cupcakes.jpg";
import mouthwateringcakes from "@/assets/cake-slices1.png";

import ProductCard from "@/components/ProductCard";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";

/* fallback images */
const fallbackImages = [yummybrownies, mouthwateringcakes, deliciouscupcakes, yummyblondies];

const ORDER_FORM_URL = "https://forms.gle/AUT9suo7jX4Svo2Z9";

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const gridRef = useRef<HTMLDivElement | null>(null);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [isLoadingGSAP, setIsLoadingGSAP] = useState(true);
  const gsapRef = useRef<any>(null);
  const { clones, particles, spawnClone, spawnParticles, playClickSound, handleUndo, clearEffects } = useAnimationEffects();
  const { isLoading: isButtonLoading, withLoading } = useButtonLoading();

  const getImageSrc = (product: any, index: number) => {
    const candidate = product?.image;
    if (typeof candidate === "string" && candidate.trim().length > 0) return candidate;
    return fallbackImages[index % fallbackImages.length];
  };

  const handleProductClick = (e: React.MouseEvent, imgSrc: string) => {
    const target = e.currentTarget as HTMLElement;
    const imgEl = target.querySelector("img");
    const rect = (imgEl as HTMLImageElement)?.getBoundingClientRect ? (imgEl as HTMLImageElement).getBoundingClientRect() : target.getBoundingClientRect();
    spawnClone(imgSrc, rect);
    spawnParticles(rect.left + rect.width / 2 + window.scrollX, rect.top + rect.height / 2 + window.scrollY);
    playClickSound();
  };

  const handleGlobalOrder = () => {
    playClickSound();
    withLoading("order-now", async () => {
      window.open(ORDER_FORM_URL, "_blank", "noopener,noreferrer");
    });
  };

  useEffect(() => {
    // Simulate initial load time for skeleton display
    const timer = setTimeout(() => {
      setIsLoadingProducts(false);
    }, 800);

    return () => {
      clearTimeout(timer);
      clearEffects();
    };
  }, []);

  useEffect(() => {
    let ctx: any;
    let scrollTrigger: any;
    (async () => {
      try {
        setIsLoadingGSAP(true);
        const gsap = (await import("gsap")).default;
        scrollTrigger = (await import("gsap/ScrollTrigger")).default;
        gsap.registerPlugin(scrollTrigger);
        gsapRef.current = gsap;
        ctx = gsap.context(() => {
          gsap.to(".discover-desserts .parallax-img", { yPercent: -12, ease: "none", scrollTrigger: { trigger: ".discover-desserts", scrub: 0.8, start: "top bottom", end: "bottom top" } });
          gsap.to(".discover-desserts .parallax-img", { yPercent: -12, ease: "none", scrollTrigger: { trigger: ".discover-desserts", scrub: 0.8, start: "top bottom", end: "bottom top" } });
          // Removed GSAP animation for take-a-bite-section to match ShopPage and fix lag
        }, containerRef);
        setIsLoadingGSAP(false);
      } catch (error) {
        console.error("Failed to load GSAP:", error);
        setIsLoadingGSAP(false);
      }
    })();
    return () => { try { if (ctx) ctx.revert(); } catch { } if (scrollTrigger && scrollTrigger.kill) try { scrollTrigger.kill(); } catch { } };
  }, []);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, index: number, productTitle?: string) => {
    const fallback = fallbackImages[index % fallbackImages.length];
    if (e.currentTarget.src !== fallback) e.currentTarget.src = fallback;
  };

  return (
    <div className="min-h-screen" ref={containerRef}>
      <motion.div style={{ scaleX }} className="fixed top-0 left-0 right-0 origin-left h-1 z-50 bg-gradient-to-r from-chocolate to-accent" aria-hidden />

      <Hero />

      {/* Discover */}
      <section className="py-0 px-0 bg-gradient-to-b from-cream-100 to-background overflow-hidden relative discover-desserts">
        <div className="w-full mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-stretch">
            <motion.div initial={{ opacity: 0, x: -60 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }} className="relative w-full md:h-[100vh] lg:h-[100vh] overflow-hidden">
              {/* freshdesert hero image — removed overlay that added tint */}
              <motion.img
                src={freshdesert}
                alt="Fresh desserts preview"
                className={`absolute inset-0 w-full h-full object-cover parallax-img rounded-tl-[28px] rounded-bl-[28px] ${styles.blockImage}`}
                initial={{ scale: 1.06 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 1.2 }}
                loading="lazy"
                onError={(e) => handleImageError(e, 0, "Discover hero")}
              />
              {/* overlay removed to avoid tint: <div className="absolute inset-0 bg-gradient-to-br from-chocolate/10 to-transparent" /> */}
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 60 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.9, delay: 0.1 }} className="pr-10 flex flex-col justify-center text-center">
              {/* section header uses Costaline (header font) */}
              <h2 className="text-4xl md:text-5xl font-bold mb-6 costaline-font">Discover desserts that speak the language of love.</h2>
              {/* small lead uses Leansans bold */}
              <p className="text-lg leansans-bold mb-6 tracking-wide all-caps">SWEET TREATS, BAKED FRESH AT HOME.</p>

              <motion.div whileHover={{ y: -3 }} transition={{ type: "spring", stiffness: 300 }}>
                <UiButton variant="cream" className="rounded-none" onClick={() => navigate("/shop")}>Click here to shop</UiButton>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="py-0 px-0 bg-background relative overflow-hidden">
        <div className="w-full mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-stretch">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="flex flex-col justify-center text-center">
              <h2 className="pl-5 text-4xl md:text-5xl font-bold mb-6 costaline-font">Skills That Last a Lifetime</h2>
              <p className="pl-3 text-lg leansans-bold mb-8 leading-relaxed">JOIN OUR ONLINE CERTIFIED WORKSHOPS ON BAKING AND MORE</p>
              <motion.div whileHover={{ scale: 1.03 }} transition={{ type: "spring", stiffness: 280 }}>
                <UiButton variant="cream" className="rounded-none" onClick={() => navigate("/workshops")}>Learn More</UiButton>
              </motion.div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.1 }} className="relative w-full md:h-[100vh] lg:h-[100vh] overflow-hidden">
              {/* Bakingclass image — overlay removed as well */}
              <motion.img
                src={Bakingclass}
                alt="Baking class preview"
                className={`absolute inset-0 w-full h-full object-cover ${styles.blockImage}`}
                initial={{ scale: 1.03 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 1.2 }}
                loading="lazy"
                onError={(e) => handleImageError(e, 1, "Skills image")}
              />
              {/* removed overlay that previously added a light tint */}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Take a Bite — NO auto-scroll marquee, plain responsive grid */}
      <section className="py-20 px-6 bg-gradient-to-b from-cream-100 to-background relative take-a-bite-section">
        <div className="w-full mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 costaline-font">Take a bite!</h2>
            <p className="text-muted-foreground leansans-regular">Handcrafted treats and class snippets from our students.</p>
          </motion.div>

          <div className="py-4 relative overflow-hidden">
            {/* Plain grid (no marquee) — 2 columns on small, 4 on md+ */}
            <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 justify-items-center">
              {isLoadingProducts ? (
                // Show skeletons during initial load
                Array.from({ length: 4 }).map((_, index) => (
                  <div key={`skeleton-${index}`} className={styles.productCardWrapper}>
                    <ProductCardSkeleton />
                  </div>
                ))
              ) : (
                // Show actual products once loaded
                workshopsData.products.map((product: any, index: number) => {
                  const imgSrc = getImageSrc(product, index);
                  return (
                    <div key={product.id || index} className={styles.productCardWrapper}>
                      <ProductCard
                        product={product}
                        index={index}
                        imgSrc={imgSrc}
                        gridRef={gridRef}
                        onProductClick={handleProductClick}
                        onImageError={handleImageError}
                      />
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <div className="text-center mt-10">
            <motion.div whileTap={{ scale: 0.98 }} whileHover={{ y: -4 }}>
              <UiButton
                size="lg"
                className="bg-chocolate hover:bg-chocolate-dark text-cream-50 px-8 py-4 rounded-none"
                onClick={handleGlobalOrder}
                disabled={isButtonLoading("order-now")}
              >
                {isButtonLoading("order-now") ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Opening...
                  </>
                ) : (
                  "Order Now"
                )}
              </UiButton>
            </motion.div>
          </div>
        </div>

        {/* clones */}
        {clones.map((c) => (
          <motion.div key={c.id} initial={{ opacity: 0, scale: 0.6, x: c.x, y: c.y }} animate={{ opacity: 1, scale: 1.25, x: c.x - c.w * 0.1, y: c.y - c.h * 0.15 }} transition={{ duration: 0.65, ease: "easeOut" }} className={styles.cloneContainer} style={{ width: c.w, height: c.h }}>
            <img src={c.img} alt="" className={styles.cloneImage} />
          </motion.div>
        ))}

        {/* particles */}
        {particles.map((p) => (
          <motion.div key={p.id} initial={{ opacity: 1, x: p.x, y: p.y, scale: 0.9 }} animate={{ x: [p.x, p.x + (Math.random() * 160 - 80)], y: [p.y, p.y - (60 + Math.random() * 80)], opacity: [1, 0], scale: [0.9, 0.2] }} transition={{ duration: 0.8, ease: "easeOut" }} className={styles.particleContainer}>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="6" cy="6" r="6" fill={p.color || "#f0d6c7"} /></svg>
          </motion.div>
        ))}

        {clones.length > 0 && (
          <div className="fixed bottom-6 right-6 z-60">
            <motion.button whileTap={{ scale: 0.95 }} onClick={handleUndo} className="bg-white/95 border border-chocolate text-chocolate rounded-none px-4 py-2 shadow-lg backdrop-blur" aria-label="Undo last image spawn">Undo</motion.button>
          </div>
        )}
      </section>

      {/* Testimonials + FAQ */}
      <section className="py-20 px-6 bg-background">
        <div className="w-full mx-auto">
          <TestimonialsMarquee />
        </div>
      </section>

      <section className="py-20 px-6 bg-gradient-to-b from-cream-100 to-background">
        <div className="w-full mx-auto">
          <FAQAccordion />
        </div>
      </section>

    </div>
  );
};

export default HomePage;
