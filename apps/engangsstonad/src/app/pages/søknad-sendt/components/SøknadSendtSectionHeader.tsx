import * as React from 'react';
import { bemUtils, UtvidetInformasjon } from '@navikt/fp-common';
import { Undertittel } from 'nav-frontend-typografi';
import SøknadSendtIkon, { OppsummeringIkonType } from './SøknadSendtIkon';

import './søknadSendtSectionHeader.less';

interface Props {
    title: string | React.ReactNode;
    info?: string | React.ReactNode;
    type: OppsummeringIkonType;
    children?: React.ReactNode;
    apneLabel: string | React.ReactNode;
}

const SøknadSendtSectionHeader: React.FunctionComponent<Props> = ({ title, info, type, apneLabel, children }) => {
    const bem = bemUtils('søknadSendtSectionHeader');

    return (
        <section className={bem.block}>
            <div className={bem.element('punkt')}>
                <div className={bem.element('ikon')}>
                    <SøknadSendtIkon type={type} />
                </div>
                <div className={bem.element('content')}>
                    <Undertittel>{title}</Undertittel>
                    <UtvidetInformasjon apneLabel={apneLabel}>{info}</UtvidetInformasjon>
                    {children}
                </div>
            </div>
        </section>
    );
};

export default SøknadSendtSectionHeader;
