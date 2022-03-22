import { AnnenInntekt, AnnenInntektType, JobbIUtlandetInntekt } from 'app/context/types/AnnenInntekt';
import { FrilansOppdrag } from 'app/context/types/Frilans';
import { EndringAvNæringsinntektInformasjon, Næring } from 'app/context/types/Næring';
import {
    cleanupInvisibleCharsFromAndreInntekter,
    cleanupInvisibleCharsFromFrilansinformasjon,
    cleanupInvisibleCharsFromNæring,
} from './inntektsinformasjonFormUtils';

const næring = {
    næringsinntekt: 102000,
    pågående: true,
    navnPåNæringen: 'Navn med\u2009blanke\u2008tegn',
    organisasjonsnummer: '12345',
    registrertINorge: true,
    harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene: true,
    oppstartsdato: new Date('2000-01-02'),
    hattVarigEndringAvNæringsinntektSiste4Kalenderår: true,
    endringAvNæringsinntektInformasjon: {
        dato: new Date('2020-01-02'),
        næringsinntektEtterEndring: 130000,
        forklaring: 'Forklaring\u0009med blanke\u0009tegn',
    } as EndringAvNæringsinntektInformasjon,
    harRegnskapsfører: true,
    regnskapsfører: {
        navn: 'Regnskapsfører\u034Fmed blanke\u00adtegn',
        telefonnummer: '123456',
        erNærVennEllerFamilie: false,
    },
} as Næring;

const næringUtenEndringEllerRegnskapsfører = {
    næringsinntekt: 220000,
    pågående: true,
    navnPåNæringen: 'Navn\u2002med blanke\u2003tegn',
    hattVarigEndringAvNæringsinntektSiste4Kalenderår: false,
    harRegnskapsfører: false,
} as Næring;

const frilansoppdrag = [
    {
        navnPåArbeidsgiver: 'Navn\u200dpå\u200darbeid\u200d',
        pågående: false,
    },
    {
        navnPåArbeidsgiver: 'Navn\u200bpå\u2060arbeid\u2062',
        pågående: true,
    },
] as FrilansOppdrag[];

const andreInntekter = [
    {
        type: AnnenInntektType.JOBB_I_UTLANDET,
        arbeidsgiverNavn: 'Navn\u2001på\u200aarbeid\u202f',
        land: 'Angola',
        pågående: true,
        vedlegg: [],
        tidsperiode: {
            fom: '2021-12-01',
        },
    } as AnnenInntekt,
    {
        type: AnnenInntektType.MILITÆRTJENESTE,
        pågående: true,
        vedlegg: [],
        tidsperiode: {
            fom: '2020-12-01',
            tom: '2021-11-30',
        },
    } as AnnenInntekt,
] as AnnenInntekt[];

const cleanedNavnPåNæringen = 'Navn med blanke tegn';
const cleanedForklaring = 'Forklaring med blanke tegn';
const cleanedRegnskapsførerNavn = 'Regnskapsfører med blanke tegn';
const cleanedNavnPåArbeidsgiver = 'Navn på arbeid ';

describe('InntektsinformasjonFormUtils', () => {
    it('skal erstatte alle ulovlige blanke tegn fra Næringsinformasjon med space og beholde resten av informasjonen intakt', async () => {
        const cleanedNæring = cleanupInvisibleCharsFromNæring(næring);
        expect(cleanedNæring.navnPåNæringen).toEqual(cleanedNavnPåNæringen);
        expect(cleanedNæring.endringAvNæringsinntektInformasjon!.forklaring).toEqual(cleanedForklaring);
        expect(cleanedNæring.regnskapsfører!.navn).toEqual(cleanedRegnskapsførerNavn);
        expect(cleanedNæring.oppstartsdato).toEqual(næring.oppstartsdato);
        expect(cleanedNæring.regnskapsfører!.telefonnummer).toEqual(næring.regnskapsfører?.telefonnummer);
        expect(cleanedNæring.endringAvNæringsinntektInformasjon!.næringsinntektEtterEndring).toEqual(
            næring.endringAvNæringsinntektInformasjon!.næringsinntektEtterEndring
        );
    });
    it('skal ikke feile med manglende info om regnskapsfører eller endring', async () => {
        const cleanedNæring = cleanupInvisibleCharsFromNæring(næringUtenEndringEllerRegnskapsfører);
        expect(cleanedNæring.navnPåNæringen).toEqual(cleanedNavnPåNæringen);
        expect(cleanedNæring.harRegnskapsfører).toEqual(false);
        expect(cleanedNæring.hattVarigEndringAvNæringsinntektSiste4Kalenderår).toEqual(false);
    });
    it('skal erstatte alle ulovlige blanke tegn fra FrilansOppdrag med space og beholde resten av informasjonen intakt', async () => {
        const cleanedFrilansoppdrag = cleanupInvisibleCharsFromFrilansinformasjon(frilansoppdrag);
        expect(cleanedFrilansoppdrag.length).toEqual(2);
        expect(cleanedFrilansoppdrag[0].navnPåArbeidsgiver).toEqual(cleanedNavnPåArbeidsgiver);
        expect(cleanedFrilansoppdrag[0].pågående).toEqual(frilansoppdrag[0].pågående);
        expect(cleanedFrilansoppdrag[1].navnPåArbeidsgiver).toEqual(cleanedNavnPåArbeidsgiver);
        expect(cleanedFrilansoppdrag[1].pågående).toEqual(frilansoppdrag[1].pågående);
    });
    it('skal erstatte alle ulovlige blanke tegn fra AnnenIntekt med space og beholde resten av informasjonen intakt', async () => {
        const cleanedAndreInntekter = cleanupInvisibleCharsFromAndreInntekter(andreInntekter);
        expect(cleanedAndreInntekter.length).toEqual(2);
        const inntektIUtlandet = cleanedAndreInntekter[0] as JobbIUtlandetInntekt;
        expect(inntektIUtlandet.arbeidsgiverNavn!).toEqual(cleanedNavnPåArbeidsgiver);
        expect(inntektIUtlandet.pågående).toEqual(andreInntekter[0].pågående);
        expect(cleanedAndreInntekter[1]).toEqual(andreInntekter[1]);
    });
});
