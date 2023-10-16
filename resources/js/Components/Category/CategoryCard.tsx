import { Link } from '@inertiajs/react'
import { Category } from "@/types";
import React from 'react';
import CategoryCardMetaData from './CategoryCardMetaData';

interface CategoryCardProps {
    category:Category;
    isMainCategories:boolean;
    isSiteHome?:boolean;
}

export default function CategoryCard( { category, isMainCategories, isSiteHome = false }: CategoryCardProps ) {

    // handler for broken images, fallback to empty
    const brokenImageFallback = (e:React.SyntheticEvent<EventTarget>) => {
        // event e needs to be casted as HTMLInputElement or else TS will show this as an error
        let target = e.target as HTMLInputElement;
        target.src = "/images/empty_category.png";
    }

    const cardClasses = `categoryCard ${isMainCategories ? "" : "textCardSmall"} ${isSiteHome ? "flex flex-col items-center pb-2" : ""}`;

    // does the category have any children?
    if ( category.children && category.children.length > 0 ) {

        // return card with a link
        return (
            <Link href={route('categories', [category.id])} title={`View Category "${category.name}"`}>
                <div className={cardClasses} key={`category-${category.id}`}>
                    <img onError={brokenImageFallback} src={`storage/${category.image}`} alt={`Category ${category.name}`} />
                    <p className="categoryTitle">{category.name}</p>
                    
                    {isSiteHome && <CategoryCardMetaData category={category} />}           
                </div>
            </Link>
        );

    } else {

        // else only return card
        return (
            
            <div className={cardClasses} key={`category-${category.id}`}>
                <img onError={brokenImageFallback} src={`storage/${category.image}`} alt={`Category ${category.name}`} />
                <p className="categoryTitle">{category.name}</p>

                {isSiteHome && <CategoryCardMetaData category={category} />}          
            </div>
            
        );

    }

}

