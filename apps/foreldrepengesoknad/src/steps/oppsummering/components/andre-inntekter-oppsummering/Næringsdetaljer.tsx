import * as countries from 'i18n-iso-countries';
import { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';

import { BodyShort } from '@navikt/ds-react';

import { EgenNæring } from '@navikt/fp-steg-egen-naering';
import { formatDate } from '@navikt/fp-utils';

import OppsummeringsPunkt from '../OppsummeringsPunkt';

interface Props {
    egenNæring: EgenNæring;
}

const Næringsdetaljer: FunctionComponent<Props> = ({ egenNæring }) => {
    const intl = useIntl();
    const {
        næringstype,
        organisasjonsnummer,
        næringsinntekt,
        registrertINorge,
        registrertILand,
        harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene,
        hattVarigEndringAvNæringsinntektSiste4Kalenderår,
        varigEndringDato,
        varigEndringInntektEtterEndring,
        varigEndringBeskrivelse,
    } = egenNæring;

    return (
        <>
            <OppsummeringsPunkt
                title={intl.formatMessage({ id: 'oppsummering.selvstendigNæringsdrivende.næringstype' })}
            >
                <BodyShort>{intl.formatMessage({ id: `næringstype.${næringstype.toLowerCase()}` })}</BodyShort>
            </OppsummeringsPunkt>
            {organisasjonsnummer && (
                <OppsummeringsPunkt title={intl.formatMessage({ id: 'oppsummering.selvstendigNæringsdrivende.orgnr' })}>
                    <BodyShort>{organisasjonsnummer}</BodyShort>
                </OppsummeringsPunkt>
            )}
            {næringsinntekt && (
                <OppsummeringsPunkt
                    title={intl.formatMessage({ id: 'oppsummering.selvstendigNæringsdrivende.næringsinntekt' })}
                >
                    <BodyShort>{næringsinntekt}</BodyShort>
                </OppsummeringsPunkt>
            )}
            {registrertINorge ||
                (registrertILand && (
                    <OppsummeringsPunkt
                        title={intl.formatMessage({ id: 'oppsummering.selvstendigNæringsdrivende.registrertLand' })}
                    >
                        <BodyShort>{registrertINorge ? 'Norge' : countries.getName(registrertILand, 'nb')}</BodyShort>
                    </OppsummeringsPunkt>
                ))}
            {harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene && (
                <OppsummeringsPunkt
                    title={intl.formatMessage({
                        id: 'oppsummering.selvstendigNæringsdrivende.blittYrkesaktivSiste3År',
                    })}
                >
                    <BodyShort>
                        {harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene
                            ? intl.formatMessage({ id: 'ja' })
                            : intl.formatMessage({ id: 'nei' })}
                    </BodyShort>
                </OppsummeringsPunkt>
            )}
            {hattVarigEndringAvNæringsinntektSiste4Kalenderår === true && (
                <>
                    {varigEndringDato && (
                        <OppsummeringsPunkt
                            title={intl.formatMessage({
                                id: 'oppsummering.selvstendigNæringsdrivende.datoForEndringAvNæringsinntekt',
                            })}
                        >
                            <BodyShort>{formatDate(varigEndringDato)}</BodyShort>
                        </OppsummeringsPunkt>
                    )}
                    <OppsummeringsPunkt
                        title={intl.formatMessage({
                            id: 'oppsummering.selvstendigNæringsdrivende.næringsinntektEtterEndring',
                        })}
                    >
                        <BodyShort>{varigEndringInntektEtterEndring}</BodyShort>
                    </OppsummeringsPunkt>
                    <OppsummeringsPunkt
                        title={intl.formatMessage({ id: 'oppsummering.selvstendigNæringsdrivende.forklaring' })}
                    >
                        <BodyShort>{varigEndringBeskrivelse}</BodyShort>
                    </OppsummeringsPunkt>
                </>
            )}
        </>
    );
};

export default Næringsdetaljer;
