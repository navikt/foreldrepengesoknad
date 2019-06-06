import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import BEMHelper from 'common/util/bem';
import Block from 'common/components/block/Block';
import FordelingStatusHeader, { FordelingStatusHeaderProps } from './components/FordelingStatusHeader';
import GrafDeltOmsorg, { GrafDeltOmsorgProps } from './components/GrafDeltOmsorg';
import FordelingTitler, { FordelingTitlerProps } from './components/FordelingTitler';
import GrafAleneomsorg, { GrafAleneomsorgProps } from './components/GrafAleneomsorg';

import './fordelingGraf.less';

export const fordelingGrafBem = BEMHelper('fordelingGraf');

interface Props {
    headerProps: FordelingStatusHeaderProps;
    titlerProps: FordelingTitlerProps;
    deltOmsorgProps?: GrafDeltOmsorgProps;
    omsorgMorProps?: GrafAleneomsorgProps;
    omsorgFarMedmorProps?: GrafAleneomsorgProps;
}

const FordelingGraf: React.StatelessComponent<Props & InjectedIntlProps> = ({
    headerProps,
    deltOmsorgProps,
    omsorgFarMedmorProps,
    omsorgMorProps,
    titlerProps
}) => {
    return (
        <section className={fordelingGrafBem.block}>
            <Block margin="s" screenOnly={true}>
                <FordelingStatusHeader {...headerProps} />
            </Block>
            <Block margin="s" screenOnly={true}>
                {deltOmsorgProps && <GrafDeltOmsorg {...deltOmsorgProps} />}
                {omsorgMorProps && <GrafAleneomsorg {...omsorgMorProps} />}
                {omsorgFarMedmorProps && <GrafAleneomsorg {...omsorgFarMedmorProps} />}
            </Block>
            <FordelingTitler {...titlerProps} />
        </section>
    );
};

export default injectIntl(FordelingGraf);
