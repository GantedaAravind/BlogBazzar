import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

const NotFound = () => {
  return (
    <div className="">
      <LazyLoadImage 
                      effect="blur" src={"/page-not-found.svg"} className="w-[60%] mx-auto " />
      <p className="font-semibold text-3xl text-white mx-auto w-fit my-4">Page Not Found </p>
    </div>
  );
};

export default NotFound;
