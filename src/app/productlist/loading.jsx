
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function Loading() {
    console.log("Loading...");
    return (
        <>
          <div className='grid grid-cols-6 gap-2'>
            <div className=''> <Skeleton height={30} count={30} /></div>
            <div className='col-span-5'> <Skeleton count={30} height={30} /></div>
          </div>
        </>     
    )
}

export default Loading;