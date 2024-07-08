import React from 'react';
import { useIntl } from 'react-intl';

import { FormSummary } from '@navikt/ds-react';

import { Søker } from '@navikt/fp-types';

const fullNameFormat = (fornavn: string, etternavn: string, mellomnavn?: string) => {
    return mellomnavn ? `${fornavn} ${mellomnavn} ${etternavn}` : `${fornavn} ${etternavn}`;
};

interface Props {
    søker: Søker;
}

const SøkerOppsummeringspunkt: React.FunctionComponent<Props> = ({ søker }) => {
    const intl = useIntl();

    return (
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="2">
                    {intl.formatMessage({ id: 'DegOppsummeringspunkt.OmDeg' })}
                </FormSummary.Heading>
            </FormSummary.Header>
            <FormSummary.Answers>
                <FormSummary.Answer>
                    <FormSummary.Label>Navn og fødselsnummer</FormSummary.Label>
                    <FormSummary.Value>
                        {fullNameFormat(søker.fornavn, søker.etternavn, søker.mellomnavn)}, {søker.fnr}
                    </FormSummary.Value>
                </FormSummary.Answer>
            </FormSummary.Answers>
        </FormSummary>
    );
};

export default SøkerOppsummeringspunkt;
