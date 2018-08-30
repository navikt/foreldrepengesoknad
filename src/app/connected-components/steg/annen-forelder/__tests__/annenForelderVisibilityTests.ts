import { SøknadPartial, SøkerRolle, Søkersituasjon } from '../../../../types/søknad/Søknad';
import { Kjønn } from '../../../../types/common';
import { RegistrertAnnenForelder } from '../../../../types/Person';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import { AnnenForelderVisibilityFuncs as func } from '../visibility/visibilitySelectors';

const attachment: Partial<Attachment> = {};

const registrertAnnenForelder: RegistrertAnnenForelder = {
    fnr: '28019400133',
    fornavn: 'FAR',
    etternavn: 'FARSEN',
    kjønn: Kjønn.MANN,
    fødselsdato: new Date('1994-01-27T23:00:00.000Z')
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
            expect(func.visRegistrertAnnenForelderBolk.resultFunc(registrertAnnenForelder)).toBeTruthy();
            expect(func.visRegistrertAnnenForelderBolk.resultFunc(undefined)).toBeFalsy();
        });

        it('Should only render annenForelderPersonaliaSkjema when registrertAnnenForelder is undefined', () => {
            expect(func.visAnnenForelderPersonaliaSkjema.resultFunc(registrertAnnenForelder)).toBeFalsy();
            expect(func.visAnnenForelderPersonaliaSkjema.resultFunc(undefined)).toBeTruthy();
        });

        describe('visAnnenForelderErKjentPartial', () => {
            it('Should be visible when registrertAnnenForelder is defined', () => {
                expect(
                    func.visAnnenForelderErKjentPartial.resultFunc(søknad.annenForelder!, registrertAnnenForelder)
                ).toBeTruthy();
            });
            it('Should be visible when registrertAnnenForelder is undefined and navn/fnr is has values', () => {
                expect(
                    func.visAnnenForelderErKjentPartial.resultFunc({ navn: 'abc', fnr: '123' }, undefined)
                ).toBeTruthy();
            });
            it('Should be hidden when !registrertAnnenForelder and !navn || !fnr', () => {
                expect(
                    func.visAnnenForelderErKjentPartial.resultFunc({ navn: 'asd', fnr: '' }!, undefined)
                ).toBeFalsy();
                expect(func.visAnnenForelderErKjentPartial.resultFunc({ navn: '', fnr: '' }!, undefined)).toBeFalsy();
            });

            it('Should not render skalFarEllerMedmorHaForeldrepengerSpørsmål when er alene om omsorg and !farEllerMedmor', () => {
                expect(
                    func.visSkalFarEllerMedmorHaForeldrepengerSpørsmål.resultFunc({ erAleneOmOmsorg: true }, false)
                ).toBeTruthy();
                expect(
                    func.visSkalFarEllerMedmorHaForeldrepengerSpørsmål.resultFunc({ erAleneOmOmsorg: false }, false)
                ).toBeFalsy();
                expect(
                    func.visSkalFarEllerMedmorHaForeldrepengerSpørsmål.resultFunc({ erAleneOmOmsorg: false }, true)
                ).toBeFalsy();
            });
        });

        describe('AnnenForelderPersonaliaPartial', () => {
            it('Should not render annenForelderKanIkkeOppgisValg when barn.gjelderAdopsjonAvEktefellesBarn', () => {
                expect(func.visAnnenForelderKanIkkeOppgisValg.resultFunc(false)).toBeTruthy();
                expect(func.visAnnenForelderKanIkkeOppgisValg.resultFunc(true)).toBeFalsy();
            });
            it('Should only render fødselsnummerInput when navn has value', () => {
                expect(func.visFødselsnummerInput.resultFunc({ navn: undefined })).toBeFalsy();
                expect(func.visFødselsnummerInput.resultFunc({ navn: '' })).toBeFalsy();
                expect(func.visFødselsnummerInput.resultFunc({ navn: 'a' })).toBeTruthy();
            });
        });

        it('Should show omsorgsovertakelse when omsorgsovertakelse has one or more attachments', () => {
            expect(func.visOmsorgsovertakelse.resultFunc(søknad.barn!)).toBeFalsy();
            expect(func.visOmsorgsovertakelse.resultFunc({ ...søknad.barn, omsorgsovertakelse: [] }!)).toBeFalsy();
            expect(
                func.visOmsorgsovertakelse.resultFunc({
                    ...søknad.barn,
                    omsorgsovertakelse: [attachment as Attachment]
                })
            ).toBeTruthy();
        });
    });
});
