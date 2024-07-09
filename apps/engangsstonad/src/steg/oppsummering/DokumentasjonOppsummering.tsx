import React from 'react';
import Dokumentasjon, { TerminDokumentasjon, Vedlegg, erTerminDokumentasjon } from 'types/Dokumentasjon';

import { FormSummary, VStack } from '@navikt/ds-react';

export function DokumentasjonOppsummering({ dokumentasjon }: { dokumentasjon: Dokumentasjon }) {
    if (!dokumentasjon) {
        return null;
    }

    return (
        <FormSummary>
            <FormSummary.Header>
                <FormSummary.Heading level="2">Dokumentasjon</FormSummary.Heading>
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
            <FormSummary.Label>Adopsjonspapirrrrrrer</FormSummary.Label>
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
                <FormSummary.Label>Når fikk du terminbekreftelse?</FormSummary.Label>
                <FormSummary.Answer>{dokumentasjon.terminbekreftelsedato}</FormSummary.Answer>
            </FormSummary.Answer>
            <FormSummary.Answer>
                <FormSummary.Label>Terminbekreftelse</FormSummary.Label>
                <FormSummary.Answer>
                    <VStack gap="2">{dokumentasjon.vedlegg.map((v) => v.filename)}</VStack>
                </FormSummary.Answer>
            </FormSummary.Answer>
        </>
    );
}
