/** Re-mounts on every navigation, so each page fades up into place (CSS only, reduced-motion safe). */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="motion-safe:animate-page-in">{children}</div>;
}
