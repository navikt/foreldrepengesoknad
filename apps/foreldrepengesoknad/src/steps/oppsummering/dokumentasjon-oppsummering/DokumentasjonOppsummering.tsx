import { API_URLS } from 'api/queries';
import { ContextDataType, useContextGetData } from 'appData/FpDataContext';
import { FormattedMessage } from 'react-intl';
import { VedleggDataType } from 'types/VedleggDataType';
import { getRelevantePerioder } from 'utils/uttaksplanInfoUtils';

import { Alert, BodyLong, BodyShort, FormSummary, Heading, Link, VStack } from '@navikt/ds-react';

import { NavnPåForeldre } from '@navikt/fp-common';
import { AttachmentType } from '@navikt/fp-constants';
import { perioderSomKreverVedlegg } from '@navikt/fp-uttaksplan';
import { notEmpty } from '@navikt/fp-validation';

import { DokumentasjonLastetOppLabel } from './DokumentasjonLastetOppLabel';
import { DokumentasjonSendSenereLabel } from './DokumentasjonSendSenereLabel';

interface Props {
    alleVedlegg?: VedleggDataType;
    onVilEndreSvar: () => void;
    erSøkerFarEllerMedmor: boolean;
    navnPåForeldre: NavnPåForeldre;
    erEndringssøknad: boolean;
}

const skalViseVedlegg = (alleVedlegg: VedleggDataType): boolean => {
    // Sjekk om det er noen gyldige answers å vise
    return Object.values(alleVedlegg ?? {})
        .flat()
        .some((vedlegg) => vedlegg.innsendingsType !== 'AUTOMATISK');
};

export const DokumentasjonOppsummering = ({
    alleVedlegg,
    onVilEndreSvar,
    erSøkerFarEllerMedmor,
    navnPåForeldre,
    erEndringssøknad,
}: Props) => {
    const uttaksplan = notEmpty(useContextGetData(ContextDataType.UTTAKSPLAN));
    const uttaksplanMetadata = notEmpty(useContextGetData(ContextDataType.UTTAKSPLAN_METADATA));
    const annenForelder = notEmpty(useContextGetData(ContextDataType.ANNEN_FORELDER));

    const relevantePerioder = getRelevantePerioder(
        uttaksplan,
        uttaksplanMetadata?.perioderSomSkalSendesInn,
        erEndringssøknad,
    );
    const uttaksperioderSomManglerVedlegg = perioderSomKreverVedlegg(
        relevantePerioder,
        erSøkerFarEllerMedmor,
        annenForelder,
    );
    const harVedlegg = alleVedlegg && Object.values(alleVedlegg).some((v) => v.length > 0);

    if (!harVedlegg) {
        return null;
    }

    const harSendSenereDokument = Object.values(alleVedlegg)
        .flat()
        .some((v) => v.innsendingsType === 'SEND_SENERE' && v.type !== AttachmentType.MORS_AKTIVITET_DOKUMENTASJON);

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
                                const vedlegg = idOgVedlegg[1][0]!;

                                if (vedlegg.innsendingsType === 'AUTOMATISK') {
                                    return false;
                                }
                                return true;
                            })
                            .map((idOgVedlegg) => (
                                <FormSummary.Answer key={idOgVedlegg[1][0]!.id}>
                                    <FormSummary.Label>
                                        {idOgVedlegg[1][0]!.innsendingsType === 'SEND_SENERE' ? (
                                            <DokumentasjonSendSenereLabel
                                                attachment={idOgVedlegg[1][0]!}
                                                erFarEllerMedmor={erSøkerFarEllerMedmor}
                                                navnPåForeldre={navnPåForeldre}
                                                uttaksperioderSomManglerVedlegg={uttaksperioderSomManglerVedlegg}
                                            />
                                        ) : (
                                            <DokumentasjonLastetOppLabel attachment={idOgVedlegg[1][0]!} />
                                        )}
                                    </FormSummary.Label>
                                    <FormSummary.Value>
                                        <VStack gap="space-8">
                                            {idOgVedlegg[1]
                                                .filter((vedlegg) => vedlegg.innsendingsType !== 'SEND_SENERE')
                                                .map((vedlegg) => {
                                                    return vedlegg.uuid ? (
                                                        <Link
                                                            key={vedlegg.id}
                                                            download={vedlegg.filename}
                                                            href={`${API_URLS.hentVedlegg(vedlegg.uuid)}`}
                                                            target="_blank"
                                                        >
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
