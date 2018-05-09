import * as React from 'react';
import { connect } from 'react-redux';
import { DispatchProps } from '../../../redux/types';
import { AppState } from '../../../redux/reducers';
import { Søkersituasjon, SøkerRolle } from '../../../types/søknad/Søknad';
import Spørsmål from '../../../components/spørsmål/Spørsmål';
import SøkersituasjonSpørsmål from '../../../spørsmål/SøkersituasjonSpørsmål';
import søknadActions from '../../../redux/actions/søknad/søknadActionCreators';
import Applikasjonsside from '../../sider/Applikasjonsside';
import SøkerrolleSpørsmål from '../../../sp\u00F8rsm\u00E5l/S\u00F8kerrolleSp\u00F8rsm\u00E5l';
import { Kjønn } from '../../../types/common';
import { getSøkerrollerForBruker } from '../../../util/s\u00F8kerrollerUtils';

export interface StateProps {
    situasjon?: Søkersituasjon;
    kjønn?: Kjønn;
    rolle?: SøkerRolle;
    roller?: SøkerRolle[];
}

export type Props = DispatchProps & StateProps;

class Inngangsside extends React.Component<Props, {}> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        const { roller, situasjon, rolle, kjønn, dispatch } = this.props;
        return (
            <Applikasjonsside>
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
                    synlig={roller !== undefined}
                    render={() =>
                        kjønn ? (
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
            </Applikasjonsside>
        );
    }
}

const mapStateToProps = (state: AppState): StateProps => {
    const kjønn = state.api.person ? state.api.person.kjønn : undefined;
    const situasjon = state.søknad.situasjon;
    const roller =
        kjønn && situasjon
            ? getSøkerrollerForBruker(kjønn, situasjon)
            : undefined;

    return {
        kjønn,
        rolle: state.søknad.søker.rolle,
        situasjon,
        roller
    };
};

export default connect(mapStateToProps)(Inngangsside);
