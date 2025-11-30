import { useEffect, useState } from "react";

const NIUBIZ_SCRIPT_URL =
  "https://static-content-qas.vnforapps.com/v2/js/checkout.js";

export const useNiubizScript = () => {
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [scriptError, setScriptError] = useState(false);

  useEffect(() => {
    const checkGlobal = () => {
      if (window.VisanetCheckout) {
        console.log("✅ Niubiz detectado.");
        setIsScriptLoaded(true);
        return true;
      }
      return false;
    };

    if (checkGlobal()) return;

    let script = document.querySelector(
      `script[src="${NIUBIZ_SCRIPT_URL}"]`
    ) as HTMLScriptElement;

    if (!script) {
      script = document.createElement("script");
      script.src = NIUBIZ_SCRIPT_URL;
      script.async = true;
      document.body.appendChild(script);
    }

    script.onload = () => {
      console.log("📥 Script cargado, esperando objeto global...");
      let tries = 0;

      const interval = setInterval(() => {
        tries++;

        if (checkGlobal()) {
          clearInterval(interval);
        }

        if (tries > 50) {
          console.error("❌ Timeout: window.VisanetCheckout no existe.");
          setScriptError(true);
          clearInterval(interval);
        }
      }, 100);
    };

    script.onerror = () => {
      console.error("❌ Error al cargar script Niubiz.");
      setScriptError(true);
    };
  }, []);

  return { isScriptLoaded, scriptError };
};
