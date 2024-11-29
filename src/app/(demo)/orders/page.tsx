"use client";

import React from "react";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import SupplierDashboardPage from "./utils/supplier-dashboard-page";

const SupplierPage = (): JSX.Element => {
    return (
        <ContentLayout title="Products">
            <SupplierDashboardPage />
        </ContentLayout>
    );
};

export default SupplierPage;