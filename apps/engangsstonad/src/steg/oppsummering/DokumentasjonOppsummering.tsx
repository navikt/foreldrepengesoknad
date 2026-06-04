import { Path } from 'appData/paths';
import { useEffect, useMemo } from 'react';
import { FormattedMessage } from 'react-intl';
import { Dokumentasjon, TerminDokumentasjon, Vedlegg, erTerminDokumentasjon } from 'types/Dokumentasjon';

import { FormSummary, Link, VStack } from '@navikt/ds-react';

import { Attachment } from '@navikt/fp-types';
import { formatDate } from '@navikt/fp-utils';

function VedleggLenke({ attachment }: { readonly attachment: Attachment }) {
    const href = useMemo(() => {
        if (typeof URL?.createObjectURL !== 'function' || !(attachment.file instanceof Blob)) {
            return undefined;
        }
        return URL.createObjectURL(attachment.file);
    }, [attachment.file]);

    useEffect(() => {
        return () => {
            if (href) {
                URL.revokeObjectURL(href);
            }
        };
    }, [href]);

    if (!href) {
        return <>{attachment.filename}</>;
    }

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
                <FormSummary.Value>{formatDate(dokumentasjon.terminbekreftelsedato)}</FormSummary.Value>
            </FormSummary.Answer>
            <FormSummary.Answer>
                <FormSummary.Label>
                    <FormattedMessage id="DokumentasjonOppsummering.TerminbekreftelseDokument" />
                </FormSummary.Label>
                <FormSummary.Value>
                    <VStack gap="space-8">
                        {dokumentasjon.vedlegg.map((v) => (
                            <VedleggLenke key={v.id} attachment={v} />
                        ))}
                    </VStack>
                </FormSummary.Value>
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
            <FormSummary.Value>
                <VStack gap="space-8">
                    {dokumentasjon.vedlegg.map((v) => (
                        <VedleggLenke key={v.id} attachment={v} />
                    ))}
                </VStack>
            </FormSummary.Value>
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
