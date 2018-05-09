import { getDateFromString } from './dates';
import { Fødselsdato } from '../types/common';

const fødselsdatoerToString = (datoer: Fødselsdato[]): string[] => {
    return datoer.map((dato) => (dato !== undefined ? dato.toISOString() : ''));
};

const fødselsdatoerFromString = (datoer: string[]) => {
    return datoer.map(
        (dato) =>
            dato !== undefined && dato !== ''
                ? getDateFromString(dato)
                : undefined
    );
};

const trimFødselsdatoer = (antall: number, datoer: string[] = []): string[] => {
    let fødselsdatoer: string[] = [...datoer];
    if (datoer.length > antall) {
        fødselsdatoer = datoer.slice(0, antall);
    }
    while (fødselsdatoer.length < antall) {
        fødselsdatoer.push('');
    }
    return fødselsdatoer;
};

export default {
    fødselsdatoerFromString,
    fødselsdatoerToString,
    trimFødselsdatoer
};
