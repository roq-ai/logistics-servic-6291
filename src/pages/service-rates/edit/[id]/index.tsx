import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
  Center,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState, useRef } from 'react';
import * as yup from 'yup';
import useSWR from 'swr';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { ImagePicker } from 'components/image-file-picker';
import { getServiceRateById, updateServiceRateById } from 'apiSdk/service-rates';
import { serviceRateValidationSchema } from 'validationSchema/service-rates';
import { ServiceRateInterface } from 'interfaces/service-rate';
import { ProviderInterface } from 'interfaces/provider';
import { getProviders } from 'apiSdk/providers';

function ServiceRateEditPage() {
  const router = useRouter();
  const id = router.query.id as string;

  const { data, error, isLoading, mutate } = useSWR<ServiceRateInterface>(
    () => (id ? `/service-rates/${id}` : null),
    () => getServiceRateById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: ServiceRateInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateServiceRateById(id, values);
      mutate(updated);
      resetForm();
      router.push('/service-rates');
    } catch (error: any) {
      if (error?.response.status === 403) {
        setFormError({ message: "You don't have permisisons to update this resource" });
      } else {
        setFormError(error);
      }
    }
  };

  const formik = useFormik<ServiceRateInterface>({
    initialValues: data,
    validationSchema: serviceRateValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Service Rates',
              link: '/service-rates',
            },
            {
              label: 'Update Service Rate',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Update Service Rate
          </Text>
        </Box>
        {(error || formError) && (
          <Box mb={4}>
            <Error error={error || formError} />
          </Box>
        )}

        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.service_type}
            label={'Service Type'}
            props={{
              name: 'service_type',
              placeholder: 'Service Type',
              value: formik.values?.service_type,
              onChange: formik.handleChange,
            }}
          />

          <NumberInput
            label="Rate"
            formControlProps={{
              id: 'rate',
              isInvalid: !!formik.errors?.rate,
            }}
            name="rate"
            error={formik.errors?.rate}
            value={formik.values?.rate}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('rate', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <AsyncSelect<ProviderInterface>
            formik={formik}
            name={'provider_id'}
            label={'Select Provider'}
            placeholder={'Select Provider'}
            fetcher={getProviders}
            labelField={'name'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/service-rates')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'service_rate',
    operation: AccessOperationEnum.UPDATE,
  }),
)(ServiceRateEditPage);
