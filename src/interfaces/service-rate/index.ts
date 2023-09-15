import { ProviderInterface } from 'interfaces/provider';
import { GetQueryInterface } from 'interfaces';

export interface ServiceRateInterface {
  id?: string;
  service_type: string;
  rate: number;
  provider_id: string;
  created_at?: any;
  updated_at?: any;

  provider?: ProviderInterface;
  _count?: {};
}

export interface ServiceRateGetQueryInterface extends GetQueryInterface {
  id?: string;
  service_type?: string;
  provider_id?: string;
}
