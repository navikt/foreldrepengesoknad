import * as React from 'react';
import { useIntl } from 'react-intl';
import { ISOStringToDate } from '@navikt/sif-common-formik/lib';
import * as countries from 'i18n-iso-countries';
import getMessage from 'common/util/i18nUtils';
import Feltoppsummering from 'app/steg/oppsummering/components/feltoppsummering/Feltoppsummering';
import { Næring } from '../../../../../../types/søknad/SelvstendigNæringsdrivendeInformasjon';
import { formatDate } from '../../../../../../util/dates/dates';

interface NæringsdetaljerProps {
    næring: Næring;
}

type Props = NæringsdetaljerProps;

const Næringsdetaljer: React.StatelessComponent<Props> = ({ næring }) => {
    const {
        harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene,
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
        harRevisor,
    } = næring;
    const intl = useIntl();

    return (
        <>
            <Feltoppsummering
                feltnavn={getMessage(intl, 'oppsummering.selvstendigNæringsdrivende.næringstype')}
                verdi={næringstyper
                    .map((næringstype) => getMessage(intl, `næringstype.${næringstype.toLowerCase()}`))
                    .join(', ')}
            />
            {organisasjonsnummer !== undefined && (
                <Feltoppsummering
                    feltnavn={getMessage(intl, 'oppsummering.selvstendigNæringsdrivende.orgnr')}
                    verdi={organisasjonsnummer}
                />
            )}
            {stillingsprosent !== undefined && (
                <Feltoppsummering
                    feltnavn={getMessage(intl, 'oppsummering.selvstendigNæringsdrivende.stillingsprosent')}
                    verdi={stillingsprosent}
                />
            )}
            {næringsinntekt !== undefined && (
                <Feltoppsummering
                    feltnavn={getMessage(intl, 'oppsummering.selvstendigNæringsdrivende.næringsinntekt')}
                    verdi={`${næringsinntekt}`}
                />
            )}
            <Feltoppsummering
                feltnavn={getMessage(intl, 'oppsummering.selvstendigNæringsdrivende.registrertLand')}
                verdi={registrertINorge ? 'Norge' : countries.getName(registrertILand, 'nb')}
            />

            {harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene !== undefined && (
                <Feltoppsummering
                    feltnavn={getMessage(intl, 'oppsummering.selvstendigNæringsdrivende.blittYrkesaktivSiste3År')}
                    verdi={
                        harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene
                            ? getMessage(intl, 'ja')
                            : getMessage(intl, 'nei')
                    }
                />
            )}

            {oppstartsdato !== undefined && (
                <Feltoppsummering
                    feltnavn={getMessage(intl, 'oppsummering.selvstendigNæringsdrivende.oppstartsdato')}
                    verdi={formatDate(ISOStringToDate(oppstartsdato))}
                />
            )}

            {hattVarigEndringAvNæringsinntektSiste4Kalenderår !== undefined && (
                <Feltoppsummering
                    feltnavn={getMessage(
                        intl,
                        'oppsummering.selvstendigNæringsdrivende.hattVarigEndringAvNæringsinntektSiste4Kalenderår'
                    )}
                    verdi={
                        hattVarigEndringAvNæringsinntektSiste4Kalenderår
                            ? getMessage(intl, 'ja')
                            : getMessage(intl, 'nei')
                    }
                />
            )}

            {hattVarigEndringAvNæringsinntektSiste4Kalenderår === true && (
                <>
                    <Feltoppsummering
                        feltnavn={getMessage(
                            intl,
                            'oppsummering.selvstendigNæringsdrivende.datoForEndringAvNæringsinntekt'
                        )}
                        verdi={formatDate(ISOStringToDate(endringAvNæringsinntektInformasjon?.dato))}
                    />
                    <Feltoppsummering
                        feltnavn={getMessage(
                            intl,
                            'oppsummering.selvstendigNæringsdrivende.næringsinntektEtterEndring'
                        )}
                        verdi={`${endringAvNæringsinntektInformasjon!.næringsinntektEtterEndring}`}
                    />
                    <Feltoppsummering
                        feltnavn={getMessage(intl, 'oppsummering.selvstendigNæringsdrivende.forklaring')}
                        verdi={endringAvNæringsinntektInformasjon!.forklaring}
                    />
                </>
            )}

            {harRegnskapsfører === true && (
                <>
                    <Feltoppsummering
                        feltnavn={getMessage(intl, 'oppsummering.selvstendigNæringsdrivende.regnskapsførerNavn')}
                        verdi={regnskapsfører.navn}
                    />
                    <Feltoppsummering
                        feltnavn={getMessage(intl, 'oppsummering.selvstendigNæringsdrivende.regnskapsførerTlf')}
                        verdi={regnskapsfører.telefonnummer}
                    />
                    <Feltoppsummering
                        feltnavn={getMessage(
                            intl,
                            'oppsummering.selvstendigNæringsdrivende.regnskapsførerNærVennEllerFamilie'
                        )}
                        verdi={regnskapsfører.erNærVennEllerFamilie ? getMessage(intl, 'ja') : getMessage(intl, 'nei')}
                    />
                </>
            )}

            {harRegnskapsfører === false && (
                <Feltoppsummering
                    feltnavn={getMessage(intl, 'oppsummering.selvstendigNæringsdrivende.regnskapsfører')}
                    verdi={getMessage(intl, 'oppsummering.selvstendigNæringsdrivende.harIkkeRegnskapsfører')}
                />
            )}

            {harRegnskapsfører === false && harRevisor === true && (
                <>
                    <Feltoppsummering
                        feltnavn={getMessage(intl, 'oppsummering.selvstendigNæringsdrivende.revisorNavn')}
                        verdi={revisor.navn}
                    />
                    <Feltoppsummering
                        feltnavn={getMessage(intl, 'oppsummering.selvstendigNæringsdrivende.revisorTlf')}
                        verdi={revisor.telefonnummer}
                    />
                    <Feltoppsummering
                        feltnavn={getMessage(
                            intl,
                            'oppsummering.selvstendigNæringsdrivende.revisorNærVennEllerFamilie'
                        )}
                        verdi={revisor.erNærVennEllerFamilie ? getMessage(intl, 'ja') : getMessage(intl, 'nei')}
                    />
                    <Feltoppsummering
                        feltnavn={getMessage(intl, 'oppsummering.selvstendigNæringsdrivende.harGittRevisorSamtykke')}
                        verdi={kanInnhenteOpplsyningerFraRevisor ? getMessage(intl, 'ja') : getMessage(intl, 'nei')}
                    />
                </>
            )}

            {harRevisor === false && (
                <Feltoppsummering
                    feltnavn={getMessage(intl, 'oppsummering.selvstendigNæringsdrivende.revisor')}
                    verdi={getMessage(intl, 'oppsummering.selvstendigNæringsdrivende.harIkkeRevisor')}
                />
            )}
        </>
    );
};

export default Næringsdetaljer;
