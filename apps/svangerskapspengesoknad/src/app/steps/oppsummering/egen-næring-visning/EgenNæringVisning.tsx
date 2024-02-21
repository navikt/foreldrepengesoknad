import { BodyShort, Box, VStack } from '@navikt/ds-react';
import { DATE_4_YEARS_AGO } from '@navikt/fp-constants';
import { formatDate, getCountryName, isValidDate } from '@navikt/fp-utils';
import { EgenNæring } from 'app/types/EgenNæring';
import dayjs from 'dayjs';
import { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

const erVirksomhetRegnetSomNyoppstartet = (oppstartsdato: string | undefined): boolean => {
    if (!isValidDate(oppstartsdato)) {
        return true;
    }
    return !oppstartsdato || dayjs(oppstartsdato).startOf('day').isAfter(DATE_4_YEARS_AGO, 'day');
};

interface Props {
    næring: EgenNæring;
    setSelectedNæring?: React.Dispatch<React.SetStateAction<EgenNæring | undefined>>;
    deleteNæring?: (næring: EgenNæring) => void;
}

const EgenNæringVisning: FunctionComponent<Props> = ({ næring }) => {
    const intl = useIntl();
    const tilTekst = !næring.pågående && næring.tomDato ? formatDate(næring.tomDato) : 'Pågående';
    const erNyoppstartetNæring = erVirksomhetRegnetSomNyoppstartet(næring.fomDato);

    return (
        <Box padding="4" background="surface-action-subtle" borderRadius="medium">
            <VStack gap="4">
                <BodyShort style={{ fontWeight: 'bold' }}>{næring.navnPåNæringen}</BodyShort>
                {næring.registrertINorge && (
                    <BodyShort>
                        <FormattedMessage
                            id="egenNæring.visning.orgnr"
                            values={{
                                orgnr: næring.organisasjonsnummer,
                            }}
                        />
                    </BodyShort>
                )}
                {!næring.registrertINorge && næring.registrertILand && (
                    <BodyShort>{getCountryName(næring.registrertILand, intl.locale)}</BodyShort>
                )}
                <BodyShort>
                    {formatDate(næring.fomDato)} - {tilTekst}
                </BodyShort>
                {næring.næringsinntekt && (
                    <BodyShort>
                        <FormattedMessage
                            id="egenNæring.visning.inntekt"
                            values={{
                                inntekt: næring.næringsinntekt,
                            }}
                        />
                    </BodyShort>
                )}
                {!erNyoppstartetNæring && næring.hattVarigEndringAvNæringsinntektSiste4Kalenderår && (
                    <div>
                        <BodyShort>
                            <FormattedMessage
                                id="egenNæring.visning.varigEndring"
                                values={{
                                    dato: næring.varigEndringDato ? formatDate(næring.varigEndringDato) : '-',
                                    inntekt: næring.varigEndringInntektEtterEndring,
                                }}
                            />
                        </BodyShort>
                        <BodyShort>
                            <FormattedMessage
                                id="egenNæring.visning.varigEndring.beskrivelse"
                                values={{
                                    beskrivelse: næring.varigEndringBeskrivelse,
                                }}
                            />
                        </BodyShort>
                    </div>
                )}
                {!erNyoppstartetNæring && !næring.hattVarigEndringAvNæringsinntektSiste4Kalenderår && (
                    <BodyShort>
                        <FormattedMessage id="egenNæring.visning.varigEndring.ingen" />
                    </BodyShort>
                )}
                {erNyoppstartetNæring && næring.harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene && (
                    <BodyShort>
                        <FormattedMessage
                            id="egenNæring.visning.yrkesaktivSiste3år"
                            values={{
                                dato: næring.oppstartsdato ? formatDate(næring.oppstartsdato) : '-',
                            }}
                        />
                    </BodyShort>
                )}
                {erNyoppstartetNæring && !næring.harBlittYrkesaktivILøpetAvDeTreSisteFerdigliknedeÅrene && (
                    <BodyShort>
                        <FormattedMessage id="egenNæring.visning.ikkeYrkesaktivSiste3år" />
                    </BodyShort>
                )}
            </VStack>
        </Box>
    );
};
export default EgenNæringVisning;
