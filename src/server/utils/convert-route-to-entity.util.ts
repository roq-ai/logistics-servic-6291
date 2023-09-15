const mapping: Record<string, string> = {
  orders: 'order',
  products: 'product',
  providers: 'provider',
  'service-rates': 'service_rate',
  tasks: 'task',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
