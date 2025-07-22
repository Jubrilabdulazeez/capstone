import { NextResponse } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";
import yaml from "yaml";

export async function GET() {
  try {
    // Read the OpenAPI YAML file
    const filePath = join(process.cwd(), "src", "lib", "openapi.yaml");
    const fileContents = readFileSync(filePath, "utf8");
    
    // Parse YAML to JSON
    const spec = yaml.parse(fileContents);
    
    return NextResponse.json(spec);
  } catch (error) {
    console.error("Failed to load OpenAPI spec:", error);
    return NextResponse.json(
      { error: "Failed to load API specification" },
      { status: 500 }
    );
  }
}