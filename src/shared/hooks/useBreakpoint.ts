import { useMediaQuery } from "@mantine/hooks";

/**
 * Enhanced breakpoint hook with additional utilities
 * Uses Mantine's useMediaQuery for responsive design
 */
export const useBreakpoint = () => {
  // Mantine default breakpoints
  const xs = useMediaQuery("(min-width: 36em)");
  const sm = useMediaQuery("(min-width: 48em)");
  const md = useMediaQuery("(min-width: 62em)");
  const lg = useMediaQuery("(min-width: 75em)");
  const xl = useMediaQuery("(min-width: 88em)");

  // Check if screen is mobile (below md breakpoint)
  const isMobile = !md;

  // Check if screen is tablet (md only)
  const isTablet = md && !lg;

  // Check if screen is desktop (lg and above)
  const isDesktop = lg;

  // Check if screen is large desktop (xl and above)
  const isLargeDesktop = xl;

  // Get current breakpoint name
  const getCurrentBreakpoint = (): string => {
    if (xl) return "xl";
    if (lg) return "lg";
    if (md) return "md";
    if (sm) return "sm";
    if (xs) return "xs";
    return "xs";
  };

  return {
    // Simplified checks
    isMobile,
    isTablet,
    isDesktop,
    isLargeDesktop,

    // Current breakpoint
    currentBreakpoint: getCurrentBreakpoint(),

    // Individual breakpoints
    xs,
    sm,
    md,
    lg,
    xl,

    // Legacy support - screens object similar to antd
    screens: {
      xs,
      sm,
      md,
      lg,
      xl,
    },
  };
};

export default useBreakpoint;
