'use client'
import { Button, Callout, TextField } from '@radix-ui/themes';

import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';
import { createIssueSchema } from '@/app/validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { z } from "zod";

const SimpleMDE = dynamic(
  () => import("react-simplemde-editor"), 
  {
    ssr: false
  }
)

type IssueForm = z.infer<typeof createIssueSchema>;

// interface IssueForm {
//   title: string;
//   description: string;
// }

const NewIssuePage = () => {
  const [error, setError] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);
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

  const router = useRouter();

  const onSubmit: SubmitHandler<IssueForm> = async (data) => {
    try {
      setSubmitting(true);
      const response = await axios.post('/api/issues', data);
      router.push('/issues');
    } catch (error) {
      setSubmitting(false);
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
        <ErrorMessage>{errors.title?.message}</ErrorMessage>

        <Controller 
          name="description"
          control={control}
          render={({field}) => <SimpleMDE placeholder='Description' {...field} />}
        />
        <ErrorMessage>{errors.description?.message}</ErrorMessage>

        <Button disabled={isSubmitting}>
          Submit new issue
          { isSubmitting && <Spinner></Spinner> }
        </Button>
      </form>
    </div>
  )
}

export default NewIssuePage
