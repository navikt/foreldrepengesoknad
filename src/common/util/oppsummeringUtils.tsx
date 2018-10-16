import * as React from 'react';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import Lenke from 'nav-frontend-lenker';
import getMessage from 'common/util/i18nUtils';
import InjectedIntl = ReactIntl.InjectedIntl;
import { EtikettBaseProps } from 'nav-frontend-etiketter';

export const createListOfAttachmentPreviewLinks = (attachments: Attachment[]) =>
    attachments.map((attachment: Attachment) => (
        <Lenke href={attachment.url!} target="_blank" key={attachment.id}>
            {attachment.filename}
        </Lenke>
    ));

export const missingAttachmentEtikettProps = (intl: InjectedIntl): EtikettBaseProps => {
    return {
        type: 'fokus',
        children: getMessage(intl, 'dokumentasjon.mangler')
    };
};
