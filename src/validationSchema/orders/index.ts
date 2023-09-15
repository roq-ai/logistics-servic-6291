import * as yup from 'yup';

export const orderValidationSchema = yup.object().shape({
  order_type: yup.string().required(),
  status: yup.string().required(),
  customer_id: yup.string().nullable().required(),
  provider_id: yup.string().nullable().required(),
});
