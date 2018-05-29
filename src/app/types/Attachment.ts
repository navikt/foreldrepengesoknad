export interface Attachment {
    filename: string;
    filesize: number;
    file: File;
    url?: URL;
    pending: boolean;
    uploaded: boolean;
}
