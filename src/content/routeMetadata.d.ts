export type OpenGraphType = "article" | "website";
export type RobotsValue = "index, follow" | "noindex, follow";

export type RouteMetadata = {
  canonicalPathname: string;
  description: string;
  ogType: OpenGraphType;
  robots: RobotsValue;
  title: string;
};

export const productionSiteUrl: string;
export const publicRouteMetadata: RouteMetadata[];
export const publicRoutePaths: string[];
export const indexableRouteMetadata: RouteMetadata[];
export const indexableRoutePaths: string[];
export const notFoundMetadata: RouteMetadata;

export function getCanonicalUrl(pathname: string): string;
export function getRouteMetadata(pathname: string): RouteMetadata | undefined;
export function requireRouteMetadata(pathname: string): RouteMetadata;
export function getBlogPostRouteMetadata(slug: string): RouteMetadata;
