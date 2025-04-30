export async function verifyToken(token: string): Promise<boolean> {
  try {
    const response = await fetch("/api/auth/verify", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.ok;
  } catch {
    return false;
  }
}
