// src/pages/CoursesPage.tsx
import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CourseCard } from "@/components/CourseCard";
import { CourseCardSkeleton } from "@/components/CourseCardSkeleton";
import { Button } from "@/components/ui/button";
import { Award, BookOpen, Clock } from "lucide-react";
import coursesData from "@/data/courses.json";
import styles from "./CoursesPage.module.css";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { useButtonLoading } from "@/hooks/use-button-loading";
import { Loader2 } from "lucide-react";

/* Images / assets
   All course images are mapped below. Each course in courses.json has a corresponding image:
   - Baking courses: brownie, cupcake, tea-cake, plum-cake, cake-master-class, cookies
   - Other courses: cursive-writing, spoken-english
*/
import academyHero from "@/assets/academy-hero.jpg";
import bookNowImg from "@/assets/book-now.jpg";

/* course-specific images (optional — will be tried, otherwise fallback used) */
import courseCakeMaster from "@/assets/cake-master-class.jpg";
import coursePlumCake from "@/assets/plum-cake-workshop.jpg";
import courseBrownie from "@/assets/hero-brownies.png";
import courseCupcake from "@/assets/hero-cupcake.png";
import courseTeaCake from "@/assets/tea-cake.jpg";
import courseCookies from "@/assets/cookies.png";
import courseSpoken from "@/assets/spoken-english.jpg";
import courseCursive from "@/assets/cursive-writing.jpg";

/* fallback images (use same palette as other pages) */
import yummyblondies from "@/assets/yummy blondies.png";
import yummybrownies from "@/assets/yummy brownies.jpg";
import deliciouscupcakes from "@/assets/Delicious cupcakes.jpg";
import mouthwateringcakes from "@/assets/mouthwatering-cakes.jpg";

const fallbackImages = [yummybrownies, mouthwateringcakes, deliciouscupcakes, yummyblondies];

const ORDER_FORM_URL = "https://forms.gle/L7r2nXz9SfwBDi9x9";

/**
 * Helper: pick an image for a course by id (try specific assets, else fallback)
 */
const getCourseImage = (courseId: string, index: number) => {
  const map: Record<string, string | undefined> = {
    // Baking courses
    "brownie-workshop": courseBrownie,
    "cupcake-workshop": courseCupcake,
    "tea-cake-workshop": courseTeaCake,
    "plum-cake-workshop": coursePlumCake,
    "cake-master-class": courseCakeMaster,
    "cookies-workshop": courseCookies,
    // Other courses
    "cursive-writing": courseCursive,
    "spoken-english": courseSpoken,
  };
  const img = map[courseId];
  if (img) return img;
  return fallbackImages[index % fallbackImages.length];
};

const CoursesPage: React.FC = () => {
  const [isLoadingCourses, setIsLoadingCourses] = useState(true);
  const [isLoadingOtherCourses, setIsLoadingOtherCourses] = useState(true);
  const { isLoading: isButtonLoading, withLoading } = useButtonLoading();

  // Simulate async course data loading
  useEffect(() => {
    const loadCourses = async () => {
      // Simulate API call or data processing delay
      await new Promise((resolve) => setTimeout(resolve, 600));
      setIsLoadingCourses(false);
      setIsLoadingOtherCourses(false);
    };

    loadCourses();
  }, []);

  return (
    <div className="min-h-screen pt-24">

      {/* Hero Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-cream-100 to-background">
        <div className="w-full mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left hero image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9 }}
              className="hidden md:flex items-center justify-center"
            >
              <img
                src={academyHero}
                alt="Academy hero"
                className="w-72 md:w-96 lg:w-[520px] object-contain select-none drop-shadow-2xl"
                draggable={false}
              />
            </motion.div>

            {/* Right text (keeps original copy but now aligned to left on wide screens) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="text-center md:text-left mb-8">
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-balance costaline-font">
                  Get ready to Bake.
                </h1>
                <p className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed leansans-regular">
                  At Beulah Skill Academy, we believe every skill has the power to transform
                  confidence, creativity, and everyday life. Created with a passion for accessible
                  learning, we offer short, practical and impactful online courses.
                </p>
              </div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.15 }}
                className="text-center md:text-left text-lg text-muted-foreground mb-4 max-w-2xl"
              >
                Whether you're a beginner or a hobby baker, learn hands-on techniques to bake
                perfect brownies, cupcakes, cakes, and more.
              </motion.p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Baking Courses */}
      <section className="py-16 px-6 bg-background">
        <div className="w-full mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="py-16 text-4xl md:text-5xl font-bold text-center mb-8"
          >
            Courses on Baking
          </motion.h2>

          {isLoadingCourses ? (
            <div className="flex justify-center items-center py-12">
              <LoadingSpinner size="lg" text="Loading baking courses..." />
            </div>
          ) : (
            <div className={styles.coursesViewport}>
              <div className={styles.coursesTrack}>
                {[...coursesData.bakingCourses, ...coursesData.bakingCourses].map((course, index) => (
                  <div key={`${course.id}_${index}`} className={styles.courseItem}>
                    <CourseCard
                      title={course.title}
                      duration={course.duration}
                      tag={course.tag}
                      shortDesc={course.shortDesc}
                      delay={0}
                      image={getCourseImage(course.id, index % coursesData.bakingCourses.length)}
                      imageAlt={course.title}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Single section-level Book Now for Baking courses */}
          <div className="py-16 text-center mt-6">
            <Button
              size="lg"
              className={`${styles.sectionBookBtn} leansans-bold`}
              onClick={() => withLoading("baking-courses", async () => window.open(ORDER_FORM_URL, "_blank"))}
              disabled={isButtonLoading("baking-courses")}
            >
              {isButtonLoading("baking-courses") ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Opening...
                </>
              ) : (
                "Book Your Course"
              )}
            </Button>
          </div>
        </div>
      </section>

      {/* What You'll Learn */}
      <section className="py-16 px-6 bg-gradient-to-b from-cream-100 to-background">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
              What you'll learn
            </h2>

            <div className="space-y-4 mb-9">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-chocolate mt-3" />
                <p className="text-lg">Measuring, mixing & baking basics</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-chocolate mt-3" />
                <p className="text-lg">Texture, temperature & ingredient control</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-chocolate mt-3" />
                <p className="text-lg">Frosting, decorating & presentation tips</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-chocolate mt-3" />
                <p className="text-lg">Storage, hygiene & packaging guidance</p>
              </div>
            </div>

            <p className=" text-muted-foreground mb-6">
              No prior experience needed — just curiosity and love for desserts.
            </p>
            <p className="text-muted-foreground">
              Perfect for – Students, hobby bakers, home bakers-to-be, dessert lovers, gifting
              enthusiasts
            </p>
          </motion.div>
        </div>
      </section>

      {/* Other Courses */}
      <section className="py-16 px-6 bg-background">
        <div className="w-full mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="py-16 text-4xl md:text-5xl font-bold text-center mb-8"
          >
            Other courses offered
          </motion.h2>

          {isLoadingOtherCourses ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {[1, 2].map((index) => (
                <CourseCardSkeleton key={`skeleton-${index}`} />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
              {coursesData.otherCourses.map((course, index) => (
                <div key={course.id} className="w-full">
                  <CourseCard
                    title={course.title}
                    duration={course.duration}
                    tag={course.tag}
                    shortDesc={course.shortDesc}
                    delay={0}
                    image={getCourseImage(course.id, index)}
                    imageAlt={course.title}
                  />
                </div>
              ))}
            </div>
          )}

          {/* Single section-level Book Now for Other courses */}
          <div className="py-16 text-center mt-6">
            <Button
              size="lg"
              className={`${styles.sectionBookBtn} leansans-bold`}
              onClick={() => withLoading("other-courses", async () => window.open(ORDER_FORM_URL, "_blank"))}
              disabled={isButtonLoading("other-courses")}
            >
              {isButtonLoading("other-courses") ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Opening...
                </>
              ) : (
                "Book Other Courses"
              )}
            </Button>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mt-12"
          >
            <div className="text-center">
              <BookOpen className="w-12 h-12 mx-auto mb-4 text-chocolate" />
              <h3 className="font-bold mb-2">Personalized correction & feedback</h3>
            </div>
            <div className="text-center">
              <Clock className="w-12 h-12 mx-auto mb-4 text-chocolate" />
              <h3 className="font-bold mb-2">Progress tracking</h3>
            </div>
            <div className="text-center">
              <Award className="w-12 h-12 mx-auto mb-4 text-chocolate" />
              <h3 className="font-bold mb-2">Speed, neatness & confidence building</h3>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section - image + single large Book Now (final) */}
      <section className="py-20 px-6 bg-gradient-to-b from-cream-100 to-cream-300">
        <div className="w-full mx-auto">
          <div className={styles.finalCtaGrid}>
            <div>
              <img
                src={bookNowImg}
                alt="Book Now"
                className={styles.bookNowImage}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = fallbackImages[0];
                }}
              />
            </div>

            <div className="text-right md:text-left">
              <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
                <h2 className="text-4xl md:text-5xl font-bold mb-8">Book your course now!</h2>
                <Button
                  size="lg"
                  className={`${styles.booknowBtn} leansans-bold`}
                  onClick={() => withLoading("final-cta", async () => window.open(ORDER_FORM_URL, "_blank"))}
                  disabled={isButtonLoading("final-cta")}
                >
                  {isButtonLoading("final-cta") ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Opening...
                    </>
                  ) : (
                    "Book Now"
                  )}
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CoursesPage;
