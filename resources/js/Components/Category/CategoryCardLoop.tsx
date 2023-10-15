import {Category} from "@/types";
import CategoryCard from '@/Components/Category/CategoryCard';

// create types for component, this is only used here
type CategoryCardLoopProps = {
    categories: Category[];
    isMainCategories?: boolean;
    isSiteHome?:boolean;
}

export default function CategoryCardLoop({categories, isMainCategories=false, isSiteHome = false}:CategoryCardLoopProps) {

    if ( !categories || categories.length == 0) return null;

    return (
        <div className="ml-2 lg:mt-6">
            {isMainCategories == false && <span>Sub-categories:</span>}
            <div className={`flex flex-row ${isMainCategories ? "flex-wrap" : "flex-col lg:flex-row"}`} >
                {categories.map((category) => <CategoryCard key={`category-${category.id}`} isSiteHome={isSiteHome} category={category} isMainCategories={isMainCategories} />)}
            </div>        
        </div>
    )


}