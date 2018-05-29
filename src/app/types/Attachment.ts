export interface Attachment {
    filename: string;
    filesize: number;
    file: File;
    url?: string;
    pending?: boolean;
    uploaded?: boolean;
}
