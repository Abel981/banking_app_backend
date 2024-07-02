export interface EventPayloads {
  'user.register': { name: string; email: string };
  'user.low-wants-balance': { name: string; email: string; balance: number };
}
