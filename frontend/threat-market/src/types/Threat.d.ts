export type Threat = {
    owner: string;
    hash: string;
    fileCid: string;
    price: number;
    purchaseCount: number;
    isVerified: boolean;
    isMalware: boolean;
}
