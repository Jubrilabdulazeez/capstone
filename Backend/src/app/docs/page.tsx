"use client";

import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import { useEffect, useState } from "react";

export default function ApiDocsPage() {
  const [spec, setSpec] = useState(null);

  useEffect(() => {
    fetch("/api/openapi")
      .then((res) => res.json())
      .then((data) => setSpec(data))
      .catch((err) => console.error("Failed to load OpenAPI spec:", err));
  }, []);

  if (!spec) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h1>Loading API Documentation...</h1>
      </div>
    );
  }

  return (
    <div>
      <SwaggerUI
        spec={spec}
        deepLinking={true}
        displayOperationId={false}
        defaultModelExpandDepth={1}
        defaultModelsExpandDepth={1}
        defaultModelRendering="example"
        displayRequestDuration={true}
        docExpansion="list"
        filter={false}
        showExtensions={true}
        showCommonExtensions={true}
        tryItOutEnabled={true}
      />
    </div>
  );
}