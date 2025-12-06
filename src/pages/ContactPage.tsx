import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Facebook, Instagram } from "lucide-react";
import cakeSticker from "@/assets/cake-sticker.png";

const ContactPage = () => {
  return (
    <div className="min-h-screen pt-24">
      <section className="py-20 px-6 bg-gradient-to-b from-cream-100 to-background">
        <div className="w-full mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6">
              Get in Touch
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              We'd love to hear from you! Reach out for workshop inquiries, custom orders, or just
              to say hello.
            </p>
          </motion.div>

          <div className="  px-20 grid md:grid-cols-2 gap-10 mb-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="space-y-1"
            >
              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-chocolate mt-3" />
                <div>
                  <h3 className="font-bold ">Phone</h3>
                  {/* mb-1 */}
                  <a
                    href="tel:7502699771"
                    className="text-muted-foreground hover:text-chocolate transition-colors"
                  >
                    7502699771
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Facebook className="w-6 h-6 text-chocolate mt-3" />
                <div>
                  <h3 className="font-bold ">Facebook</h3>
                  <a
                    href="https://www.facebook.com/p/Beulah-Skill-Training-Academy-61566935008774/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-chocolate transition-colors"
                  >
                    Beulah Skill Training Academy
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-chocolate mt-3" />
                <div>
                  <h3 className="font-bold">Instagram</h3>
                  <a
                    href="https://www.instagram.com/beulah_james2024/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-chocolate transition-colors"
                  >
                    @beulah_james2024
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-chocolate mt-3" />
                <div className="w-full">
                  <h3 className="font-bold mb-2">Location</h3>
                  <p className="text-muted-foreground mb-4">Pudukkottai, Tamil Nadu</p>
                  <div className="w-full h-64 rounded-xl overflow-hidden shadow-md border border-chocolate/10">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3925.0!2d78.8!3d10.3!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTAuMzg!5e0!3m2!1sen!2sin!4v1600000000000!5m2!1sen!2sin&q=Beulah+Skill+Training+Academy+Pudukkottai"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Beulah Skill Training Academy Location"
                    ></iframe>
                  </div>
                </div>
              </div>

              {/* <div className="pt-4">
                <Button
                  className="w-full bg-chocolate hover:bg-chocolate-dark text-cream-50"
                  asChild
                >
                  <a
                    href="https://www.instagram.com/beulah_james2024/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Instagram className="w-5 h-5 mr-2" />
                    Follow Us on Instagram
                  </a>
                </Button>
              </div> */}
            </motion.div>



            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-card p-8 rounded-3xl shadow-xl flex flex-col h-full relative overflow-hidden"
            >
              <h3 className="pt-9 text-2xl font-bold mb-4">Send us a message</h3>
              <p className="text-muted-foreground mb-6">
                For detailed inquiries, please fill out our contact form:
              </p>
              <div className="py-7 relative z-10">
                <Button
                  className=" w-full bg-accent hover:bg-accent/90 text-accent-foreground"
                  onClick={() =>
                    window.open("https://forms.gle/EioB5iiSvTym3yeLA", "_blank")
                  }
                >
                  Open Contact Form
                </Button>
              </div>

              {/* Decorative floating element to fill space */}
              <div className="flex-1 flex items-center justify-center min-h-[200px]">
                <motion.img
                  src={cakeSticker}
                  alt="Decorative cake"
                  className="w-48 h-48 object-contain opacity-90"
                  animate={{
                    y: [0, -15, 0],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center bg-gradient-to-br from-cream-100 to-cream-300 p-12 rounded-3xl"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to start your baking journey?
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Book a workshop or place an order today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-chocolate hover:bg-chocolate-dark text-cream-50"
                onClick={() =>
                  window.open("https://forms.gle/L7r2nXz9SfwBDi9x9", "_blank")
                }
              >
                Book a Workshop
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-chocolate text-chocolate hover:bg-chocolate hover:text-cream-50"
                onClick={() =>
                  window.open("https://forms.gle/AUT9suo7jX4Svo2Z9", "_blank")
                }
              >
                Order Treats
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;
