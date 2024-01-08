'use client';

import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { eventFormSchema } from '@/lib/validator';
import { eventDefaultValues } from '@/constants';
import { Textarea } from '@/components/ui/textarea';

import DropDown from '../DropDown';

type EventFormProps = {
  userId: string;
  type: 'Create' | 'Update';
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
const EventForm = ({ userId, type }: EventFormProps) => {
  const initialValues = eventDefaultValues;

  const form = useForm<z.infer<typeof eventFormSchema>>({
    resolver: zodResolver(eventFormSchema),
    defaultValues: initialValues,
  });

  function onSubmit(values: z.infer<typeof eventFormSchema>) {
    // eslint-disable-next-line no-console
    console.log(values);
  }
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-5'>
          <div className='flex flex-col gap-5 md:flex-row'>
            <FormField
              control={form.control}
              name='title'
              render={({ field }) => (
                <FormItem className='w-full '>
                  <FormControl>
                    <Input placeholder='Event title' {...field} className='input-field' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='categoryId'
              render={({ field }) => (
                <FormItem className='w-full '>
                  <FormControl>
                    <DropDown onChangeHandler={field.onChange} value={field.value} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className='flex flex-col gap-5 md:flex-row'>
            <FormField
              control={form.control}
              name='description'
              render={({ field }) => (
                <FormItem className='w-full '>
                  <FormControl className='h-72'>
                    <Textarea placeholder='Description' {...field} className='textarea rounded-2xl' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type='submit'>Submit</Button>
        </form>
      </Form>
    </>
  );
};

export default EventForm;