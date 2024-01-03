import { ExclamationmarkTriangleIcon, FileIcon, XMarkIcon } from '@navikt/aksel-icons';
import { BodyShort, Button, Loader, Link } from '@navikt/ds-react';
import { FunctionComponent } from 'react';
import { Block, bemUtils } from '@navikt/fp-common';
import classNames from 'classnames';
import './attachmentVisning.css';
import { Attachment } from '@navikt/fp-types';

interface Props {
    vedlegg: Attachment;
    onDelete: (vedlegg: Attachment) => void;
}

const getAttachmentIcon = (bem: any, vedlegg: Attachment) => {
    if (vedlegg.error) {
        return <ExclamationmarkTriangleIcon className={bem.element('icon')} title="Feil med fil" />;
    } else if (vedlegg.pending) {
        return <Loader className={bem.element('icon')} size="small" />;
    } else {
        return <FileIcon className={bem.element('icon')} title="Opplastet fil" />;
    }
};

const AttachmentVisning: FunctionComponent<Props> = ({ vedlegg, onDelete }) => {
    const bem = bemUtils('attachmentVisning');
    const filstørrelseKB = Math.round(vedlegg.filesize * 0.001);
    const handleOnClickSlett = (vedlegg: Attachment) => {
        onDelete(vedlegg);
    };
    return (
        <div className={bem.block}>
            {getAttachmentIcon(bem, vedlegg)}
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
                    <BodyShort size="small">{`${filstørrelseKB} kB`}</BodyShort>
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
