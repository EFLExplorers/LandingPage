import { AuthContainer } from "@/components/auth/layout";
import { RegistrationForm } from "@/components/auth/forms";

export const TeacherRegistrationPage = () => {
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
