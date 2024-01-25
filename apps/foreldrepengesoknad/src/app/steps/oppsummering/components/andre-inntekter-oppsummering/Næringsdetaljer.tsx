import { formatDate } from '@navikt/fp-common';
import { Næring } from 'app/context/types/Næring';
import * as countries from 'i18n-iso-countries';
import { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';
import OppsummeringsPunkt from '../OppsummeringsPunkt';
import { BodyShort } from '@navikt/ds-react';

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
    } = næring;

    return (
        <>
            <OppsummeringsPunkt
                title={intl.formatMessage({ id: 'oppsummering.selvstendigNæringsdrivende.næringstype' })}
            >
                <BodyShort>{intl.formatMessage({ id: `næringstype.${næringstyper[0].toLowerCase()}` })}</BodyShort>
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
                    <OppsummeringsPunkt
                        title={intl.formatMessage({
                            id: 'oppsummering.selvstendigNæringsdrivende.datoForEndringAvNæringsinntekt',
                        })}
                    >
                        <BodyShort>{formatDate(endringAvNæringsinntektInformasjon!.dato)}</BodyShort>
                    </OppsummeringsPunkt>
                    <OppsummeringsPunkt
                        title={intl.formatMessage({
                            id: 'oppsummering.selvstendigNæringsdrivende.næringsinntektEtterEndring',
                        })}
                    >
                        <BodyShort>{endringAvNæringsinntektInformasjon!.næringsinntektEtterEndring}</BodyShort>
                    </OppsummeringsPunkt>
                    <OppsummeringsPunkt
                        title={intl.formatMessage({ id: 'oppsummering.selvstendigNæringsdrivende.forklaring' })}
                    >
                        <BodyShort>{endringAvNæringsinntektInformasjon!.forklaring}</BodyShort>
                    </OppsummeringsPunkt>
                </>
            )}
        </>
    );
};

export default Næringsdetaljer;
