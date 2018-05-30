export interface Attachment {
    id: string;
    filename: string;
    filesize: number;
    file: File;
    url?: string;
    pending: boolean;
    uploaded: boolean;
    group?: string;
}
