import CategoryUpdate from '@/Containers/Product/Category/category-edit-container';
import { Suspense } from 'react';
import Loading from '@/components/Loading';
export default function categoryUpdatePage() {
    return (
        <>
            <Suspense fallback={<Loading />}>
                <CategoryUpdate isSubCategory = {true}  />
            </Suspense>
        </>
    );
}

