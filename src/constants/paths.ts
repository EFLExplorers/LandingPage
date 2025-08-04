export const ASSET_PATHS = {
  images: {
    base: "/images",
    characters: "/images/characters",
    backgrounds: "/images/backgrounds",
  },
  logo: {
    base: "/images/logo",
    default: "/images/logo/logo.png",
    dark: "/images/logo/logo-dark.png",
  },
} as const;

export const AUTH_PATHS = {
  login: "/Auth/login",
  register: "/Auth/register",
  forgotPassword: "/Auth/forgot-password",
  resetPassword: "/Auth/reset-password",
  teacher: {
    register: "/Auth/register/teacher",
    pending: "/Auth/register/teacher/pending",
    platform: "/platforms/teacher",
  },
  student: {
    register: "/Auth/register/student",
    platform: "/platforms/student",
  },
  admin: {
    dashboard: "/admin/dashboard",
  },
} as const;

export const PLATFORM_PATHS = {
  teacher: process.env.NEXT_PUBLIC_TEACHER_URL || "/platforms/teacher",
  student: process.env.NEXT_PUBLIC_STUDENT_URL || "/platforms/student",
  admin: "/admin/dashboard",
} as const;

// Utility function for redirects
export const redirectTo = (path: string) => {
  if (typeof window !== 'undefined') {
    window.location.href = path;
  }
};

// Platform-specific redirect utilities
export const redirectToPlatform = {
  teacher: (status: 'approved' | 'pending' | 'rejected' | 'suspended' = 'approved') => {
    if (status === 'approved') {
      redirectTo(PLATFORM_PATHS.teacher);
    } else {
      redirectTo(AUTH_PATHS.teacher.pending);
    }
  },
  student: () => redirectTo(PLATFORM_PATHS.student),
  admin: () => redirectTo(PLATFORM_PATHS.admin),
};
