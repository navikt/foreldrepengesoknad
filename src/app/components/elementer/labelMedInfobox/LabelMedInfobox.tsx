import * as React from 'react';
import Infoboks from 'common/components/infoboks/Infoboks';
import BEMHelper from 'common/util/bem';
import { Element } from 'nav-frontend-typografi';

import './labelMedInfobox.less';

interface LabelMedInfoboxProps {
    title: string | React.ReactNode;
    info?: string | React.ReactNode;
    stil?: 'normal' | 'seksjon';
    tag?: string;
}

const LabelMedInfobox: React.FunctionComponent<LabelMedInfoboxProps> = ({ title, info, stil, tag = 'strong' }) => {
    const cls = BEMHelper('labelMedInfobox');
    return (
        <div className={cls.element('heading', `stil-${stil || 'normal'}`)}>
            <Element className={`typo-element ${cls.element('title')}`} tag={tag}>
                {title}
            </Element>
            {info && <Infoboks tekst={info} contentFullWidth={true} />}
        </div>
    );
};
export default LabelMedInfobox;
