'use client'
import { Threat } from "@/types/Threat";
import { Button, Card, CardActions, CardContent, Chip, Typography } from "@mui/material";

interface ThreatCardProps {
    threat: Threat;
    onLearnMore: () => void;
}

export default function ThreatCard({ threat, onLearnMore }: ThreatCardProps) {
    return (
        <>
            <Card sx={{ minWidth: 275 }}>
                <CardContent sx={{ minHeight: 130 }}>
                    <Typography variant="h5" component="div">
                        {threat.fileCid}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>{threat.owner}</Typography>
                    <div style={{ flexDirection: "row" }}>
                        {threat.isMalware && <Chip label="Malware" color="error" />}
                        {threat.isVerified && <Chip label="Verified" color="success" />}
                    </div>
                </CardContent>
                <CardActions sx={{ justifyContent: "space-between" }}>
                    <Button size="small" onClick={onLearnMore}>Learn More</Button>
                    <div style={{ textAlign: "right" }}>
                        <Typography variant="body2">
                            {threat.price} ETH
                        </Typography>
                        <Typography variant="body2">
                            Purchased {threat.purchaseCount} time(s)
                        </Typography>
                    </div>
                </CardActions>
            </Card>
        </>
    );
}