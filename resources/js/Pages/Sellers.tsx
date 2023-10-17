import React, { useState } from 'react';
import Layout from "@/Layouts/Layout"
import { PageProps, User } from '@/types';
import { UserCard } from '@/Components/Sellers/UserCard';

export default function Sellers ({ auth, sellers }:PageProps< { sellers:User[] } >) {

    return (
        <Layout auth={auth}>
            
            <div className="flex flex-row flex-wrap mb-6">
                {sellers.map((user) => <UserCard key={`usercard-${user.id}`} user={user} />)}
            </div>

        </Layout>
    )
}

