import { IntlShape } from 'react-intl';

import { UttaksperiodeValidatorer } from '../../utils/UttaksperiodeValidatorer';
import { ValideringInput, Valideringsområde } from './types';

type FlerbarnsdagerFørFødselKontekst = Pick<ValideringInput, 'perioder' | 'familiehendelsedato'>;

export const lagFlerbarnsdagerFørFødselOmråde = (
    intl: IntlShape,
): Valideringsområde<FlerbarnsdagerFørFødselKontekst> => ({
    id: 'flerbarnsdagerFørFødsel',
    område: 'Flerbarnsdager før fødsel',
    beskrivelse:
        'Far/medmor kan ikke bruke flerbarnsdager før fødselsdatoen, eller termindatoen hvis barnet ikke er født. ' +
        'Gjelder også når begge foreldre er valgt, eller valget av flerbarnsdager er skjult etter en datoendring. ' +
        'Gjelder ikke mor alene eller adopsjon.',
    byggKontekst: ({ formValues, familiesituasjon, perioder, familiehendelsedato }) => {
        if (
            familiesituasjon === 'adopsjon' ||
            (formValues.forelder !== 'FAR_MEDMOR' && formValues.forelder !== 'BEGGE') ||
            formValues.ønskerFlerbarnsdager !== true
        ) {
            return null;
        }
        return { perioder, familiehendelsedato };
    },
    regler: [
        {
            id: 'flerbarnsdagerFørFødsel.kanIkkeStarteFørFamiliehendelsen',
            beskrivelse:
                'Ingen valgte perioder med flerbarnsdager kan starte før familiehendelsesdatoen. ' +
                'Også perioder som krysser datoen, og flervalg med én periode før datoen, avvises.',
            erBrutt: (k) =>
                UttaksperiodeValidatorer.erNoenPerioderFørFamiliehendelsesdato(k.perioder, k.familiehendelsedato),
            feilmelding: intl.formatMessage({
                id: 'LeggTilEllerEndrePeriodeForm.FlerbarnsdagerFørFødsel',
            }),
        },
    ],
});
