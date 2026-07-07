import { ReactElement } from 'react';

/**
 * Ein enkeltdags-hendelse, t.d. termindato. Ei hendelse er ikkje ein periode – ho erstattar
 * datonummeret i cella med eit ikon og ein liten tekstlabel.
 */
export type ManedsvisningHendelse = {
    dato: string;
    label: string;
    ikon: ReactElement;
};
