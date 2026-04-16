import { FormattedMessage, useIntl } from 'react-intl';
import { GyldigeSkjemanummer } from 'types/GyldigeSkjemanummer';

import { BodyShort, Box, List } from '@navikt/ds-react';

import { AttachmentType, Skjemanummer } from '@navikt/fp-constants';
import {
    Attachment,
    NavnPåForeldre,
    UttakPeriodeAnnenpartEøs_fpoversikt,
    UttakPeriode_fpoversikt,
} from '@navikt/fp-types';

import { UttakUploader } from '../attachment-uploaders/UttakUploader';

interface Props {
    attachments: Attachment[];
    updateAttachments: (skjemanummer: GyldigeSkjemanummer) => (attachments: Attachment[]) => void;
    perioder: Array<UttakPeriode_fpoversikt | UttakPeriodeAnnenpartEøs_fpoversikt>;
    navnPåForeldre: NavnPåForeldre;
}

export const MorJobberOgStudererDokumentasjon = ({
    attachments,
    updateAttachments,
    perioder,
    navnPåForeldre,
}: Props) => {
    const intl = useIntl();

    if (perioder.length === 0) {
        return null;
    }

    return (
        <UttakUploader
            attachments={attachments}
            updateAttachments={updateAttachments(Skjemanummer.DOK_UTDANNING_OG_ARBEID_MOR)}
            perioder={perioder}
            navnPåForeldre={navnPåForeldre}
            skjemanummer={Skjemanummer.DOK_UTDANNING_OG_ARBEID_MOR}
            labelText={intl.formatMessage({ id: 'manglendeVedlegg.studererOgJobber.label' })}
            description={
                <>
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
                </>
            }
            attachmentType={AttachmentType.MORS_AKTIVITET_DOKUMENTASJON}
        />
    );
};
