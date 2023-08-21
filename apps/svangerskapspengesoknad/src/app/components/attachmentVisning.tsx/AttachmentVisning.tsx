import { FileIcon, XMarkIcon } from '@navikt/aksel-icons';
import { BodyShort, Button } from '@navikt/ds-react';
import { Attachment } from '@navikt/fp-common/src/common/types/Attachment';
import { FunctionComponent } from 'react';
import './attachmentVisning.css';
import { Block, bemUtils } from '@navikt/fp-common';

interface Props {
    vedlegg: Attachment;
    handleSlettVedlegg: (vedlegg: Attachment) => void;
}

const AttachmentVisning: FunctionComponent<Props> = ({ vedlegg, handleSlettVedlegg }) => {
    const bem = bemUtils('attachmentVisning');
    const handleOnClick = handleSlettVedlegg(vedlegg);
    return (
        <div className={bem.block}>
            <FileIcon className={bem.element('icon')} title="Opplastet fil" />
            <div>
                <Block padBottom="s">
                    <BodyShort size="medium">{vedlegg.filename}</BodyShort>
                </Block>
                <Block padBottom="s">
                    <BodyShort size="small">{vedlegg.filesize}</BodyShort>
                </Block>
            </div>

            <Button
                aria-label="slett skjema"
                variant="secondary"
                className={bem.element('slett')}
                icon={<XMarkIcon aria-hidden />}
                onClick={() => handleOnClick}
            />
        </div>
    );
};

export default AttachmentVisning;
