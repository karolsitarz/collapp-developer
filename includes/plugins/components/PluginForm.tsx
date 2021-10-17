import { FormProps } from '../../../hooks/useApiForm'
import { InputText } from '../../../components/input/InputText'
import { object, string, TypeOf } from 'yup'
import { UncontrolledForm } from '../../../components/form/UncontrolledForm'
import SubmitButton from '../../../components/button/SubmitButton'
import { FiAlignCenter } from 'react-icons/fi'
import { InputTextarea } from '../../../components/input/InputTextarea'

const schema = object().shape({
  name: string().required(),
  description: string(),
})

export const PluginForm = ({
  query,
  initial,
  onSuccess,
  onError,
  children,
}: FormProps<TypeOf<typeof schema>>) => (
  <UncontrolledForm
    {...{ schema, query, initial, onSuccess, onError }}
    className="flex flex-col"
  >
    <InputText name="name" label="Name" />
    <InputTextarea
      name="description"
      label="Description"
      className="mt-2"
      icon={FiAlignCenter}
    />
    <SubmitButton className="mt-4 ml-auto" />
    {children}
  </UncontrolledForm>
)
