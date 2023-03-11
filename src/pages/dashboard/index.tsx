import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { auth, db } from "@/libs/firebase";
import MainLayout from "@/layouts/MainLayout";
import BlogCard from "@/components/BlogCard";
import CreateNewButton from "@/components/CreateNewButton";
import Modal from "@/components/Modal";
import Button from "@/components/Button";
import {
    doc,
    getDoc,
    getDocs,
    query,
    setDoc,
    where,
    collection,
} from "firebase/firestore";
import Link from "next/link";

type Props = {};

function Dashboard({}: Props) {
    const router = useRouter();

    return (
        <MainLayout>
            <div className="p-4 flex gap-4 flex-wrap content-start">
                Under Construction
            </div>
        </MainLayout>
    );
}

export default Dashboard;
