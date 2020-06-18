import { Kjønn } from '../../../types/common';
import Person, { RegistrertAnnenForelder } from '../../../types/Person';
import { Søkerinfo } from '../../../types/søkerinfo';
import AnnenForelder from '../../../types/søknad/AnnenForelder';
import Søknad, { SøknadPartial, SøkerRolle, Søkersituasjon } from '../../../types/søknad/Søknad';
import { cleanupAnnenForelder, cleanupAnnenForelderBarn } from '../cleanupAnnenForelderSteg';

import {
    getAnnenForelderStegVisibility,
    AnnenForelderStegVisibility,
    AnnenForelderSpørsmålKeys,
} from '../../../steg/annenForelder/visibility/annenForelderStegVisibility';
import { Barn, ForeldreansvarBarn } from '../../../types/søknad/Barn';

const annenForelder: AnnenForelder = {
    bostedsland: 'landet',
    erForSyk: false,
    erUfør: false,
    erInformertOmSøknaden: false,
    fnr: '123',
    harRettPåForeldrepenger: false,
    kanIkkeOppgis: false,
    fornavn: 'fornavnet',
    etternavn: 'etternavnet',
    utenlandskFnr: false,
};

const registrertAnnenForelder: RegistrertAnnenForelder = {
    fnr: '123',
    etternavn: 'etternavnet',
    fornavn: 'fornavnet',
    fødselsdato: new Date(),
    harOpplystOmSinPågåendeSak: false,
};

const søknad: SøknadPartial = {
    type: 'foreldrepenger',
    annenForelder,
    barn: {
        fødselsdatoer: [],
        foreldreansvarsdato: new Date(),
    },
    informasjonOmUtenlandsopphold: {
        tidligereOpphold: [],
        senereOpphold: [],
    },
    søker: {
        rolle: SøkerRolle.MOR,
        erAleneOmOmsorg: false,
        andreInntekterSiste10Mnd: [],
    },
    situasjon: Søkersituasjon.FØDSEL,
    uttaksplan: [],
    harGodkjentVilkår: false,
    harGodkjentOppsummering: false,
    sensitivInfoIkkeLagre: {
        registrertAnnenForelder,
    },
    vedleggForSenEndring: undefined,
    tilleggsopplysninger: {},
    ekstrainfo: {
        uttaksplanSkjema: {},
        currentStegID: undefined,
        søknadenGjelderBarnValg: {
            valgteBarn: [],
            gjelderAnnetBarn: undefined,
        },
        erEnkelEndringssøknad: false,
    },
};

const kvinnePerson: Person = {
    fnr: '123',
    ikkeNordiskEøsLand: false,
    erMyndig: true,
    fornavn: 'fornavnet',
    etternavn: 'etternavnet',
    fødselsdato: new Date(2000, 1, 1),
    kjønn: Kjønn.KVINNE,
};

const søkerinfo: Søkerinfo = {
    person: kvinnePerson,
    arbeidsforhold: [],
    registrerteBarn: [],
};

const propsSetOutsideSteg: string[] = ['erForSyk'];

const hasOnlyIncludedProps = (annenForelderProps: Partial<AnnenForelder>, propsToInclude: string[]): boolean => {
    const props = Object.getOwnPropertyNames(annenForelderProps);
    const propsWithValue = props.filter((p) => annenForelderProps[p] !== undefined);
    return JSON.stringify(propsToInclude.sort()) === JSON.stringify(propsWithValue.sort());
};

let testSøknad: SøknadPartial;
let testVisibility: AnnenForelderStegVisibility;

describe('Cleanup AnnenForelder', () => {
    testSøknad = { ...søknad };

    describe('Annen forelder kan ikke oppgis', () => {
        beforeEach(() => {
            testSøknad = { ...søknad };
        });
        it('Cleans everything when annen forelder kan ikke oppgis', () => {
            testSøknad = { ...søknad, annenForelder: { ...testSøknad.annenForelder, kanIkkeOppgis: true } };
            testVisibility = getAnnenForelderStegVisibility(testSøknad as Søknad, søkerinfo)!;
            const af: AnnenForelder = cleanupAnnenForelder(testVisibility, testSøknad as Søknad) as AnnenForelder;
            expect(
                hasOnlyIncludedProps(af, [AnnenForelderSpørsmålKeys.kanIkkeOppgis, ...propsSetOutsideSteg])
            ).toBeTruthy();
        });
        describe('Cleans data when erAleneomsorg', () => {
            beforeEach(() => {
                testSøknad = {
                    ...søknad,
                    annenForelder: { ...testSøknad.annenForelder, kanIkkeOppgis: false },
                    søker: {
                        ...søknad.søker,
                        erAleneOmOmsorg: true,
                    },
                    barn: {
                        ...søknad.barn,
                        datoForAleneomsorg: new Date(),
                    },
                };
            });
            it('when erFarEllerMedmor', () => {
                testSøknad.søker.rolle = SøkerRolle.FAR;
                testVisibility = getAnnenForelderStegVisibility(testSøknad as Søknad, {
                    ...søkerinfo,
                    person: { ...søkerinfo.person, kjønn: Kjønn.MANN },
                })!;
                const af: AnnenForelder = cleanupAnnenForelder(testVisibility, testSøknad as Søknad) as AnnenForelder;
                const b: Barn = cleanupAnnenForelderBarn(
                    testVisibility,
                    testSøknad.barn as ForeldreansvarBarn
                ) as ForeldreansvarBarn;
                expect(af.harRettPåForeldrepenger).toBeUndefined();
                expect(af.erUfør).toBeUndefined();
                expect(af.erInformertOmSøknaden).toBeUndefined();
                expect(b.datoForAleneomsorg).toBeDefined();
            });
            it('when er mor', () => {
                testVisibility = getAnnenForelderStegVisibility(testSøknad as Søknad, {
                    ...søkerinfo,
                    person: { ...søkerinfo.person, kjønn: Kjønn.KVINNE },
                })!;
                const af: AnnenForelder = cleanupAnnenForelder(testVisibility, testSøknad as Søknad) as AnnenForelder;
                const b: Barn = cleanupAnnenForelderBarn(
                    testVisibility,
                    testSøknad.barn as ForeldreansvarBarn
                ) as ForeldreansvarBarn;
                expect(af.erUfør).toBeUndefined();
                expect(af.erInformertOmSøknaden).toBeUndefined();
                expect(af.harRettPåForeldrepenger).toBeUndefined();
                expect(b.datoForAleneomsorg).toBeUndefined();
            });
        });
    });
});
