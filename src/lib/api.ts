import { NextResponse } from "next/server";

export type ApiResponse<T = unknown> =
  | { success: true; data: T }
  | { success: false; error: string };

export function apiSuccess<T>(data: T, status = 200): NextResponse {
  return NextResponse.json({ success: true, data }, { status });
}

export function apiError(message: string, status = 400): NextResponse {
  return NextResponse.json({ success: false, error: message }, { status });
}

export function apiUnauthorized(): NextResponse {
  return apiError("Unauthorized", 401);
}

export function apiNotFound(resource = "Resource"): NextResponse {
  return apiError(`${resource} not found`, 404);
}

export function apiServerError(err: unknown): NextResponse {
  const message =
    err instanceof Error ? err.message : "Internal server error";
  console.error("[API Error]", err);
  return apiError(message, 500);
}
