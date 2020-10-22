import { RecursivePartial } from '../types/Partial';
import Søknad, { SøkerRolle, Søkersituasjon } from '../types/søknad/Søknad';
import { Dekningsgrad } from 'common/types';
import { dateToISOString } from '@navikt/sif-common-formik/lib';

const mockSøknad: RecursivePartial<Søknad> = {
    type: 'foreldrepenger',
    annenForelder: {
        kanIkkeOppgis: false,
        fnr: '12345678901',
        fornavn: 'Espen',
        etternavn: 'Gabler',
        harRettPåForeldrepenger: false,
    },
    barn: {
        fødselsdatoer: [dateToISOString(new Date('2018-03-31T00:00:00.000Z'))],
        antallBarn: 1,
        erBarnetFødt: true,
    },
    informasjonOmUtenlandsopphold: {
        tidligereOpphold: [],
        senereOpphold: [],
    },
    søker: {
        andreInntekterSiste10Mnd: [],
        rolle: SøkerRolle.MOR,
        erAleneOmOmsorg: false,
    },
    ekstrainfo: {
        uttaksplanSkjema: {
            startdatoPermisjon: dateToISOString(new Date('2018-03-12T01:00:00.000Z')),
            fellesperiodeukerMor: 8,
            forslagLaget: true,
        },
    },
    harGodkjentVilkår: true,
    harGodkjentOppsummering: false,
    uttaksplan: [],
    situasjon: Søkersituasjon.FØDSEL,
    dekningsgrad: Dekningsgrad.HUNDRE_PROSENT,
};

export default mockSøknad;
