import * as React from 'react';
import { connect } from 'react-redux';
import { injectIntl, InjectedIntlProps } from 'react-intl';

import { AppState } from '../../../redux/reducers';
import { StegID } from '../../../util/routing/stegConfig';
import { DispatchProps } from 'common/redux/types';
import { Søkersituasjon, SøkerRolle } from '../../../types/søknad/Søknad';

import søknadActions from '../../../redux/actions/søknad/søknadActionCreators';

import Steg, { StegProps } from '../../../components/steg/Steg';
import Block from 'common/components/block/Block';
import SøkersituasjonSpørsmål from '../../../spørsmål/SøkersituasjonSpørsmål';
import SøkerrolleSpørsmål from '../../../spørsmål/SøkerrolleSpørsmål';

import { getSøkerrollerForBruker } from '../../../util/domain/søkerrollerUtils';
import isAvailable from '../isAvailable';
import { inngangErGyldig } from '../../../util/validation/steg/inngang';
import { default as Søker, SøkerPartial } from '../../../types/søknad/Søker';
import { SøkerinfoProps } from '../../Foreldrepengesøknad';
import { Kjønn, HistoryProps } from '../../../types/common';

export interface StateProps {
    kjønn: Kjønn;
    situasjon?: Søkersituasjon;
    visSpørsmålOmSøkerrolle?: boolean;
    roller?: SøkerRolle[];
    stegProps: StegProps;
    søker: SøkerPartial;
}

export type Props = SøkerinfoProps &
    StateProps &
    InjectedIntlProps &
    DispatchProps &
    HistoryProps;

class InngangSteg extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props);

        this.updateSituasjonAndRolleInState = this.updateSituasjonAndRolleInState.bind(
            this
        );
    }

    resolveSøkerRolle(situasjon: Søkersituasjon) {
        const { kjønn, søker } = this.props;
        const { rolle } = søker;

        if (situasjon === Søkersituasjon.FØDSEL && kjønn === Kjønn.MANN) {
            return SøkerRolle.FAR;
        }
        return rolle;
    }

    updateSituasjonAndRolleInState(situasjon: Søkersituasjon) {
        const { søker, dispatch } = this.props;
        const updatedSøker: SøkerPartial = {
            ...søker,
            rolle: this.resolveSøkerRolle(situasjon)
        };

        dispatch(
            søknadActions.updateSøknad({
                situasjon,
                søker: updatedSøker as Søker
            })
        );
    }

    render() {
        const {
            roller,
            situasjon,
            søker,
            visSpørsmålOmSøkerrolle,
            dispatch,
            stegProps
        } = this.props;
        const { rolle } = søker;

        return (
            <Steg {...stegProps}>
                <Block>
                    <SøkersituasjonSpørsmål
                        situasjon={situasjon}
                        onChange={this.updateSituasjonAndRolleInState}
                    />
                </Block>
                <Block visible={visSpørsmålOmSøkerrolle !== undefined}>
                    {visSpørsmålOmSøkerrolle && (
                        <SøkerrolleSpørsmål
                            rolle={rolle}
                            roller={roller}
                            onChange={(nyRolle: SøkerRolle) =>
                                dispatch(
                                    søknadActions.updateSøker({
                                        rolle: nyRolle
                                    })
                                )
                            }
                        />
                    )}
                </Block>
            </Steg>
        );
    }
}

const resolveNesteSteg = (state: AppState): StegID | undefined => {
    const { situasjon } = state.søknad;
    if (situasjon === Søkersituasjon.FØDSEL) {
        return StegID.RELASJON_TIL_BARN_FØDSEL;
    } else if (situasjon === Søkersituasjon.FORELDREANSVAR) {
        return StegID.RELASJON_TIL_BARN_FORELDREANSVAR;
    } else if (situasjon === Søkersituasjon.ADOPSJON) {
        return StegID.RELASJON_TIL_BARN_ADOPSJON;
    }
    return;
};

const mapStateToProps = (state: AppState, props: Props): StateProps => {
    const kjønn = props.søkerinfo.person.kjønn;
    const situasjon = state.søknad.situasjon;
    const søker = state.søknad.søker;
    const roller =
        kjønn && situasjon
            ? getSøkerrollerForBruker(kjønn, situasjon)
            : undefined;

    const stegProps: StegProps = {
        id: StegID.INNGANG,
        renderFortsettKnapp: inngangErGyldig(
            situasjon,
            state.søknad.søker.rolle,
            kjønn
        ),
        history: props.history,
        isAvailable: isAvailable(StegID.INNGANG, state.søknad, props.søkerinfo),
        nesteStegRoute: resolveNesteSteg(state)
    };

    return {
        kjønn,
        visSpørsmålOmSøkerrolle: roller !== undefined,
        søker,
        situasjon,
        roller,
        stegProps
    };
};

export default connect<StateProps>(mapStateToProps)(injectIntl(InngangSteg));
