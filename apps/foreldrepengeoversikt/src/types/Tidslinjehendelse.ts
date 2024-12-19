import { AktørType } from './AktørType';
import { Dokument } from './Dokument';
import { TidslinjehendelseType } from './TidslinjehendelseType';

export interface Tidslinjehendelse {
    type: string;
    opprettet: string;
    aktørType: AktørType;
    tidslinjeHendelseType: TidslinjehendelseType;
    dokumenter: Dokument[];
    manglendeVedlegg: Dokument[];
    merInformasjon?: string;
    linkTittel?: string;
    eksternalUrl?: string;
    internalUrl?: string;
    tidligstBehandlingsDato?: string;
}
