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
        registrertAnnenForelder,
        uttaksplanSkjema: {}
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

const propsSetOutsideSteg: string[] = ['erForSyk'];

const hasOnlyIncludedProps = (annenForelderProps: Partial<AnnenForelder>, propsToInclude: string[]): boolean => {
    const props = Object.getOwnPropertyNames(annenForelderProps);
    const propsWithValue = props.filter((p) => annenForelderProps[p] !== undefined);
    return JSON.stringify(propsToInclude.sort()) === JSON.stringify(propsWithValue.sort());
};

const runCleanUpAnnenForelder = (s: SøknadPartial, visibility: AnnenForelderStegVisibility): Partial<AnnenForelder> => {
    return cleanupAnnenForelder(visibility, s as Søknad);
};

const cleanAndCheckProps = (s: SøknadPartial, visibility: AnnenForelderStegVisibility, props: string[]) => {
    return hasOnlyIncludedProps(runCleanUpAnnenForelder(søknad, visibility), [...props, ...propsSetOutsideSteg]);
};

let testSøknad: SøknadPartial;
let testVisibility: AnnenForelderStegVisibility;

describe('Cleanup AnnenForelder', () => {
    testSøknad = { ...søknad };

    describe('Alenemor, fødsel', () => {
        describe('Med registrert annen forelder', () => {
            testSøknad = { ...søknad };
            describe('Har IKKE aleneomsorg', () => {
                it('far har IKKE rett på foreldrepenger', () => {
                    testVisibility = {
                        ...getAnnenForelderVisibility(testSøknad as Søknad, søkerinfo)!,
                        harRettPåForeldrepengerSpørsmål: true
                    };
                    expect(
                        cleanAndCheckProps(testSøknad, testVisibility, ['navn', 'fnr', 'harRettPåForeldrepenger'])
                    ).toBeTruthy();
                });
                it('far HAR rett på foreldrepenger', () => {
                    testVisibility = {
                        ...getAnnenForelderVisibility(testSøknad as Søknad, søkerinfo)!,
                        harRettPåForeldrepengerSpørsmål: true,
                        erAnnenForelderInformertSpørsmål: true
                    };
                    expect(
                        cleanAndCheckProps(testSøknad, testVisibility, [
                            'navn',
                            'fnr',
                            'harRettPåForeldrepenger',
                            'erInformertOmSøknaden'
                        ])
                    ).toBeTruthy();
                });
            });
        });
        describe('HAR aleneomsorg', () => {
            it('far skal IKKE ha foreldrepenger', () => {
                testVisibility = {
                    ...getAnnenForelderVisibility(testSøknad as Søknad, søkerinfo)!,
                    skalFarEllerMedmorHaForeldrepengerSpørsmål: true,
                    harRettPåForeldrepengerSpørsmål: false
                };
                expect(
                    cleanAndCheckProps(testSøknad, testVisibility, ['navn', 'fnr', 'skalHaForeldrepenger'])
                ).toBeTruthy();
            });
            it('far SKAL ha foreldrepenger', () => {
                testVisibility = {
                    ...getAnnenForelderVisibility(testSøknad as Søknad, søkerinfo)!,
                    skalFarEllerMedmorHaForeldrepengerSpørsmål: true,
                    harRettPåForeldrepengerSpørsmål: true
                };
                expect(
                    cleanAndCheckProps(testSøknad, testVisibility, [
                        'navn',
                        'fnr',
                        'skalHaForeldrepenger',
                        'harRettPåForeldrepenger'
                    ])
                ).toBeTruthy();
            });
        });
    });
    it('Skal fjerne alt når annen forelder ikke kan oppgis', () => {
        testSøknad.annenForelder.kanIkkeOppgis = true;
        testVisibility = {
            ...getAnnenForelderVisibility(testSøknad as Søknad, søkerinfo)!,
            annenForelderKanIkkeOppgisValg: true
        };
        expect(cleanAndCheckProps(testSøknad, testVisibility, ['kanIkkeOppgis'])).toBeTruthy();
    });
});
