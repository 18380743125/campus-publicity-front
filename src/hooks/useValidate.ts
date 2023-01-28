import { FieldValues, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { AnyObjectSchema } from 'yup'

export default function useValidate<T extends FieldValues>(schema: AnyObjectSchema) {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<T>({
    resolver: yupResolver(schema)
  })
  return {
    register,
    handleSubmit,
    errors
  }
}
