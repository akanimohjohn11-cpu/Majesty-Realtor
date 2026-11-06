export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen bg-[#FAF8F2] text-[#26342F]">{children}</div>;
}
