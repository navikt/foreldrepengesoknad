import { FormattedMessage } from 'react-intl';

import { FormSummary, Link, VStack } from '@navikt/ds-react';

import Tilrettelegging, { Arbeidsforholdstype } from 'app/types/Tilrettelegging';

export function DokumentasjonOppsummering({
    tilrettelegginger,
    onVilEndreSvar,
}: {
    readonly tilrettelegginger: Tilrettelegging[];
    readonly onVilEndreSvar: () => Promise<void>;
}) {
    return (
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="2">
                    <FormattedMessage id="oppsummering.dokumentasjon.tittel" />
                </FormSummary.Heading>
                <FormSummary.EditLink onClick={onVilEndreSvar}>
                    <FormattedMessage id="oppsummering.EndreSvar" />
                </FormSummary.EditLink>
            </FormSummary.Header>
            <FormSummary.Answers>
                {tilrettelegginger.map((tilrettelegging) => (
                    <FormSummary.Answer key={tilrettelegging.id}>
                        <FormSummary.Label>
                            <DokumentasjonLabel tilrettelegging={tilrettelegging} />
                        </FormSummary.Label>
                        <FormSummary.Value>
                            <VStack>
                                {tilrettelegging.vedlegg.map((vedlegg) => (
                                    <Link key={vedlegg.id} href={vedlegg.url} target="_blank">
                                        {vedlegg.filename}
                                    </Link>
                                ))}
                            </VStack>
                        </FormSummary.Value>
                    </FormSummary.Answer>
                ))}
            </FormSummary.Answers>
        </FormSummary>
    );
}

function DokumentasjonLabel({ tilrettelegging }: { readonly tilrettelegging: Tilrettelegging }) {
    switch (tilrettelegging.arbeidsforhold.type) {
        case Arbeidsforholdstype.FRILANSER:
            return <FormattedMessage id="oppsummering.dokumentasjon.frilanser" />;
        case Arbeidsforholdstype.SELVSTENDIG:
            return <FormattedMessage id="oppsummering.dokumentasjon.selvstendig" />;
        default:
            return (
                <FormattedMessage
                    id="oppsummering.dokumentasjon.virksomhet"
                    values={{ arbeidsforholdNavn: tilrettelegging.arbeidsforhold.navn }}
                />
            );
    }
}
