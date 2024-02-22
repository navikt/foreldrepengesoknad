import dayjs from 'dayjs';
import { FunctionComponent } from 'react';
import { IntlShape, useIntl } from 'react-intl';

import { BodyShort, Box, HStack, VStack } from '@navikt/ds-react';

import { formatDate } from '@navikt/fp-utils';

import { Arbeidsforholdstype, TilretteleggingPeriode, Tilretteleggingstype } from 'app/types/Tilrettelegging';

interface Props {
    periode: TilretteleggingPeriode;
    sisteDagForSvangerskapspenger: string;
    kanHaSvpFremTilTreUkerFørTermin: boolean;
}

const getDatoText = (
    intl: IntlShape,
    sisteDagForSvangerskapspenger: string,
    periode: TilretteleggingPeriode,
    kanHaSvpFremTilTreUkerFørTermin: boolean,
) => {
    const varerTilSisteDagMedSvp = dayjs(periode.tom).isSame(sisteDagForSvangerskapspenger, 'd');

    if (!varerTilSisteDagMedSvp) {
        return intl.formatMessage(
            { id: 'oppsummering.periode.fraTil' },
            {
                fraDato: formatDate(periode.fom),
                tilDato: formatDate(periode.tom),
            },
        );
    } else if (kanHaSvpFremTilTreUkerFørTermin) {
        return intl.formatMessage(
            { id: 'oppsummering.periode.fremTilTreUkerFørTermin' },
            {
                fraDato: formatDate(periode.fom),
            },
        );
    } else {
        return intl.formatMessage(
            { id: 'oppsummering.periode.fremTilFødsel' },
            {
                fraDato: formatDate(periode.fom),
            },
        );
    }
};

const getStillingsprosentTekst = (periode: TilretteleggingPeriode, intl: IntlShape): string => {
    if (periode.type === Tilretteleggingstype.HEL) {
        return intl.formatMessage({ id: 'oppsummering.periode.tilbakeIFullJobb' });
    }
    if (periode.type === Tilretteleggingstype.INGEN) {
        return intl.formatMessage({ id: 'oppsummering.periode.ikkeJobbe' });
    }
    return intl.formatMessage(
        { id: 'oppsummering.periode.stillingsprosent' },
        {
            stillingsprosent: periode.stillingsprosent,
        },
    );
};

const PeriodeVisning: FunctionComponent<Props> = ({
    periode,
    sisteDagForSvangerskapspenger,
    kanHaSvpFremTilTreUkerFørTermin,
}) => {
    const intl = useIntl();
    const labelText = getDatoText(intl, sisteDagForSvangerskapspenger, periode, kanHaSvpFremTilTreUkerFørTermin);

    const stillingsprosentText = getStillingsprosentTekst(periode, intl);
    const navnArbeidsgiver =
        periode.arbeidsforhold.type === Arbeidsforholdstype.SELVSTENDIG &&
        periode.arbeidsforhold.navn.trim().length === 0
            ? intl.formatMessage({ id: 'egenNæring' })
            : periode.arbeidsforhold.navn;
    return (
        <Box padding="4" background="surface-action-subtle" borderRadius="medium">
            <VStack gap="4">
                <HStack justify="space-between">
                    <BodyShort style={{ fontWeight: 'bold' }}>{labelText}</BodyShort>
                    <BodyShort>{navnArbeidsgiver.toUpperCase()}</BodyShort>
                </HStack>
                <BodyShort>{stillingsprosentText}</BodyShort>
            </VStack>
        </Box>
    );
};

export default PeriodeVisning;
