import * as React from 'react';
import Block from 'common/components/block/Block';

export interface Props {
    visible?: boolean;
}

const PlanlagtOppholdBolk: React.FunctionComponent<Props> = ({ visible = false }) => (
    <Block visible={visible}>Skjema for planlagt opphold</Block>
);

export default PlanlagtOppholdBolk;
