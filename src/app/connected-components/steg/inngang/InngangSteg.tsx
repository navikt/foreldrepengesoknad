import * as React from 'react';
import { connect } from 'react-redux';
import { AppState } from '../../../redux/reducers';
import { Søkersituasjon, SøkerRolle } from '../../../types/søknad/Søknad';
import SøkersituasjonSpørsmål from '../../../spørsmål/SøkersituasjonSpørsmål';
import søknadActions from '../../../redux/actions/søknad/søknadActionCreators';
import SøkerrolleSpørsmål from '../../../spørsmål/SøkerrolleSpørsmål';
import { getSøkerrollerForBruker } from '../../../util/domain/søkerrollerUtils';
import { StegID } from '../../../util/routing/stegConfig';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { HistoryProps } from '../../../types/common';
import { DispatchProps } from 'common/redux/types';
import Spørsmål from 'common/components/spørsmål/Spørsmål';
import Steg, { StegProps } from '../../../components/steg/Steg';
import isAvailable from '../isAvailable';

export interface StateProps {
    situasjon?: Søkersituasjon;
    visSpørsmålOmSøkerrolle?: boolean;
    rolle?: SøkerRolle;
    roller?: SøkerRolle[];
    nesteStegRoute?: StegID;
    stegProps: StegProps;
}

export type Props = DispatchProps &
    StateProps &
    HistoryProps &
    InjectedIntlProps;

class InngangSteg extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        const {
            roller,
            situasjon,
            rolle,
            visSpørsmålOmSøkerrolle,
            dispatch,
            stegProps
        } = this.props;

        return (
            <Steg {...stegProps}>
                <Spørsmål
                    render={() => (
                        <SøkersituasjonSpørsmål
                            situasjon={situasjon}
                            onChange={(value) =>
                                dispatch(
                                    søknadActions.updateSøknad({
                                        situasjon: value
                                    })
                                )
                            }
                        />
                    )}
                />
                <Spørsmål
                    synlig={visSpørsmålOmSøkerrolle !== undefined}
                    render={() =>
                        visSpørsmålOmSøkerrolle ? (
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
                        ) : (
                            undefined
                        )
                    }
                />
            </Steg>
        );
    }
}

const resolveNesteSteg = (state: AppState): StegID | undefined => {
    const { situasjon } = state.søknad;
    if (situasjon === Søkersituasjon.STEBARN) {
        return StegID.RELASJON_TIL_BARN_STEBARNSADOPSJON;
    } else if (situasjon === Søkersituasjon.ADOPSJON) {
        return StegID.RELASJON_TIL_BARN_ADOPSJON;
    } else if (situasjon === Søkersituasjon.FORELDREANSVAR) {
        return StegID.RELASJON_TIL_BARN_FORELDREANSVAR;
    } else if (situasjon === Søkersituasjon.FØDSEL) {
        return StegID.RELASJON_TIL_BARN_FØDSEL;
    }
    return;
};

const mapStateToProps = (state: AppState, props: Props): StateProps => {
    const kjønn = state.api.person ? state.api.person.kjønn : undefined;
    const situasjon = state.søknad.situasjon;
    const roller =
        kjønn && situasjon
            ? getSøkerrollerForBruker(kjønn, situasjon)
            : undefined;

    const stegProps = {
        id: StegID.INNGANG,
        renderFortsettKnapp: state.søknad.søker.rolle !== undefined,
        history: props.history,
        isAvailable: isAvailable(StegID.INNGANG, state)
    };

    return {
        visSpørsmålOmSøkerrolle: roller !== undefined,
        rolle: state.søknad.søker.rolle,
        nesteStegRoute: resolveNesteSteg(state),
        situasjon,
        roller,
        stegProps
    };
};

export default connect<StateProps>(mapStateToProps)(injectIntl(InngangSteg));
