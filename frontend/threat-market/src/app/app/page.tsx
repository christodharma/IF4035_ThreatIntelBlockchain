'use client'
import { Threat } from "@/types/Threat";
import { Grid2 } from "@mui/material";
import { useState } from "react";
import ThreatCard from "@/components/Card";
import LearnMoreModal from "@/components/Modal";

export default function App() {
    const noThreatData: Threat = {
        owner: "",
        hash: "",
        fileCid: "",
        price: 0,
        purchaseCount: 0,
        isVerified: false,
        isMalware: false
    }
    const [isModalOpen, setModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState(noThreatData);

    const handleOpenModal = (content: Threat) => {
        setModalContent(content);
        setModalOpen(true);
    };

    const handleCloseModal = () => setModalOpen(false);
    const threats = [
        {
            owner: "darmodar",
            hash: "hash1",
            fileCid: "123",
            price: 1,
            purchaseCount: 5,
            isVerified: true,
            isMalware: false,
        },
        {
            owner: "johndoe",
            hash: "hash2",
            fileCid: "456",
            price: 2,
            purchaseCount: 10,
            isVerified: false,
            isMalware: true,
        },
        {
            owner: "janedoe",
            hash: "hash3",
            fileCid: "789",
            price: 1.5,
            purchaseCount: 3,
            isVerified: true,
            isMalware: true,
        },
        {
            owner: "darmodar",
            hash: "hash1",
            fileCid: "123",
            price: 1,
            purchaseCount: 5,
            isVerified: true,
            isMalware: false,
        },
        {
            owner: "christodharma",
            hash: "hash2",
            fileCid: "456",
            price: 2,
            purchaseCount: 10,
            isVerified: false,
            isMalware: true,
        },
        {
            owner: "msfir",
            hash: "hash3",
            fileCid: "789",
            price: 1.5,
            purchaseCount: 3,
            isVerified: true,
            isMalware: true,
        },
        {
            owner: "darmodar",
            hash: "hash1",
            fileCid: "123",
            price: 1,
            purchaseCount: 5,
            isVerified: false,
            isMalware: false,
        }
    ];
    return (
        <>
            <Grid2 container spacing={2}>
                {threats.map((threat, index) => (
                    <ThreatCard
                        key={index}
                        threat={threat}
                        onLearnMore={() => handleOpenModal(threat)}
                    />
                ))}
            </Grid2>
            <LearnMoreModal open={isModalOpen} content={modalContent} handleClose={handleCloseModal} />
        </>
    )
}