import React, { FunctionComponent, ReactNode } from 'react';

import SendSøknadIkon, { OppsummeringIkonType } from './SendSøknadIkon';
import { bemUtils, UtvidetInformasjon } from '@navikt/fp-common';
import { BodyShort, Heading } from '@navikt/ds-react';

import './søknadSendtSectionHeader.less';

interface Props {
    title: ReactNode;
    info?: ReactNode;
    infoApneLabel?: ReactNode;
    type: OppsummeringIkonType;
    children?: ReactNode;
}

const SøknadSendtSectionHeader: FunctionComponent<Props> = ({ title, info, type, infoApneLabel, children }) => {
    const bem = bemUtils('søknadSendtSectionHeader');

    return (
        <section className={bem.block}>
            <div className={bem.element('punkt')}>
                <div className={bem.element('ikon')}>
                    <SendSøknadIkon type={type} />
                </div>
                <div className={bem.element('content')}>
                    <Heading size="small">{title}</Heading>
                    <UtvidetInformasjon apneLabel={infoApneLabel}>
                        <BodyShort>{info}</BodyShort>
                    </UtvidetInformasjon>
                    {children}
                </div>
            </div>
        </section>
    );
};

export default SøknadSendtSectionHeader;
