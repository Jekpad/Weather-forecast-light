export type Routes = Record<
  "index" | "notfound" | "forbidden",
  { name: string; path: string; generateUrl: (params: Record<string, string | number>) => string }
>;

export const routes: Routes = {
  index: {
    name: "index",
    path: "/",
    generateUrl: () => "/",
  },
  notfound: {
    name: "notfound",
    path: "/404",
    generateUrl: () => "/404",
  },
  forbidden: {
    name: "forbidden",
    path: "/403",
    generateUrl: () => "/403",
  },
};
