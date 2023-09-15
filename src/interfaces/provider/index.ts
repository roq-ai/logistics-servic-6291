import { OrderInterface } from 'interfaces/order';
import { ProductInterface } from 'interfaces/product';
import { ServiceRateInterface } from 'interfaces/service-rate';
import { TaskInterface } from 'interfaces/task';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface ProviderInterface {
  id?: string;
  description?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  order?: OrderInterface[];
  product?: ProductInterface[];
  service_rate?: ServiceRateInterface[];
  task?: TaskInterface[];
  user?: UserInterface;
  _count?: {
    order?: number;
    product?: number;
    service_rate?: number;
    task?: number;
  };
}

export interface ProviderGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
