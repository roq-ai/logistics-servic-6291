import * as yup from 'yup';

export const serviceRateValidationSchema = yup.object().shape({
  service_type: yup.string().required(),
  rate: yup.number().integer().required(),
  provider_id: yup.string().nullable().required(),
});
