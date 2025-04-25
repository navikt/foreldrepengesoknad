import { FormattedMessage } from 'react-intl';
import { VedleggDataType } from 'types/VedleggDataType';

import { Alert, BodyLong, FormSummary, Heading, Link, VStack } from '@navikt/ds-react';

import { NavnPåForeldre, Periode } from '@navikt/fp-common';
import { AttachmentType, InnsendingsType, Skjemanummer } from '@navikt/fp-constants';

import { useTrengerDokumentereMorsArbeid } from '../../../utils/hooks/useTrengerDokumentereMorsarbeid';
import { DokumentasjonLastetOppLabel } from './DokumentasjonLastetOppLabel';
import { DokumentasjonSendSenereLabel } from './DokumentasjonSendSenereLabel';

interface Props {
    alleVedlegg?: VedleggDataType;
    onVilEndreSvar: () => Promise<void>;
    erSøkerFarEllerMedmor: boolean;
    navnPåForeldre: NavnPåForeldre;
    uttaksperioderSomManglerVedlegg: Periode[];
}

const skalViseVedlegg = (
    alleVedlegg: VedleggDataType | undefined,
    trengerDokumentereMorsArbeid: boolean | undefined,
    harSendSenereDokument: boolean,
): boolean => {
    const harVedlegg = alleVedlegg && Object.values(alleVedlegg).some((v) => v.length > 0);

    console.log('Debug vedleggsvisning:', {
        harVedlegg,
        harSendSenereDokument,
        trengerDokumentereMorsArbeid,
    });

    if (!harVedlegg) {
        return false;
    }

    // Hvis vi har send-senere-dokument og IKKE trenger dokumentere mors arbeid, skal vi ikke vise noe
    if (harSendSenereDokument && !(trengerDokumentereMorsArbeid ?? false)) {
        return false;
    }

    // Sjekk om det er noen gyldige answers å vise
    const harGyldigeAnswers =
        alleVedlegg &&
        Object.values(alleVedlegg).some((vedleggListe) => {
            if (vedleggListe.length === 0) return false;

            const førsteVedlegg = vedleggListe[0];
            if (
                førsteVedlegg.innsendingsType === InnsendingsType.SEND_SENERE &&
                førsteVedlegg.type === AttachmentType.MORS_AKTIVITET_DOKUMENTASJON &&
                førsteVedlegg.skjemanummer === Skjemanummer.DOK_ARBEID_MOR &&
                !(trengerDokumentereMorsArbeid ?? false)
            ) {
                return false;
            }
            return true;
        });

    return harGyldigeAnswers;
};

export const DokumentasjonOppsummering = ({
    alleVedlegg,
    onVilEndreSvar,
    erSøkerFarEllerMedmor,
    navnPåForeldre,
    uttaksperioderSomManglerVedlegg,
}: Props) => {
    const trengerDokumentereMorsArbeid = useTrengerDokumentereMorsArbeid();

    const harSendSenereDokument = alleVedlegg
        ? Object.values(alleVedlegg)
              .flatMap((vedlegg) => vedlegg)
              .some(
                  (v) =>
                      v.innsendingsType === InnsendingsType.SEND_SENERE &&
                      v.type !== AttachmentType.MORS_AKTIVITET_DOKUMENTASJON,
              )
        : false;

    if (!skalViseVedlegg(alleVedlegg, trengerDokumentereMorsArbeid, harSendSenereDokument)) {
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
                    {alleVedlegg &&
                        Object.entries(alleVedlegg)
                            .filter((idOgVedlegg) => {
                                // 1. Vedlegglisten er tom
                                if (idOgVedlegg[1].length === 0) {
                                    return false;
                                }

                                // 2. Vedlegget er "Send senere" og det er dokumentasjon for mors arbeid,
                                // men vi trenger ikke dokumentere mors arbeid og svar på hook viser at mor ikke må dokumentere
                                // sitt arbeid
                                const vedlegg = idOgVedlegg[1][0];
                                if (
                                    vedlegg.innsendingsType === InnsendingsType.SEND_SENERE &&
                                    vedlegg.type === AttachmentType.MORS_AKTIVITET_DOKUMENTASJON &&
                                    vedlegg.skjemanummer === Skjemanummer.DOK_ARBEID_MOR &&
                                    !(trengerDokumentereMorsArbeid ?? false)
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
                                                    (vedlegg) =>
                                                        vedlegg.innsendingsType !== InnsendingsType.SEND_SENERE,
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
