import { BodyShort, VStack } from '@navikt/ds-react';
import { useIntl } from 'react-intl';
import Oppsummeringspunkt from '../Oppsummeringspunkt';
import { Person } from '@navikt/fp-types';

const fullNameFormat = (fornavn: string, etternavn: string, mellomnavn?: string) => {
    return mellomnavn ? `${fornavn} ${mellomnavn} ${etternavn}` : `${fornavn} ${etternavn}`;
};

interface Props {
    person: Person;
}

const DegOppsummeringspunkt: React.FunctionComponent<Props> = ({ person }) => {
    const intl = useIntl();

    return (
        <Oppsummeringspunkt tittel={intl.formatMessage({ id: 'DegOppsummeringspunkt.OmDeg' })}>
            <VStack gap="4">
                <BodyShort>{fullNameFormat(person.fornavn, person.etternavn, person.mellomnavn)}</BodyShort>
                <BodyShort>{person.fnr}</BodyShort>
            </VStack>
        </Oppsummeringspunkt>
    );
};

export default DegOppsummeringspunkt;
