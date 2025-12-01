// src/types/niubiz.d.ts
export {};

declare global {
  interface Window {
    VisanetCheckout: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      configure: (config: any) => void;
      open: () => void;
    };
  }
}
