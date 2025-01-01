'use client'
import { Threat } from '@/types/Threat';
import { Button, Chip, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'darkgrey',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

interface LearnMoreModalProps {
    open: boolean;
    handleClose: () => void;
    content: Threat;
}

export default function LearnMoreModal({ open, handleClose, content }: LearnMoreModalProps) {

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <Typography variant="h5" component="div">
                    {content.fileCid}
                </Typography>
                <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>{content.owner}</Typography>
                <div style={{ flexDirection: "row" }}>
                    {content.isMalware && <Chip label="Malware" color="error" />}
                    {content.isVerified && <Chip label="Verified" color="success" />}
                </div>
                <div style={{ textAlign: "right" }}>
                    <Typography variant="body2">
                        {content.price} ETH
                    </Typography>
                    <Typography variant="body2">
                        Purchased {content.purchaseCount} time(s)
                    </Typography>
                </div>
                <Button size="small" color="primary">Buy</Button>
            </Box>
        </Modal>
    );
}