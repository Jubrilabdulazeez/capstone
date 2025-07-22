export default function HomePage() {
  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>🎓 EduConnect Africa - Backend API</h1>
      <p>Welcome to the EduConnect Africa backend API server!</p>
      
      <div style={{ margin: "20px 0", padding: "15px", backgroundColor: "#f0f8ff", border: "1px solid #007acc", borderRadius: "5px" }}>
        <h2>📚 API Documentation</h2>
        <p>
          <strong>
            <a href="/docs" style={{ color: "#007acc", textDecoration: "none", fontSize: "18px" }}>
              → View Interactive API Documentation (Swagger UI)
            </a>
          </strong>
        </p>
        <p style={{ fontSize: "14px", color: "#666" }}>
          Complete API reference with interactive testing capabilities
        </p>
      </div>

      <h2>🚀 Quick Links</h2>
      <ul style={{ lineHeight: "1.8" }}>
        <li><a href="/docs">/docs</a> - Interactive API Documentation (Swagger UI)</li>
        <li><a href="/api/openapi">/api/openapi</a> - OpenAPI Specification (JSON)</li>
        <li><a href="/api/auth/signin">/api/auth/signin</a> - Authentication</li>
      </ul>

      <h2>📡 Server Status</h2>
      <ul style={{ lineHeight: "1.8" }}>
        <li>✅ Backend server running on port <strong>3001</strong></li>
        <li>✅ Next.js API Routes active</li>
        <li>✅ NextAuth.js authentication configured</li>
        <li>✅ Stripe payment integration ready</li>
        <li>✅ Swagger UI documentation available</li>
      </ul>

      <div style={{ marginTop: "30px", padding: "15px", backgroundColor: "#f9f9f9", border: "1px solid #ddd", borderRadius: "5px" }}>
        <h3>🛠️ Development Info</h3>
        <p>This is the backend API server for EduConnect Africa.</p>
        <p>Frontend is available at: <a href="http://localhost:3000">http://localhost:3000</a></p>
        <p>API Base URL: <code>http://localhost:3001/api</code></p>
      </div>
    </div>
  );
}