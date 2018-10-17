import * as React from 'react';
import { formatDate } from '../../../../../app/util/dates/dates';
import { Næring } from '../../../../../app/types/søknad/SelvstendigNæringsdrivendeInformasjon';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import Feltoppsummering from 'common/components/feltoppsummering/Feltoppsummering';

interface NæringsdetaljerProps {
    næring: Næring;
}

type Props = NæringsdetaljerProps & InjectedIntlProps;

const Næringsdetaljer: React.StatelessComponent<Props> = ({ næring, intl }: Props) => {
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
            <Feltoppsummering
                feltnavn={getMessage(intl, 'oppsummering.selvstendigNæringsdrivende.næringstype')}
                verdi={næringstyper.join(', ')}
            />
            <p>
                {getMessage(intl, 'oppsummering.selvstendigNæringsdrivende.orgnr')}: {organisasjonsnummer}
            </p>
            <p>
                {getMessage(intl, 'oppsummering.selvstendigNæringsdrivende.stillingsprosent')}: {stillingsprosent}
            </p>
            <p>
                {getMessage(intl, 'oppsummering.selvstendigNæringsdrivende.oppstartsdato')}: {formatDate(oppstartsdato)}
            </p>
            <p>
                {getMessage(intl, 'oppsummering.selvstendigNæringsdrivende.næringsinntekt')}: {næringsinntekt}
            </p>
            <p>
                {getMessage(intl, 'oppsummering.selvstendigNæringsdrivende.registrertLand')}:
                {registrertINorge ? 'Norge' : registrertILand}
            </p>
            {nyIArbeidslivet !== undefined && (
                <p>
                    {getMessage(intl, 'oppsummering.selvstendigNæringsdrivende.nyIArbeidslivet')}:
                    {nyIArbeidslivet ? getMessage(intl, 'ja') : getMessage(intl, 'nei')}
                </p>
            )}
            {hattVarigEndringAvNæringsinntektSiste4Kalenderår !== undefined && (
                <p>
                    {getMessage(
                        intl,
                        'oppsummering.selvstendigNæringsdrivende.hattVarigEndringAvNæringsinntektSiste4Kalenderår'
                    )}:
                    {hattVarigEndringAvNæringsinntektSiste4Kalenderår
                        ? getMessage(intl, 'ja')
                        : getMessage(intl, 'nei')}
                </p>
            )}
            {hattVarigEndringAvNæringsinntektSiste4Kalenderår === true && (
                <>
                    <p>
                        {getMessage(intl, 'oppsummering.selvstendigNæringsdrivende.datoForEndringAvNæringsinntekt')}:
                        {formatDate(endringAvNæringsinntektInformasjon!.dato)}
                    </p>
                    <p>
                        {getMessage(intl, 'oppsummering.selvstendigNæringsdrivende.næringsinntektEtterEndring')}:
                        {endringAvNæringsinntektInformasjon!.næringsinntektEtterEndring}
                    </p>
                    <p>
                        {getMessage(intl, 'oppsummering.selvstendigNæringsdrivende.forklaring')}:
                        {endringAvNæringsinntektInformasjon!.forklaring}
                    </p>
                </>
            )}
            {harRegnskapsfører === true && (
                <>
                    <p>
                        {getMessage(intl, 'oppsummering.selvstendigNæringsdrivende.regnskapsførerNavn')}:
                        {regnskapsfører.navn}
                    </p>
                    <p>
                        {getMessage(intl, 'oppsummering.selvstendigNæringsdrivende.regnskapsførerTlf')}:
                        {regnskapsfører.telefonnummer}
                    </p>
                    <p>
                        {getMessage(intl, 'oppsummering.selvstendigNæringsdrivende.regnskapsførerNærVennEllerFamilie')}:
                        {regnskapsfører.erNærVennEllerFamilie ? getMessage(intl, 'ja') : getMessage(intl, 'nei')}
                    </p>
                </>
            )}
            {harRegnskapsfører === false &&
                harRevisor === true && (
                    <>
                        <p>
                            {getMessage(intl, 'oppsummering.selvstendigNæringsdrivende.revisorNavn')}: {revisor.navn}
                        </p>
                        <p>
                            {getMessage(intl, 'oppsummering.selvstendigNæringsdrivende.revisorTlf')}:
                            {revisor.telefonnummer}
                        </p>
                        <p>
                            {getMessage(intl, 'oppsummering.selvstendigNæringsdrivende.revisorNærVennEllerFamilie')}:
                            {revisor.erNærVennEllerFamilie ? getMessage(intl, 'ja') : getMessage(intl, 'nei')}
                        </p>
                        <p>
                            {getMessage(intl, 'oppsummering.selvstendigNæringsdrivende.harGittRevisorSamtykke')}:
                            {kanInnhenteOpplsyningerFraRevisor ? getMessage(intl, 'ja') : getMessage(intl, 'nei')}
                        </p>
                    </>
                )}
        </>
    );
};

export default injectIntl(Næringsdetaljer);
