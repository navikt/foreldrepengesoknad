import { FunctionComponent, ReactNode } from 'react';

import SendSøknadIkon, { OppsummeringIkonType } from './SendSøknadIkon';
import { Block, bemUtils } from '@navikt/fp-common';
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
                    <Block padBottom="s"> {children}</Block>
                    <ReadMore header={infoApneLabel}>
                        <BodyShort>{info}</BodyShort>
                    </ReadMore>
                </div>
            </div>
        </section>
    );
};

export default SøknadSendtSectionHeader;
