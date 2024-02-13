export enum FrilansFormField {
    frilansFom = 'frilansFom',
    jobberFremdelesSomFrilanser = 'jobberFremdelesSomFrilanser',
}

export interface FrilansFormData {
    [FrilansFormField.frilansFom]: string;
    [FrilansFormField.jobberFremdelesSomFrilanser]: boolean | undefined;
}
