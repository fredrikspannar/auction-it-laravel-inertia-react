import React, { useState } from 'react';
import Layout from "@/Layouts/Layout"
import { PageProps } from '@/types';

export default function Statistics ({ auth }:PageProps) {


    return (
        <Layout auth={auth}>
            
                <h1>This is Statistics</h1>

        </Layout>
    )
}

