// apps/foreldrepengesoknad/src/steps/oppsummering/dokumentasjon-oppsummering/DokumentasjonOppsummering.tsx
import { FormattedMessage } from 'react-intl';
import { VedleggDataType } from 'types/VedleggDataType';

import { Alert, BodyLong, FormSummary, Heading, Link, VStack } from '@navikt/ds-react';

import { NavnPåForeldre, Periode } from '@navikt/fp-common';
import { AttachmentType, InnsendingsType } from '@navikt/fp-constants';
import { Skjemanummer } from '@navikt/fp-constants';

import { useTrengerDokumentereMorsArbeid } from '../../../hooks/useTrengerDokumentereMorsarbeid';
import { DokumentasjonLastetOppLabel } from './DokumentasjonLastetOppLabel';
import { DokumentasjonSendSenereLabel } from './DokumentasjonSendSenereLabel';

interface Props {
    alleVedlegg?: VedleggDataType;
    onVilEndreSvar: () => Promise<void>;
    erSøkerFarEllerMedmor: boolean;
    navnPåForeldre: NavnPåForeldre;
    uttaksperioderSomManglerVedlegg: Periode[];
}

export const DokumentasjonOppsummering = ({
    alleVedlegg,
    onVilEndreSvar,
    erSøkerFarEllerMedmor,
    navnPåForeldre,
    uttaksperioderSomManglerVedlegg,
}: Props) => {
    const trengerDokumentereMorsArbeid = useTrengerDokumentereMorsArbeid(); // Bruk hooken
    console.log(trengerDokumentereMorsArbeid);
    const harVedlegg = alleVedlegg && Object.values(alleVedlegg).some((v) => v.length > 0);
    console.log(alleVedlegg);
    const harSendSenereDokument =
        harVedlegg &&
        Object.values(alleVedlegg)
            .flatMap((vedlegg) => vedlegg)
            .find((v) => v.innsendingsType === InnsendingsType.SEND_SENERE);

    if (!harVedlegg) {
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
                    <FormSummary.EditLink onClick={onVilEndreSvar}>
                        <FormattedMessage id="Oppsummering.EndreSvar" />
                    </FormSummary.EditLink>
                </FormSummary.Header>
                <FormSummary.Answers>
                    {Object.entries(alleVedlegg)
                        .filter((idOgVedlegg) => {
                            // Filtrere ut vedlegg der:
                            // 1. Vedlegglisten er tom
                            if (idOgVedlegg[1].length === 0) {
                                return false;
                            }

                            // 2. Vedlegget er "Send senere" og det er dokumentasjon for mors arbeid,
                            // men vi trenger ikke dokumentere mors arbeid
                            const vedlegg = idOgVedlegg[1][0];
                            if (
                                vedlegg.innsendingsType === InnsendingsType.SEND_SENERE &&
                                vedlegg.type === AttachmentType.MORS_AKTIVITET_DOKUMENTASJON &&
                                vedlegg.skjemanummer === Skjemanummer.DOK_ARBEID_MOR &&
                                !trengerDokumentereMorsArbeid
                            ) {
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
                                    <VStack>
                                        {idOgVedlegg[1]
                                            .filter(
                                                (vedlegg) => vedlegg.innsendingsType !== InnsendingsType.SEND_SENERE,
                                            )
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
            {harSendSenereDokument && (
                <Alert variant="info">
                    <VStack gap="2">
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
