export type OpenGraphType = "article" | "website";

export type RouteMetadata = {
  canonicalPathname: string;
  description: string;
  ogType: OpenGraphType;
  title: string;
};

export const productionSiteUrl: string;
export const publicRouteMetadata: RouteMetadata[];
export const publicRoutePaths: string[];
export const notFoundMetadata: RouteMetadata;

export function getCanonicalUrl(pathname: string): string;
export function getRouteMetadata(pathname: string): RouteMetadata | undefined;
export function requireRouteMetadata(pathname: string): RouteMetadata;
export function getProjectRouteMetadata(slug: string): RouteMetadata;
export function getBlogPostRouteMetadata(slug: string): RouteMetadata;
