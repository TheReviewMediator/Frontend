import { createContext, useState } from "react";

// GET branding data from backend here

// The default brand context
// Replace defaultBrandImage when we have custom logo handling
// Current iteration is licensed open GPLv3 so we should be fine using it
export const BrandContext = createContext({
    defaultBrandImage: 'https://static-00.iconduck.com/assets.00/avatar-default-icon-494x512-ybacs9gb.png',
    defaultBrandName: "BUSINESS_NAME_HERE"})