import { FormattedMessage, useIntl } from 'react-intl';
import { GyldigeSkjemanummer } from 'types/GyldigeSkjemanummer';

import { BodyShort, List } from '@navikt/ds-react';

import { NavnPåForeldre, Periode, Situasjon } from '@navikt/fp-common';
import { AttachmentType, Skjemanummer } from '@navikt/fp-constants';
import { Attachment } from '@navikt/fp-types';

import { UttakUploader } from '../attachment-uploaders/UttakUploader';

interface Props {
    attachments: Attachment[];
    updateAttachments: (skjemanummer: GyldigeSkjemanummer) => (attachments: Attachment[]) => void;
    perioder: Periode[];
    navnPåForeldre: NavnPåForeldre;
    familiehendelsesdato: string;
    termindato: string | undefined;
    situasjon: Situasjon;
}

export const MorJobberOgStudererDokumentasjon = ({
    attachments,
    updateAttachments,
    perioder,
    navnPåForeldre,
    familiehendelsesdato,
    situasjon,
    termindato,
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
            familiehendelsesdato={familiehendelsesdato}
            termindato={termindato}
            situasjon={situasjon}
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
                </>
            }
            attachmentType={AttachmentType.MORS_AKTIVITET_DOKUMENTASJON}
        />
    );
};
