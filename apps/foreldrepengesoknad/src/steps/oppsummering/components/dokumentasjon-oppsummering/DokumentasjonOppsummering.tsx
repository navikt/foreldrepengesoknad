import { useEffect } from 'react';
import { FormattedMessage } from 'react-intl';
import { VedleggDataType } from 'types/VedleggDataType';

import { FormSummary, Link, VStack } from '@navikt/ds-react';

import { InnsendingsType } from '@navikt/fp-constants';

import { getDokumentasjonLabel } from './dokumentasjonUtils';

interface Props {
    alleVedlegg?: VedleggDataType;
    onVilEndreSvar: () => Promise<void>;
    setManglerDokumentasjon: (manglerDokumentajson: boolean) => void;
}

export const DokumentasjonOppsummering = ({ alleVedlegg, onVilEndreSvar, setManglerDokumentasjon }: Props) => {
    const harVedlegg = alleVedlegg && Object.values(alleVedlegg).some((v) => v.length > 0);

    useEffect(() => {
        if (
            harVedlegg &&
            Object.values(alleVedlegg)
                .flatMap((vedlegg) => vedlegg)
                .find((v) => v.innsendingsType === InnsendingsType.SEND_SENERE)
        ) {
            setManglerDokumentasjon(true);
        }
    }, []);

    if (!harVedlegg) {
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
                            <FormSummary.Label>{getDokumentasjonLabel(idOgVedlegg[1][0])}</FormSummary.Label>
                            <FormSummary.Value>
                                <VStack>
                                    {idOgVedlegg[1]
                                        .filter((vedlegg) => vedlegg.innsendingsType !== InnsendingsType.SEND_SENERE)
                                        .map((vedlegg) => (
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
