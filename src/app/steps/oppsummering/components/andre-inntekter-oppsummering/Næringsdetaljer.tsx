import { formatDate, intlUtils } from '@navikt/fp-common';
import { Næring } from 'app/context/types/Næring';
import { ISOStringToDate } from 'app/utils/dateUtils';
import * as countries from 'i18n-iso-countries';
import { Normaltekst } from 'nav-frontend-typografi';
import React, { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';
import OppsummeringsPunkt from '../OppsummeringsPunkt';

interface Props {
    næring: Næring;
}

const Næringsdetaljer: FunctionComponent<Props> = ({ næring }) => {
    const intl = useIntl();
    const {
        næringstyper,
        organisasjonsnummer,
        næringsinntekt,
        registrertINorge,
        registrertILand,
        harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene,
        hattVarigEndringAvNæringsinntektSiste4Kalenderår,
        endringAvNæringsinntektInformasjon,
        harRegnskapsfører,
        regnskapsfører,
    } = næring;

    return (
        <>
            <OppsummeringsPunkt title={intlUtils(intl, 'oppsummering.selvstendigNæringsdrivende.næringstype')}>
                <Normaltekst>
                    {næringstyper
                        .map((næringstype) => intlUtils(intl, `næringstype.${næringstype.toLowerCase()}`))
                        .join(', ')}
                </Normaltekst>
            </OppsummeringsPunkt>
            {organisasjonsnummer && (
                <OppsummeringsPunkt title={intlUtils(intl, 'oppsummering.selvstendigNæringsdrivende.orgnr')}>
                    <Normaltekst>{organisasjonsnummer}</Normaltekst>
                </OppsummeringsPunkt>
            )}
            {næringsinntekt && (
                <OppsummeringsPunkt title={intlUtils(intl, 'oppsummering.selvstendigNæringsdrivende.næringsinntekt')}>
                    <Normaltekst>{næringsinntekt}</Normaltekst>
                </OppsummeringsPunkt>
            )}
            {registrertINorge ||
                (registrertILand && (
                    <OppsummeringsPunkt
                        title={intlUtils(intl, 'oppsummering.selvstendigNæringsdrivende.registrertLand')}
                    >
                        <Normaltekst>
                            {registrertINorge ? 'Norge' : countries.getName(registrertILand, 'nb')}
                        </Normaltekst>
                    </OppsummeringsPunkt>
                ))}
            {harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene && (
                <OppsummeringsPunkt
                    title={intlUtils(intl, 'oppsummering.selvstendigNæringsdrivende.blittYrkesaktivSiste3År')}
                >
                    <Normaltekst>
                        {harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene
                            ? intlUtils(intl, 'ja')
                            : intlUtils(intl, 'nei')}
                    </Normaltekst>
                </OppsummeringsPunkt>
            )}
            {hattVarigEndringAvNæringsinntektSiste4Kalenderår === true && (
                <>
                    <OppsummeringsPunkt
                        title={intlUtils(
                            intl,
                            'oppsummering.selvstendigNæringsdrivende.datoForEndringAvNæringsinntekt'
                        )}
                    >
                        <Normaltekst>
                            {formatDate(ISOStringToDate(endringAvNæringsinntektInformasjon?.dato)!)}
                        </Normaltekst>
                    </OppsummeringsPunkt>
                    <OppsummeringsPunkt
                        title={intlUtils(intl, 'oppsummering.selvstendigNæringsdrivende.næringsinntektEtterEndring')}
                    >
                        <Normaltekst>{endringAvNæringsinntektInformasjon!.næringsinntektEtterEndring}</Normaltekst>
                    </OppsummeringsPunkt>
                    <OppsummeringsPunkt title={intlUtils(intl, 'oppsummering.selvstendigNæringsdrivende.forklaring')}>
                        <Normaltekst>{endringAvNæringsinntektInformasjon!.forklaring}</Normaltekst>
                    </OppsummeringsPunkt>
                </>
            )}
            {harRegnskapsfører === true && regnskapsfører && (
                <>
                    <OppsummeringsPunkt
                        title={intlUtils(intl, 'oppsummering.selvstendigNæringsdrivende.regnskapsførerNavn')}
                    >
                        <Normaltekst>{regnskapsfører.navn}</Normaltekst>
                    </OppsummeringsPunkt>
                    <OppsummeringsPunkt
                        title={intlUtils(intl, 'oppsummering.selvstendigNæringsdrivende.regnskapsførerTlf')}
                    >
                        <Normaltekst>{regnskapsfører.telefonnummer}</Normaltekst>
                    </OppsummeringsPunkt>
                    <OppsummeringsPunkt
                        title={intlUtils(
                            intl,
                            'oppsummering.selvstendigNæringsdrivende.regnskapsførerNærVennEllerFamilie'
                        )}
                    >
                        <Normaltekst>
                            {regnskapsfører.erNærVennEllerFamilie ? intlUtils(intl, 'ja') : intlUtils(intl, 'nei')}
                        </Normaltekst>
                    </OppsummeringsPunkt>
                </>
            )}
            {harRegnskapsfører === false && (
                <OppsummeringsPunkt title={intlUtils(intl, 'oppsummering.selvstendigNæringsdrivende.regnskapsfører')}>
                    <Normaltekst>
                        {intlUtils(intl, 'oppsummering.selvstendigNæringsdrivende.harIkkeRegnskapsfører')}
                    </Normaltekst>
                </OppsummeringsPunkt>
            )}
        </>
    );
};

export default Næringsdetaljer;
