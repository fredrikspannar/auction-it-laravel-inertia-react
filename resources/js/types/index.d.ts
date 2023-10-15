export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User;
    };
    children?: JSX.Element | JSX.Element[] |string;
};


export interface Category {
    id: number;
    name: string;
    image: string;
    parent_id: number;
    children?: Category[];
}

