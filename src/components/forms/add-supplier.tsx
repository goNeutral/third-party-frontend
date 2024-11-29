/* eslint-disable react/no-children-prop */
import React, { useState } from 'react';
import { useForm } from '@tanstack/react-form';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { useMutation } from '@tanstack/react-query';

const AddSupplierForm = (): JSX.Element => {
    const [preview, setPreview] = useState<string | null>(null)

    const form = useForm({
        defaultValues: {
            supplierName: '',
            registeredEntityName: '',
            registeredAddress: '',
            city: '',
            state: '',
            pincode: '',
            gstNumber: '',
            aadharNumber: '',
            panNumber: '',
            gstStatus: '',
            gstdoc: undefined,
            aadharDoc: undefined,
            panDoc: undefined,
            geotaggedGodownImage: undefined,
        },
        onSubmit: (values) => {
            console.log(values);
        }
    });

    const uploadMutation = useMutation({
        mutationFn: async (formData: FormData) => {
          const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
          })

          if (!response.ok) {
            const error = await response.json()
            throw new Error(error.message || 'Upload failed')
          }

          return response.json()
        },
        onSuccess: () => {
          // Invalidate and refetch relevant queries if needed
          queryClient.invalidateQueries({ queryKey: ['uploads'] })
        },
      })

    return (
        <form
            className='grid grid-cols-1 gap-4 p-1'
            onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
            }}
        >
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                <form.Field
                    name="supplierName"
                    children={(field) => (
                        <div className='w-full'>
                            <Label htmlFor='supplierName'>Supplier Name</Label>
                            <Input
                                id='supplierName'
                                type='text'
                                value={field.state.value}
                                onChange={(e) => {field.handleChange(e.target.value)}}
                            />
                        </div>
                    )}
                />
                <form.Field
                    name='registeredEntityName'
                    children={(field) => (
                        <div className='w-full'>
                            <Label htmlFor='registeredEntityName'>Registered Entity Name</Label>
                            <Input
                                id='registeredEntityName'
                                type='text'
                                value={field.state.value}
                                onChange={(e) => {field.handleChange(e.target.value)}}
                            />
                        </div>
                    )}
                />
                <form.Field
                    name='registeredAddress'
                    children={(field) => (
                        <div className='w-full'>
                            <Label htmlFor='registeredAddress'>Registered Address</Label>
                            <Input
                                id='registeredAddress'
                                type='text'
                                value={field.state.value}
                                onChange={(e) => {field.handleChange(e.target.value)}}
                            />
                        </div>
                    )}
                />
                <form.Field
                    name='city'
                    children={(field) => (
                        <div className='w-full'>
                            <Label htmlFor='city'>City</Label>
                            <Input
                                id='city'
                                type='text'
                                value={field.state.value}
                                onChange={(e) => {field.handleChange(e.target.value)}}
                            />
                        </div>
                    )}
                />
                <form.Field
                    name='state'
                    children={(field) => (
                        <div className='w-full'>
                            <Label htmlFor='state'>State</Label>
                            <Input
                                id='state'
                                type='text'
                                value={field.state.value}
                                onChange={(e) => {field.handleChange(e.target.value)}}
                            />
                        </div>
                    )}
                />
                <form.Field
                    name='pincode'
                    children={(field) => (
                        <div className='w-full'>
                            <Label htmlFor='pincode'>Pincode</Label>
                            <Input
                                id='pincode'
                                type='text'
                                value={field.state.value}
                                onChange={(e) => {field.handleChange(e.target.value)}}
                            />
                        </div>
                    )}
                />
                <form.Field
                    name='gstNumber'
                    children={(field) => (
                        <div className='w-full'>
                            <Label htmlFor='gstNumber'>GST Number</Label>
                            <Input
                                id='gstNumber'
                                type='text'
                                value={field.state.value}
                                onChange={(e) => {field.handleChange(e.target.value)}}
                            />
                        </div>
                    )}
                />
                <form.Field
                    name='aadharNumber'
                    children={(field) => (
                        <div className='w-full'>
                            <Label htmlFor='aadharNumber'>Aadhar Number</Label>
                            <Input
                                id='gstNumber'
                                type='text'
                                value={field.state.value}
                                onChange={(e) => {field.handleChange(e.target.value)}}
                            />
                        </div>
                    )}
                />
                <form.Field
                    name='panNumber'
                    children={(field) => (
                        <div className='w-full'>
                            <Label htmlFor='panNumber'>PAN Number</Label>
                            <Input
                                id='gstNumber'
                                type='text'
                                value={field.state.value}
                                onChange={(e) => {field.handleChange(e.target.value)}}
                            />
                        </div>
                    )}
                />
                <form.Field
                    name='gstNumber'
                    children={(field) => (
                        <div className='w-full'>
                            <Label htmlFor='gstStatus'>GST Status</Label>
                            <Select
                                value={field.state.value}
                                onValueChange={field.handleChange}
                            >
                                <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a value" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem key="active" value="active">Active</SelectItem>
                                    <SelectItem key="inactive" value="inactive">Inactive</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    )}
                />
            </div>
            <h2 className='text-lg font-semibold'>Upload Documents</h2>
            <div className='w-full pl-4 flex flex-col gap-4'>
                <form.Field
                    name='gstdoc'
                    children={(field) => (
                        <div className='w-full md:w-2/3 justify-between flex flex-row items-center gap-4'>
                            <Label htmlFor='gstdoc'>GST: </Label>
                            <Input id='gstdoc' type='file' className='w-fit'/>
                        </div>
                    )}
                />
                <form.Field
                    name='aadharDoc'
                    children={(field) => (
                        <div className='w-full md:w-2/3 justify-between flex flex-row items-center gap-4'>
                            <Label htmlFor='aadharDoc'>Aadhar: </Label>
                            <Input id='aadharDoc' type='file'  className='w-fit'/>
                        </div>
                    )}
                />
                <form.Field
                    name='panDoc'
                    children={(field) => (
                        <div className='w-full md:w-2/3 justify-between  flex flex-row items-center gap-4'>
                            <Label htmlFor='panDoc'>PAN: </Label>
                            <Input id='panDoc' type='file'  className='w-fit'/>
                        </div>
                    )}
                />
                <form.Field
                    name='geotaggedGodownImage'
                    children={(field) => (
                        <div className='w-full md:w-2/3 justify-between flex flex-row items-center gap-4'>
                            <Label htmlFor='gstdoc'>Geotagged Image: </Label>
                            <Input id='gstdoc' type='file' onChange={(e) => {field.handleChange(e.target.value)}} className='w-fit'/>
                        </div>
                    )}
                />
            </div>
            <div className='w-full pt-2 flex justify-between gap-4'>
                <Button variant="outline" className='w-1/2' onClick={form.reset}>Reset</Button>
                <Button onClick={form.handleSubmit} className='w-1/2'>Submit</Button>
            </div>
        </form>
    )
};

export default AddSupplierForm;