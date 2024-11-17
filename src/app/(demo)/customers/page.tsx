"use client";

import React from "react";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import CustomerDashboardPage from "./utils/customer-dashboard-page";

const SupplierPage = (): JSX.Element => {
    return (
        <ContentLayout title="Products">
            <CustomerDashboardPage />
        </ContentLayout>
    );
};

export default SupplierPage;