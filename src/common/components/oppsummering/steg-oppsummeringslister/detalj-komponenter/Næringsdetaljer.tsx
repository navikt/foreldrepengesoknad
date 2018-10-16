import { formatDate } from '../../../../../app/util/dates/dates';
import { Næring } from '../../../../../app/types/søknad/SelvstendigNæringsdrivendeInformasjon';
import * as React from 'react';

interface NæringsdetaljerProps {
    næring: Næring;
}

const Næringsdetaljer: React.StatelessComponent<NæringsdetaljerProps> = ({ næring }: NæringsdetaljerProps) => {
    const {
        nyIArbeidslivet,
        registrertILand,
        registrertINorge,
        oppstartsdato,
        stillingsprosent,
        organisasjonsnummer,
        næringsinntekt,
        endringAvNæringsinntektInformasjon,
        næringstyper,
        kanInnhenteOpplsyningerFraRevisor,
        hattVarigEndringAvNæringsinntektSiste4Kalenderår,
        revisor,
        harRegnskapsfører,
        regnskapsfører,
        harRevisor
    } = næring;

    return (
        <>
            <p>Næringstype(r): {næringstyper.join(', ')}</p>
            <p>Organisasjonsnummer: {organisasjonsnummer}</p>
            <p>Stillingsprosent: {stillingsprosent}</p>
            <p>Oppstartsdato: {formatDate(oppstartsdato)}</p>
            <p>Næringsinntekt: {næringsinntekt}</p>
            <p>Registrert i land: {registrertINorge ? 'Norge' : registrertILand}</p>
            {nyIArbeidslivet !== undefined && <p>Ny i arbeidslivet: {nyIArbeidslivet ? 'Ja' : 'Nei'}</p>}
            {hattVarigEndringAvNæringsinntektSiste4Kalenderår !== undefined && (
                <p>
                    Har hatt varig endring av næringsinntekt siste 4 kalenderår:{' '}
                    {hattVarigEndringAvNæringsinntektSiste4Kalenderår ? 'Ja' : 'Nei'}
                </p>
            )}
            {hattVarigEndringAvNæringsinntektSiste4Kalenderår === true && (
                <>
                    <p>Dato for endring av næringsinntekt: {formatDate(endringAvNæringsinntektInformasjon!.dato)}</p>
                    <p>
                        Næringsinntekt etter endring: {endringAvNæringsinntektInformasjon!.næringsinntektEtterEndring}
                    </p>
                    <p>Forklaring av endring av næringsinntekt: {endringAvNæringsinntektInformasjon!.forklaring}</p>
                </>
            )}
            {harRegnskapsfører === true && (
                <>
                    <p>Regnskapsførers navn: {regnskapsfører.navn}</p>
                    <p>Regnskapsførers telefonnummer: {regnskapsfører.telefonnummer}</p>
                    <p>
                        Regnskapsfører er nær venn eller familie: {regnskapsfører.erNærVennEllerFamilie ? 'Ja' : 'Nei'}
                    </p>
                </>
            )}
            {harRegnskapsfører === false &&
                harRevisor === true && (
                    <>
                        <p>Revisors navn: {revisor.navn}</p>
                        <p>Revisors telefonnummer: {revisor.telefonnummer}</p>
                        <p>Revisor er nær venn eller familie: {revisor.erNærVennEllerFamilie ? 'Ja' : 'Nei'}</p>
                        <p>
                            Har gitt samtykke til NAV til å innhente opplysninger fra revisor:{' '}
                            {kanInnhenteOpplsyningerFraRevisor ? 'Ja' : 'Nei'}
                        </p>
                    </>
                )}
        </>
    );
};

export default Næringsdetaljer;
