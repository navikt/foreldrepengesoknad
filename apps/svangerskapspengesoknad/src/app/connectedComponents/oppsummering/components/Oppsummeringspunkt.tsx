import React, { FunctionComponent } from 'react';

import BEMHelper from 'common/util/bem';
import Block from 'common/components/block/Block';
import OppsummeringIkon from './OppsummeringIkon';
import { OppsummeringIkonType } from 'app/types/OppsummeringIkonType';
import { Heading } from '@navikt/ds-react';

const cls = BEMHelper('oppsummering');

interface Props {
    title: string;
    type: OppsummeringIkonType;
    children?: React.ReactNode;
}

const Oppsummeringspunkt: FunctionComponent<Props> = ({ title, type, children }) => (
    <section>
        <Block>
            <div className={cls.element('punkt')}>
                <div className={cls.element('ikon')}>
                    <OppsummeringIkon type={type} />
                </div>
                <Heading size="small" className={cls.element('tittel')}>
                    {title}
                </Heading>
            </div>
            {children}
        </Block>
    </section>
);

export default Oppsummeringspunkt;
