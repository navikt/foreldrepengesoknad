import { getMorsAktivitetSkjemanummer } from '../morsAktivitetSkjemanummer';
import { MorsAktivitet } from '../../../types/uttaksplan/periodetyper';
import { Skjemanummer } from '../../../types/søknad/Søknad';

describe('getMorsAktivitetSkjemanummer', () => {
    it('should require Skjemanummer.DOK_INNLEGGELSE when morsAktivitet=Innlagt', () => {
        expect(getMorsAktivitetSkjemanummer(MorsAktivitet.Innlagt)).toBe(Skjemanummer.DOK_INNLEGGELSE);
    });

    it('should require Skjemanummer.BEKREFTELS_DELTAR_KVALIFISERINGSPROGRAM when morsAktivitet=Kvalifiseringsprogrammet', () => {
        expect(getMorsAktivitetSkjemanummer(MorsAktivitet.Kvalifiseringsprogrammet)).toBe(
            Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM
        );
    });

    it('should require Skjemanummer.ANNET_SKJEMA_IKKE_NAV when morsAktivitet=Introduksjonsprogrammet', () => {
        expect(getMorsAktivitetSkjemanummer(MorsAktivitet.Introduksjonsprogrammet)).toBe(
            Skjemanummer.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET
        );
    });

    it('should require Skjemanummer.DOK_MORS_UTDANNING_ARBEID_SYKDOM when morsAktivitet is ArbeidOgUtdanning, Arbeid or TrengerHjelp', () => {
        expect(getMorsAktivitetSkjemanummer(MorsAktivitet.Arbeid)).toBe(Skjemanummer.DOK_MORS_UTDANNING_ARBEID_SYKDOM);
        expect(getMorsAktivitetSkjemanummer(MorsAktivitet.ArbeidOgUtdanning)).toBe(
            Skjemanummer.DOK_MORS_UTDANNING_ARBEID_SYKDOM
        );
        expect(getMorsAktivitetSkjemanummer(MorsAktivitet.TrengerHjelp)).toBe(
            Skjemanummer.DOK_MORS_UTDANNING_ARBEID_SYKDOM
        );
    });

    it('should require Skjemanummer.BEKREFTELSE_FRA_STUDIESTED when morsAktivitet=Utdanning', () => {
        expect(getMorsAktivitetSkjemanummer(MorsAktivitet.Utdanning)).toBe(Skjemanummer.BEKREFTELSE_FRA_STUDIESTED);
    });
});
