import React from 'react';
import VedleggSpørsmål from 'app/components/skjema/vedleggSpørsmål/VedleggSpørsmål';
import { AttachmentType } from 'app/components/storage/attachment/types/AttachmentType';
import { Skjemanummer } from 'app/types/søknad/Søknad';
import { Attachment } from 'app/components/storage/attachment/types/Attachment';

interface Props {
    vedlegg: Attachment[];
    onChange: (vedlegg: Attachment[]) => void;
}

const HvØvelse: React.FunctionComponent<Props> = ({ vedlegg, onChange }) => {
    return (
        <VedleggSpørsmål
            attachmentType={AttachmentType.HV_ØVELSE}
            skjemanummer={Skjemanummer.HV_ØVELSE}
            vedlegg={vedlegg}
            onChange={(v) => {
                onChange(v);
            }}
        />
    );
};

export default HvØvelse;
