import axios from 'axios';
import queryString from 'query-string';
import { ServiceRateInterface, ServiceRateGetQueryInterface } from 'interfaces/service-rate';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getServiceRates = async (
  query?: ServiceRateGetQueryInterface,
): Promise<PaginatedInterface<ServiceRateInterface>> => {
  const response = await axios.get('/api/service-rates', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createServiceRate = async (serviceRate: ServiceRateInterface) => {
  const response = await axios.post('/api/service-rates', serviceRate);
  return response.data;
};

export const updateServiceRateById = async (id: string, serviceRate: ServiceRateInterface) => {
  const response = await axios.put(`/api/service-rates/${id}`, serviceRate);
  return response.data;
};

export const getServiceRateById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/service-rates/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteServiceRateById = async (id: string) => {
  const response = await axios.delete(`/api/service-rates/${id}`);
  return response.data;
};
