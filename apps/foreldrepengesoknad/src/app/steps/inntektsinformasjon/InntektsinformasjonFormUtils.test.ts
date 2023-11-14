import { AnnenInntekt, AnnenInntektType, JobbIUtlandetInntekt } from 'app/context/types/AnnenInntekt';
import { EndringAvNæringsinntektInformasjon, Næring } from 'app/context/types/Næring';
import {
    cleanupInvisibleCharsFromAndreInntekter,
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
} as Næring;

const næringUtenEndring = {
    næringsinntekt: 220000,
    pågående: true,
    navnPåNæringen: 'Navn\u2002med blanke\u2003tegn',
    hattVarigEndringAvNæringsinntektSiste4Kalenderår: false,
} as Næring;

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

const cleanedForklaring = 'Forklaring med blanke tegn';

describe('InntektsinformasjonFormUtils', () => {
    it('skal erstatte alle ulovlige blanke tegn fra Næringsinformasjon med space og beholde resten av informasjonen intakt', async () => {
        const cleanedNæring = cleanupInvisibleCharsFromNæring(næring);
        expect(cleanedNæring.navnPåNæringen).toEqual('Navn med blanke tegn');
        expect(cleanedNæring.endringAvNæringsinntektInformasjon!.forklaring).toEqual(cleanedForklaring);
        expect(cleanedNæring.oppstartsdato).toEqual(næring.oppstartsdato);
        expect(cleanedNæring.endringAvNæringsinntektInformasjon!.næringsinntektEtterEndring).toEqual(
            næring.endringAvNæringsinntektInformasjon!.næringsinntektEtterEndring,
        );
    });

    it('skal ikke feile med manglende info om endring', async () => {
        const cleanedNæring = cleanupInvisibleCharsFromNæring(næringUtenEndring);
        expect(cleanedNæring.navnPåNæringen).toEqual('Navn med blanke tegn');
        expect(cleanedNæring.hattVarigEndringAvNæringsinntektSiste4Kalenderår).toEqual(false);
    });

    it('skal erstatte alle ulovlige blanke tegn fra AnnenIntekt med space og beholde resten av informasjonen intakt', async () => {
        const cleanedAndreInntekter = cleanupInvisibleCharsFromAndreInntekter(andreInntekter);
        expect(cleanedAndreInntekter.length).toEqual(2);
        const inntektIUtlandet = cleanedAndreInntekter[0] as JobbIUtlandetInntekt;
        expect(inntektIUtlandet.arbeidsgiverNavn).toEqual('Navn på arbeid ');
        expect(inntektIUtlandet.pågående).toEqual(andreInntekter[0].pågående);
        expect(cleanedAndreInntekter[1]).toEqual(andreInntekter[1]);
    });
});
