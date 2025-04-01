import { createContext, useState } from "react";
import default_profile_image from '../assets/default-profile-image-TEMP.png';

// GET branding data from backend here

// The default brand context
export const BrandContext = createContext({
    defaultBrandImage: default_profile_image,
    defaultBrandName: "BUSINESS_NAME_HERE"})