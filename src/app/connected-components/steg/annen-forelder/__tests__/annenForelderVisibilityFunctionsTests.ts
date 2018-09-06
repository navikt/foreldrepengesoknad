import { Attachment } from 'common/storage/attachment/types/Attachment';
import { Kjønn } from '../../../../types/common';
import { RegistrertAnnenForelder } from '../../../../types/Person';
import { AnnenForelderVisibilityFunctions as func } from '../visibility/visibilityFunctions';
import { ForeldreansvarBarn, Barn } from '../../../../types/søknad/Barn';
import AnnenForelder from '../../../../types/søknad/AnnenForelder';

const attachment: Partial<Attachment> = {};

const registrertAnnenForelder: RegistrertAnnenForelder = {
    fnr: '28019400133',
    fornavn: 'FAR',
    etternavn: 'FARSEN',
    kjønn: Kjønn.MANN,
    fødselsdato: new Date('1994-01-27T23:00:00.000Z')
};

const annenForelder: Partial<AnnenForelder> = {
    fnr: '123',
    navn: 'FAR FARSEN',
    skalHaForeldrepenger: true,
    harRettPåForeldrepenger: true
};
const barn: Partial<Barn> = {
    fødselsdatoer: ['2018-03-28T22:00:00.000Z'],
    antallBarn: 1,
    erBarnetFødt: true
};

describe('AnnenForelder visibility tests', () => {
    describe('Main and partials', () => {
        it('should choose between registrertAnnenForelder personalia and annenForelderSkjema', () => {
            expect(func.visRegistrertAnnenForelderBolk(registrertAnnenForelder)).toBeTruthy();
            expect(func.visAnnenForelderPersonaliaPart(registrertAnnenForelder)).toBeFalsy();
            expect(func.visRegistrertAnnenForelderBolk(undefined)).toBeFalsy();
            expect(func.visAnnenForelderPersonaliaPart(undefined)).toBeTruthy();
        });
        it('Should show visAnnenForelderOppfølging when registrertAnnenForelder is undefined and when defined name/fnr', () => {
            expect(func.visAnnenForelderOppfølgingPart(annenForelder!, undefined)).toBeTruthy();
            expect(func.visAnnenForelderOppfølgingPart({ navn: 'abc', fnr: '123' }, undefined)).toBeTruthy();
            expect(func.visAnnenForelderOppfølgingPart({ navn: 'asd', fnr: '' }!, undefined)).toBeFalsy();
            expect(func.visAnnenForelderOppfølgingPart({ navn: '', fnr: '' }!, undefined)).toBeFalsy();
        });
    });
    describe('Routing visibilities', () => {
        describe('visAnnenForelderErKjentPartial', () => {
            it('Should not render skalFarEllerMedmorHaForeldrepengerSpørsmål when er alene om omsorg and not farEllerMedmor', () => {
                expect(
                    func.visSkalFarEllerMedmorHaForeldrepengerSpørsmål({ erAleneOmOmsorg: true }, false)
                ).toBeTruthy();
                expect(
                    func.visSkalFarEllerMedmorHaForeldrepengerSpørsmål({ erAleneOmOmsorg: false }, false)
                ).toBeFalsy();
                expect(
                    func.visSkalFarEllerMedmorHaForeldrepengerSpørsmål({ erAleneOmOmsorg: false }, true)
                ).toBeFalsy();
            });

            it('Should render ErMorUførSpørsmål depending on when harRettPåForeldrepenger', () => {
                expect(func.visErMorUførSpørsmål({ harRettPåForeldrepenger: false }, true)).toBeTruthy();
                expect(func.visErMorUførSpørsmål({ harRettPåForeldrepenger: false }, false)).toBeFalsy();
                expect(func.visErMorUførSpørsmål({ harRettPåForeldrepenger: true }, true)).toBeFalsy();
                expect(func.visErMorUførSpørsmål({ harRettPåForeldrepenger: true }, false)).toBeFalsy();
            });

            it('Should render erAnnenForelderInformertSpørsmål depending on aleneomsorg, harRettPåForeldrepenger, visFarEllerMedmor bolk and visOmsorgsovertakelseVedlegg', () => {
                expect(
                    func.visErAnnenForelderInformertSpørsmål(
                        { erAleneOmOmsorg: false },
                        { harRettPåForeldrepenger: false },
                        true,
                        true
                    )
                ).toBeTruthy();
                expect(
                    func.visErAnnenForelderInformertSpørsmål(
                        { erAleneOmOmsorg: false },
                        { harRettPåForeldrepenger: true },
                        true,
                        true
                    )
                ).toBeTruthy();
                expect(
                    func.visErAnnenForelderInformertSpørsmål(
                        { erAleneOmOmsorg: true },
                        { harRettPåForeldrepenger: false },
                        true,
                        true
                    )
                ).toBeFalsy();
                expect(func.visErAnnenForelderInformertSpørsmål({ erAleneOmOmsorg: true }, {}, true, true)).toBeFalsy();
                expect(
                    func.visErAnnenForelderInformertSpørsmål({ erAleneOmOmsorg: false }, {}, true, false)
                ).toBeFalsy();
                expect(
                    func.visErAnnenForelderInformertSpørsmål({ erAleneOmOmsorg: false }, {}, false, false)
                ).toBeFalsy();
            });

            it('Should render visFarEllerMedmorBolk depending on erFarEllerMedmor', () => {
                expect(func.visFarEllerMedmorBolk(true)).toBeTruthy();
                expect(func.visFarEllerMedmorBolk(false)).toBeFalsy();
            });

            it('Should not render visOmsorgsovertakelseDatoSpørsmål when visFarEllerMedmorBolk is hidden', () => {
                expect(func.visOmsorgsovertakelseDatoSpørsmål(false, {})).toBeFalsy();
            });
            it('Should render visOmsorgsovertakelseDatoSpørsmål when erAleneOmOmsorg', () => {
                expect(func.visOmsorgsovertakelseDatoSpørsmål(false, {})).toBeFalsy();
                expect(func.visOmsorgsovertakelseDatoSpørsmål(true, { erAleneOmOmsorg: true })).toBeTruthy();
                expect(func.visOmsorgsovertakelseDatoSpørsmål(true, { erAleneOmOmsorg: false })).toBeFalsy();
            });

            it('Should not render visOmsorgsovertakelseVedleggSpørsmål when visFarEllerMedmorBolk is hidden', () => {
                expect(func.visOmsorgsovertakelseVedleggSpørsmål(false, {}, {})).toBeFalsy();
            });
            it('Should render visOmsorgsovertakelseVedleggSpørsmål when visFarEllerMedmorBolk and not erAleneOmOmsorg and foreldreansvarsdato is defined', () => {
                const b: Partial<ForeldreansvarBarn> = { foreldreansvarsdato: new Date() };
                expect(func.visOmsorgsovertakelseVedleggSpørsmål(false, {}, {})).toBeFalsy();
                expect(func.visOmsorgsovertakelseVedleggSpørsmål(true, { erAleneOmOmsorg: true }, b)).toBeTruthy();
                expect(
                    func.visOmsorgsovertakelseVedleggSpørsmål(
                        true,
                        { erAleneOmOmsorg: false },
                        { ...b, foreldreansvarsdato: undefined }
                    )
                ).toBeFalsy();
            });
        });

        describe('AnnenForelderPersonaliaPartial', () => {
            it('Should not render annenForelderKanIkkeOppgisValg when barn.gjelderAdopsjonAvEktefellesBarn', () => {
                expect(func.visAnnenForelderKanIkkeOppgisValg(false)).toBeTruthy();
                expect(func.visAnnenForelderKanIkkeOppgisValg(true)).toBeFalsy();
            });
            it('Should only render fødselsnummerInput when navn has value', () => {
                expect(func.visFødselsnummerInput({ navn: undefined })).toBeFalsy();
                expect(func.visFødselsnummerInput({ navn: '' })).toBeFalsy();
                expect(func.visFødselsnummerInput({ navn: 'a' })).toBeTruthy();
            });
        });

        it('Should show omsorgsovertakelse when omsorgsovertakelse has one or more attachments', () => {
            expect(func.visOmsorgsovertakelse(barn!)).toBeFalsy();
            expect(func.visOmsorgsovertakelse({ ...barn, omsorgsovertakelse: [] }!)).toBeFalsy();
            expect(
                func.visOmsorgsovertakelse({
                    ...barn,
                    omsorgsovertakelse: [attachment as Attachment]
                })
            ).toBeTruthy();
        });
    });
});
