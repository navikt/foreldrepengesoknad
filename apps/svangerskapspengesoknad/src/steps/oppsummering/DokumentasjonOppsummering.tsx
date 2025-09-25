import { FormattedMessage, useIntl } from 'react-intl';
import { getArbeidsgiverNavnForTilrettelegging } from 'utils/tilretteleggingUtils';

import { BodyShort, FormSummary, Link, VStack } from '@navikt/ds-react';

import { EGEN_NÆRING_ID } from '@navikt/fp-steg-egen-naering';
import { Arbeidsforhold, Attachment, FRILANS_ID } from '@navikt/fp-types';
import { capitalizeFirstLetterInEveryWordOnly } from '@navikt/fp-utils';

export function DokumentasjonOppsummering({
    tilretteleggingerVedlegg,
    onVilEndreSvar,
    alleArbeidsforhold,
}: {
    readonly tilretteleggingerVedlegg: Record<string, Attachment[]>;
    readonly onVilEndreSvar: () => void;
    readonly alleArbeidsforhold: Arbeidsforhold[];
}) {
    return (
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="2">
                    <FormattedMessage id="oppsummering.dokumentasjon.tittel" />
                </FormSummary.Heading>
            </FormSummary.Header>
            <FormSummary.Answers>
                {Object.keys(tilretteleggingerVedlegg).map((tilretteleggingId) => (
                    <FormSummary.Answer key={tilretteleggingId}>
                        <FormSummary.Label>
                            <DokumentasjonLabel
                                tilretteleggingId={tilretteleggingId}
                                alleArbeidsforhold={alleArbeidsforhold}
                            />
                        </FormSummary.Label>
                        <FormSummary.Value>
                            <VStack>
                                {tilretteleggingerVedlegg[tilretteleggingId].map((vedlegg) => {
                                    return vedlegg.url ? (
                                        <Link key={vedlegg.id} href={vedlegg.url} target="_blank">
                                            {vedlegg.filename}
                                        </Link>
                                    ) : (
                                        <BodyShort key={vedlegg.id}>{vedlegg.filename}</BodyShort>
                                    );
                                })}
                            </VStack>
                        </FormSummary.Value>
                    </FormSummary.Answer>
                ))}
            </FormSummary.Answers>
            <FormSummary.Footer>
                <FormSummary.EditLink onClick={onVilEndreSvar}>
                    <FormattedMessage id="oppsummering.EndreSvar" />
                </FormSummary.EditLink>
            </FormSummary.Footer>
        </FormSummary>
    );
}

function DokumentasjonLabel({
    tilretteleggingId,
    alleArbeidsforhold,
}: {
    readonly tilretteleggingId: string;
    readonly alleArbeidsforhold: Arbeidsforhold[];
}) {
    const intl = useIntl();
    switch (tilretteleggingId) {
        case FRILANS_ID:
            return <FormattedMessage id="oppsummering.dokumentasjon.frilanser" />;
        case EGEN_NÆRING_ID:
            return <FormattedMessage id="oppsummering.dokumentasjon.selvstendig" />;
        default: {
            const navn = getArbeidsgiverNavnForTilrettelegging(intl, tilretteleggingId, alleArbeidsforhold);
            return (
                <FormattedMessage
                    id="oppsummering.dokumentasjon.virksomhet"
                    values={{
                        arbeidsforholdNavn: capitalizeFirstLetterInEveryWordOnly(navn),
                    }}
                />
            );
        }
    }
}
