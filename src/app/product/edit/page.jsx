import ProductUpdate from '@/Containers/Product/edit-container';
import { Suspense } from 'react';
import Loading from '@/components/Loading';
export default function ProductUpdatePage() {
    return (
        <>
            <Suspense fallback={<Loading />}>
                <ProductUpdate />
            </Suspense>
        </>
    );
}

