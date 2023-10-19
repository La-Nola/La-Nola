import { useLocation } from "react-router-dom";
import { useLayoutEffect } from "react";

const ScrollToTop = ({children}) => {
    const location = useLocation();
    useLayoutEffect(() => {
        window.scrollTo({top: 0, behavior: "smooth"});
    },[location.pathname]);
    
   return children;
};
export default ScrollToTop;