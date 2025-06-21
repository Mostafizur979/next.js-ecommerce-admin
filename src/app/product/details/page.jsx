import ProductDetails from '@/Containers/Product/details-container';
import { Suspense } from 'react';
import Loading from '@/components/Loading';
export default function ProductDetailsPage() {
    return (
        <>
            <Suspense fallback={<Loading />}>
                <ProductDetails />
            </Suspense>
        </>
    );
}

