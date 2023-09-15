import { UserInterface } from 'interfaces/user';
import { ProviderInterface } from 'interfaces/provider';
import { GetQueryInterface } from 'interfaces';

export interface OrderInterface {
  id?: string;
  order_type: string;
  status: string;
  customer_id: string;
  provider_id: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  provider?: ProviderInterface;
  _count?: {};
}

export interface OrderGetQueryInterface extends GetQueryInterface {
  id?: string;
  order_type?: string;
  status?: string;
  customer_id?: string;
  provider_id?: string;
}
