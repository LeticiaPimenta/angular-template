export interface Item {
    id: number;
    name: string;
    status: 'COMPLETED' | 'RUNNING' | 'FAILED' | 'PENDING';
  }