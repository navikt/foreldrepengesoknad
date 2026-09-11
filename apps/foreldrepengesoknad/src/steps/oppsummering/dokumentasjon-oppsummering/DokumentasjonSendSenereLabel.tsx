import { ReactNode } from 'react';
import { FormattedMessage } from 'react-intl';

import { BodyShort, Box, Label, List, VStack } from '@navikt/ds-react';

import { Skjemanummer } from '@navikt/fp-constants';
import { Attachment, AttachmentMetadataTidsperiode, NavnPåForeldre, PeriodeDto_fpoversikt } from '@navikt/fp-types';
import { Uttaksperioden } from '@navikt/fp-utils';
import { UttaksperiodeValidatorer } from '@navikt/fp-uttaksplan/validators';
import { notEmpty } from '@navikt/fp-validation';

import { getTidsperiodeString } from './DokumentasjonLastetOppLabel';

const getPeriodeLabelValues = (tidsperioder: AttachmentMetadataTidsperiode[] | undefined) => {
    return {
        antallPerioder: notEmpty(tidsperioder).length,
        perioder: getTidsperiodeString(notEmpty(tidsperioder)),
    };
};

interface ManglerDokumentasjonProps {
    headerLabel: ReactNode;
    bodyLabel: ReactNode;
}

const ManglerDokumentasjon = ({ headerLabel, bodyLabel }: ManglerDokumentasjonProps) => (
    <VStack gap="space-8">
        <Label>
            {headerLabel} <FormattedMessage id="dokumentasjon.mangler" />
        </Label>
        <BodyShort>{bodyLabel}</BodyShort>
    </VStack>
);

const isPeriodeMedMorInnleggelse = (periode: PeriodeDto_fpoversikt, familiehendelsedato: string) => {
    const side = periode.søker;
    if (!side) {
        return false;
    }

    if (side.overføringÅrsak === 'INSTITUSJONSOPPHOLD_ANNEN_FORELDER' && side.forelder === 'FAR_MEDMOR') {
        return true;
    }

    if (
        Uttaksperioden.erUttaksperiode(side) &&
        side.kontoType === 'FEDREKVOTE' &&
        !side.samtidigUttak &&
        UttaksperiodeValidatorer.erPeriodeInnenforToUkerFørFødselTilSeksUkerEtterFødsel(
            periode,
            familiehendelsedato,
            undefined,
        )
    ) {
        return true;
    }

    if (
        (side.kontoType === 'FELLESPERIODE' || side.kontoType === 'FORELDREPENGER') &&
        side.morsAktivitet === 'INNLAGT'
    ) {
        return true;
    }

    if (side.utsettelseÅrsak === 'SØKER_INNLAGT') {
        return true;
    }

    return false;
};

interface Props {
    attachment: Attachment;
    erFarEllerMedmor: boolean;
    navnPåForeldre: NavnPåForeldre;
    uttaksperioderSomManglerVedlegg: PeriodeDto_fpoversikt[];
    familiehendelsedato: string;
}

export const DokumentasjonSendSenereLabel = ({
    attachment,
    erFarEllerMedmor,
    navnPåForeldre,
    uttaksperioderSomManglerVedlegg,
    familiehendelsedato,
}: Props) => {
    const tidsperioder = attachment.dokumenterer?.perioder;

    const morErForSykEllerInnlagtFørsteSeksUker = uttaksperioderSomManglerVedlegg
        .filter((p) => isPeriodeMedMorInnleggelse(p, familiehendelsedato))
        .some((p) => {
            const side = p.søker;
            return (
                !!side &&
                Uttaksperioden.erUttaksperiode(side) &&
                side.morsAktivitet === 'INNLAGT' &&
                side.kontoType === 'FEDREKVOTE'
            );
        });

    switch (attachment.skjemanummer) {
        case Skjemanummer.ETTERLØNN_ELLER_SLUTTVEDERLAG: {
            return (
                <ManglerDokumentasjon
                    headerLabel={
                        <FormattedMessage
                            id="manglendeVedlegg.etterlønn.tittel"
                            values={getPeriodeLabelValues(tidsperioder)}
                        />
                    }
                    bodyLabel={<FormattedMessage id="manglendeVedlegg.etterlønn.description" />}
                />
            );
        }
        case Skjemanummer.DOK_MILITÆR_SILVIL_TJENESTE: {
            return (
                <ManglerDokumentasjon
                    headerLabel={
                        <FormattedMessage
                            id="manglendeVedlegg.militær.tittel"
                            values={getPeriodeLabelValues(tidsperioder)}
                        />
                    }
                    bodyLabel={<FormattedMessage id="manglendeVedlegg.militær.description" />}
                />
            );
        }
        case Skjemanummer.OMSORGSOVERTAKELSE: {
            return (
                <ManglerDokumentasjon
                    headerLabel={<FormattedMessage id="manglendeVedlegg.omsorgsovertakelse.tittel" />}
                    bodyLabel={<FormattedMessage id="manglendeVedlegg.omsorgsovertakelse.description" />}
                />
            );
        }
        case Skjemanummer.DOK_AV_ALENEOMSORG: {
            return (
                <ManglerDokumentasjon
                    headerLabel={<FormattedMessage id="manglendeVedlegg.aleneomsorg.tittel" />}
                    bodyLabel={<FormattedMessage id="manglendeVedlegg.aleneomsorg.description" />}
                />
            );
        }
        case Skjemanummer.TERMINBEKREFTELSE: {
            return (
                <ManglerDokumentasjon
                    headerLabel={<FormattedMessage id="manglendeVedlegg.terminbekreftelse.tittel" />}
                    bodyLabel={
                        erFarEllerMedmor ? (
                            <FormattedMessage id="manglendeVedlegg.terminbekreftelse.description.farMedmor" />
                        ) : (
                            <FormattedMessage id="manglendeVedlegg.terminbekreftelse.description" />
                        )
                    }
                />
            );
        }
        case Skjemanummer.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET: {
            return (
                <ManglerDokumentasjon
                    headerLabel={<FormattedMessage id="manglendeVedlegg.introduksjonsprogram.tittel" />}
                    bodyLabel={
                        <FormattedMessage
                            id="manglendeVedlegg.introduksjonsprogram.description"
                            values={{ navn: navnPåForeldre.mor }}
                        />
                    }
                />
            );
        }
        case Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM: {
            return (
                <ManglerDokumentasjon
                    headerLabel={<FormattedMessage id="manglendeVedlegg.kvalifiseringsprogram.tittel" />}
                    bodyLabel={
                        <FormattedMessage
                            id="manglendeVedlegg.kvalifiseringsprogram.description"
                            values={{ navn: navnPåForeldre.mor }}
                        />
                    }
                />
            );
        }
        case Skjemanummer.DOK_INNLEGGELSE_MOR: {
            return (
                <ManglerDokumentasjon
                    headerLabel={
                        morErForSykEllerInnlagtFørsteSeksUker ? (
                            <FormattedMessage
                                id="manglendeVedlegg.morInnlagtEllerSyk.label"
                                values={{ navn: navnPåForeldre.mor, erFarEllerMedmor }}
                            />
                        ) : (
                            <FormattedMessage
                                id="manglendeVedlegg.morInnlagt.label"
                                values={{ navn: navnPåForeldre.mor, erFarEllerMedmor }}
                            />
                        )
                    }
                    bodyLabel={
                        morErForSykEllerInnlagtFørsteSeksUker ? (
                            <FormattedMessage
                                id="manglendeVedlegg.morInnlagtEllerSyk.description"
                                values={{ navn: navnPåForeldre.mor, erFarEllerMedmor }}
                            />
                        ) : (
                            <FormattedMessage
                                id="manglendeVedlegg.morInnlagt.description"
                                values={{ navn: navnPåForeldre.mor, erFarEllerMedmor }}
                            />
                        )
                    }
                />
            );
        }
        case Skjemanummer.DOK_INNLEGGELSE_BARN: {
            return (
                <ManglerDokumentasjon
                    headerLabel={<FormattedMessage id="manglendeVedlegg.barnInnlagt.label" />}
                    bodyLabel={<FormattedMessage id="manglendeVedlegg.barnInnlagt.description" />}
                />
            );
        }
        case Skjemanummer.DOK_INNLEGGELSE_FAR: {
            return (
                <ManglerDokumentasjon
                    headerLabel={
                        <FormattedMessage
                            id="manglendeVedlegg.farInnlagt.label"
                            values={{ navn: navnPåForeldre.farMedmor, erFarEllerMedmor }}
                        />
                    }
                    bodyLabel={
                        <FormattedMessage
                            id="manglendeVedlegg.farInnlagt.description"
                            values={{ navn: navnPåForeldre.farMedmor, erFarEllerMedmor }}
                        />
                    }
                />
            );
        }
        case Skjemanummer.DOK_SYKDOM_MOR: {
            return (
                <ManglerDokumentasjon
                    headerLabel={
                        <FormattedMessage
                            id="manglendeVedlegg.morForSyk.label"
                            values={{ navn: navnPåForeldre.mor, erFarEllerMedmor }}
                        />
                    }
                    bodyLabel={
                        <FormattedMessage
                            id="manglendeVedlegg.morForSyk.description"
                            values={{ navn: navnPåForeldre.mor, erFarEllerMedmor }}
                        />
                    }
                />
            );
        }
        case Skjemanummer.DOK_SYKDOM_FAR: {
            return (
                <ManglerDokumentasjon
                    headerLabel={
                        <FormattedMessage
                            id="manglendeVedlegg.farForSyk.label"
                            values={{ navn: navnPåForeldre.farMedmor, erFarEllerMedmor }}
                        />
                    }
                    bodyLabel={
                        <FormattedMessage
                            id="manglendeVedlegg.farForSyk.description"
                            values={{ navn: navnPåForeldre.farMedmor, erFarEllerMedmor }}
                        />
                    }
                />
            );
        }
        case Skjemanummer.DOK_ARBEID_MOR: {
            return (
                <ManglerDokumentasjon
                    headerLabel={<FormattedMessage id="manglendeVedlegg.morJobber.label" />}
                    bodyLabel={
                        <FormattedMessage
                            id="manglendeVedlegg.morJobber.description"
                            values={{ navn: navnPåForeldre.mor }}
                        />
                    }
                />
            );
        }
        case Skjemanummer.DOK_UTDANNING_MOR: {
            return (
                <VStack gap="space-8">
                    <Label>
                        <FormattedMessage id="manglendeVedlegg.studerer.label" />{' '}
                        <FormattedMessage id="dokumentasjon.mangler" />
                    </Label>
                    <div>
                        <BodyShort>
                            <FormattedMessage
                                id="manglendeVedlegg.studerer.description.tittel"
                                values={{ navn: navnPåForeldre.mor }}
                            />
                        </BodyShort>
                        <Box marginBlock="space-16" asChild>
                            <List>
                                <List.Item>
                                    <BodyShort>
                                        <FormattedMessage id="manglendeVedlegg.studerer.description.punkt1" />
                                    </BodyShort>
                                </List.Item>
                                <List.Item>
                                    <BodyShort>
                                        <FormattedMessage id="manglendeVedlegg.studerer.description.punkt2" />
                                    </BodyShort>
                                </List.Item>
                                <List.Item>
                                    <BodyShort>
                                        <FormattedMessage id="manglendeVedlegg.studerer.description.punkt3" />
                                    </BodyShort>
                                </List.Item>
                                <List.Item>
                                    <BodyShort>
                                        <FormattedMessage id="manglendeVedlegg.studerer.description.punkt4" />
                                    </BodyShort>
                                </List.Item>
                            </List>
                        </Box>
                    </div>
                </VStack>
            );
        }
        case Skjemanummer.DOK_UTDANNING_OG_ARBEID_MOR: {
            return (
                <VStack gap="space-8">
                    <Label>
                        <FormattedMessage id="manglendeVedlegg.studererOgJobber.label" />{' '}
                        <FormattedMessage id="dokumentasjon.mangler" />
                    </Label>
                    <div>
                        <BodyShort>
                            <FormattedMessage
                                id="manglendeVedlegg.studererOgJobber.description.tittel"
                                values={{ navn: navnPåForeldre.mor }}
                            />
                        </BodyShort>
                        <Box marginBlock="space-16" asChild>
                            <List>
                                <List.Item>
                                    <BodyShort>
                                        <FormattedMessage id="manglendeVedlegg.studerer.description.punkt1" />
                                    </BodyShort>
                                </List.Item>
                                <List.Item>
                                    <BodyShort>
                                        <FormattedMessage id="manglendeVedlegg.studerer.description.punkt2" />
                                    </BodyShort>
                                </List.Item>
                                <List.Item>
                                    <BodyShort>
                                        <FormattedMessage id="manglendeVedlegg.studerer.description.punkt3" />
                                    </BodyShort>
                                </List.Item>
                                <List.Item>
                                    <BodyShort>
                                        <FormattedMessage id="manglendeVedlegg.studerer.description.punkt4" />
                                    </BodyShort>
                                </List.Item>
                            </List>
                        </Box>
                    </div>
                </VStack>
            );
        }
        default: {
            throw new Error('Ingen skjemaverdi for ' + attachment.skjemanummer);
        }
    }
};
