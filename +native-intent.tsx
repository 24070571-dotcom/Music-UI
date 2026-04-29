export function redirectSystemPath({ path }: { path: string }) {
  try {
    if (path === "sonicflow://") {
      return "/";
    }
    return path;
  } catch {
    return "/";
  }
}
