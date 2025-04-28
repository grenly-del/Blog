type PerfEntryCallback = (metric: { name: string, value: number }) => void;

// Deklarasi manual untuk fungsi web-vitals
declare module 'web-vitals' {
  export function getCLS(onPerfEntry: PerfEntryCallback): void;
  export function getFID(onPerfEntry: PerfEntryCallback): void;
  export function getFCP(onPerfEntry: PerfEntryCallback): void;
  export function getLCP(onPerfEntry: PerfEntryCallback): void;
  export function getTTFB(onPerfEntry: PerfEntryCallback): void;
}

const reportWebVitals = (onPerfEntry?: PerfEntryCallback): void => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      // Memanggil fungsi untuk mendapatkan metrik performa
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
  }
};

export default reportWebVitals;
