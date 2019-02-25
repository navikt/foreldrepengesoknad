import { Tilleggsopplysninger, Tilleggsopplysning, Opplysning } from 'app/types/søknad/Søknad';

const tilSaksbehandling = {
    begrunnelseForSenEndring: 'Begrunnelse for å søke om utsettelse',
    'begrunnelseForSenEndring.SYKDOM': 'på grunn av sykdom tilbake i tid',
    'begrunnelseForSenEndring.UTTAK': 'på grunn av uttak mer enn tre måneder tilbake i tid',
    'begrunnelseForSenEndring.SYKDOM_OG_UTTAK':
        'på grunn av sykdom tilbake i tid og uttak mer enn tre måneder tilbake i tid'
};

export interface TilleggsopplysningMedBeskrivelse {
    beskrivelse: string;
    tekst: string;
    ekstraInformasjon: string;
}

export const beskrivTilleggsopplysning = (
    opplysning: Opplysning,
    tilleggsopplysning: Tilleggsopplysning
): TilleggsopplysningMedBeskrivelse => {
    const { tekst, ekstraInformasjon } = tilleggsopplysning;

    const beskrivelseAvOpplysning = tilSaksbehandling[opplysning] || 'Generell opplysning';
    const ekstraInfoTilSaksbehandling = beskrivelseAvOpplysning
        ? tilSaksbehandling[`${opplysning}.${ekstraInformasjon}`]
        : undefined;

    return {
        beskrivelse: beskrivelseAvOpplysning,
        ekstraInformasjon: ekstraInfoTilSaksbehandling,
        tekst
    };
};

const stringifyTilleggsopplysninger = (tilleggsopplysninger: Tilleggsopplysninger): string => {
    const opplysninger = Object.keys(tilleggsopplysninger) as Opplysning[];
    if (opplysninger.length === 0) {
        return '';
    }

    return opplysninger
        .map((opplysningstype) => {
            const opplysning = tilleggsopplysninger[opplysningstype] as Tilleggsopplysning;
            const medBeskrivelse = beskrivTilleggsopplysning(opplysningstype, opplysning);

            if (medBeskrivelse) {
                const tilSaksbehandler =
                    medBeskrivelse.beskrivelse + medBeskrivelse.ekstraInformasjon
                        ? ', ' + medBeskrivelse.ekstraInformasjon
                        : '';

                return `${tilSaksbehandler}: ${medBeskrivelse.tekst}`;
            } else {
                return '';
            }
        })
        .join('\n\n');
};

export default stringifyTilleggsopplysninger;
