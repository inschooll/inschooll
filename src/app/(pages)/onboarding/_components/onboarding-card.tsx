export default function OnboardingCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="app-box-shadow w-full divide-y divide-cc-border rounded-lg p-7 text-left">
      {children}
    </div>
  );
}