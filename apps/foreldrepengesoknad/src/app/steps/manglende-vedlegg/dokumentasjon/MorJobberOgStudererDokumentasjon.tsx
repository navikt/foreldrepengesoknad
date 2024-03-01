import React from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import { BodyShort, VStack } from '@navikt/ds-react';

import { Block, NavnPåForeldre, Periode, Situasjon, intlUtils } from '@navikt/fp-common';
import { AttachmentType, Skjemanummer } from '@navikt/fp-constants';
import { Attachment } from '@navikt/fp-types';

import { GyldigeSkjemanummerUttak } from 'app/types/GyldigeSkjemanummer';

import UttakUploader from '../attachment-uploaders/UttakUploader';

interface Props {
    attachments: Attachment[];
    updateAttachments: (skjemanummer: GyldigeSkjemanummerUttak) => (attachments: Attachment[]) => void;
    perioder: Periode[];
    navnPåForeldre: NavnPåForeldre;
    familiehendelsesdato: Date;
    termindato: string | undefined;
    situasjon: Situasjon;
}

const MorJobberOgStudererDokumentasjon: React.FunctionComponent<Props> = ({
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
        <Block padBottom="xl">
            <UttakUploader
                attachments={attachments}
                updateAttachments={updateAttachments(Skjemanummer.DOK_UTDANNING_OG_ARBEID_MOR)}
                perioder={perioder}
                navnPåForeldre={navnPåForeldre}
                familiehendelsesdato={familiehendelsesdato}
                termindato={termindato}
                situasjon={situasjon}
                skjemanummer={Skjemanummer.DOK_UTDANNING_OG_ARBEID_MOR}
                labelText={intlUtils(intl, 'manglendeVedlegg.studererOgJobber.label')}
                description={
                    <Block padBottom="m">
                        <BodyShort>
                            <FormattedMessage
                                id="manglendeVedlegg.studererOgJobber.description.tittel"
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
                    </Block>
                }
                attachmentType={AttachmentType.MORS_AKTIVITET_DOKUMENTASJON}
            />
        </Block>
    );
};

export default MorJobberOgStudererDokumentasjon;
