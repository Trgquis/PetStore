import React, { useEffect } from "react";
import { ring2 } from "ldrs";

const Loader = () => {
    useEffect(() => {
        ring2.register();
    }, []);

    return (
        <l-ring-2
            size="20"
            stroke="3"
            stroke-length="0.25"
            bg-opacity="0.1"
            speed="0.8"
            color="white"
        ></l-ring-2>
    );
};

export default Loader;
