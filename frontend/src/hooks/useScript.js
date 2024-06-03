import { useEffect } from 'react'

function useScript (src,crossOrigin="")  {

    useEffect(() => {

    const script = document.createElement("script");
    script.src = src;
    script.crossOrigin=crossOrigin;
    document.body.appendChild(script);
    return () =>{
        document.body.removeChild(script);
    };
    }, [src,crossOrigin]);
    
}

export default useScript
