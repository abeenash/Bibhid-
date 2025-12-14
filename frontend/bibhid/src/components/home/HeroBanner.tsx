import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface HeroBannerProps {
    slides?: {
        id: number;
        title: string;
        subtitle: string;
        cta: string;
        link: string;
        image: string;
    }[];
}

const defaultSlides = [
    {
        id: 1,
        title: 'New Season Arrivals',
        subtitle: 'Discover the latest trends in fashion and electronics with up to 50% off',
        cta: 'Shop Now',
        link: '/products',
        image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1600&h=600&fit=crop'
    },
    {
        id: 2,
        title: 'Premium Electronics',
        subtitle: 'Top brands at unbeatable prices. Free delivery on all electronics',
        cta: 'Explore',
        link: '/products?category=electronics',
        image: 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=1600&h=600&fit=crop'
    },
    {
        id: 3,
        title: 'Home Essentials',
        subtitle: 'Transform your living space with our curated collection',
        cta: 'Discover',
        link: '/products?category=home-living',
        image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1600&h=600&fit=crop'
    }
];

const HeroBanner = ({ slides = defaultSlides }: HeroBannerProps) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, [slides.length]);

    const goToSlide = (index: number) => {
        setCurrentSlide(index);
    };

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    };

    return (
        <section className="relative h-[400px] md:h-[500px] lg:h-[600px] overflow-hidden">
            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute inset-0 transition-all duration-700 ease-in-out ${index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                        }`}
                >
                    {/* Background Image */}
                    <img
                        src={slide.image}
                        alt={slide.title}
                        className="w-full h-full object-cover"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-foreground/70 via-foreground/40 to-transparent" />

                    {/* Content */}
                    <div className="absolute inset-0 container mx-auto px-4 flex items-center">
                        <div className="max-w-xl text-primary-foreground">
                            <h1
                                className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-4 transition-all duration-700 delay-200 ${index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                                    }`}
                            >
                                {slide.title}
                            </h1>
                            <p
                                className={`text-lg md:text-xl mb-6 text-primary-foreground/90 transition-all duration-700 delay-300 ${index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                                    }`}
                            >
                                {slide.subtitle}
                            </p>
                            <a
                                href={slide.link}
                                className={`inline-block px-8 py-3 bg-secondary bg-violet-500 text-secondary-foreground font-bold rounded-lg shadow-gold hover:scale-105 transition-all duration-300 delay-400 ${index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
                                    }`}
                            >
                                {slide.cta}
                            </a>
                        </div>
                    </div>
                </div>
            ))}

            {/* Navigation Arrows */}
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-card/90 shadow-lg flex items-center justify-center hover:bg-card transition-colors z-10"
                aria-label="Previous slide"
            >
                <ChevronLeft className="w-6 h-6 text-foreground" />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-card/90 shadow-lg flex items-center justify-center hover:bg-card transition-colors z-10"
                aria-label="Next slide"
            >
                <ChevronRight className="w-6 h-6 text-foreground" />
            </button>

            {/* Dots */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => goToSlide(index)}
                        className={`h-2 rounded-full bg-violet-500 transition-all duration-300 ${index === currentSlide
                            ? 'w-8 bg-secondary'
                            : 'w-2 bg-primary-foreground/50 hover:bg-primary-foreground/70'
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    );
};

export default HeroBanner;