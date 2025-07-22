export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div>
          <h1>EduConnect Africa - Backend API</h1>
          <p>This is the backend API server. Check /api routes for endpoints.</p>
          {children}
        </div>
      </body>
    </html>
  );
}