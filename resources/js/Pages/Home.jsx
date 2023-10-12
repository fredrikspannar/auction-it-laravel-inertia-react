import React, { useState } from 'react';
import {Layout} from "../Components/Layout"

const Home = () => {
    return (
        <Layout>
            <div className="mx-auto lg:!w-3/4">
                <h1>This is Home component</h1>
            </div>
        </Layout>
    )
}

export default Home