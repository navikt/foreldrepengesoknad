import { Path } from 'appData/paths';
import { useEffect, useMemo } from 'react';
import { FormattedMessage } from 'react-intl';
import { Dokumentasjon, TerminDokumentasjon, Vedlegg, erTerminDokumentasjon } from 'types/Dokumentasjon';

import { FormSummary, Link, VStack } from '@navikt/ds-react';

import { Attachment } from '@navikt/fp-types';
import { formatDate } from '@navikt/fp-utils';

function VedleggLenke({ attachment }: { readonly attachment: Attachment }) {
    const href = useMemo(() => URL.createObjectURL(attachment.file), [attachment.file]);
    useEffect(() => () => URL.revokeObjectURL(href), [href]);

    return (
        <Link href={href} target="_blank" rel="noreferrer">
            {attachment.filename}
        </Link>
    );
}

function TerminDokumentasjonSummary({ dokumentasjon }: { readonly dokumentasjon: TerminDokumentasjon }) {
    return (
        <>
            <FormSummary.Answer>
                <FormSummary.Label>
                    <FormattedMessage id="DokumentasjonOppsummering.Terminbekreftelse" />
                </FormSummary.Label>
                <FormSummary.Answer>{formatDate(dokumentasjon.terminbekreftelsedato)}</FormSummary.Answer>
            </FormSummary.Answer>
            <FormSummary.Answer>
                <FormSummary.Label>
                    <FormattedMessage id="DokumentasjonOppsummering.TerminbekreftelseDokument" />
                </FormSummary.Label>
                <FormSummary.Answer>
                    <VStack gap="space-8">
                        {dokumentasjon.vedlegg.map((v) => (
                            <VedleggLenke key={v.id} attachment={v} />
                        ))}
                    </VStack>
                </FormSummary.Answer>
            </FormSummary.Answer>
        </>
    );
}

function AdopsjonDokumentasjon({ dokumentasjon }: { readonly dokumentasjon: Vedlegg }) {
    return (
        <FormSummary.Answer>
            <FormSummary.Label>
                <FormattedMessage id="DokumentasjonOppsummering.adopsjonsdokumenter" />
            </FormSummary.Label>
            <FormSummary.Answer>
                <VStack gap="space-8">
                    {dokumentasjon.vedlegg.map((v) => (
                        <VedleggLenke key={v.id} attachment={v} />
                    ))}
                </VStack>
            </FormSummary.Answer>
        </FormSummary.Answer>
    );
}

export function DokumentasjonOppsummering({
    dokumentasjon,
    onVilEndreSvar,
}: {
    readonly dokumentasjon?: Dokumentasjon;
    readonly onVilEndreSvar: (path: Path) => void;
}) {
    if (!dokumentasjon || dokumentasjon.vedlegg.length === 0) {
        return null;
    }

    return (
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="2">
                    <FormattedMessage id="DokumentasjonOppsummering.tittel" />
                </FormSummary.Heading>
            </FormSummary.Header>
            <FormSummary.Answers>
                {erTerminDokumentasjon(dokumentasjon) ? (
                    <TerminDokumentasjonSummary dokumentasjon={dokumentasjon} />
                ) : (
                    <AdopsjonDokumentasjon dokumentasjon={dokumentasjon} />
                )}
            </FormSummary.Answers>
            <FormSummary.Footer>
                <FormSummary.EditLink
                    onClick={() =>
                        onVilEndreSvar(
                            erTerminDokumentasjon(dokumentasjon) ? Path.TERMINBEKREFTELSE : Path.ADOPSJONSBEKREFTELSE,
                        )
                    }
                >
                    <FormattedMessage id="Oppsummering.EndreSvar" />
                </FormSummary.EditLink>
            </FormSummary.Footer>
        </FormSummary>
    );
}
