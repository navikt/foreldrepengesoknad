import { FormattedMessage } from 'react-intl';
import { VedleggDataType } from 'types/VedleggDataType';

import { FormSummary, Link, VStack } from '@navikt/ds-react';

interface Props {
    alleVedlegg?: VedleggDataType;
    onVilEndreSvar: () => Promise<void>;
}

export const DokumentasjonOppsummering = ({ alleVedlegg, onVilEndreSvar }: Props) => {
    if (!alleVedlegg || !Object.values(alleVedlegg).some((v) => v.length > 0)) {
        return null;
    }

    return (
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="2">
                    <FormattedMessage id="DokumentasjonOppsummering.Tittel" />
                </FormSummary.Heading>
                <FormSummary.EditLink onClick={onVilEndreSvar}>
                    <FormattedMessage id="Oppsummering.EndreSvar" />
                </FormSummary.EditLink>
            </FormSummary.Header>
            <FormSummary.Answers>
                {Object.entries(alleVedlegg)
                    .filter((idOgVedlegg) => idOgVedlegg[1].length > 0)
                    .map((idOgVedlegg) => (
                        <FormSummary.Answer key={idOgVedlegg[1][0].id}>
                            <FormSummary.Label>
                                <DokumentasjonLabel type={idOgVedlegg[0]} />
                            </FormSummary.Label>
                            <FormSummary.Value>
                                <VStack>
                                    {idOgVedlegg[1].map((vedlegg) => (
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
};

function DokumentasjonLabel({ type }: { readonly type: string }) {
    return type;
}
