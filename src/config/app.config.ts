interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
  ownerAbilities: string[];
  customerAbilities: string[];
  getQuoteUrl: string;
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Supply Chain Manager'],
  customerRoles: ['Customer'],
  tenantRoles: ['Supply Chain Manager', 'Logistics Coordinator'],
  tenantName: 'Provider',
  applicationName: 'Logistics Service Provider',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
  customerAbilities: [
    'Manage my orders',
    "View Provider's portfolio of logistics products and solutions",
    'Search for Providers based on their services',
    'View the rates of the services offered by the Provider',
  ],
  ownerAbilities: [
    'Manage Provider profile',
    'Invite Logistics Coordinators to Provider profile',
    'Manage logistics products and solutions',
    'Manage service rates',
  ],
  getQuoteUrl: 'https://app.roq.ai/proposal/0f315dae-6516-4055-9116-1269c3143d4a',
};
