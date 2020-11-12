import * as React from 'react';

import BEMHelper from 'common/util/bem';
import SendSøknadIkon, { OppsummeringIkonType } from './SendSøknadIkon';
import LabelMedInfobox from 'app/components/elementer/labelMedInfobox/LabelMedInfobox';

import './søknadSendtSectionHeader.less';

const cls = BEMHelper('søknadSendtSectionHeader');

interface Props {
    title: string | React.ReactNode;
    info?: string | React.ReactNode;
    type: OppsummeringIkonType;
    children?: React.ReactNode;
}

const SøknadSendtSectionHeader: React.FunctionComponent<Props> = ({ title, info, type, children }) => {
    return (
        <section className={cls.block}>
            <div className={cls.element('punkt')}>
                <div className={cls.element('ikon')}>
                    <SendSøknadIkon type={type} />
                </div>
                <div className={cls.element('content')}>
                    <LabelMedInfobox title={title} info={info} tag="h2" />
                    {children}
                </div>
            </div>
        </section>
    );
};

export default SøknadSendtSectionHeader;
