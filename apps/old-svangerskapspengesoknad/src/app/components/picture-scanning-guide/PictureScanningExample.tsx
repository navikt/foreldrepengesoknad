import BEMHelper from 'common/util/bem';
import StatusIkon, { StatusIkonStatusKey } from 'app/icons/StatusIkon';
import { Label } from '@navikt/ds-react';

interface Props {
    image: React.ReactNode;
    status: StatusIkonStatusKey;
    statusText: string;
    description: string;
}

const bem = BEMHelper('pictureScanningGuide').child('example');

const PictureScanningExample: React.FunctionComponent<Props> = ({ image, status, statusText, description }) => (
    <div className={bem.block}>
        <div className={bem.element('image')}>{image}</div>
        <Label className={bem.element('title')}>
            <span className={bem.element('statusIcon')} role="presentation">
                <StatusIkon status={status} />
            </span>
            {statusText}
        </Label>
        <div className={bem.element('description')}>{description}</div>
    </div>
);

export default PictureScanningExample;
