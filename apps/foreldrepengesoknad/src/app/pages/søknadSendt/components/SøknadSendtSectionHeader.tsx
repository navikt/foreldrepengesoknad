import React, { FunctionComponent, ReactNode } from 'react';

import SendSøknadIkon, { OppsummeringIkonType } from './SendSøknadIkon';
import { bemUtils } from '@navikt/fp-common';
import { BodyShort, Heading, ReadMore } from '@navikt/ds-react';

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
                    <ReadMore header={infoApneLabel}>
                        <BodyShort>{info}</BodyShort>
                    </ReadMore>
                    {children}
                </div>
            </div>
        </section>
    );
};

export default SøknadSendtSectionHeader;
