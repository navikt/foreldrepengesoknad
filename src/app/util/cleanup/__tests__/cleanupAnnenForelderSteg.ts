import { Kjønn } from '../../../types/common';
import Person, { RegistrertAnnenForelder } from '../../../types/Person';
import { Søkerinfo } from '../../../types/søkerinfo';
import AnnenForelder from '../../../types/søknad/AnnenForelder';
import Søknad, { SøknadPartial } from '../../../types/søknad/Søknad';
import { cleanupAnnenForelder } from '../cleanupAnnenForelderSteg';

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
        fødselsdatoer: []
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

const hasExpectedProperties = (af: Partial<AnnenForelder>, expectedProps: string[]): boolean => {
    const props = Object.getOwnPropertyNames(af);
    if (props.length !== expectedProps.length) {
        return false;
    }
    let hasAllProps = true;
    props.forEach((s) => {
        const hasProp = expectedProps.find((p) => p === s) !== undefined;
        if (!hasProp) {
            hasAllProps = false;
        }
    });
    return hasAllProps;
};

const runCleanUp = (s: SøknadPartial) => {
    return cleanupAnnenForelder(s as Søknad, søkerinfo);
};

describe('Cleanup søknad.annenForelder', () => {
    const propsOutsideSteg = ['erForSyk'];

    let testSøknad: SøknadPartial = {
        ...søknad
    };

    describe('Situation: fødsel, role: mor, registrert barn, registrert annen forelder', () => {
        describe('when aleneomsorg: true', () => {
            beforeEach(() => {
                testSøknad = {
                    ...søknad,
                    søker: {
                        ...søknad.søker,
                        erAleneOmOmsorg: true
                    }
                };
            });
            it('far skal ikke ha foreldrepenger', () => {
                expect(
                    hasExpectedProperties(runCleanUp(testSøknad), [
                        'fnr',
                        'navn',
                        'skalHaForeldrepenger',
                        ...propsOutsideSteg
                    ])
                ).toBeTruthy();
            });
            it('far skal ha foreldrepenger', () => {
                testSøknad = {
                    ...testSøknad,
                    annenForelder: {
                        ...testSøknad.annenForelder,
                        skalHaForeldrepenger: true
                    }
                };
                expect(
                    hasExpectedProperties(runCleanUp(testSøknad), [
                        'fnr',
                        'navn',
                        'skalHaForeldrepenger',
                        'harRettPåForeldrepenger',
                        ...propsOutsideSteg
                    ])
                ).toBeTruthy();
            });
        });

        describe('when aleneomsorg: false', () => {
            beforeEach(() => {
                testSøknad = {
                    ...søknad,
                    søker: {
                        ...søknad.søker,
                        erAleneOmOmsorg: false
                    }
                };
            });
            it('far HAR IKKE rett på foreldrepenger', () => {
                expect(
                    hasExpectedProperties(runCleanUp(testSøknad), [
                        'fnr',
                        'navn',
                        'harRettPåForeldrepenger',
                        ...propsOutsideSteg
                    ])
                ).toBeTruthy();
            });
            it('far HAR rett på foreldrepenger', () => {
                testSøknad = {
                    ...testSøknad,
                    annenForelder: {
                        ...testSøknad.annenForelder,
                        harRettPåForeldrepenger: true
                    }
                };
                expect(
                    hasExpectedProperties(runCleanUp(testSøknad), [
                        'fnr',
                        'navn',
                        'harRettPåForeldrepenger',
                        'erInformertOmSøknaden',
                        ...propsOutsideSteg
                    ])
                ).toBeTruthy();
            });
        });
    });
});
