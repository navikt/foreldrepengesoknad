import { Attachment } from 'common/storage/attachment/types/Attachment';
import { Kjønn } from '../../../../types/common';
import { RegistrertAnnenForelder } from '../../../../types/Person';
import { AnnenForelderVisibilityFuncs as func } from '../visibility/visibilitySelectors';
import { ForeldreansvarBarn, Barn } from '../../../../types/s\u00F8knad/Barn';
import AnnenForelder from '../../../../types/s\u00F8knad/AnnenForelder';

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
            expect(func.visRegistrertAnnenForelderBolk.resultFunc(registrertAnnenForelder)).toBeTruthy();
            expect(func.visAnnenForelderPersonaliaSkjema.resultFunc(registrertAnnenForelder)).toBeFalsy();
            expect(func.visRegistrertAnnenForelderBolk.resultFunc(undefined)).toBeFalsy();
            expect(func.visAnnenForelderPersonaliaSkjema.resultFunc(undefined)).toBeTruthy();
        });
        it('Should show visAnnenForelderOppfølging when registrertAnnenForelder is undefined and when defined name/fnr', () => {
            expect(func.visAnnenForelderOppfølgingPartial.resultFunc(annenForelder!, undefined)).toBeTruthy();
            expect(
                func.visAnnenForelderOppfølgingPartial.resultFunc({ navn: 'abc', fnr: '123' }, undefined)
            ).toBeTruthy();
            expect(func.visAnnenForelderOppfølgingPartial.resultFunc({ navn: 'asd', fnr: '' }!, undefined)).toBeFalsy();
            expect(func.visAnnenForelderOppfølgingPartial.resultFunc({ navn: '', fnr: '' }!, undefined)).toBeFalsy();
        });
    });
    describe('Routing visibilities', () => {
        describe('visAnnenForelderErKjentPartial', () => {
            it('Should not render skalFarEllerMedmorHaForeldrepengerSpørsmål when er alene om omsorg and not farEllerMedmor', () => {
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

            describe('SkalAnnenForelderHaForeldrepengerSpørsmål should render when', () => {
                it('annenForelder har rett på foreldrepenger', () => {
                    expect(
                        func.visSkalAnnenForelderHaForeldrepengerSpørsmål.resultFunc(
                            { skalHaForeldrepenger: true },
                            {},
                            undefined
                        )
                    ).toBeTruthy();
                });
                it('søker is not aleneOmOmsorg and andreForelderHarOpplyst om sin sak', () => {
                    expect(
                        func.visSkalAnnenForelderHaForeldrepengerSpørsmål.resultFunc(
                            {},
                            { erAleneOmOmsorg: false },
                            false
                        )
                    ).toBeTruthy();
                });
            });
            it('SkalAnnenForelderHaForeldrepengerSpørsmål should not render', () => {
                expect(
                    func.visSkalAnnenForelderHaForeldrepengerSpørsmål.resultFunc(
                        { skalHaForeldrepenger: false },
                        {},
                        undefined
                    )
                ).toBeFalsy();
                expect(
                    func.visSkalAnnenForelderHaForeldrepengerSpørsmål.resultFunc({}, { erAleneOmOmsorg: false }, true)
                ).toBeFalsy();
                expect(
                    func.visSkalAnnenForelderHaForeldrepengerSpørsmål.resultFunc({}, { erAleneOmOmsorg: true }, true)
                ).toBeFalsy();
            });

            it('Should render ErMorUførSpørsmål depending on when harRettPåForeldrepenger', () => {
                expect(func.visErMorUførSpørsmål.resultFunc({ harRettPåForeldrepenger: false }, true)).toBeTruthy();
                expect(func.visErMorUførSpørsmål.resultFunc({ harRettPåForeldrepenger: false }, false)).toBeFalsy();
                expect(func.visErMorUførSpørsmål.resultFunc({ harRettPåForeldrepenger: true }, true)).toBeFalsy();
                expect(func.visErMorUførSpørsmål.resultFunc({ harRettPåForeldrepenger: true }, false)).toBeFalsy();
            });

            it('Should render infoOmRettigheterOgDelingAvUttaksplan depening on harRettPåForeldrepenger', () => {
                expect(
                    func.visInfoOmRettigheterOgDelingAvUttaksplan.resultFunc({ harRettPåForeldrepenger: true })
                ).toBeTruthy();
                expect(
                    func.visInfoOmRettigheterOgDelingAvUttaksplan.resultFunc({ harRettPåForeldrepenger: false })
                ).toBeFalsy();
            });

            it('Should render erDenAndreForelderenInformertSpørsmål depending on aleneomsorg, harRettPåForeldrepenger, visFarEllerMedmor bolk and visOmsorgsovertakelseVedlegg', () => {
                expect(
                    func.visErDenAndreForelderenInformertSpørsmål.resultFunc(
                        { erAleneOmOmsorg: false },
                        { harRettPåForeldrepenger: false },
                        true,
                        true
                    )
                ).toBeTruthy();
                expect(
                    func.visErDenAndreForelderenInformertSpørsmål.resultFunc(
                        { erAleneOmOmsorg: false },
                        { harRettPåForeldrepenger: true },
                        true,
                        true
                    )
                ).toBeTruthy();
                expect(
                    func.visErDenAndreForelderenInformertSpørsmål.resultFunc(
                        { erAleneOmOmsorg: true },
                        { harRettPåForeldrepenger: false },
                        true,
                        true
                    )
                ).toBeFalsy();
                expect(
                    func.visErDenAndreForelderenInformertSpørsmål.resultFunc({ erAleneOmOmsorg: true }, {}, true, true)
                ).toBeFalsy();
                expect(
                    func.visErDenAndreForelderenInformertSpørsmål.resultFunc(
                        { erAleneOmOmsorg: false },
                        {},
                        true,
                        false
                    )
                ).toBeFalsy();
                expect(
                    func.visErDenAndreForelderenInformertSpørsmål.resultFunc(
                        { erAleneOmOmsorg: false },
                        {},
                        false,
                        false
                    )
                ).toBeFalsy();
            });

            it('Should render visFarEllerMedmorBolk depending on erFarEllerMedmor', () => {
                expect(func.visFarEllerMedmorBolk.resultFunc(true)).toBeTruthy();
                expect(func.visFarEllerMedmorBolk.resultFunc(false)).toBeFalsy();
            });

            it('Should not render visOmsorgsovertakelseDatoSpørsmål when visFarEllerMedmorBolk is hidden', () => {
                expect(func.visOmsorgsovertakelseDatoSpørsmål.resultFunc(false, {})).toBeFalsy();
            });
            it('Should render visOmsorgsovertakelseDatoSpørsmål when erAleneOmOmsorg', () => {
                expect(func.visOmsorgsovertakelseDatoSpørsmål.resultFunc(false, {})).toBeFalsy();
                expect(func.visOmsorgsovertakelseDatoSpørsmål.resultFunc(true, { erAleneOmOmsorg: true })).toBeTruthy();
                expect(func.visOmsorgsovertakelseDatoSpørsmål.resultFunc(true, { erAleneOmOmsorg: false })).toBeFalsy();
            });

            it('Should not render visOmsorgsovertakelseVedleggSpørsmål when visFarEllerMedmorBolk is hidden', () => {
                expect(func.visOmsorgsovertakelseVedleggSpørsmål.resultFunc(false, {}, {})).toBeFalsy();
            });
            it('Should render visOmsorgsovertakelseVedleggSpørsmål when visFarEllerMedmorBolk and not erAleneOmOmsorg and foreldreansvarsdato is defined', () => {
                const b: Partial<ForeldreansvarBarn> = { foreldreansvarsdato: new Date() };
                expect(func.visOmsorgsovertakelseVedleggSpørsmål.resultFunc(false, {}, {})).toBeFalsy();
                expect(
                    func.visOmsorgsovertakelseVedleggSpørsmål.resultFunc(true, { erAleneOmOmsorg: true }, b)
                ).toBeTruthy();
                expect(
                    func.visOmsorgsovertakelseVedleggSpørsmål.resultFunc(
                        true,
                        { erAleneOmOmsorg: false },
                        { ...b, foreldreansvarsdato: undefined }
                    )
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
            expect(func.visOmsorgsovertakelse.resultFunc(barn!)).toBeFalsy();
            expect(func.visOmsorgsovertakelse.resultFunc({ ...barn, omsorgsovertakelse: [] }!)).toBeFalsy();
            expect(
                func.visOmsorgsovertakelse.resultFunc({
                    ...barn,
                    omsorgsovertakelse: [attachment as Attachment]
                })
            ).toBeTruthy();
        });
    });
});
