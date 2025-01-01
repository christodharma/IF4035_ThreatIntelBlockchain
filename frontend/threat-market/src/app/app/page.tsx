import { Grid2 } from "@mui/material";
import ThreatCard from "../../components/Card";

export default function App() {
    return (
        <Grid2 container spacing={2}>
            <ThreatCard owner={"darmodar"} hash={""} fileCid={"123"} price={1} purchaseCount={1} isVerified={false} isMalware={false} />
            <ThreatCard owner={"darmodar"} hash={""} fileCid={"123"} price={100} purchaseCount={1} isVerified={true} isMalware={false} />
            <ThreatCard owner={"darmodar"} hash={""} fileCid={"123"} price={0} purchaseCount={234} isVerified={false} isMalware={true} />
            <ThreatCard owner={"darmodar"} hash={""} fileCid={"123"} price={0} purchaseCount={0} isVerified={true} isMalware={true} />
            <ThreatCard owner={"darmodar"} hash={""} fileCid={"123"} price={1} purchaseCount={1} isVerified={false} isMalware={false} />
            <ThreatCard owner={"darmodar"} hash={""} fileCid={"123"} price={100} purchaseCount={1} isVerified={true} isMalware={false} />
            <ThreatCard owner={"darmodar"} hash={""} fileCid={"123"} price={0} purchaseCount={234} isVerified={false} isMalware={true} />
        </Grid2>
    )
}