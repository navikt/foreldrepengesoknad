import { AnnenForelder, AnnenForelderOppgitt, MorsAktivitet } from '@navikt/fp-common';
import { Skjemanummer } from '@navikt/fp-constants';

import { aktivitetskravMorUtil, getMorsAktivitet, getMorsAktivitetSkjemanummer } from './morsAktivitetUtils';

describe('Aktivitetskrav ved utsettelse', () => {
    it('should be required if søkerErFarEllerMedmor and !annenForelderHarRettPåFP', () => {
        const omAnnenForelder: Partial<AnnenForelderOppgitt> = {
            kanIkkeOppgis: false,
            harRettPåForeldrepengerINorge: false,
            harRettPåForeldrepengerIEØS: false,
        };
        const aktivitetskravIsRequired = aktivitetskravMorUtil.skalBesvaresVedUtsettelse(
            true,
            omAnnenForelder as AnnenForelder,
        );
        expect(aktivitetskravIsRequired).toBe(true);
    });

    it('should not be required if !søkerErFarEllerMedmor', () => {
        const omAnnenForelder: Partial<AnnenForelderOppgitt> = {
            kanIkkeOppgis: false,
            harRettPåForeldrepengerINorge: false,
        };
        const aktivitetskravIsRequired = aktivitetskravMorUtil.skalBesvaresVedUtsettelse(
            false,
            omAnnenForelder as AnnenForelder,
        );
        expect(aktivitetskravIsRequired).toBe(false);
    });

    it('should not be required if annenForelderHarRettPåFP', () => {
        const omAnnenForelder: Partial<AnnenForelderOppgitt> = {
            kanIkkeOppgis: false,
            harRettPåForeldrepengerINorge: true,
        };
        const aktivitetskravIsRequired = aktivitetskravMorUtil.skalBesvaresVedUtsettelse(
            true,
            omAnnenForelder as AnnenForelder,
        );
        expect(aktivitetskravIsRequired).toBe(false);
    });
});

describe('getMorsAktivitetSkjemanummer', () => {
    it('should require Skjemanummer.DOK_INNLEGGELSE when morsAktivitet=Innlagt', () => {
        expect(getMorsAktivitetSkjemanummer(MorsAktivitet.Innlagt)).toBe(Skjemanummer.DOK_INNLEGGELSE_MOR);
    });

    it('should require Skjemanummer.BEKREFTELS_DELTAR_KVALIFISERINGSPROGRAM when morsAktivitet=Kvalifiseringsprogrammet', () => {
        expect(getMorsAktivitetSkjemanummer(MorsAktivitet.Kvalifiseringsprogrammet)).toBe(
            Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM,
        );
    });

    it('should require Skjemanummer.ANNET_SKJEMA_IKKE_NAV when morsAktivitet=Introduksjonsprogrammet', () => {
        expect(getMorsAktivitetSkjemanummer(MorsAktivitet.Introduksjonsprogrammet)).toBe(
            Skjemanummer.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET,
        );
    });

    // eslint-disable-next-line max-len
    it('should require Skjemanummer.DOK_ARBEID_MOR or DOK_UTDANNING_OG_ARBEID_MOR or DOK_UTDANNING_MOR when morsAktivitet is ArbeidOgUtdanning, Arbeid or TrengerHjelp', () => {
        expect(getMorsAktivitetSkjemanummer(MorsAktivitet.Arbeid)).toBe(Skjemanummer.DOK_ARBEID_MOR);
        expect(getMorsAktivitetSkjemanummer(MorsAktivitet.ArbeidOgUtdanning)).toBe(
            Skjemanummer.DOK_UTDANNING_OG_ARBEID_MOR,
        );
        expect(getMorsAktivitetSkjemanummer(MorsAktivitet.TrengerHjelp)).toBe(Skjemanummer.DOK_SYKDOM_MOR);
    });

    it('should require Skjemanummer.BEKREFTELSE_FRA_STUDIESTED when morsAktivitet=Utdanning', () => {
        expect(getMorsAktivitetSkjemanummer(MorsAktivitet.Utdanning)).toBe(Skjemanummer.DOK_UTDANNING_MOR);
    });
});

describe('getMorsAktivitet', () => {
    it('should return undefined for no input on morsaktivitet or no input on mor er for syk', () => {
        expect(getMorsAktivitet(undefined, undefined)).toBeUndefined();
    });

    it('should return mors aktivitet if there is input on mors aktivitet', () => {
        expect(getMorsAktivitet(MorsAktivitet.Innlagt, undefined)).toEqual(MorsAktivitet.Innlagt);
    });

    it('should return mors aktivitet = TRENGER HJELP for no input on mors aktivitet and input that mor er syk', () => {
        expect(getMorsAktivitet(undefined, true)).toEqual(MorsAktivitet.TrengerHjelp);
    });

    it('should return undefined if no input on mors aktivitet and mor er syk is false', () => {
        expect(getMorsAktivitet(undefined, false)).toBeUndefined();
    });
});
