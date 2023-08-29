import { FileIcon, XMarkIcon } from '@navikt/aksel-icons';
import { BodyShort, Button } from '@navikt/ds-react';
import { Attachment } from '@navikt/fp-common/src/common/types/Attachment';
import { FunctionComponent } from 'react';
import './attachmentVisning.css';
import { Block, bemUtils } from '@navikt/fp-common';

interface Props {
    vedlegg: Attachment;
    onDelete: (vedlegg: Attachment) => void;
}

const AttachmentVisning: FunctionComponent<Props> = ({ vedlegg, onDelete }) => {
    const bem = bemUtils('attachmentVisning');
    const filstørrelseKB = Math.round(vedlegg.filesize * 0.001);
    const handleOnClickSlett = (vedlegg: Attachment) => {
        onDelete(vedlegg);
    };
    return (
        <div className={bem.block}>
            <FileIcon className={bem.element('icon')} title="Opplastet fil" />
            <div>
                <Block padBottom="s">
                    <BodyShort className={bem.element('filename')} size="medium">
                        {vedlegg.filename}
                    </BodyShort>
                </Block>
                <Block padBottom="s">
                    <BodyShort size="small">{`${filstørrelseKB} kb`}</BodyShort>
                </Block>
            </div>

            <Button
                aria-label="slett skjema"
                variant="secondary"
                type="button"
                className={bem.element('slett')}
                icon={<XMarkIcon aria-hidden />}
                onClick={() => handleOnClickSlett(vedlegg)}
            />
        </div>
    );
};

export default AttachmentVisning;
