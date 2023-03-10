import React from 'react';
import bemUtils from './../../utils/bemUtils';
import StatusIkon, { StatusKey } from './../../assets/status-ikon/StatusIkon';
import { Heading } from '@navikt/ds-react';

interface Props {
    image: React.ReactNode;
    status: StatusKey;
    statusText: string;
    description: string;
}

const bem = bemUtils('pictureScanningGuide').child('example');

const PictureScanningExample: React.FunctionComponent<Props> = ({ image, status, statusText, description }) => (
    <div className={bem.block}>
        <div className={bem.element('image')}>{image}</div>
        <Heading size="small" as="div" className={bem.element('title')}>
            <span className={bem.element('statusIcon')} role="presentation">
                <StatusIkon status={status} />
            </span>
            {statusText}
        </Heading>
        <div className={bem.element('description')}>{description}</div>
    </div>
);

export default PictureScanningExample;
