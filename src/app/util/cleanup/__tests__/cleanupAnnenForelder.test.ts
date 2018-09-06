import { Kjønn } from '../../../types/common';
import Person, { RegistrertAnnenForelder } from '../../../types/Person';
import { Søkerinfo } from '../../../types/søkerinfo';
import AnnenForelder from '../../../types/søknad/AnnenForelder';
import Søknad, { SøknadPartial } from '../../../types/søknad/Søknad';
import { cleanupAnnenForelder } from '../cleanupAnnenForelderSteg';

import {
    getAnnenForelderVisibility,
    AnnenForelderStegVisibility
} from '../../../connected-components/steg/annen-forelder/visibility/annenForelderVisibility';

const annenForelder: AnnenForelder = {
    bostedsland: 'landet',
    erForSyk: false,
    erUfør: false,
    erInformertOmSøknaden: false,
    fnr: '123',
    harRettPåForeldrepenger: false,
    kanIkkeOppgis: false,
    navn: 'navnet',
    skalHaForeldrepenger: false,
    utenlandskFnr: false
};

const registrertAnnenForelder: RegistrertAnnenForelder = {
    fnr: '123',
    etternavn: 'etternavnet',
    fornavn: 'fornavnet',
    fødselsdato: new Date(),
    harOpplystOmSinPågåendeSak: false,
    kjønn: Kjønn.MANN
};

const søknad: SøknadPartial = {
    type: 'foreldrepenger',
    annenForelder,
    barn: {
        fødselsdatoer: [],
        omsorgsovertakelse: new Date()
    },
    informasjonOmUtenlandsopphold: {
        tidligereOpphold: [],
        senereOpphold: []
    },
    søker: {
        erAleneOmOmsorg: false,
        andreInntekterSiste10Mnd: []
    },
    harGodkjentVilkår: false,
    harGodkjentOppsummering: false,
    temp: {
        søknadenGjelderBarnValg: {
            valgteBarn: [],
            gjelderAnnetBarn: undefined
        },
        registrertAnnenForelder
    },
    uttaksplan: []
};

const kvinnePerson: Person = {
    fnr: '123',
    ikkeNordiskEøsLand: false,
    erMyndig: true,
    fornavn: 'fornavnet',
    etternavn: 'etternavnet',
    fødselsdato: new Date(2000, 1, 1),
    kjønn: Kjønn.KVINNE
};

const søkerinfo: Søkerinfo = {
    person: kvinnePerson,
    arbeidsforhold: [],
    registrerteBarn: []
};

const hasOnlyIncludedProps = (
    annenForelderProps: Partial<AnnenForelder>,
    propsToInclude: Partial<AnnenForelder>
): boolean => {
    const props = Object.getOwnPropertyNames(annenForelderProps);
    return (
        props.find((prop) => {
            const shouldBeIncluded =
                Object.keys(propsToInclude).find((includedProp) => includedProp === prop) !== undefined;
            if (shouldBeIncluded) {
                return false;
            }
            return annenForelderProps[prop] !== undefined;
        }) === undefined
    );
};

const visibility = getAnnenForelderVisibility(søknad as Søknad, søkerinfo)!;

const runCleanUpAnnenForelder = (
    s: SøknadPartial,
    visibilityPartial?: AnnenForelderStegVisibility
): Partial<AnnenForelder> => {
    return cleanupAnnenForelder(visibilityPartial ? { ...visibility, ...visibilityPartial } : visibility, s as Søknad);
};

const testSøknad: SøknadPartial = {
    ...søknad
};

describe('Cleanup søknad.annenForelder', () => {
    const propsSetOutsideSteg: Partial<AnnenForelder> = { erForSyk: false };

    it('should not set any data when annenForelderKanIkkeOppgis is true', () => {
        const testVis: AnnenForelderStegVisibility = {
            ...visibility,
            personalia: {
                ...visibility.personalia,
                annenForelderKanIkkeOppgisValg: true
            }
        };
        const res = runCleanUpAnnenForelder(
            {
                ...testSøknad,
                annenForelder: {
                    ...testSøknad.annenForelder,
                    kanIkkeOppgis: true
                }
            },
            testVis
        );
        expect(hasOnlyIncludedProps(res, { kanIkkeOppgis: true, ...propsSetOutsideSteg })).toBeTruthy();
        expect(res.kanIkkeOppgis).toBeTruthy();
    });

    // describe('Situation: fødsel, role: mor, registrert barn, registrert annen forelder', () => {
    //     describe('when aleneomsorg: true', () => {
    //         beforeEach(() => {
    //             testSøknad = {
    //                 ...søknad,
    //                 søker: {
    //                     ...søknad.søker,
    //                     erAleneOmOmsorg: true
    //                 }
    //             };
    //         });
    //         it('far skal ikke ha foreldrepenger', () => {
    //             expect(
    //                 hasOnlyIncludedPropsSet(runCleanUpSøknad(testSøknad), [
    //                     'fnr',
    //                     'navn',
    //                     'skalHaForeldrepenger',
    //                     ...propsOutsideSteg
    //                 ])
    //             ).toBeTruthy();
    //         });
    //         it('far skal ha foreldrepenger', () => {
    //             testSøknad = {
    //                 ...testSøknad,
    //                 annenForelder: {
    //                     ...testSøknad.annenForelder,
    //                     skalHaForeldrepenger: true
    //                 }
    //             };
    //             expect(
    //                 hasOnlyIncludedPropsSet(runCleanUpSøknad(testSøknad), [
    //                     'fnr',
    //                     'navn',
    //                     'skalHaForeldrepenger',
    //                     'harRettPåForeldrepenger',
    //                     ...propsOutsideSteg
    //                 ])
    //             ).toBeTruthy();
    //         });
    //     });

    //     describe('when aleneomsorg: false', () => {
    //         beforeEach(() => {
    //             testSøknad = {
    //                 ...søknad,
    //                 søker: {
    //                     ...søknad.søker,
    //                     erAleneOmOmsorg: false
    //                 }
    //             };
    //         });
    //         it('far HAR IKKE rett på foreldrepenger', () => {
    //             expect(
    //                 hasOnlyIncludedPropsSet(runCleanUpSøknad(testSøknad), [
    //                     'fnr',
    //                     'navn',
    //                     'harRettPåForeldrepenger',
    //                     ...propsOutsideSteg
    //                 ])
    //             ).toBeTruthy();
    //         });
    //         it('far HAR rett på foreldrepenger', () => {
    //             testSøknad = {
    //                 ...testSøknad,
    //                 annenForelder: {
    //                     ...testSøknad.annenForelder,
    //                     harRettPåForeldrepenger: true
    //                 }
    //             };
    //             expect(
    //                 hasOnlyIncludedPropsSet(runCleanUpSøknad(testSøknad), [
    //                     'fnr',
    //                     'navn',
    //                     'harRettPåForeldrepenger',
    //                     'erInformertOmSøknaden',
    //                     ...propsOutsideSteg
    //                 ])
    //             ).toBeTruthy();
    //         });
    //     });
    // });
    // describe('AnnenForelder personalia', () => {
    //     beforeEach(() => {
    //         testSøknad = {
    //             ...søknad,
    //             temp: {
    //                 ...testSøknad.temp,
    //                 søknadenGjelderBarnValg: {
    //                     ...testSøknad.temp.søknadenGjelderBarnValg,
    //                     gjelderAnnetBarn: true
    //                 }
    //             }
    //         };
    //     });
    //     it('Beholder kun kanIkkeOppgis når søker ikke kan oppgi annen forelder', () => {
    //         testSøknad.annenForelder.kanIkkeOppgis = true;
    //         expect(
    //             hasOnlyIncludedPropsSet(runCleanUpSøknad(testSøknad), ['kanIkkeOppgis', ...propsOutsideSteg])
    //         ).toBeTruthy();
    //     });
    // });
});

// describe('Cleanup søknad.annenForelder barn modifications', () => {
//     beforeEach(() => {
//         testSøknad = {
//             ...søknad,
//             søker: {
//                 ...søknad.søker,
//                 rolle: SøkerRolle.FAR
//             }
//         };
//     });
//     it('should not keep omsorgsovertakelseDato when omsorgsovertakelseDatoSpørsmål is hidden (!farEllerMedmorBolk is visible)', () => {
//         const søkerinfoPartial = {
//             ...søkerinfo,
//             person: {
//                 ...søkerinfo.person,
//                 kjønn: Kjønn.KVINNE
//             }
//         };
//         const vis = getAnnenForelderVisibility(testSøknad as Søknad, søkerinfoPartial);
//         const cleanedBarn = cleanupAnnenForelderBarn(testSøknad as Søknad, søkerinfoPartial) as ForeldreansvarBarn;
//         // expect(cleanedBarn.omsorgsovertakelse).toBeUndefined();
//     });
// });
