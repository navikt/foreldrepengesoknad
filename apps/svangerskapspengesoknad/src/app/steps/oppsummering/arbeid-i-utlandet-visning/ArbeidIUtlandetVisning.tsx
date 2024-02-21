import { BodyShort, Box, VStack } from '@navikt/ds-react';
import { formatDate } from '@navikt/fp-common';
import { getCountryName } from '@navikt/fp-utils';
import { ArbeidIUtlandetInput } from 'app/types/ArbeidIUtlandet';
import { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';

interface Props {
    arbeidIUtlandet: ArbeidIUtlandetInput;
}

const getTilTekst = (arbeid: ArbeidIUtlandetInput): string => {
    return !arbeid.pågående && arbeid.tom ? formatDate(arbeid.tom) : 'Pågående';
};

const ArbeidIUtlandetVisning: FunctionComponent<Props> = ({ arbeidIUtlandet }) => {
    const intl = useIntl();

    return (
        <Box padding="4" background="surface-action-subtle" borderRadius="medium">
            <VStack gap="4">
                <BodyShort style={{ fontWeight: 'bold' }}>{arbeidIUtlandet.arbeidsgiverNavn}</BodyShort>
                <BodyShort>{getCountryName(arbeidIUtlandet.land, intl.locale)}</BodyShort>
                <BodyShort>
                    {formatDate(arbeidIUtlandet.fom)} - {getTilTekst(arbeidIUtlandet)}
                </BodyShort>
            </VStack>
        </Box>
    );
};

export default ArbeidIUtlandetVisning;
