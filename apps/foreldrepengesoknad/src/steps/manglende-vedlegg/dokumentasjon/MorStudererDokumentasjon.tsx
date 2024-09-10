import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { GyldigeSkjemanummer } from 'types/GyldigeSkjemanummer';

import { BodyShort, VStack } from '@navikt/ds-react';

import { NavnPåForeldre, Periode, Situasjon } from '@navikt/fp-common';
import { AttachmentType, Skjemanummer } from '@navikt/fp-constants';
import { Attachment } from '@navikt/fp-types';

import UttakUploader from '../attachment-uploaders/UttakUploader';

interface Props {
    attachments: Attachment[];
    updateAttachments: (skjemanummer: GyldigeSkjemanummer) => (attachments: Attachment[]) => void;
    perioder: Periode[];
    navnPåForeldre: NavnPåForeldre;
    familiehendelsesdato: string;
    termindato: string | undefined;
    situasjon: Situasjon;
}

const MorStudererDokumentasjon: React.FunctionComponent<Props> = ({
    attachments,
    updateAttachments,
    perioder,
    navnPåForeldre,
    familiehendelsesdato,
    situasjon,
    termindato,
}) => {
    const intl = useIntl();

    if (perioder.length === 0) {
        return null;
    }

    return (
        <UttakUploader
            attachments={attachments}
            updateAttachments={updateAttachments(Skjemanummer.DOK_UTDANNING_MOR)}
            perioder={perioder}
            navnPåForeldre={navnPåForeldre}
            familiehendelsesdato={familiehendelsesdato}
            termindato={termindato}
            situasjon={situasjon}
            skjemanummer={Skjemanummer.DOK_UTDANNING_MOR}
            labelText={intl.formatMessage({ id: 'manglendeVedlegg.studerer.label' })}
            description={
                <>
                    <BodyShort>
                        <FormattedMessage
                            id="manglendeVedlegg.studerer.description.tittel"
                            values={{ navn: navnPåForeldre.mor }}
                        />
                    </BodyShort>
                    <ul style={{ margin: '0', padding: '0.5rem 2.5rem' }}>
                        <VStack gap="2">
                            <li>
                                <BodyShort>
                                    <FormattedMessage id="manglendeVedlegg.studerer.description.punkt1" />
                                </BodyShort>
                            </li>
                            <li>
                                <BodyShort>
                                    <FormattedMessage id="manglendeVedlegg.studerer.description.punkt2" />
                                </BodyShort>
                            </li>
                            <li>
                                <BodyShort>
                                    <FormattedMessage id="manglendeVedlegg.studerer.description.punkt3" />
                                </BodyShort>
                            </li>
                            <li>
                                <BodyShort>
                                    <FormattedMessage id="manglendeVedlegg.studerer.description.punkt4" />
                                </BodyShort>
                            </li>
                        </VStack>
                    </ul>
                </>
            }
            attachmentType={AttachmentType.MORS_AKTIVITET_DOKUMENTASJON}
        />
    );
};

export default MorStudererDokumentasjon;

// description={intlUtils(intl, 'manglendeVedlegg.studerer.description', {
//     navn: navnPåForeldre.mor,
// })}
