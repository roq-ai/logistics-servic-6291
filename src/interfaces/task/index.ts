import { UserInterface } from 'interfaces/user';
import { ProviderInterface } from 'interfaces/provider';
import { GetQueryInterface } from 'interfaces';

export interface TaskInterface {
  id?: string;
  task_type: string;
  status: string;
  logistics_coordinator_id: string;
  provider_id: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  provider?: ProviderInterface;
  _count?: {};
}

export interface TaskGetQueryInterface extends GetQueryInterface {
  id?: string;
  task_type?: string;
  status?: string;
  logistics_coordinator_id?: string;
  provider_id?: string;
}
