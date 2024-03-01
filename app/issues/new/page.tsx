'use client'
import { Button, TextArea, TextField } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';

interface IssueForm {
  title: string;
  description: string;
}

const NewIssuePage = () => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm<IssueForm>({
    defaultValues: {
      title: "",
      description: ""
    },
  })

  const router = useRouter();

  const onSubmit: SubmitHandler<IssueForm> = async (data) => {
    const response = await axios.post('/api/issues', data);
    router.push('/issues');
  }

  return (
    <form className='max-w-xl space-y-3'
      onSubmit={handleSubmit(onSubmit)}>
      <TextField.Root>
        <TextField.Input placeholder="Search the docs…" {...register('title')} />
      </TextField.Root>

      <Controller 
        name="description"
        control={control}
        render={({field}) => <SimpleMDE placeholder='Description' {...field} />}
      />

      <Button>Submit new issue</Button>
    </form>
  )
}

export default NewIssuePage
