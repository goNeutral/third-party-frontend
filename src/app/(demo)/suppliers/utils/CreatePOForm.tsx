"use client"
import React, {
  useState
} from "react"
import {
  toast
} from "sonner"
import {
  useForm
} from "react-hook-form"
import {
  zodResolver
} from "@hookform/resolvers/zod"
import * as z from "zod"
import {
  Button
} from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"
import {
  Input
} from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Table, TableBody, TableFooter, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import POFormProductForm from "./POFormProductForm"

const formSchema = z.object({
  supplier: z.string(),
  shipTo: z.string(),
  deliveryTerms: z.number(),
  paymentTerms: z.number(),
  deliveryMode: z.string(),
  termsAndConditions: z.string(),
  remarks: z.string(),
  comments: z.string()
});

export interface ProductCell {
  id: number,
  name: string,
  hsnCode: string,
  quantity: number,
  uom: string,
  rate: number,
  amount: number,
  discount: number,
  netAmount: number,
  cgst: number,
  sgst: number,
  igst: number
}

export default function CreatePOForm(): JSX.Element {
  const [products, setProducts] = useState<ProductCell[]>([
    {
      id: 1,
      name: "Product 1",
      hsnCode: "90786875",
      quantity: 10,
      uom: "pcs",
      rate: 100,
      amount: 1000,
      discount: 0,
      netAmount: 1000,
      cgst: 2,
      sgst: 2.5,
      igst: 3
    },
  ])

  const defaultTerms = `Point 1: First term of delivery
	Point 2: Second term of delivery
	Point 3: Third term of delivery
	Point 4: Fourth term of delivery`

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),

  })

  function onSubmit(values: z.infer<typeof formSchema>): void {
    try {
      console.log(values);
      toast(
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(values, null, 2)}</code>
        </pre>
      );
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="p-2 grid grid-cols-3 gap-2 ">
          <FormField
            control={form.control}
            name="supplier"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Supplier</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select supplier" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="m@example.com">m@example.com</SelectItem>
                    <SelectItem value="m@google.com">m@google.com</SelectItem>
                    <SelectItem value="m@support.com">m@support.com</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="shipTo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ship To</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select customer" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="m@example.com">m@example.com</SelectItem>
                    <SelectItem value="m@google.com">m@google.com</SelectItem>
                    <SelectItem value="m@support.com">m@support.com</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="deliveryTerms"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Delivery Terms</FormLabel>
                <FormControl>
                  <Input
                    placeholder="in days"
                    type="number"
                    {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="paymentTerms"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Payment Terms</FormLabel>
                <FormControl>
                  <Input
                    placeholder="in days"
                    type="number"
                    {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="deliveryMode"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mode of Delivery</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="m@example.com">m@example.com</SelectItem>
                    <SelectItem value="m@google.com">m@google.com</SelectItem>
                    <SelectItem value="m@support.com">m@support.com</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <POFormProductForm products={products} setProducts={setProducts} />
          <FormField
            name="termsAndConditions"
            control={form.control}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Terms Ans Conditions</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    rows={8}
                    className="w-full p-2 border rounded"
                    defaultValue={defaultTerms}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="remarks"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Remarks</FormLabel>
                <FormControl>
                  <Input
                    placeholder=""
                    type=""
                    {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="comments"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Comments</FormLabel>
                <FormControl>
                  <Input
                    placeholder=""
                    type=""
                    {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="col-span-3" type="submit">Submit</Button>
        </form>
      </Form>
    </div>
  )
}