import { categories } from '../../data/mockData';
import CategoryCard from '../product/CategoryCard';

const CategoryGrid = () => {
    return (
        <section className="py-8 bg-surface-sunken">
            <div className="container mx-auto px-4">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-semibold section-title mb-2">Shop by Category</h2>
                    <p className="text-muted-foreground">
                        Explore our wide range of products across different categories
                    </p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                    {categories.map((category, index) => (
                        <div
                            key={category.id}
                            className="animate-fade-up"
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <CategoryCard category={category} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategoryGrid;