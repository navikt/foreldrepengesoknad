import { FormattedMessage } from 'react-intl';
import Dokumentasjon, { TerminDokumentasjon, Vedlegg, erTerminDokumentasjon } from 'types/Dokumentasjon';

import { FormSummary, VStack } from '@navikt/ds-react';

export function DokumentasjonOppsummering({ dokumentasjon }: { dokumentasjon?: Dokumentasjon }) {
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
        </FormSummary>
    );
}

function AdopsjonDokumentasjon({ dokumentasjon }: { dokumentasjon: Vedlegg }) {
    return (
        <FormSummary.Answer>
            <FormSummary.Label>
                <FormattedMessage id="DokumentasjonOppsummering.adopsjonsdokumenter" />
            </FormSummary.Label>
            <FormSummary.Answer>
                <VStack gap="2">{dokumentasjon.vedlegg.map((v) => v.filename)}</VStack>
            </FormSummary.Answer>
        </FormSummary.Answer>
    );
}

function TerminDokumentasjonSummary({ dokumentasjon }: { dokumentasjon: TerminDokumentasjon }) {
    return (
        <>
            <FormSummary.Answer>
                <FormSummary.Label>
                    <FormattedMessage id="DokumentasjonOppsummering.Terminbekreftelse" />
                </FormSummary.Label>
                <FormSummary.Answer>{dokumentasjon.terminbekreftelsedato}</FormSummary.Answer>
            </FormSummary.Answer>
            <FormSummary.Answer>
                <FormSummary.Label>
                    <FormattedMessage id="DokumentasjonOppsummering.TerminbekreftelseDokument" />
                </FormSummary.Label>
                <FormSummary.Answer>
                    <VStack gap="2">{dokumentasjon.vedlegg.map((v) => v.filename)}</VStack>
                </FormSummary.Answer>
            </FormSummary.Answer>
        </>
    );
}
