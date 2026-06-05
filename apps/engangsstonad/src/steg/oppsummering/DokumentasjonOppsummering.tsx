import { Path } from 'appData/paths';
import { API_URLS } from 'appData/queries';
import { FormattedMessage } from 'react-intl';
import { Dokumentasjon, TerminDokumentasjon, Vedlegg, erTerminDokumentasjon } from 'types/Dokumentasjon';

import { BodyShort, FormSummary, Link, VStack } from '@navikt/ds-react';

import { Attachment } from '@navikt/fp-types';
import { formatDate } from '@navikt/fp-utils';

const VedleggLenke = ({ attachment }: { attachment: Attachment }) => {
    if (!attachment.uuid) {
        return <BodyShort>{attachment.filename}</BodyShort>;
    }

    return (
        <Link href={API_URLS.hentVedlegg(attachment.uuid)} download={attachment.filename} target="_blank" rel="noreferrer noopener">
            {attachment.filename}
        </Link>
    );
};

const TerminDokumentasjonSummary = ({ dokumentasjon }: { dokumentasjon: TerminDokumentasjon }) => {
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
};

const AdopsjonDokumentasjon = ({ dokumentasjon }: { dokumentasjon: Vedlegg }) => {
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
};

export const DokumentasjonOppsummering = ({
    dokumentasjon,
    onVilEndreSvar,
}: {
    dokumentasjon?: Dokumentasjon;
    onVilEndreSvar: (path: Path) => void;
}) => {
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
};
