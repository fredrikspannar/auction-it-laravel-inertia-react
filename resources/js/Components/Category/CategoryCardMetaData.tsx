import { Category } from "@/types";

// create types for component, this is only used here
type CategoryCardMetaDataProps = {
    category: Category;

}

export default function CategoryCardMetaData({category}:CategoryCardMetaDataProps) {
    return (
        <div className="siteHomeCategoryMeta w-fit">
            Sub-categories: {category.children?.length}<br/>
            Items on sale: {category.productsCount}
        </div>
    )
}