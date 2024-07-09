import { FormattedMessage } from 'react-intl';

import { FormSummary } from '@navikt/ds-react';

import { Søker } from '@navikt/fp-types';

const fullNameFormat = (fornavn: string, etternavn: string, mellomnavn?: string) => {
    return mellomnavn ? `${fornavn} ${mellomnavn} ${etternavn}` : `${fornavn} ${etternavn}`;
};

interface Props {
    søker: Søker;
}

const SøkerOppsummeringspunkt = ({ søker }: Props) => {
    return (
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="2">
                    <FormattedMessage id="DegOppsummeringspunkt.tittel" />
                </FormSummary.Heading>
            </FormSummary.Header>
            <FormSummary.Answers>
                <FormSummary.Answer>
                    <FormSummary.Label>
                        <FormattedMessage id="DegOppsummeringspunkt.info" />
                    </FormSummary.Label>
                    <FormSummary.Value>
                        {fullNameFormat(søker.fornavn, søker.etternavn, søker.mellomnavn)}, {søker.fnr}
                    </FormSummary.Value>
                </FormSummary.Answer>
            </FormSummary.Answers>
        </FormSummary>
    );
};

export default SøkerOppsummeringspunkt;
