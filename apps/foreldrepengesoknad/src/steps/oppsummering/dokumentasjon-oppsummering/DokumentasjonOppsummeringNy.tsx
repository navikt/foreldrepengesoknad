import { API_URLS } from 'api/queries';
import { ContextDataType, useContextGetData } from 'appData/FpDataContext';
import { FormattedMessage } from 'react-intl';
import { VedleggDataType } from 'types/VedleggDataType';
import { perioderSomKreverVedleggNy } from 'utils/manglendeVedleggUtils';
import { getErSøkerFarEllerMedmor } from 'utils/personUtils';

import { Alert, BodyLong, BodyShort, FormSummary, Heading, Link, VStack } from '@navikt/ds-react';

import { AttachmentType } from '@navikt/fp-constants';
import { NavnPåForeldre } from '@navikt/fp-types';
import { notEmpty } from '@navikt/fp-validation';

import { getFamiliehendelsedato } from '../../../utils/barnUtils';
import { DokumentasjonLastetOppLabel } from './DokumentasjonLastetOppLabel';
import { DokumentasjonSendSenereLabelNy } from './DokumentasjonSendSenereLabelNy';

interface Props {
    onVilEndreSvar: () => void;
    navnPåForeldre: NavnPåForeldre;
}

export const DokumentasjonOppsummeringNy = ({ onVilEndreSvar, navnPåForeldre }: Props) => {
    const uttaksplan = useContextGetData(ContextDataType.UTTAKSPLAN_NY);
    const søkersituasjon = notEmpty(useContextGetData(ContextDataType.SØKERSITUASJON));
    const alleVedlegg = useContextGetData(ContextDataType.VEDLEGG);
    const annenForelder = notEmpty(useContextGetData(ContextDataType.ANNEN_FORELDER));
    const barn = notEmpty(useContextGetData(ContextDataType.OM_BARNET));

    const erSøkerFarEllerMedmor = getErSøkerFarEllerMedmor(søkersituasjon.rolle);
    const uttaksperioderSomManglerVedlegg = perioderSomKreverVedleggNy(
        uttaksplan || [],
        erSøkerFarEllerMedmor,
        annenForelder,
        getFamiliehendelsedato(barn),
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
                                            <DokumentasjonSendSenereLabelNy
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

const skalViseVedlegg = (alleVedlegg: VedleggDataType): boolean => {
    // Sjekk om det er noen gyldige answers å vise
    return Object.values(alleVedlegg ?? {})
        .flat()
        .some((vedlegg) => vedlegg.innsendingsType !== 'AUTOMATISK');
};
