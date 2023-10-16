import Layout from "@/Layouts/Layout"
import { PageProps } from '@/types';
import { Category, Item } from "@/types";
import CategoryParentsCrumbs from '@/Components/Category/CategoryParentsCrumbs';
import CategoryCardLoop from '@/Components/Category/CategoryCardLoop';
import ItemLoop from '@/Components/Category/ItemLoop';

export default function Categories ({ auth, categories, parents, items }:PageProps<{categories: Category[], parents: Category[], items:Item[]}>) {

    // no categories at all?
    if ( !categories || categories.length == 0 ) {
        return (
            <Layout auth={auth}>
                <p>Error No categories found.</p>
            </Layout>
        ) 
    }

    // set flag that will be used as sizeing of card
    const isMainCategories = categories[0].parent_id === null ? true : false;
    const categoryName = categories[categories.length-1].name;

    return (
        <Layout auth={auth}>

            <CategoryParentsCrumbs parents={parents} />
            <CategoryCardLoop categories={categories} isMainCategories={isMainCategories} />

            <ItemLoop items={items} categoryName={categoryName} />

        </Layout>
    )
}

