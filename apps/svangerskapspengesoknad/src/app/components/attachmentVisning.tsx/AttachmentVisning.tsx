import { FileIcon, XMarkIcon } from '@navikt/aksel-icons';
import { BodyShort, Button, Loader, Link } from '@navikt/ds-react';
import { Attachment } from '@navikt/fp-common/src/common/types/Attachment';
import { FunctionComponent } from 'react';
import { Block, bemUtils } from '@navikt/fp-common';
import classNames from 'classnames';
import './attachmentVisning.css';
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
            {vedlegg.pending && <Loader className={bem.element('icon')} size="small" />}
            {!vedlegg.pending && <FileIcon className={bem.element('icon')} title="Opplastet fil" />}
            <div>
                <Block padBottom="s">
                    {vedlegg.url ? (
                        <Link href={vedlegg.url} target="_blank">
                            {vedlegg.filename}
                        </Link>
                    ) : (
                        <BodyShort className={bem.element('filename')} size="medium">
                            {vedlegg.filename}
                        </BodyShort>
                    )}
                </Block>
                <Block padBottom="s">
                    <BodyShort size="small">{`${filstørrelseKB} kb`}</BodyShort>
                </Block>
            </div>

            <Button
                aria-label="slett skjema"
                variant="tertiary"
                type="button"
                className={classNames(bem.element('slett'), vedlegg.pending ? bem.modifier('pending') : undefined)}
                icon={<XMarkIcon aria-hidden />}
                onClick={() => handleOnClickSlett(vedlegg)}
            />
        </div>
    );
};

export default AttachmentVisning;
