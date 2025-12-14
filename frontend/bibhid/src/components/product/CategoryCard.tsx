import { Link } from 'react-router-dom';
import type { Category } from '../../types';

interface CategoryCardProps {
    category: Category;
}

const CategoryCard = ({ category }: CategoryCardProps) => {
    return (
        <Link
            to={`/products?category=${category.slug}`}
            className="group relative overflow-hidden rounded-xl aspect-[4/3] card-elevated"
        >
            <img
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent" />

            {/* Content */}
            <div className="absolute inset-0 p-4 flex flex-col justify-end">
                <h3 className="text-lg font-bold text-primary-foreground mb-1">
                    {category.name}
                </h3>
                <p className="text-sm text-primary-foreground/80">
                    {category.productCount} Products
                </p>
            </div>

            {/* Hover Effect */}
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary rounded-xl transition-colors duration-300" />
        </Link>
    );
};

export default CategoryCard;