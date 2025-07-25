import { useEffect } from "react";
import { AuthContainer } from "@/components/auth/layout";
import { RegistrationForm } from "@/components/auth/forms";
import { scrollToTop } from "../../../../utils/scrollToTop";

export const StudentRegistrationPage = () => {
  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <AuthContainer
      title="Student Registration"
      subtitle="Create your student account to get started"
    >
      <RegistrationForm platform="student" />
    </AuthContainer>
  );
};

export default StudentRegistrationPage;
