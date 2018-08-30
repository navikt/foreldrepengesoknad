import { SøknadPartial, SøkerRolle, Søkersituasjon } from '../../../../types/s\u00F8knad/S\u00F8knad';
import {
    visRegistrertAnnenForelderBolk,
    visAnnenForelderPersonaliaSkjema,
    visAnnenForelderErKjentPartial,
    visOmsorgsovertakelse,
    visAnnenForelderKanIkkeOppgisValg,
    visFødselsnummerInput,
    visSkalFarEllerMedmorHaForeldrepengerSpørsmål
} from '../annenForelderVisibility';
import { Kjønn } from '../../../../types/common';
import Person, { RegistrertAnnenForelder } from '../../../../types/Person';
import { Attachment } from 'common/storage/attachment/types/Attachment';

const attachment: Partial<Attachment> = {};

const registrertAnnenForelder: RegistrertAnnenForelder = {
    fnr: '28019400133',
    fornavn: 'FAR',
    etternavn: 'FARSEN',
    kjønn: Kjønn.MANN,
    fødselsdato: new Date('1994-01-27T23:00:00.000Z')
};

const person: Partial<Person> = {
    erMyndig: true,
    kjønn: Kjønn.MANN,
    ikkeNordiskEøsLand: false
};

const søknad: Partial<SøknadPartial> = {
    type: 'foreldrepenger',
    annenForelder: {
        fnr: '123',
        navn: 'FAR FARSEN',
        skalHaForeldrepenger: true,
        harRettPåForeldrepenger: true
    },
    barn: {
        fødselsdatoer: ['2018-03-28T22:00:00.000Z'],
        antallBarn: 1,
        erBarnetFødt: true
    },
    søker: {
        erAleneOmOmsorg: true,
        andreInntekterSiste10Mnd: [],
        rolle: SøkerRolle.MOR
    },
    harGodkjentVilkår: true,
    harGodkjentOppsummering: false,
    situasjon: Søkersituasjon.FØDSEL,
    temp: {
        søknadenGjelderBarnValg: {
            gjelderAnnetBarn: false,
            valgteBarn: [
                {
                    fornavn: 'BARN',
                    etternavn: 'MORSEN',
                    fnr: '1234',
                    kjønn: Kjønn.KVINNE,
                    fødselsdato: new Date('2018-03-28T22:00:00.000Z'),
                    annenForelder: registrertAnnenForelder
                }
            ]
        },
        registrertAnnenForelder
    }
};

describe('AnnenForelder visibility tests', () => {
    describe('Routing visibilities', () => {
        it('Should only render personalia for registrertAnnenForelder if registrertAnnenForelder exists', () => {
            expect(visRegistrertAnnenForelderBolk.resultFunc(registrertAnnenForelder)).toBeTruthy();
            expect(visRegistrertAnnenForelderBolk.resultFunc(undefined)).toBeFalsy();
        });

        it('Should only render annenForelderPersonaliaSkjema when registrertAnnenForelder is undefined', () => {
            expect(visAnnenForelderPersonaliaSkjema.resultFunc(registrertAnnenForelder)).toBeFalsy();
            expect(visAnnenForelderPersonaliaSkjema.resultFunc(undefined)).toBeTruthy();
        });

        describe('visAnnenForelderErKjentPartial', () => {
            it('Should be visible when registrertAnnenForelder is defined', () => {
                expect(
                    visAnnenForelderErKjentPartial.resultFunc(søknad.annenForelder!, registrertAnnenForelder)
                ).toBeTruthy();
            });
            it('Should be visible when registrertAnnenForelder is undefined and navn/fnr is has values', () => {
                expect(visAnnenForelderErKjentPartial.resultFunc({ navn: 'abc', fnr: '123' }, undefined)).toBeTruthy();
            });
            it('Should be hidden when !registrertAnnenForelder and !navn || !fnr', () => {
                expect(visAnnenForelderErKjentPartial.resultFunc({ navn: 'asd', fnr: '' }!, undefined)).toBeFalsy();
                expect(visAnnenForelderErKjentPartial.resultFunc({ navn: '', fnr: '' }!, undefined)).toBeFalsy();
            });

            it('Should not render skalFarEllerMedmorHaForeldrepengerSpørsmål when er alene om omsorg and !farEllerMedmor', () => {
                expect(
                    visSkalFarEllerMedmorHaForeldrepengerSpørsmål.resultFunc({ erAleneOmOmsorg: true }, false)
                ).toBeTruthy();
                expect(
                    visSkalFarEllerMedmorHaForeldrepengerSpørsmål.resultFunc({ erAleneOmOmsorg: false }, false)
                ).toBeFalsy();
                expect(
                    visSkalFarEllerMedmorHaForeldrepengerSpørsmål.resultFunc({ erAleneOmOmsorg: false }, true)
                ).toBeFalsy();
            });
        });

        describe('AnnenForelderPersonaliaPartial', () => {
            it('Should not render annenForelderKanIkkeOppgisValg when barn.gjelderAdopsjonAvEktefellesBarn', () => {
                expect(visAnnenForelderKanIkkeOppgisValg.resultFunc(false)).toBeTruthy();
                expect(visAnnenForelderKanIkkeOppgisValg.resultFunc(true)).toBeFalsy();
            });
            it('Should only render fødselsnummerInput when navn has value', () => {
                expect(visFødselsnummerInput.resultFunc({ navn: undefined })).toBeFalsy();
                expect(visFødselsnummerInput.resultFunc({ navn: '' })).toBeFalsy();
                expect(visFødselsnummerInput.resultFunc({ navn: 'a' })).toBeTruthy();
            });
        });

        it('Should show omsorgsovertakelse when omsorgsovertakelse has one or more attachments', () => {
            expect(visOmsorgsovertakelse.resultFunc(søknad.barn!)).toBeFalsy();
            expect(visOmsorgsovertakelse.resultFunc({ ...søknad.barn, omsorgsovertakelse: [] }!)).toBeFalsy();
            expect(
                visOmsorgsovertakelse.resultFunc({ ...søknad.barn, omsorgsovertakelse: [attachment as Attachment] })
            ).toBeTruthy();
        });
    });
});
