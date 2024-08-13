import { Path } from 'appData/paths';
import { FormattedMessage } from 'react-intl';
import Dokumentasjon, { TerminDokumentasjon, Vedlegg, erTerminDokumentasjon } from 'types/Dokumentasjon';

import { FormSummary, VStack } from '@navikt/ds-react';

import { formatDate } from '@navikt/fp-utils';

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
                    <VStack gap="2">{dokumentasjon.vedlegg.map((v) => v.filename)}</VStack>
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
                {/*TODO: klikke på lenke*/}
                <VStack gap="2">{dokumentasjon.vedlegg.map((v) => v.filename)}</VStack>
            </FormSummary.Answer>
        </FormSummary.Answer>
    );
}

export function DokumentasjonOppsummering({
    dokumentasjon,
    onVilEndreSvar,
}: {
    readonly dokumentasjon?: Dokumentasjon;
    readonly onVilEndreSvar: (path: Path) => Promise<void>;
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
                <FormSummary.EditLink
                    onClick={() =>
                        onVilEndreSvar(
                            erTerminDokumentasjon(dokumentasjon) ? Path.TERMINBEKREFTELSE : Path.ADOPSJONSBEKREFTELSE,
                        )
                    }
                >
                    <FormattedMessage id="Oppsummering.EndreSvar" />
                </FormSummary.EditLink>
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
