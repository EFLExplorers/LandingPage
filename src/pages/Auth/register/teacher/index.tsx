import { useEffect } from "react";
import { AuthContainer } from "@/components/auth/layout";
import { RegistrationForm } from "@/components/auth/forms";
import { scrollToTop } from "../../../../utils/scrollToTop";

export const TeacherRegistrationPage = () => {
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <AuthContainer
      title="Teacher Registration"
      subtitle="Create your teacher account to get started"
    >
      <RegistrationForm platform="teacher" />
    </AuthContainer>
  );
};

export default TeacherRegistrationPage;
