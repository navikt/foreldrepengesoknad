import * as React from 'react';
import { connect } from 'react-redux';
import { InjectedIntlProps, injectIntl, FormattedMessage } from 'react-intl';
import Lenke from 'nav-frontend-lenker';

import Steg, { StegProps } from 'app/components/applikasjon/steg/Steg';
import UfødtBarnPartial from './partials/UfødtBarnPartial';
import søknadActions from '../../redux/actions/søknad/søknadActionCreators';

import ErBarnetFødtSpørsmål from '../../spørsmål/ErBarnetFødtSpørsmål';

import { AppState } from '../../redux/reducers';
import { AnnenForelderPartial } from '../../types/søknad/AnnenForelder';
import { DispatchProps } from 'common/redux/types';
import { RegistrertBarn } from '../../types/Person';
import Barn, { isFødtBarn, isUfødtBarn } from '../../types/søknad/Barn';
import Søker from '../../types/søknad/Søker';

import { StegID } from '../../util/routing/stegConfig';
import { getErSøkerFarEllerMedmor } from '../../util/domain/personUtil';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import HvilkeBarnGjelderSøknadenBolk from '../../bolker/HvilkeBarnGjelderSøknadenBolk';
import isAvailable from '../util/isAvailable';
import { barnErGyldig } from '../../util/validation/steg/barn';
import Block from 'common/components/block/Block';
import Veilederinfo from 'common/components/veileder-info/Veilederinfo';
import { SøkerinfoProps } from '../../types/søkerinfo';
import { HistoryProps } from '../../types/common';
import cleanupRelasjonTilBarnFødselSteg from '../../util/cleanup/relasjonTilBarn/cleanupRelasjonTilBarnFødselSteg';
import {
    getRelasjonTilBarnFødselVisibility,
    RelasjonTilBarnFødselStegVisibility
} from './visibility/relasjonTilBarnFødselVisibility';
import { SøknadenGjelderBarnValg, Søkersituasjon } from '../../types/søknad/Søknad';
import FødtBarnPartial from './partials/FødtBarnPartial';
import lenker from '../../util/routing/lenker';

interface RelasjonTilBarnFødselStegProps {
    barn: Barn;
    søker: Søker;
    annenForelder: AnnenForelderPartial;
    registrerteBarn: RegistrertBarn[];
    søknadenGjelderBarnValg: SøknadenGjelderBarnValg;
    terminbekreftelse: Attachment[];
    stegProps: StegProps;
    vis: RelasjonTilBarnFødselStegVisibility;
    situasjon: Søkersituasjon;
}

type Props = RelasjonTilBarnFødselStegProps & InjectedIntlProps & DispatchProps & SøkerinfoProps & HistoryProps;

class RelasjonTilBarnFødselSteg extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.cleanupSteg = this.cleanupSteg.bind(this);
    }

    cleanupSteg() {
        const { barn, dispatch } = this.props;
        dispatch(søknadActions.updateBarn(cleanupRelasjonTilBarnFødselSteg(barn)));
    }

    render() {
        const {
            barn,
            søker,
            annenForelder,
            terminbekreftelse,
            registrerteBarn,
            søknadenGjelderBarnValg,
            stegProps,
            vis,
            dispatch,
            situasjon
        } = this.props;

        const { gjelderAnnetBarn } = søknadenGjelderBarnValg;

        return (
            <Steg {...stegProps} onPreSubmit={this.cleanupSteg}>
                <Block visible={vis.hvilketBarnGjelderSøknadenBolk} margin="none">
                    <HvilkeBarnGjelderSøknadenBolk
                        søknadenGjelderBarnValg={søknadenGjelderBarnValg}
                        registrerteBarn={registrerteBarn}
                        onChange={(søknadenGjelder) =>
                            dispatch(søknadActions.updateSøknadenGjelderBarn(søknadenGjelder))
                        }
                    />
                </Block>
                <Block margin="none" hasChildBlocks={true} visible={vis.erBarnetFødt}>
                    <Block>
                        <ErBarnetFødtSpørsmål
                            erBarnetFødt={barn.erBarnetFødt}
                            onChange={(erBarnetFødt: boolean) =>
                                dispatch(
                                    søknadActions.updateBarn({
                                        erBarnetFødt
                                    })
                                )
                            }
                        />
                    </Block>
                    {vis.fødtBarnPart &&
                        isFødtBarn(barn, situasjon) && (
                            <FødtBarnPartial
                                situasjon={situasjon}
                                dispatch={dispatch}
                                barn={barn}
                                gjelderAnnetBarn={gjelderAnnetBarn}
                                registrerteBarn={registrerteBarn}
                                vis={vis.født}
                            />
                        )}
                    {barn.erBarnetFødt === false &&
                        getErSøkerFarEllerMedmor(søker.rolle) && (
                            <Veilederinfo>
                                <FormattedMessage
                                    id="erBarnetFødt.spørsmål.veileder.medMorEllerFar"
                                    values={{
                                        lenke: (
                                            <Lenke href={lenker.papirsøknad}>
                                                <FormattedMessage id="papirsøknad.lenke" />
                                            </Lenke>
                                        )
                                    }}
                                />
                            </Veilederinfo>
                        )}
                    {vis.ufødtBarnPart &&
                        isUfødtBarn(barn, situasjon) &&
                        !getErSøkerFarEllerMedmor(søker.rolle) && (
                            <UfødtBarnPartial
                                situasjon={situasjon}
                                dispatch={dispatch}
                                barn={barn}
                                annenForelder={annenForelder}
                                søker={søker}
                                erFarEllerMedmor={getErSøkerFarEllerMedmor(søker.rolle)}
                                terminbekreftelse={terminbekreftelse || []}
                                vis={vis.ufødt}
                            />
                        )}
                </Block>
            </Steg>
        );
    }
}

const mapStateToProps = (state: AppState, props: Props): RelasjonTilBarnFødselStegProps => {
    const { registrerteBarn = [] } = props.søkerinfo;
    const {
        barn,
        søker,
        annenForelder,
        ekstrainfo: { søknadenGjelderBarnValg }
    } = state.søknad;

    const stegProps: StegProps = {
        id: StegID.RELASJON_TIL_BARN_FØDSEL,
        history: props.history,
        renderFortsettKnapp: barnErGyldig(state.søknad, props.søkerinfo),
        renderFormTag: true,
        isAvailable: isAvailable(StegID.RELASJON_TIL_BARN_FØDSEL, state.søknad, props.søkerinfo)
    };

    const vis = getRelasjonTilBarnFødselVisibility(state.søknad, state.api);

    return {
        søker,
        annenForelder,
        registrerteBarn,
        søknadenGjelderBarnValg: søknadenGjelderBarnValg
            ? søknadenGjelderBarnValg
            : { gjelderAnnetBarn: undefined, valgteBarn: [] },
        barn,
        terminbekreftelse: isUfødtBarn(barn, state.søknad.situasjon) ? barn.terminbekreftelse : [],
        stegProps,
        vis,
        situasjon: state.søknad.situasjon
    };
};

export default connect<RelasjonTilBarnFødselStegProps, {}, {}>(mapStateToProps)(injectIntl(RelasjonTilBarnFødselSteg));
