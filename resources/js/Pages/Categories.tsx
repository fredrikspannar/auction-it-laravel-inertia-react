import React, { useState } from 'react';
import Layout from "@/Layouts/Layout"
import { PageProps } from '@/types';
import { Link } from '@inertiajs/react'
import {Category} from "@/types";
import CategoryParentsCrumbs from '@/Components/Category/CategoryParentsCrumbs';
import CategoryCardLoop from '@/Components/Category/CategoryCardLoop';

export default function Categories ({ auth, categories, parents }:PageProps<{categories: Category[], parents: Category[]}>) {

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


    return (
        <Layout auth={auth}>
            <CategoryParentsCrumbs parents={parents} />
            <CategoryCardLoop categories={categories} isMainCategories={isMainCategories} />


        </Layout>
    )
}

