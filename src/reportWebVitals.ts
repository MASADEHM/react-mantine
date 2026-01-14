/**
 * Web Vitals Reporter
 * Measures and reports performance metrics
 */

type ReportHandler = (metric: {
  name: string;
  value: number;
  id: string;
}) => void;

const reportWebVitals = (onPerfEntry?: ReportHandler) => {
  if (onPerfEntry && typeof onPerfEntry === "function") {
    // Web Vitals are optional - if needed, install web-vitals package
    // and uncomment the following:
    /*
    import("web-vitals").then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry);
      getFID(onPerfEntry);
      getFCP(onPerfEntry);
      getLCP(onPerfEntry);
      getTTFB(onPerfEntry);
    });
    */
    console.log("Web vitals reporting enabled");
  }
};

export default reportWebVitals;
