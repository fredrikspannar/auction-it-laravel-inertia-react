import { Link } from '@inertiajs/react'

// create types for component, this is only used here
interface CategoryParent {
    id: number;
    name: string;
    parent_id: number;
}

type CategoryParentsCrumbsProps = {
    parents: CategoryParent[];
}

export default function CategoryParentsCrumbs({parents}:CategoryParentsCrumbsProps) {

    if ( !parents || parents.length == 0 ) return null;

    return (
        <div className="categoryParents">
            &nbsp;<Link href={route('categories')} >Categories</Link> <span className="ml-2 mr-2">/</span>
            {parents.map((parent, index) => (
                <span key={`breadcrumb-parent-${parent.id}`}>
                    <Link href={route('categories', parent.id)} >{parent.name}</Link> {index+1 < parents.length ? <span className="ml-2 mr-2">/</span> : null}
                </span>
            ))}
        </div>
    );

}