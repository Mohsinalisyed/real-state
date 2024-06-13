// use client
import { useState, useEffect } from "react";

const useTwElements = () => {
  const [twElementsLoaded, setTwElementsLoaded] = useState(false);

  useEffect(() => {
    const loadTwElements = async () => {
      try {
        const twElements = await import("tw-elements");
        const { Input, Ripple, Carousel, Chart, Modal } = twElements;

        if (Input || Ripple || Carousel || Chart || Modal) {
          twElements.initTE({
            Input,
            Ripple,
            Carousel,
            Modal,
          });
          setTwElementsLoaded(true);
        } else {
          console.error("Input component not found in tw-elements");
        }
      } catch (error) {
        console.error("Error loading tw-elements:", error);
      }
    };

    if (typeof window !== "undefined") {
      loadTwElements();
    }
  }, []);

  return twElementsLoaded;
};

export default useTwElements;
