export interface RequestReceived {
    id: number;
    method: string;
    url: string;
    status: number;
    elapsed: number;
    date: Date;
}