import React, { useState } from 'react';
import Layout from "@/Layouts/Layout"
import { PageProps, Item } from '@/types';

export default function ItemPage ({ auth, item }:PageProps<{item:Item}>) {

console.log(item);

    return (
        <Layout auth={auth}>
            
                <h1>This is Item</h1>

        </Layout>
    )
}

