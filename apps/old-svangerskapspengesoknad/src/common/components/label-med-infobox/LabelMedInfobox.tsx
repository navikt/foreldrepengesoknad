import Infoboks from 'common/components/infoboks/Infoboks';
import BEMHelper from 'common/util/bem';

import './labelMedInfobox.less';
import { Label } from '@navikt/ds-react';

interface LabelMedInfoboxProps {
    title: string | React.ReactNode;
    info?: string | React.ReactNode;
    stil?: 'normal' | 'seksjon';
}

const LabelMedInfobox: React.FunctionComponent<LabelMedInfoboxProps> = ({ title, info, stil }) => {
    const cls = BEMHelper('labelMedInfobox');
    return (
        <div className={cls.element('heading', `stil-${stil || 'normal'}`)}>
            <Label className={`typo-element ${cls.element('title')}`}>{title}</Label>
            {info && <Infoboks tekst={info} contentFullWidth={true} />}
        </div>
    );
};
export default LabelMedInfobox;
