import * as React from 'react';

import BEMHelper from 'common/util/bem';
import SendSøknadIkon, { OppsummeringIkonType } from './SendSøknadIkon';
import LabelMedInfobox from 'common/components/label-med-infobox/LabelMedInfobox';

import './sendSøknadSectionHeader.less';

const cls = BEMHelper('sendSøknadSectionHeader');

interface Props {
    title: string | React.ReactNode;
    info?: string | React.ReactNode;
    type: OppsummeringIkonType;
    children?: React.ReactNode;
}

const SendSøknadSectionHeader: React.StatelessComponent<Props> = ({ title, info, type, children }) => {
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

export default SendSøknadSectionHeader;
