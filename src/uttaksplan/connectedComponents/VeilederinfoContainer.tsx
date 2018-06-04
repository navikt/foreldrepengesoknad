import * as React from 'react';
import { connect } from 'react-redux';
import { UttaksplanAppState } from 'uttaksplan/redux/types';
import { Infotekster } from 'uttaksplan/redux/reducers/viewReducer';
import EkspanderbartInnhold from 'common/components/ekspanderbart-innhold/EkspanderbartInnhold';
import Veilederinfo, {
    VeilederInfoProps
} from 'common/components/veileder-info/Veilederinfo';

export interface StateProps {
    isOpen: boolean;
}

export interface OwnProps extends VeilederInfoProps {
    id: Infotekster;
    /** Overstyre state for om den skal vises eller ikke */
    apen?: boolean;
    /** Default off */
    ariaLive?: 'assertive' | 'polite' | 'off';
}

type Props = StateProps & OwnProps;

const SkjemaVeileder: React.StatelessComponent<Props> = ({
    id,
    isOpen,
    ariaLive,
    apen = false,
    ...rest
}) => {
    const erApen: boolean = isOpen || apen;
    const content = erApen ? <Veilederinfo {...rest} /> : <div />;
    return (
        <EkspanderbartInnhold erApen={erApen} ariaLive={ariaLive}>
            {content}
        </EkspanderbartInnhold>
    );
};

export default connect((state: UttaksplanAppState, props: OwnProps) => {
    return {
        isOpen: state.uttaksplan.view.synligInfo.has(props.id)
    };
})(SkjemaVeileder);
