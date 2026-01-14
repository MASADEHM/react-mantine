import { createTheme, MantineColorsTuple, rem } from "@mantine/core";

/**
 * Dubai Government Color Palette
 * Inspired by DDA, Dubai Municipality, and UAE Smart Government portals
 */
export const colors = {
  // Primary - Deep Dubai Blue
  primary: "#004d99",
  primaryHover: "#003d7a",
  primaryActive: "#002d5c",
  primaryLight: "#e6f0fa",

  // Secondary - Dubai Accent Blue
  secondary: "#00a0df",
  secondaryHover: "#0090c8",
  secondaryActive: "#0080b0",
  secondaryLight: "#e6f7fc",

  // Success - Green
  success: "#0d9f6e",
  successHover: "#0a8a5f",
  successBg: "#def7ec",

  // Warning - Amber
  warning: "#f59e0b",
  warningHover: "#d97706",
  warningBg: "#fef3c7",

  // Error - Red
  error: "#dc2626",
  errorHover: "#b91c1c",
  errorBg: "#fee2e2",

  // Info - Blue
  info: "#0284c7",
  infoBg: "#e0f2fe",

  // Neutral Grays
  textPrimary: "#1f2937",
  textSecondary: "#4b5563",
  textTertiary: "#9ca3af",
  textDisabled: "#d1d5db",

  // Backgrounds
  bgPrimary: "#ffffff",
  bgSecondary: "#f8fafc",
  bgTertiary: "#f1f5f9",
  bgDark: "#0f172a",

  // Borders
  borderLight: "#e5e7eb",
  borderDefault: "#d1d5db",
  borderDark: "#9ca3af",

  // Shadows
  shadowLight: "rgba(0, 0, 0, 0.05)",
  shadowMedium: "rgba(0, 0, 0, 0.1)",
  shadowDark: "rgba(0, 0, 0, 0.15)",
} as const;

// Mantine requires 10 shades for each color
const dubaiBlue: MantineColorsTuple = [
  "#e6f0fa", // 0 - lightest
  "#cce0f5", // 1
  "#99c2eb", // 2
  "#66a3e0", // 3
  "#3385d6", // 4
  "#0066cc", // 5
  "#004d99", // 6 - primary (main)
  "#003d7a", // 7
  "#002d5c", // 8
  "#001e3d", // 9 - darkest
];

const dubaiAccent: MantineColorsTuple = [
  "#e6f7fc", // 0 - lightest
  "#cceff9", // 2
  "#99dff3", // 3
  "#66cfec", // 4
  "#33bfe6", // 5
  "#00a0df", // 6 - main
  "#0090c8", // 7
  "#0080b0", // 8
  "#007099", // 9
  "#006080", // 10 - darkest
];

const dubaiSuccess: MantineColorsTuple = [
  "#def7ec", // 0
  "#bcf0d8", // 1
  "#84e1b5", // 2
  "#4dd392", // 3
  "#1ec46f", // 4
  "#0d9f6e", // 5 - main
  "#0a8a5f", // 6
  "#087550", // 7
  "#066041", // 8
  "#044b32", // 9
];

const dubaiWarning: MantineColorsTuple = [
  "#fef3c7", // 0
  "#fde68a", // 1
  "#fcd34d", // 2
  "#fbbf24", // 3
  "#f59e0b", // 4 - main
  "#d97706", // 5
  "#b45309", // 6
  "#92400e", // 7
  "#78350f", // 8
  "#451a03", // 9
];

const dubaiError: MantineColorsTuple = [
  "#fee2e2", // 0
  "#fecaca", // 1
  "#fca5a5", // 2
  "#f87171", // 3
  "#ef4444", // 4
  "#dc2626", // 5 - main
  "#b91c1c", // 6
  "#991b1b", // 7
  "#7f1d1d", // 8
  "#450a0a", // 9
];

/**
 * Main Dubai Government Theme Configuration
 * Applied via Mantine's MantineProvider
 */
export const dubaiGovTheme = createTheme({
  // Colors
  colors: {
    dubaiBlue,
    dubaiAccent,
    dubaiSuccess,
    dubaiWarning,
    dubaiError,
  },
  primaryColor: "dubaiBlue",
  primaryShade: 6,

  // Typography
  fontFamily:
    "'Dubai', 'Segoe UI', -apple-system, BlinkMacSystemFont, 'Noto Sans Arabic', sans-serif",
  fontFamilyMonospace: "Monaco, Courier, monospace",
  headings: {
    fontFamily:
      "'Dubai', 'Segoe UI', -apple-system, BlinkMacSystemFont, 'Noto Sans Arabic', sans-serif",
    fontWeight: "600",
    sizes: {
      h1: { fontSize: rem(38), lineHeight: "1.2" },
      h2: { fontSize: rem(30), lineHeight: "1.3" },
      h3: { fontSize: rem(24), lineHeight: "1.35" },
      h4: { fontSize: rem(20), lineHeight: "1.4" },
      h5: { fontSize: rem(16), lineHeight: "1.45" },
      h6: { fontSize: rem(14), lineHeight: "1.5" },
    },
  },
  fontSizes: {
    xs: rem(12),
    sm: rem(13),
    md: rem(14),
    lg: rem(16),
    xl: rem(18),
  },
  lineHeights: {
    xs: "1.4",
    sm: "1.45",
    md: "1.5",
    lg: "1.55",
    xl: "1.6",
  },

  // Spacing & Radius
  radius: {
    xs: rem(2),
    sm: rem(4),
    md: rem(6),
    lg: rem(8),
    xl: rem(12),
  },
  spacing: {
    xs: rem(8),
    sm: rem(12),
    md: rem(16),
    lg: rem(24),
    xl: rem(32),
  },

  // Shadows
  shadows: {
    xs: `0 1px 2px ${colors.shadowLight}`,
    sm: `0 2px 4px ${colors.shadowLight}`,
    md: `0 2px 8px ${colors.shadowLight}`,
    lg: `0 4px 12px ${colors.shadowMedium}`,
    xl: `0 8px 24px ${colors.shadowMedium}`,
  },

  // Default props for components
  defaultRadius: "md",

  // Component overrides
  components: {
    Button: {
      defaultProps: {
        radius: "md",
      },
      styles: {
        root: {
          fontWeight: 500,
        },
      },
    },
    Card: {
      defaultProps: {
        radius: "lg",
        shadow: "sm",
        withBorder: true,
      },
      styles: {
        root: {
          borderColor: colors.borderLight,
        },
      },
    },
    Paper: {
      defaultProps: {
        radius: "md",
        shadow: "sm",
      },
    },
    Input: {
      defaultProps: {
        radius: "md",
      },
    },
    TextInput: {
      defaultProps: {
        radius: "md",
      },
    },
    Select: {
      defaultProps: {
        radius: "md",
      },
    },
    Table: {
      styles: {
        thead: {
          backgroundColor: colors.bgTertiary,
        },
        tr: {
          "&:hover": {
            backgroundColor: colors.bgTertiary,
          },
        },
      },
    },
    Modal: {
      defaultProps: {
        radius: "lg",
      },
    },
    Notification: {
      defaultProps: {
        radius: "md",
      },
    },
    Badge: {
      defaultProps: {
        radius: "sm",
      },
    },
    Tabs: {
      styles: {
        tab: {
          fontWeight: 500,
        },
      },
    },
    NavLink: {
      styles: {
        root: {
          borderRadius: rem(6),
        },
      },
    },
    Menu: {
      defaultProps: {
        radius: "lg",
      },
      styles: {
        dropdown: {
          padding: rem(8),
        },
      },
    },
  },
});

/**
 * RTL-specific font adjustments
 * Applied when language is Arabic
 */
export const rtlFontFamily =
  "'IBM Plex Sans Arabic', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

/**
 * Dark theme variant (optional)
 */
export const darkThemeColors = {
  colorScheme: "dark" as const,
  primaryColor: "dubaiAccent",
  colors: {
    dark: [
      "#C1C2C5",
      "#A6A7AB",
      "#909296",
      "#5C5F66",
      "#373A40",
      "#2C2E33",
      "#25262B",
      "#1A1B1E",
      "#141517",
      "#101113",
    ] as MantineColorsTuple,
  },
};

export default dubaiGovTheme;
