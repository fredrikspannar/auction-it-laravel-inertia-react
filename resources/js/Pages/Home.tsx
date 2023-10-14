import React, { useState } from 'react';
import Layout from "@/Layouts/Layout"
import { PageProps } from '@/types';

export default function Home ({ auth }:PageProps) {


    return (
        <Layout auth={auth}>
            
                <h1>This is Home component - GIT TRIGGER TEST</h1>

        </Layout>
    )
}

