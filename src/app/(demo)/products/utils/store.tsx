import { atom } from "jotai";
import { atomWithQuery } from "jotai-tanstack-query";
import { type Product } from "./types";

export const ProductListAtom = atom<Product[]>([{
    id: 1,
    name: 'Product 1',
    hsnCode: '1234',
    image: 'https://png.pngtree.com/png-clipart/20241009/original/pngtree-seamless-pattern-with-cute-cartoon-bottle-png-image_16254404.png',
    cgst: '5%',
    sgst: '5%',
    igst: '5%'
}]);


export const productsQueryAtom = atomWithQuery((get) => ({
    queryKey: ['products'],
    queryFn: async () => {
        const response = await fetch('https://run.mocky.io/v3/6a5464fc-ba61-4100-8950-202f380de9e8')
        if (!response.ok) {
            throw new Error('Network response was not ok')
        }
        const result = await response.json() as { data: Product[] }
        return result.data
    },
}))
