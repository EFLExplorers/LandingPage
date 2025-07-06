export type Platform = "student" | "teacher" | "admin";

export const getPlatformUrl = (platform: Platform): string => {
  switch (platform) {
    case "student":
      return process.env.NEXT_PUBLIC_STUDENT_URL || "";
    case "teacher":
      return process.env.NEXT_PUBLIC_TEACHER_URL || "";
    case "admin":
      return process.env.NEXT_PUBLIC_ADMIN_URL || "";
    default:
      return "";
  }
};
