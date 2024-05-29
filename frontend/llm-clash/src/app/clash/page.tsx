"use client";

import ClashInterface from "@/components/ClashInterface";
import { ClashSessionProvider } from "@/context/ClashSessionContext";
import React from "react";

const Clash: React.FC = () => {
    return (
        <ClashSessionProvider>
            <ClashInterface />
        </ClashSessionProvider>
    );
}

export default Clash;
