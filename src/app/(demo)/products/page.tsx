"use client";

import React from "react";
import { ProductDashboardComponent } from "@/components/product-dashboard";
import { ContentLayout } from "@/components/admin-panel/content-layout";

const ProductPage = (): JSX.Element => {
    return (
        <ContentLayout title="Products">
            <ProductDashboardComponent />
        </ContentLayout>
    );
};

export default ProductPage;