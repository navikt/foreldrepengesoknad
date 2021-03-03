import * as React from 'react';

import BEMHelper from 'common/util/bem';
import SendSøknadIkon, { OppsummeringIkonType } from './SendSøknadIkon';
import LabelWithUtvidetInformasjon from 'common/components/labelWithUtvidetInformasjon/LabelWithUtvidetInformasjon';

import './søknadSendtSectionHeader.less';

const cls = BEMHelper('søknadSendtSectionHeader');

interface Props {
    title: React.ReactNode;
    info?: React.ReactNode;
    infoApneLabel?: React.ReactNode;
    type: OppsummeringIkonType;
    children?: React.ReactNode;
}

const SøknadSendtSectionHeader: React.FunctionComponent<Props> = ({ title, info, type, infoApneLabel, children }) => {
    return (
        <section className={cls.block}>
            <div className={cls.element('punkt')}>
                <div className={cls.element('ikon')}>
                    <SendSøknadIkon type={type} />
                </div>
                <div className={cls.element('content')}>
                    <LabelWithUtvidetInformasjon info={info} apneLabel={infoApneLabel}>
                        {title}
                    </LabelWithUtvidetInformasjon>
                    {children}
                </div>
            </div>
        </section>
    );
};

export default SøknadSendtSectionHeader;
