import { RegistrertAnnenForelder, RegistrertBarn } from '../../../types/Person';
import { getUniqueRegistrertAnnenForelderFromBarn, skalSøkerLasteOppTerminbekreftelse } from '../steg/barn';
import { Kjønn } from '../../../types/common';
import Barn from 'app/types/søknad/Barn';
import Arbeidsforhold from 'app/types/Arbeidsforhold';
import Søknad, { Søkersituasjon } from 'app/types/søknad/Søknad';
const moment = require('moment');
const mor: RegistrertAnnenForelder = {
    fnr: '1',
    fornavn: '',
    etternavn: '',
    fødselsdato: new Date()
};

const farMedmor: RegistrertAnnenForelder = {
    fnr: '2',
    fornavn: '',
    etternavn: '',
    fødselsdato: new Date()
};

const barn: RegistrertBarn = {
    fnr: '1',
    fornavn: 'a',
    etternavn: 'b',
    fødselsdato: new Date(),
    kjønn: Kjønn.MANN
};

const barnMedForelder: RegistrertBarn = {
    ...barn,
    annenForelder: mor
};

const barnMedUlikForelder: RegistrertBarn = {
    ...barn,
    annenForelder: farMedmor
};

describe('barn.steg.validation', () => {
    describe('getUniqeRegistrertAnnenForelderFromBarn', () => {
        it('registrertAnnenForelder er undefined ved ingen barn', () => {
            const forelder = getUniqueRegistrertAnnenForelderFromBarn([]);
            expect(forelder).toBeUndefined();
        });
        it('barn uten annen forelder har ikke registrertAnnenForelder', () => {
            const forelder = getUniqueRegistrertAnnenForelderFromBarn([barn]);
            expect(forelder).toBeUndefined();
        });
        it('barn med annen forelder har registrertAnnenForelder', () => {
            const forelder = getUniqueRegistrertAnnenForelderFromBarn([barnMedForelder]);
            expect(forelder).toBeDefined();
        });
        it('registrertAnnenForelder er defined ved flere barn med samme forelder', () => {
            const forelder = getUniqueRegistrertAnnenForelderFromBarn([barnMedForelder, barnMedForelder]);
            expect(forelder).toBeDefined();
        });
        it('annenForelder er defined ved flere barn med samme forelder', () => {
            const forelder = getUniqueRegistrertAnnenForelderFromBarn([barnMedForelder, barnMedUlikForelder]);
            expect(forelder).toBeUndefined();
        });
    });

    describe('skalSøkerLasteOppTerminbekreftelse', () => {
        const arbeidsforhold: Arbeidsforhold = {
            arbeidsgiverId: '123',
            arbeidsgiverNavn: 'navn',
            arbeidsgiverIdType: 'orgnr',
            stillingsprosent: 100,
            fom: new Date('2000-12-24')
        };

        it('kun søkere i fødselssituasjon skal laste opp terminbekreftelse', () => {
            const b: Partial<Barn> = { erBarnetFødt: false, termindato: moment().toDate() };
            const arbeidsforholdList = [
                {
                    ...arbeidsforhold,
                    tom: moment()
                        .subtract(1, 'day')
                        .toDate()
                }
            ];
            expect(
                skalSøkerLasteOppTerminbekreftelse(
                    { barn: b as Barn, situasjon: Søkersituasjon.FØDSEL } as Søknad,
                    arbeidsforholdList
                )
            ).toBeTruthy();

            expect(
                skalSøkerLasteOppTerminbekreftelse(
                    { barn: b as Barn, situasjon: Søkersituasjon.ADOPSJON } as Søknad,
                    arbeidsforholdList
                )
            ).toBeFalsy();

            expect(
                skalSøkerLasteOppTerminbekreftelse(
                    { barn: b as Barn, situasjon: Søkersituasjon.FORELDREANSVAR } as Søknad,
                    arbeidsforholdList
                )
            ).toBeFalsy();
        });

        it('søker med et eller flere løpende arbeidsforhold på termindatoen må ikke laste opp terminbekreftelse', () => {
            const b: Partial<Barn> = { erBarnetFødt: false, termindato: moment().toDate() };
            const a: Arbeidsforhold = { ...arbeidsforhold, tom: b.termindato };
            const arbeidsforhold1: Arbeidsforhold[] = [{ ...a }];
            const arbeidsforhold2: Arbeidsforhold[] = [{ ...a }, { ...a }];
            expect(
                skalSøkerLasteOppTerminbekreftelse(
                    { barn: b as Barn, situasjon: Søkersituasjon.FØDSEL } as Søknad,
                    arbeidsforhold1
                )
            ).toBeFalsy();
            expect(
                skalSøkerLasteOppTerminbekreftelse(
                    { barn: b as Barn, situasjon: Søkersituasjon.FØDSEL } as Søknad,
                    arbeidsforhold2
                )
            ).toBeFalsy();
        });

        it('søker uten løpende arbeidsforhold på termindato må laste opp terminbekreftelse', () => {
            const b: Partial<Barn> = { erBarnetFødt: false, termindato: moment().toDate() };
            const a: Arbeidsforhold = {
                ...arbeidsforhold,
                tom: moment()
                    .subtract(1, 'day')
                    .toDate()
            };
            expect(
                skalSøkerLasteOppTerminbekreftelse({ barn: b as Barn, situasjon: Søkersituasjon.FØDSEL } as Søknad, [a])
            ).toBeTruthy();

            expect(
                skalSøkerLasteOppTerminbekreftelse({ barn: b as Barn, situasjon: Søkersituasjon.FØDSEL } as Søknad, [])
            ).toBeTruthy();
        });

        it('søker med barn som allerede er født må ikke laste opp terminbekreftelse', () => {
            const b: Partial<Barn> = { erBarnetFødt: true, termindato: moment().toDate() };
            expect(
                skalSøkerLasteOppTerminbekreftelse({ barn: b, situasjon: Søkersituasjon.FØDSEL } as Søknad, [
                    arbeidsforhold
                ])
            ).toBeFalsy();
        });
    });
});
