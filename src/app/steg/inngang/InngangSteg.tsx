import * as React from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import { AppState } from '../../redux/reducers';
import { StegID } from '../../util/routing/stegConfig';
import { DispatchProps } from 'common/redux/types';
import { Søkersituasjon, SøkerRolle } from '../../types/søknad/Søknad';

import søknadActions from '../../redux/actions/søknad/søknadActionCreators';

import Steg, { StegProps } from '../../components/applikasjon/steg/Steg';
import Block from 'common/components/block/Block';
import SøkersituasjonSpørsmål from '../../spørsmål/SøkersituasjonSpørsmål';
import SøkerrolleSpørsmål from '../../spørsmål/SøkerrolleSpørsmål';

import { getSøkerrollerForBruker } from '../../util/domain/søkerrollerUtils';
import isAvailable from '../../util/steg/isAvailable';
import { inngangErGyldig } from '../../util/validation/steg/inngang';
import { default as Søker, SøkerPartial } from '../../types/søknad/Søker';
import { SøkerinfoProps } from '../../types/søkerinfo';
import { Kjønn, HistoryProps } from '../../types/common';
import { resolveStegToRender } from '../../util/steg/navigation';
import visibility from './visibility';
import Lenke from 'nav-frontend-lenker';
import lenker from '../../util/routing/lenker';
import ResetSoknad from 'app/components/applikasjon/resetSoknad/ResetSoknad';
import Veilederpanel from 'nav-frontend-veilederpanel';
import Veileder from 'common/components/veileder/Veileder';

export interface StateProps {
    kjønn: Kjønn;
    situasjon?: Søkersituasjon;
    valgtRolle: SøkerRolle;
    velgbareRoller: SøkerRolle[];
    stegProps: StegProps;
    søker: Søker;
    erEndringssøknad: boolean;
    erEnkelEndringssøknad: boolean;
    saksnummer?: string;
}

export type Props = SøkerinfoProps & StateProps & DispatchProps & HistoryProps;

class InngangSteg extends React.Component<Props> {
    initiellSituasjon: Søkersituasjon | undefined;
    initiellSøkerrolle: SøkerRolle | undefined;

    constructor(props: Props) {
        super(props);

        this.cleanupSøknad = this.cleanupSøknad.bind(this);
        this.updateSituasjonAndRolleInState = this.updateSituasjonAndRolleInState.bind(this);

        this.initiellSituasjon = props.situasjon;
        this.initiellSøkerrolle = props.valgtRolle;
    }

    resolveSøkerRolle(situasjon: Søkersituasjon) {
        const { kjønn, søker } = this.props;
        const { rolle } = søker;

        if (situasjon === Søkersituasjon.ADOPSJON && kjønn === Kjønn.KVINNE) {
            return SøkerRolle.MOR;
        }

        if (kjønn === Kjønn.MANN) {
            return SøkerRolle.FAR;
        }

        return rolle;
    }

    updateSituasjonAndRolleInState(situasjon: Søkersituasjon) {
        const { søker, dispatch } = this.props;
        const updatedSøker: SøkerPartial = {
            ...søker,
            rolle: this.resolveSøkerRolle(situasjon),
        };

        dispatch(
            søknadActions.updateSøknad({
                situasjon,
                søker: updatedSøker as Søker,
            })
        );
    }

    cleanupSøknad() {
        const { valgtRolle, saksnummer, situasjon, erEndringssøknad, dispatch } = this.props;
        if (situasjon !== this.initiellSituasjon || valgtRolle !== this.initiellSøkerrolle) {
            dispatch(
                søknadActions.setSøknad({
                    erEndringssøknad,
                    saksnummer,
                    situasjon,
                    harGodkjentVilkår: true,
                })
            );
            dispatch(
                søknadActions.updateSøker({
                    rolle: valgtRolle,
                })
            );
        }
    }

    getNextStegID() {
        const { situasjon } = this.props;
        switch (situasjon) {
            case Søkersituasjon.FØDSEL:
                return StegID.RELASJON_TIL_BARN_FØDSEL;
            case Søkersituasjon.FORELDREANSVAR:
                return StegID.RELASJON_TIL_BARN_FORELDREANSVAR;
            case Søkersituasjon.ADOPSJON:
                return StegID.RELASJON_TIL_BARN_ADOPSJON;
            default:
                return undefined;
        }
    }

    render() {
        const {
            velgbareRoller,
            situasjon,
            søker,
            erEndringssøknad,
            erEnkelEndringssøknad,
            dispatch,
            stegProps,
        } = this.props;
        const { rolle } = søker;

        if (erEndringssøknad && erEnkelEndringssøknad) {
            return <ResetSoknad history={this.props.history} />;
        }

        return (
            <Steg {...stegProps} onPreSubmit={this.cleanupSøknad} nesteStegID={this.getNextStegID()}>
                <Block>
                    <SøkersituasjonSpørsmål situasjon={situasjon} onChange={this.updateSituasjonAndRolleInState} />
                </Block>
                <Block visible={visibility.søkerRolleSpørsmål({ velgbareRoller, situasjon })}>
                    <SøkerrolleSpørsmål
                        rolle={rolle}
                        roller={velgbareRoller}
                        onChange={(nyRolle: SøkerRolle) =>
                            dispatch(
                                søknadActions.updateSøker({
                                    rolle: nyRolle,
                                })
                            )
                        }
                    />
                </Block>
                <Block visible={visibility.adopsjonsøknadInfo(situasjon)}>
                    <Veilederpanel svg={<Veileder farge="lilla" stil="kompakt" />}>
                        <Block margin="xs">
                            <FormattedMessage id="velkommen.foreldreansvar.veileder.adopsjon" />
                        </Block>
                        <Lenke href={lenker.adoptere}>
                            <FormattedMessage id="adoptere.lenke" />
                        </Lenke>
                    </Veilederpanel>
                </Block>
                <Block visible={visibility.papirsøknadInfo(situasjon)}>
                    <Veilederpanel svg={<Veileder farge="lilla" stil="kompakt" />}>
                        <Block margin="xs">
                            <FormattedMessage id="velkommen.foreldreansvar.veileder.omsorgsovertakelse" />
                        </Block>
                        <Lenke href={lenker.papirsøknad}>
                            <FormattedMessage id="papirsøknad.lenke" />
                        </Lenke>
                    </Veilederpanel>
                </Block>
            </Steg>
        );
    }
}

const mapStateToProps = (state: AppState, props: Props): StateProps => {
    const kjønn = props.søkerinfo.person.kjønn;
    const situasjon = state.søknad.situasjon;
    const søker = state.søknad.søker;
    const valgtRolle = state.søknad.søker.rolle;
    const velgbareRoller = kjønn && situasjon ? getSøkerrollerForBruker(kjønn, situasjon) : [];
    const erRolleGyldig = velgbareRoller.some((r) => r === søker.rolle);
    const erEndringssøknad = state.søknad.erEndringssøknad;
    const { erEnkelEndringssøknad } = state.søknad.ekstrainfo;

    const stegProps: StegProps = {
        id: StegID.INNGANG,
        renderFortsettKnapp: inngangErGyldig(situasjon, kjønn, erRolleGyldig),
        renderFormTag: true,
        history: props.history,
        isAvailable: isAvailable(StegID.INNGANG, state.søknad, props.søkerinfo),
        nesteStegID: resolveStegToRender(state),
    };

    return {
        kjønn,
        søker,
        situasjon,
        valgtRolle,
        velgbareRoller,
        stegProps,
        erEndringssøknad,
        saksnummer: state.søknad.saksnummer,
        erEnkelEndringssøknad,
    };
};

export default connect<StateProps>(mapStateToProps)(InngangSteg);
