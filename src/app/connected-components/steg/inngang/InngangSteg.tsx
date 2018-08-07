import * as React from 'react';
import { connect } from 'react-redux';
import { injectIntl, InjectedIntlProps } from 'react-intl';

import { AppState } from '../../../redux/reducers';
import { StegID } from '../../../util/routing/stegConfig';
import { DispatchProps } from 'common/redux/types';
import { HistoryProps, Kjønn } from '../../../types/common';
import Person from '../../../types/Person';
import { Søkersituasjon, SøkerRolle } from '../../../types/søknad/Søknad';

import søknadActions from '../../../redux/actions/søknad/søknadActionCreators';

import Steg, { StegProps } from '../../../components/steg/Steg';
import Spørsmål from 'common/components/spørsmål/Spørsmål';
import SøkersituasjonSpørsmål from '../../../spørsmål/SøkersituasjonSpørsmål';
import SøkerrolleSpørsmål from '../../../spørsmål/SøkerrolleSpørsmål';

import { getSøkerrollerForBruker } from '../../../util/domain/søkerrollerUtils';
import isAvailable from '../isAvailable';
import { inngangErGyldig } from '../../../util/validation/steg/inngang';

export interface StateProps {
    kjønn: Kjønn;
    situasjon?: Søkersituasjon;
    visSpørsmålOmSøkerrolle?: boolean;
    rolle?: SøkerRolle;
    roller?: SøkerRolle[];
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

    componentWillUnmount() {
        if (this.props.rolle === undefined) {
            this.determineSøkerRolle();
        }
    }

    determineSøkerRolle() {
        this.props.dispatch(
            søknadActions.updateSøker({
                rolle:
                    this.props.kjønn === Kjønn.KVINNE
                        ? SøkerRolle.MOR
                        : SøkerRolle.FAR
            })
        );
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
                            onChange={(value) => {
                                dispatch(
                                    søknadActions.updateSøknad({
                                        situasjon: value
                                    })
                                );
                                dispatch(
                                    søknadActions.updateSøker({
                                        rolle: undefined
                                    })
                                );
                            }}
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
    const kjønn = (state.api.person as Person).kjønn;
    const situasjon = state.søknad.situasjon;
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
        isAvailable: isAvailable(StegID.INNGANG, state),
        nesteStegRoute: resolveNesteSteg(state)
    };

    return {
        kjønn,
        visSpørsmålOmSøkerrolle: roller !== undefined,
        rolle: state.søknad.søker.rolle,
        situasjon,
        roller,
        stegProps
    };
};

export default connect<StateProps>(mapStateToProps)(injectIntl(InngangSteg));
