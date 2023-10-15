import { Link } from '@inertiajs/react'
import { Category } from "@/types";
import React from 'react';

interface CategoryCardProps {
    category:Category;
    isMainCategories:boolean;
}

export default function CategoryCard( { category, isMainCategories }: CategoryCardProps ) {

    // handler for broken images, fallback to empty
    const brokenImageFallback = (e:React.SyntheticEvent<EventTarget>) => {
        // event e needs to be casted as HTMLInputElement or else TS will show this as an error
        let target = e.target as HTMLInputElement;
        target.src = "/images/empty_category.png";
    }

    // does the category have any children?
    if ( category.children && category.children.length > 0 ) {

        // return card with a link
        return (
            <Link href={route('categories', [category.id])}>
                <div className={`categoryCard ${isMainCategories ? "w-full lg:w-3/4" : "lg:h-36 textCardSmall"}`} key={`category-${category.id}`}>
                    <img onError={brokenImageFallback} src={`storage/${category.image}`} alt={`Category ${category.name}`} />
                    <p className="categoryTitle">{category.name}</p>
                </div>
            </Link>
        );

    } else {

        // else only return card
        return (
            
            <div className={`categoryCard ${isMainCategories ? "w-full lg:w-3/4" : "lg:h-36 textCardSmall"}`} key={`category-${category.id}`}>
                <img onError={brokenImageFallback} src={`storage/${category.image}`} alt={`Category ${category.name}`} />
                <p className="categoryTitle">{category.name}</p>
            </div>
            
        );

    }

}

