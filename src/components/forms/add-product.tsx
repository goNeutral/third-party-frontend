import React, { useState } from 'react';
import { useForm } from '@tanstack/react-form';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import {createProductMutation} from "@/hooks/products";
// import { toast } from 'sonner';


const AddProductForm = ({setIsAddingProduct, productList,successCallBack}: { setIsAddingProduct: any, productList: any,successCallBack:any }): JSX.Element => {
    const [preview, setPreview] = useState<string | null>(null)
    const {mutate:createProduct} = createProductMutation(
        (res:any) => {
            // toast.success("Product Created Successfully");
            alert("Product Created Successfully");
            // productList();
            // setIsAddingProduct(false);
            successCallBack()
        },
        (err:any) => {
          console.error("Product Creation Error:", err);
        }
    );
    

  
    const form = useForm({
      
        defaultValues: {
            name: '',
            hsnCode: '',
            cgst: '',
            sgst: '',
            igst: '',
            image: null,
        },
    });
    const onSubmit = () => {
        
        console.log("Form Values:",form.getFieldValue('name'));
        const formData = new FormData();
        formData.append('name', form.getFieldValue('name'));
        formData.append('hsn', form.getFieldValue('hsnCode'));
        formData.append('cgst', form.getFieldValue('cgst'));
        formData.append('sgst', form.getFieldValue('sgst'));
        formData.append('igst', form.getFieldValue('igst'));
        formData.append('photo', form.getFieldValue('image') || '');
        createProduct(formData);
    }

   

    return (
        <form
            className='flex flex-col gap-4'
            onSubmit={(e) => {
                e.preventDefault();
                // form.handleSubmit();
                e.stopPropagation();
            }}
        >
            <form.Field
                name="name"
                children={(field) => (
                    <div className='w-full'>
                        <Label htmlFor='name'>Name</Label>
                        <Input
                            id='name'
                            type='text'
                            value={field.state.value}
                            onChange={(e) => {field.handleChange(e.target.value)}}
                        />
                    </div>
                )}
            />
            <form.Field
                name='hsnCode'
                children={(field) => (
                    <div className='w-full'>
                        <Label htmlFor='hsnCode'>HSN Code</Label>
                        <Input
                            id='hsnCode'
                            type='text'
                            value={field.state.value}
                            onChange={(e) => {field.handleChange(e.target.value)}}
                        />
                    </div>
                )}
            />
            <form.Field
                name='cgst'
                children={(field) => (
                    <div className='w-full'>
                        <Label htmlFor='cgst'>CGST</Label>
                        <Input
                            id='CGST'
                            type='text'
                            value={field.state.value}
                            onChange={(e) => {field.handleChange(e.target.value)}}
                        />
                    </div>
                )}
            />
            <form.Field
                name='sgst'
                children={(field) => (
                    <div className='w-full'>
                        <Label htmlFor='sgst'>SGST</Label>
                        <Input
                            id='SGST'
                            type='text'
                            value={field.state.value}
                            onChange={(e) => {field.handleChange(e.target.value)}}
                        />
                    </div>
                )}
            />
            <form.Field
                name='igst'
                children={(field) => (
                    <div className='w-full'>
                        <Label htmlFor='cgst'>IGST</Label>
                        <Input
                            id='IGST'
                            type='text'
                            value={field.state.value}
                            onChange={(e) => {field.handleChange(e.target.value)}}
                        />
                    </div>
                )}
            />
            <form.Field
                name='image'
                validators={{
                    onChange: (value) => {
                        const file = value?.[0]
                        if (!file) return 'File is required'
                        if (file.size > 5 * 1024 * 1024) return 'File must be less than 5MB'
                        return undefined
                    },
                }}
                >
                {(field) => (
                    <div>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                        <input
                        type="file"
                        onChange={(e) => {
                            field.handleChange(e.target.files?.[0])
                            // Create preview for image files
                                const file = e.target.files?.[0]
                                if (file !== null && file !== undefined && file.type.startsWith('image/')) {
                                const reader = new FileReader()
                                reader.onload = (e) => {setPreview(e.target?.result as string)}
                                reader.readAsDataURL(file)
                            } else {
                                setPreview(null)
                            }
                        }}
                        className="block w-full text-sm text-gray-500
                            file:mr-4 file:py-2 file:px-4
                            file:rounded-full file:border-0
                            file:text-sm file:font-semibold
                            file:bg-blue-50 file:text-blue-700
                            hover:file:bg-blue-100"
                        />
                    </div>
                    {field.state.meta.errors.length > 0 && (
                        <div className="text-sm text-red-500 mt-1">
                        {field.state.meta.errors.join(', ')}
                        </div>
                    )}
                    </div>
                )}
            </form.Field>
            {preview && (
                <div className="mt-4">
                    <img
                    src={preview}
                    alt="Preview"
                    className="max-w-full h-auto rounded-lg"
                    />
                </div>
            )}
            <div className='w-full pt-2 flex justify-between gap-4'>
                <Button variant="outline" className='w-1/2' onClick={form.reset}>Reset</Button>
                <Button onClick={()=>{ onSubmit()}} className='w-1/2'>Submit</Button>
            </div>
        </form>
    )
};

export default AddProductForm;