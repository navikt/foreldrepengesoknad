import * as React from 'react';
import { connect } from 'react-redux';
import { InjectedIntlProps, injectIntl } from 'react-intl';

import AnnenForelderPersonaliaPartial from './partials/AnnenForelderPersonaliaPartial';
import AnnenForelderOppfølgingPartial from './partials/AnnenForelderOppfølgingPartial';

import Steg, { StegProps } from '../../../components/steg/Steg';
import { AppState } from '../../../redux/reducers';
import { DispatchProps } from 'common/redux/types';
import { HistoryProps } from '../../../types/common';
import { RegistrertAnnenForelder } from '../../../types/Person';
import { erFarEllerMedmor } from '../../../util/domain/personUtil';
import { annenForelderErGyldig } from '../../../util/validation/steg/annenForelder';
import isAvailable from '../util/isAvailable';
import { StegID } from '../../../util/routing/stegConfig';
import Block from 'common/components/block/Block';
import getMessage from 'common/util/i18nUtils';
import PersonaliaBox from 'common/components/personalia-box/PersonaliaBox';
import { SøkerinfoProps } from '../../../types/søkerinfo';
import { AnnenForelderStegVisibility, getAnnenForelderVisibility } from './visibility/annenForelderVisibility';
import cleanupAnnenForelderSteg from '../../../util/cleanup/cleanupAnnenForelderSteg';
import søknadActionCreators from '../../../redux/actions/s\u00F8knad/s\u00F8knadActionCreators';
import { resolveStegToRender } from '../util/navigation';

interface StateProps {
    appState: AppState;
    antallBarn?: number;
    søkersFødselsnummer?: string;
    erSøkerFarEllerMedmor: boolean;
    registrertAnnenForelder?: RegistrertAnnenForelder;
    stegProps: StegProps;
    vis: AnnenForelderStegVisibility;
}

type Props = SøkerinfoProps & StateProps & InjectedIntlProps & DispatchProps & HistoryProps;

class AnnenForelderSteg extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.cleanupSteg = this.cleanupSteg.bind(this);
    }

    cleanupSteg() {
        const { annenForelder, barn } = cleanupAnnenForelderSteg(this.props.appState);
        this.props.dispatch(søknadActionCreators.updateAnnenForelder(annenForelder));
        this.props.dispatch(søknadActionCreators.updateBarn(barn));
    }

    render() {
        const {
            erSøkerFarEllerMedmor,
            registrertAnnenForelder,
            søkersFødselsnummer,
            antallBarn,
            stegProps,
            vis,
            intl
        } = this.props;

        if (søkersFødselsnummer) {
            return (
                <Steg {...stegProps} preSubmit={this.cleanupSteg}>
                    <Block
                        header={{
                            title: getMessage(intl, 'annenForelder.label.registrertForelder', { antallBarn })
                        }}
                        visible={vis.registrertAnnenForelderBolk}>
                        {registrertAnnenForelder ? <PersonaliaBox person={registrertAnnenForelder} /> : undefined}
                    </Block>
                    <React.Fragment>
                        {vis.annenForelderPersonaliaSkjema && (
                            <AnnenForelderPersonaliaPartial
                                søkersFødselsnummer={søkersFødselsnummer}
                                vis={vis.personalia}
                            />
                        )}
                        {vis.annenForelderOppfølging && (
                            <AnnenForelderOppfølgingPartial
                                vis={vis.annenForelderOppfølging}
                                registrertAnnenForelder={registrertAnnenForelder}
                                erFarEllerMedmor={erSøkerFarEllerMedmor}
                            />
                        )}
                    </React.Fragment>
                </Steg>
            );
        }
        return null;
    }
}

const mapStateToProps = (state: AppState, props: Props): StateProps => {
    const { person, registrerteBarn } = props.søkerinfo;
    const { søker, temp } = state.søknad;
    const { registrertAnnenForelder } = temp;
    const erSøkerFarEllerMedmor = erFarEllerMedmor(person!.kjønn, søker.rolle);

    const stegProps: StegProps = {
        id: StegID.ANNEN_FORELDER,
        renderFortsettKnapp: annenForelderErGyldig(state.søknad, props.søkerinfo),
        previousStegRoute: resolveStegToRender(state),
        history: props.history,
        isAvailable: isAvailable(StegID.ANNEN_FORELDER, state.søknad, props.søkerinfo)
    };

    const vis = getAnnenForelderVisibility(state);

    return {
        appState: state,
        stegProps,
        vis,
        antallBarn: registrerteBarn ? registrerteBarn.length : 0,
        søkersFødselsnummer: person.fnr,
        erSøkerFarEllerMedmor,
        registrertAnnenForelder
    };
};

export default connect<StateProps, {}, {}>(mapStateToProps)(injectIntl(AnnenForelderSteg));
