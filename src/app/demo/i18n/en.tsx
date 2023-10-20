'use client'
import Translation from "@/nextspace/components/Translation";
import transation from "./en.json";

export default function En({ }) {
    return <Translation lang="en" translation={transation} />;
}