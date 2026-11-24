import { SøknadRoutes } from 'appData/routes';
import { FpMellomlagretData } from 'appData/useMellomlagreSøknad';
import { VERSJON_MELLOMLAGRING } from 'utils/mellomlagringUtils';

import { BarnType } from '@navikt/fp-constants';
import { notEmpty } from '@navikt/fp-validation';

import { saker } from './saker';
import { søkerinfo } from './søkerinfo';

export const mellomlagretSøknad = {
    version: VERSJON_MELLOMLAGRING,
    søkerInfo: søkerinfo,
    foreldrepengerSaker: saker.foreldrepenger,
    erEndringssøknad: false,
    søknadGjelderEtNyttBarn: true,
    APP_ROUTE: SøknadRoutes.OM_BARNET,
    SØKERSITUASJON: { situasjon: 'fødsel', rolle: 'far' },
    OM_BARNET: {
        type: BarnType.FØDT,
        antallBarn: 1,
        fødselsdatoer: ['2025-05-05'],
        termindato: '2025-05-02',
    },
    ANNEN_FORELDER: { kanIkkeOppgis: true },
    ARBEIDSFORHOLD_OG_INNTEKT: {
        harJobbetSomFrilans: false,
        harJobbetSomSelvstendigNæringsdrivende: false,
    },
    UTENLANDSOPPHOLD: {
        harBoddUtenforNorgeSiste12Mnd: false,
        skalBoUtenforNorgeNeste12Mnd: false,
    },
    PERIODE_MED_FORELDREPENGER: '80',
    UTTAKSPLAN: [
        {
            fom: '2025-05-05',
            tom: '2025-05-16',
            søker: {
                kontoType: 'FORELDREPENGER',
                forelder: 'FAR_MEDMOR',
                flerbarnsdager: false,
            },
        },
    ],
} satisfies FpMellomlagretData;

export const mellomlagretEndringssøknad = {
    ...mellomlagretSøknad,
    erEndringssøknad: true,
    søknadGjelderEtNyttBarn: false,
    APP_ROUTE: SøknadRoutes.UTTAKSPLAN,
    VALGT_EKSISTERENDE_SAKSNR: notEmpty(saker.foreldrepenger[0]).saksnummer,
    OPPRINNELIG_UTTAKSPLAN: {
        saksnummer: notEmpty(saker.foreldrepenger[0]).saksnummer,
        perioder: mellomlagretSøknad.UTTAKSPLAN,
    },
} satisfies FpMellomlagretData;
