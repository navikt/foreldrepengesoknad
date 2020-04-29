import { Tilleggsopplysninger, Tilleggsopplysning, Opplysning } from 'app/types/søknad/Søknad';
import { IntlShape } from 'react-intl';

const TIL_SAKSBEHANDLER = {
    'tilleggsopplysning.begrunnelseForSenEndring': 'Begrunnelse for å søke om utsettelse',
    'tilleggsopplysning.begrunnelseForSenEndring.SYKDOM': 'på grunn av sykdom tilbake i tid',
    'tilleggsopplysning.begrunnelseForSenEndring.UTTAK': 'på grunn av uttak mer enn tre måneder tilbake i tid',
    'tilleggsopplysning.begrunnelseForSenEndring.SYKDOM_OG_UTTAK':
        'på grunn av sykdom tilbake i tid og uttak mer enn tre måneder tilbake i tid',
};

export interface TilleggsopplysningMedBeskrivelse {
    beskrivelse: string;
    tekst: string;
    ekstraInformasjon?: string;
}

export const beskrivTilleggsopplysning = (
    opplysning: Opplysning,
    tilleggsopplysning: Tilleggsopplysning,
    intl?: IntlShape
): TilleggsopplysningMedBeskrivelse => {
    const { tekst, ekstraInformasjon } = tilleggsopplysning;

    const beskrivelseMessageId = `tilleggsopplysning.${opplysning}`;
    let beskrivelseAvOpplysning = TIL_SAKSBEHANDLER[beskrivelseMessageId];
    if (intl) {
        beskrivelseAvOpplysning = intl.formatMessage({
            id: beskrivelseMessageId,
        });
    }

    const ekstraMessageId = `tilleggsopplysning.${opplysning}.${ekstraInformasjon}`;
    let ekstraInfoTilSaksbehandling = TIL_SAKSBEHANDLER[ekstraMessageId];
    if (intl) {
        ekstraInfoTilSaksbehandling = ekstraInformasjon
            ? intl.formatMessage({
                  id: ekstraMessageId,
              })
            : undefined;
    }

    return {
        beskrivelse: beskrivelseAvOpplysning,
        ekstraInformasjon: ekstraInfoTilSaksbehandling,
        tekst,
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

            let tilSaksbehandler = medBeskrivelse.beskrivelse;
            if (medBeskrivelse.ekstraInformasjon) {
                tilSaksbehandler += ` ${medBeskrivelse.ekstraInformasjon}`;
            }

            return `${tilSaksbehandler}: ${medBeskrivelse.tekst}`;
        })
        .join('\n\n');
};

export default stringifyTilleggsopplysninger;
