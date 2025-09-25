import { FormattedMessage } from 'react-intl';
import { VedleggDataType } from 'types/VedleggDataType';

import { Alert, BodyLong, BodyShort, FormSummary, Heading, Link, VStack } from '@navikt/ds-react';

import { NavnPåForeldre, Periode } from '@navikt/fp-common';
import { AttachmentType, InnsendingsType } from '@navikt/fp-constants';

import { DokumentasjonLastetOppLabel } from './DokumentasjonLastetOppLabel';
import { DokumentasjonSendSenereLabel } from './DokumentasjonSendSenereLabel';

interface Props {
    alleVedlegg?: VedleggDataType;
    onVilEndreSvar: () => Promise<void>;
    erSøkerFarEllerMedmor: boolean;
    navnPåForeldre: NavnPåForeldre;
    uttaksperioderSomManglerVedlegg: Periode[];
}

const skalViseVedlegg = (alleVedlegg: VedleggDataType): boolean => {
    // Sjekk om det er noen gyldige answers å vise
    return Object.values(alleVedlegg ?? {})
        .flatMap((vedleggListe) => vedleggListe)
        .some((vedlegg) => vedlegg.innsendingsType !== InnsendingsType.AUTOMATISK);
};

export const DokumentasjonOppsummering = ({
    alleVedlegg,
    onVilEndreSvar,
    erSøkerFarEllerMedmor,
    navnPåForeldre,
    uttaksperioderSomManglerVedlegg,
}: Props) => {
    const harVedlegg = alleVedlegg && Object.values(alleVedlegg).some((v) => v.length > 0);

    if (!harVedlegg) {
        return null;
    }

    const harSendSenereDokument = Object.values(alleVedlegg)
        .flatMap((vedlegg) => vedlegg)
        .some(
            (v) =>
                v.innsendingsType === InnsendingsType.SEND_SENERE &&
                v.type !== AttachmentType.MORS_AKTIVITET_DOKUMENTASJON,
        );

    if (!skalViseVedlegg(alleVedlegg)) {
        return null;
    }

    return (
        <>
            <FormSummary>
                <FormSummary.Header>
                    <FormSummary.Heading level="2">
                        {harSendSenereDokument ? (
                            <FormattedMessage id="oppsummering.manglerDokumentasjon" />
                        ) : (
                            <FormattedMessage id="DokumentasjonOppsummering.Tittel" />
                        )}
                    </FormSummary.Heading>
                </FormSummary.Header>
                <FormSummary.Answers>
                    {alleVedlegg &&
                        Object.entries(alleVedlegg)
                            .filter((idOgVedlegg) => {
                                // Vedlegglisten er tom
                                if (idOgVedlegg[1].length === 0) {
                                    return false;
                                }
                                const vedlegg = idOgVedlegg[1][0];

                                if (vedlegg.innsendingsType === InnsendingsType.AUTOMATISK) {
                                    return false;
                                }
                                return true;
                            })
                            .map((idOgVedlegg) => (
                                <FormSummary.Answer key={idOgVedlegg[1][0].id}>
                                    <FormSummary.Label>
                                        {idOgVedlegg[1][0].innsendingsType === InnsendingsType.SEND_SENERE ? (
                                            <DokumentasjonSendSenereLabel
                                                attachment={idOgVedlegg[1][0]}
                                                erFarEllerMedmor={erSøkerFarEllerMedmor}
                                                navnPåForeldre={navnPåForeldre}
                                                uttaksperioderSomManglerVedlegg={uttaksperioderSomManglerVedlegg}
                                            />
                                        ) : (
                                            <DokumentasjonLastetOppLabel attachment={idOgVedlegg[1][0]} />
                                        )}
                                    </FormSummary.Label>
                                    <FormSummary.Value>
                                        <VStack gap="space-8">
                                            {idOgVedlegg[1]
                                                .filter(
                                                    (vedlegg) =>
                                                        vedlegg.innsendingsType !== InnsendingsType.SEND_SENERE,
                                                )
                                                .map((vedlegg) => {
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
                        <FormattedMessage id="Oppsummering.EndreSvar" />
                    </FormSummary.EditLink>
                </FormSummary.Footer>
            </FormSummary>
            {harSendSenereDokument && (
                <Alert variant="info">
                    <VStack gap="space-8">
                        <Heading size="small" level="2">
                            <FormattedMessage id="oppsummering.manglerDokumentasjon.heading" />
                        </Heading>
                        <BodyLong>
                            <FormattedMessage id="oppsummering.manglerDokumentasjon.content" />
                        </BodyLong>
                    </VStack>
                </Alert>
            )}
        </>
    );
};
