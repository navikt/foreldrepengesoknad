import * as React from 'react';
import { connect } from 'react-redux';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { AppState } from '../../../redux/reducers';
import { DispatchProps } from 'common/redux/types';
import Steg, { StegProps } from '../../../components/steg/Steg';
import { StegID } from '../../../util/routing/stegConfig';
import { HistoryProps } from '../../../types/common';
import isAvailable from '../util/isAvailable';

import { SøkerinfoProps } from '../../../types/søkerinfo';
import { uttaksplanSkjemaErGyldig } from '../../../util/validation/steg/uttaksplaSkjema';
import DekningsgradSpørsmål from '../../../sp\u00F8rsm\u00E5l/DekningsgradSp\u00F8rsm\u00E5l';
import søknadActionCreators from '../../../redux/actions/s\u00F8knad/s\u00F8knadActionCreators';
import { SøknadPartial } from '../../../types/s\u00F8knad/S\u00F8knad';
import Block from 'common/components/block/Block';
import getUttaksplanSkjemaStegVisibility, { UttaksplanSkjemaStegVisibility } from './uttaksplanSkjemaVisibility';
import StartdatoPermisjonSpørsmål from '../../../bolker/StartdatoPermisjonBolk';

interface StateProps {
    stegProps: StegProps;
    søknad: SøknadPartial;
    vis: UttaksplanSkjemaStegVisibility;
}

type Props = SøkerinfoProps & StateProps & InjectedIntlProps & DispatchProps & HistoryProps;

class UttaksplanSkjemaSteg extends React.Component<Props> {
    render() {
        const { søknad, vis, stegProps, dispatch } = this.props;
        return (
            <Steg {...stegProps}>
                <Block visible={vis.dekningsgradSpørsmål}>
                    <DekningsgradSpørsmål
                        dekningsgrad={søknad.dekningsgrad}
                        erAleneomsorg={søknad.søker.erAleneOmOmsorg}
                        onChange={(dekningsgrad) => dispatch(søknadActionCreators.updateSøknad({ dekningsgrad }))}
                    />
                </Block>
                <Block visible={vis.startdatoPermisjonSpørsmål} hasChildBlocks={true}>
                    <StartdatoPermisjonSpørsmål
                        startdato={søknad.temp.uttaksplan.startdatoPermisjon}
                        skalIkkeHaUttakFørTermin={søknad.temp.uttaksplan.skalIkkeHaUttakFørTermin}
                        onDatoChange={(dato) =>
                            dispatch(
                                søknadActionCreators.uttaksplanUpdateSkjemdata({
                                    startdatoPermisjon: dato,
                                    skalIkkeHaUttakFørTermin: false
                                })
                            )
                        }
                        onSkalIkkeHaUttakChange={(skalIkkeHaUttak) =>
                            dispatch(
                                søknadActionCreators.uttaksplanUpdateSkjemdata({
                                    skalIkkeHaUttakFørTermin: skalIkkeHaUttak,
                                    startdatoPermisjon: undefined
                                })
                            )
                        }
                    />
                </Block>
            </Steg>
        );
    }
}

const mapStateToProps = (state: AppState, props: SøkerinfoProps & HistoryProps): StateProps => {
    const { history } = props;

    const stegProps: StegProps = {
        id: StegID.UTTAKSPLAN_SKJEMA,
        renderFortsettKnapp: uttaksplanSkjemaErGyldig(),
        history,
        isAvailable: isAvailable(StegID.UTTAKSPLAN_SKJEMA, state.søknad, props.søkerinfo)
    };

    return {
        stegProps,
        søknad: state.søknad,
        vis: getUttaksplanSkjemaStegVisibility(state.søknad)
    };
};

export default connect<StateProps, {}, {}>(mapStateToProps)(injectIntl(UttaksplanSkjemaSteg));
