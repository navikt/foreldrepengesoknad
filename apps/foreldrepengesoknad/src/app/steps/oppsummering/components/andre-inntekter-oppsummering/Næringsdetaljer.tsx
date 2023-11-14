import { formatDate, intlUtils } from '@navikt/fp-common';
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
            <OppsummeringsPunkt title={intlUtils(intl, 'oppsummering.selvstendigNæringsdrivende.næringstype')}>
                <BodyShort>{intlUtils(intl, `næringstype.${næringstyper[0].toLowerCase()}`)}</BodyShort>
            </OppsummeringsPunkt>
            {organisasjonsnummer && (
                <OppsummeringsPunkt title={intlUtils(intl, 'oppsummering.selvstendigNæringsdrivende.orgnr')}>
                    <BodyShort>{organisasjonsnummer}</BodyShort>
                </OppsummeringsPunkt>
            )}
            {næringsinntekt && (
                <OppsummeringsPunkt title={intlUtils(intl, 'oppsummering.selvstendigNæringsdrivende.næringsinntekt')}>
                    <BodyShort>{næringsinntekt}</BodyShort>
                </OppsummeringsPunkt>
            )}
            {registrertINorge ||
                (registrertILand && (
                    <OppsummeringsPunkt
                        title={intlUtils(intl, 'oppsummering.selvstendigNæringsdrivende.registrertLand')}
                    >
                        <BodyShort>{registrertINorge ? 'Norge' : countries.getName(registrertILand, 'nb')}</BodyShort>
                    </OppsummeringsPunkt>
                ))}
            {harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene && (
                <OppsummeringsPunkt
                    title={intlUtils(intl, 'oppsummering.selvstendigNæringsdrivende.blittYrkesaktivSiste3År')}
                >
                    <BodyShort>
                        {harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene
                            ? intlUtils(intl, 'ja')
                            : intlUtils(intl, 'nei')}
                    </BodyShort>
                </OppsummeringsPunkt>
            )}
            {hattVarigEndringAvNæringsinntektSiste4Kalenderår === true && (
                <>
                    <OppsummeringsPunkt
                        title={intlUtils(
                            intl,
                            'oppsummering.selvstendigNæringsdrivende.datoForEndringAvNæringsinntekt',
                        )}
                    >
                        <BodyShort>{formatDate(endringAvNæringsinntektInformasjon!.dato)}</BodyShort>
                    </OppsummeringsPunkt>
                    <OppsummeringsPunkt
                        title={intlUtils(intl, 'oppsummering.selvstendigNæringsdrivende.næringsinntektEtterEndring')}
                    >
                        <BodyShort>{endringAvNæringsinntektInformasjon!.næringsinntektEtterEndring}</BodyShort>
                    </OppsummeringsPunkt>
                    <OppsummeringsPunkt title={intlUtils(intl, 'oppsummering.selvstendigNæringsdrivende.forklaring')}>
                        <BodyShort>{endringAvNæringsinntektInformasjon!.forklaring}</BodyShort>
                    </OppsummeringsPunkt>
                </>
            )}
        </>
    );
};

export default Næringsdetaljer;
