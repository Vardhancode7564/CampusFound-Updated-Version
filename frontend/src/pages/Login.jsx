import { SignIn } from '@clerk/clerk-react'

const Login = () => {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-slate-900">
            Sign in to your account
          </h2>
          <p className="mt-2 text-sm text-slate-600">
            Welcome back to CampusFound
          </p>
        </div>
        <div className="flex justify-center mt-8">
          <SignIn 
            routing="path" 
            path="/login" 
            signUpUrl="/register"
            afterSignInUrl="/dashboard"
            appearance={{
              elements: {
                rootBox: "mx-auto w-full",
                card: "bg-white shadow-xl rounded-xl w-full",
                headerTitle: "hidden",
                headerSubtitle: "hidden",
                formButtonPrimary: "bg-primary-600 hover:bg-primary-700 text-sm normal-case",
 
              }
            }}
          />
        </div>
      </div>
    </div>
  )
}

export default Login
