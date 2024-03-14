import { BodyShort, VStack } from '@navikt/ds-react';

import { Søker } from '@navikt/fp-types';

import Oppsummeringspunkt from '../Oppsummeringspunkt';
import useOppsummeringIntl from '../intl/useOppsummeringIntl';

const fullNameFormat = (fornavn: string, etternavn: string, mellomnavn?: string) => {
    return mellomnavn ? `${fornavn} ${mellomnavn} ${etternavn}` : `${fornavn} ${etternavn}`;
};

interface Props {
    søker: Søker;
}

const SøkerOppsummeringspunkt: React.FunctionComponent<Props> = ({ søker }) => {
    const intl = useOppsummeringIntl();

    return (
        <Oppsummeringspunkt tittel={intl.formatMessage({ id: 'DegOppsummeringspunkt.OmDeg' })}>
            <VStack gap="4">
                <BodyShort>{fullNameFormat(søker.fornavn, søker.etternavn, søker.mellomnavn)}</BodyShort>
                <BodyShort>{søker.fnr}</BodyShort>
            </VStack>
        </Oppsummeringspunkt>
    );
};

export default SøkerOppsummeringspunkt;
