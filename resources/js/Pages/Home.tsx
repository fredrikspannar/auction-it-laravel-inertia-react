import React, { useState } from 'react';
import Layout from "@/Layouts/Layout"
import { PageProps } from '@/types';
import {Category} from "@/types";
import CategoryCardLoop from '@/Components/Category/CategoryCardLoop';

export default function Home ({ auth, categories }:PageProps<{categories:Category[]}>) {
console.log(categories[0]);

    return (
        <Layout auth={auth}>
            
            <CategoryCardLoop categories={categories} isSiteHome={true} isMainCategories={true} />

        </Layout>
    )
}

