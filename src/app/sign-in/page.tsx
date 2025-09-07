import { SignIn } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

export default function SignInPage() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <SignIn
        appearance={{
          baseTheme: dark, // force dark mode
          elements: {
            formButtonPrimary: "bg-indigo-600 hover:bg-indigo-700 text-white",
            card: "bg-gray-900 border border-gray-700",
            headerTitle: "text-white",
            headerSubtitle: "text-gray-400",
          },
        }}
        path="/sign-in"
        routing="path"
        signUpUrl="/sign-up"
      />
    </div>
  );
}
