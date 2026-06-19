function normalizeSiteUrl(url: string) {
  return url.replace(/\/$/, "");
}

export const env = {
  siteUrl: normalizeSiteUrl(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://builtbyshivank.com",
  ),
  twitterHandle: process.env.NEXT_PUBLIC_TWITTER_HANDLE,
} as const;
