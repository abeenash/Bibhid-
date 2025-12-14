import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useRef } from 'react';
import type { Product } from '../../types';
import ProductCard from '../product/ProductCard';

interface ProductCarouselProps {
    title: string;
    products: Product[];
    viewAllLink?: string;
}

const ProductCarousel = ({ title, products, viewAllLink }: ProductCarouselProps) => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const checkScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
        }
    };

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = 300;
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth'
            });
            setTimeout(checkScroll, 300);
        }
    };

    return (
        <section className="py-10">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-semibold section-title">{title}</h2>
                    <div className="flex items-center gap-3">
                        {viewAllLink && (
                            <a
                                href={viewAllLink}
                                className="hidden sm:block text-sm font-semibold text-primary hover:underline"
                            >
                                View All
                            </a>
                        )}
                        <div className="flex gap-2">
                            <button
                                onClick={() => scroll('left')}
                                disabled={!canScrollLeft}
                                className={`w-10 h-10 rounded-full border border-border flex items-center justify-center transition-all ${canScrollLeft
                                    ? 'hover:bg-primary hover:text-primary-foreground hover:border-primary'
                                    : 'opacity-40 cursor-not-allowed'
                                    }`}
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <button
                                onClick={() => scroll('right')}
                                disabled={!canScrollRight}
                                className={`w-10 h-10 rounded-full border border-border flex items-center justify-center transition-all ${canScrollRight
                                    ? 'hover:bg-primary hover:text-primary-foreground hover:border-primary'
                                    : 'opacity-40 cursor-not-allowed'
                                    }`}
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Carousel */}
                <div
                    ref={scrollRef}
                    onScroll={checkScroll}
                    className="flex gap-4 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4 snap-x snap-mandatory"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {products.map((product) => (
                        <div
                            key={product.id}
                            className="flex-shrink-0 w-[260px] sm:w-[280px] snap-start"
                        >
                            <ProductCard product={product} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProductCarousel;