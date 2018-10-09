import * as React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import { AppState } from '../../../redux/reducers';
import apiActionCreators from '../../../redux/actions/api/apiActionCreators';
import { søknadStegPath } from '../StegRoutes';
import { StegID } from '../../../util/routing/stegConfig';
import { DispatchProps } from 'common/redux/types';
import { Søkersituasjon, SøkerRolle } from '../../../types/søknad/Søknad';

import søknadActions from '../../../redux/actions/søknad/søknadActionCreators';

import Steg, { StegProps } from '../../../components/steg/Steg';
import Block from 'common/components/block/Block';
import SøkersituasjonSpørsmål from '../../../spørsmål/SøkersituasjonSpørsmål';
import SøkerrolleSpørsmål from '../../../spørsmål/SøkerrolleSpørsmål';

import { getSøkerrollerForBruker } from '../../../util/domain/søkerrollerUtils';
import isAvailable from '../util/isAvailable';
import { inngangErGyldig } from '../../../util/validation/steg/inngang';
import { default as Søker, SøkerPartial } from '../../../types/søknad/Søker';
import { SøkerinfoProps } from '../../../types/søkerinfo';
import { Kjønn, HistoryProps } from '../../../types/common';
import { resolveStegToRender } from '../util/navigation';
import visibility from './visibility';
import Veilederinfo from 'common/components/veileder-info/Veilederinfo';
import Lenke from 'nav-frontend-lenker';
import lenker from '../../../util/routing/lenker';

export interface StateProps {
    kjønn: Kjønn;
    situasjon?: Søkersituasjon;
    roller: SøkerRolle[];
    stegProps: StegProps;
    søker: Søker;
}

export type Props = SøkerinfoProps & StateProps & DispatchProps & HistoryProps;

class InngangSteg extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props);

        this.updateSituasjonAndRolleInState = this.updateSituasjonAndRolleInState.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
    }

    resolveSøkerRolle(situasjon: Søkersituasjon) {
        const { kjønn, søker } = this.props;
        const { rolle } = søker;

        if (situasjon === Søkersituasjon.ADOPSJON && kjønn === Kjønn.KVINNE) {
            return SøkerRolle.MOR;
        }

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

    handleOnSubmit() {
        const { dispatch, history, situasjon } = this.props;
        dispatch(apiActionCreators.storeAppState());

        if (situasjon === Søkersituasjon.FØDSEL) {
            history.push(`${søknadStegPath(StegID.RELASJON_TIL_BARN_FØDSEL)}`);
        } else if (situasjon === Søkersituasjon.FORELDREANSVAR) {
            history.push(`${søknadStegPath(StegID.RELASJON_TIL_BARN_FORELDREANSVAR)}`);
        } else if (situasjon === Søkersituasjon.ADOPSJON) {
            history.push(`${søknadStegPath(StegID.RELASJON_TIL_BARN_ADOPSJON)}`);
        }
    }

    render() {
        const { roller, situasjon, søker, dispatch, stegProps } = this.props;
        const { rolle } = søker;

        return (
            <Steg {...stegProps} onSubmit={this.handleOnSubmit}>
                <Block>
                    <SøkersituasjonSpørsmål situasjon={situasjon} onChange={this.updateSituasjonAndRolleInState} />
                </Block>
                <Block visible={visibility.søkerRolleSpørsmål({ roller, situasjon })}>
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
                </Block>
                <Block visible={visibility.papirsøknadInfo(situasjon)}>
                    <Veilederinfo>
                        <Block>
                            <FormattedMessage id="velkommen.foreldreansvar.veileder" />
                        </Block>
                        <Lenke href={lenker.papirsøknadForeldreansvar}>
                            <FormattedMessage id="velkommen.foreldreansvar.papirsøknadLenke" />
                        </Lenke>
                    </Veilederinfo>
                </Block>
            </Steg>
        );
    }
}

const mapStateToProps = (state: AppState, props: Props): StateProps => {
    const kjønn = props.søkerinfo.person.kjønn;
    const situasjon = state.søknad.situasjon;
    const søker = state.søknad.søker;
    const roller = kjønn && situasjon ? getSøkerrollerForBruker(kjønn, situasjon) : [];
    const erRolleGyldig = roller.some((r) => r === søker.rolle);

    const stegProps: StegProps = {
        id: StegID.INNGANG,
        renderFortsettKnapp: inngangErGyldig(situasjon, kjønn, erRolleGyldig),
        renderFormTag: true,
        history: props.history,
        isAvailable: isAvailable(StegID.INNGANG, state.søknad, props.søkerinfo),
        nesteStegRoute: resolveStegToRender(state)
    };

    return {
        kjønn,
        søker,
        situasjon,
        roller,
        stegProps
    };
};

export default connect<StateProps>(mapStateToProps)(InngangSteg);
