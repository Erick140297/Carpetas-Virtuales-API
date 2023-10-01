export enum Status {
  PENDING = "En revisión...",
  APPROVED = "Revisado y aprovado",
  CANCELED = "Revisado y cancelado"
}


export interface File {
  name: string;
  date: Date;
  reviewedBy: string;
  observations: string;
  key: string;
  status: Status;
}
