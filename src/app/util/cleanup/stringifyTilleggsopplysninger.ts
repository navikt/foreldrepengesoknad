import { Tilleggsopplysninger } from 'app/types/søknad/Søknad';

const tilSaksbehandling = {
    begrunnelseForSenEndring: 'Begrunnelse for å søke om utsettelse',
    'begrunnelseForSenEndring.SYKDOM': 'på grunn av sykdom tilbake i tid',
    'begrunnelseForSenEndring.UTTAK': 'på grunn av uttak mer enn tre måneder tilbake i tid',
    'begrunnelseForSenEndring.SYKDOM_OG_UTTAK':
        'på grunn av sykdom tilbake i tid og uttak mer enn tre måneder tilbake i tid'
};

const stringifyTilleggsopplysninger = (tilleggsopplysninger: Tilleggsopplysninger): string | undefined => {
    const opplysninger = Object.keys(tilleggsopplysninger);
    if (opplysninger.length < 0) {
        return undefined;
    }

    return opplysninger
        .map((opplysningKey) => {
            const { tekst, ekstraInformasjon } = tilleggsopplysninger[opplysningKey];
            const beskrivelseAvOpplysning = tilSaksbehandling[opplysningKey];

            let beskrivelseTilSaksbehandling = 'Generell opplysning';
            if (beskrivelseAvOpplysning) {
                const ekstraInfoTilSaksbehandling = tilSaksbehandling[`${opplysningKey}.${ekstraInformasjon}`];

                beskrivelseTilSaksbehandling = ekstraInfoTilSaksbehandling
                    ? `${beskrivelseAvOpplysning}, ${ekstraInfoTilSaksbehandling}`
                    : beskrivelseAvOpplysning;
            }

            return `${beskrivelseTilSaksbehandling}: ${tekst}`;
        })
        .join('\n\n');
};

export default stringifyTilleggsopplysninger;
