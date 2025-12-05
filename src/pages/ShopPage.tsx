// src/pages/ShopPage.tsx
import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

import { Button } from "@/components/ui/button";
import coursesData from "@/data/workshops.json";
import { useAnimationEffects } from "@/hooks/use-animation-effects";
import { useButtonLoading } from "@/hooks/use-button-loading";
import styles from "./ShopPage.module.css";
import sharedStyles from "@/styles/shared.module.css";
import { Loader2 } from "lucide-react";

/* fallback / local asset images */
import yummyblondies from "@/assets/yummy blondies.png";
import yummybrownies from "@/assets/yummy brownies.jpg";
import deliciouscupcakes from "@/assets/Delicious cupcakes.jpg";
import mouthwateringcakes from "@/assets/mouthwatering-cakes.jpg";

/* IMPORTANT: using the uploaded hero file path (project provided). */
import shopHero from "@/assets/shop-hero.png";

import plumCake from "@/assets/plum-cake.png";
import teaCake from "@/assets/tea-cake.jpg";
import cookies from "@/assets/cookies.png";
import blondie from "@/assets/blondie.png";

import ProductCard from "@/components/ProductCard";
import ProductCardSkeleton from "@/components/ProductCardSkeleton";

const fallbackImages = [yummybrownies, mouthwateringcakes, deliciouscupcakes, yummyblondies];
const ORDER_FORM_URL = "https://forms.gle/AUT9suo7jX4Svo2Z9";

const ShopPage: React.FC = () => {
  const productsCarouselRef = useRef<HTMLDivElement | null>(null);
  const gridRef = useRef<HTMLDivElement | null>(null);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const { clones, particles, spawnClone, spawnParticles, playClickSound, handleUndo, clearEffects } = useAnimationEffects();
  const { isLoading: isButtonLoading, withLoading } = useButtonLoading();

  // Combine existing products with extra ones (no price for new products)
  const extraProducts = [
    { id: "plum-cake", title: "Plum Cake", shortDesc: "Moist spiced plum cake — perfect for gifting.", image: plumCake },
    { id: "banana-bread", title: "Bread", shortDesc: "Buttery bread", image: teaCake },
    { id: "truffle", title: "Homemade Chocolates", shortDesc: "Rich bite-sized chocolates for chocoholics.", image: cookies },
  ];
  const allProducts = [...coursesData.products, ...extraProducts];

  const getImageSrc = (product: any, index: number) => {
    const candidate = product?.image;
    if (typeof candidate === "string" && candidate.trim().length > 0) return candidate;
    return fallbackImages[index % fallbackImages.length];
  };

  const handleProductClick = (e: React.MouseEvent, imgSrc: string) => {
    const target = e.currentTarget as HTMLElement;
    const imgEl = target.querySelector("img");
    const rect = (imgEl as HTMLImageElement)?.getBoundingClientRect
      ? (imgEl as HTMLImageElement).getBoundingClientRect()
      : target.getBoundingClientRect();
    spawnClone(imgSrc, rect);
    spawnParticles(
      rect.left + rect.width / 2 + window.scrollX,
      rect.top + rect.height / 2 + window.scrollY
    );
    playClickSound();
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, index: number) => {
    const fallback = fallbackImages[index % fallbackImages.length];
    if (e.currentTarget.src !== fallback) e.currentTarget.src = fallback;
  };

  const handleGlobalOrder = () => {
    playClickSound();
    withLoading("order-now", async () => {
      window.open(ORDER_FORM_URL, "_blank", "noopener,noreferrer");
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    // Simulate initial load time for skeleton display
    const timer = setTimeout(() => {
      setIsLoadingProducts(false);
    }, 800);
    return () => {
      clearTimeout(timer);
      clearEffects();
    };
  }, [clearEffects]);

  return (
    <div className={`min-h-screen pt-24 ${styles.shopPageContainer}`}>

      {/* HERO */}
      <section className="py-10 px-9">
        <div className="w-full mx-auto">
          <div className="pl-5 grid md:grid-cols-2 gap-12 items-center">
            <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              <h1 className={`text-4xl md:text-6xl lg:text-7xl font-bold mb-6 costaline-font ${styles.heroTitle}`}>
                Homemade cakes & brownies
                <br />
                that taste like love.
              </h1>
              <p className={`text-lg md:text-2xl leansans-regular ${styles.heroDescription}`}>
                Indulge in handcrafted cakes, fudgy brownies, and buttery blondies — made in a home kitchen with real ingredients and real love.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: -6 }}
              animate={{ opacity: 1, scale: 1.04, y: -2 }}
              transition={{ duration: 1.1, yoyo: Infinity, ease: "easeInOut" } as any}
              whileHover={{ scale: 1.12, rotate: -2 }}
              className="flex items-center justify-center"
            >
              <img
                src={shopHero}
                alt="Hero cake"
                className={`select-none drop-shadow-2xl ${styles.heroImage}`}
                draggable={false}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* TAKE A BITE — homepage-style responsive grid */}
      <section className="py-20 px-6 bg-gradient-to-b from-cream-100 to-background relative take-a-bite-section">
        <div className="w-full mx-auto">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-center mb-12">
            <h2 className={`text-4xl md:text-5xl font-bold mb-4 costaline-font ${styles.takeABiteTitle}`}>Take a bite!</h2>
            <p className="text-muted-foreground leansans-regular">Handcrafted treats and class snippets from our students.</p>
          </motion.div>

          <div className="py-4 relative overflow-hidden">
            <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 justify-items-center">
              {isLoadingProducts ? (
                Array.from({ length: 4 }).map((_, index) => (
                  <div key={`skeleton-${index}`} className={styles.productCardWrapper}>
                    <ProductCardSkeleton />
                  </div>
                ))
              ) : (
                coursesData.products.map((product: any, index: number) => {
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
        </div>
      </section>      {/* ALL PRODUCTS — continuous carousel (right → left) */}
      <section className="py-8 px-6 bg-background">
        <div className="w-full mx-auto">
          <div className="py-8 text-center mb-6">
            <h3 className={`text-3xl font-bold costaline-font ${styles.allProductsTitle}`}>All Products</h3>
            <p className="text-muted-foreground">Explore more of our handcrafted delights.</p>
          </div>

          <div className={styles.allProductsViewport}>
            {/* track duplicates the list so animation loops seamlessly */}
            <div
              className={styles.allProductsTrack}
              ref={productsCarouselRef}
              aria-hidden={false}
            >
              {[...allProducts, ...allProducts].map((product: any, idx: number) => {
                const imgSrc = getImageSrc(product, idx % allProducts.length);
                return (
                  <div
                    key={`${product.id || idx}_carousel_${idx}`}
                    className={styles.allProductItem}
                    onClick={(e) => handleProductClick(e as any, imgSrc)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={() => { }}
                  >
                    <div className={styles.productSquare} aria-hidden={false}>
                      <div className={styles.productImageContainer}>
                        <img
                          src={imgSrc}
                          alt={product.title}
                          className={styles.productImage}
                          onError={(e) => handleImageError(e as any, idx % allProducts.length)}
                          draggable={false}
                        />
                      </div>

                      <div className={styles.productMeta}>
                        <div className={styles.productTitle}>{product.title}</div>
                        <div className={styles.productDesc}>{product.shortDesc}</div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className={`py-20 px-6 ${styles.preorderSection}`}>
        <div className="max-w-4xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="text-left">
            <h2 className={`text-5xl md:text-6xl font-normal mb-8 costaline-font ${styles.preorderTitle}`}>Pre-order now</h2>

            <p className="text-lg text-muted-foreground mb-4 leading-relaxed max-w-2xl leansans-regular">
              At Sweet Treats, every dessert begins in a warm home kitchen — not a factory.
            </p>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-2xl leansans-regular">
              We believe the best memories come from fresh, flavorful, lovingly baked goodies.
            </p>

            <Button
              size="lg"
              className={`${styles.preorderOrderBtn} leansans-regular`}
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
            </Button>
          </motion.div>
        </div>
      </section>
      {/* clones & particles */}
      {clones.map((c) => (
        <motion.div
          key={c.id}
          initial={{ opacity: 0, scale: 0.6, x: c.x, y: c.y }}
          animate={{ opacity: 1, scale: 1.25, x: c.x - c.w * 0.1, y: c.y - c.h * 0.15 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className={styles.cloneContainer}
          style={{ width: c.w, height: c.h }}
        >
          <img src={c.img} alt="" className={styles.cloneImage} />
        </motion.div>
      ))}

      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ opacity: 1, x: p.x, y: p.y, scale: 0.9 }}
          animate={{ x: [p.x, p.x + (Math.random() * 160 - 80)], y: [p.y, p.y - (60 + Math.random() * 80)], opacity: [1, 0], scale: [0.9, 0.2] }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className={styles.particleContainer}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="6" cy="6" r="6" fill={p.color || "#f0d6c7"} />
          </svg>
        </motion.div>
      ))}

      {clones.length > 0 && (
        <div className="fixed bottom-6 right-6 z-60">
          <motion.button whileTap={{ scale: 0.95 }} onClick={handleUndo} className="bg-white/95 border border-chocolate text-chocolate rounded-none px-4 py-2 shadow-lg backdrop-blur">
            Undo
          </motion.button>
        </div>
      )}
    </div>
  );
};

export default ShopPage;
