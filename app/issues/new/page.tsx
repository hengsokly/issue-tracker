'use client'
import { Button, Callout, TextArea, TextField, Text } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { createIssueSchema } from '@/app/validationSchemas';
import { z } from "zod";

type IssueForm = z.infer<typeof createIssueSchema>;

// interface IssueForm {
//   title: string;
//   description: string;
// }

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
    resolver: zodResolver(createIssueSchema)
  })

  const [error, setError] = useState('');

  const router = useRouter();

  const onSubmit: SubmitHandler<IssueForm> = async (data) => {
    try {
      const response = await axios.post('/api/issues', data);
      router.push('/issues');
    } catch (error) {
      console.log(error);
      setError('An unexpect error occure!')
    }
  }

  return (
    <div className='max-w-xl'>
      {error && 
        <Callout.Root color='red' className='mb-5'>
          <Callout.Text>
            You will need admin privileges to install and access this application.
          </Callout.Text>
        </Callout.Root>
      }

      <form className=' space-y-3'
        onSubmit={handleSubmit(onSubmit)}>
        <TextField.Root>
          <TextField.Input placeholder="Search the docs…" {...register('title')} />
        </TextField.Root>
        {errors.title && <Text color='red'>{errors.title.message}</Text>}

        <Controller 
          name="description"
          control={control}
          render={({field}) => <SimpleMDE placeholder='Description' {...field} />}
        />
        {errors.description && <Text color='red' as='p'>{errors.description.message}</Text>}

        <Button>Submit new issue</Button>
      </form>
    </div>
  )
}

export default NewIssuePage
