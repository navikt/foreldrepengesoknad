import * as React from 'react';
import BEMHelper from 'common/util/bem';
import Block from 'common/components/block/Block';
import FordelingStatusHeader, { FordelingStatusHeaderProps } from './components/FordelingStatusHeader';
import GrafDeltOmsorg, { GrafDeltOmsorgProps } from './components/GrafDeltOmsorg';
import FordelingTitler, { FordelingTitlerProps } from './components/FordelingTitler';
import GrafAleneomsorg, { GrafAleneomsorgProps } from './components/GrafAleneomsorg';

import './fordelingGraf.less';

export const fordelingGrafBem = BEMHelper('fordelingGraf');

export enum ForbrukType {
    'deltOmsorg' = 'deltOmsorg',
    'bareFar' = 'bareFar',
    'bareMor' = 'bareMor'
}

interface ForbrukBase {
    type: ForbrukType;
}
interface ForbrukDeltOmsorg extends ForbrukBase, GrafDeltOmsorgProps {
    type: ForbrukType.deltOmsorg;
}
interface ForbrukBareFar extends ForbrukBase, GrafAleneomsorgProps {
    type: ForbrukType.bareFar;
}
interface ForbrukBareMor extends ForbrukBase, GrafAleneomsorgProps {
    type: ForbrukType.bareMor;
}

export type FordelingGrafForbruk = ForbrukDeltOmsorg | ForbrukBareFar | ForbrukBareMor;

interface Props {
    headerProps: FordelingStatusHeaderProps;
    titlerProps: FordelingTitlerProps;
    forbrukProps: ForbrukDeltOmsorg | ForbrukBareFar | ForbrukBareMor;
}

const FordelingGraf: React.StatelessComponent<Props> = ({ headerProps, forbrukProps, titlerProps }) => {
    return (
        <section className={fordelingGrafBem.block}>
            <Block margin="s" screenOnly={true}>
                <FordelingStatusHeader {...headerProps} />
            </Block>
            <Block margin="s" screenOnly={true}>
                {forbrukProps.type === ForbrukType.deltOmsorg && <GrafDeltOmsorg {...forbrukProps} />}
                {forbrukProps.type === ForbrukType.bareFar && <GrafAleneomsorg {...forbrukProps} />}
                {forbrukProps.type === ForbrukType.bareMor && <GrafAleneomsorg {...forbrukProps} />}
            </Block>
            <FordelingTitler {...titlerProps} />
        </section>
    );
};

export default FordelingGraf;
