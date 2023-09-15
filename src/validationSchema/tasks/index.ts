import * as yup from 'yup';

export const taskValidationSchema = yup.object().shape({
  task_type: yup.string().required(),
  status: yup.string().required(),
  logistics_coordinator_id: yup.string().nullable().required(),
  provider_id: yup.string().nullable().required(),
});
