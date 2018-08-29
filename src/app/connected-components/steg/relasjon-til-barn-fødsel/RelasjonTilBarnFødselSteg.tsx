import * as React from 'react';
import { connect } from 'react-redux';
import { InjectedIntlProps, injectIntl } from 'react-intl';

import Steg, { StegProps } from 'app/components/steg/Steg';
import FødtBarnPartial from './partials/FødtBarnPartial';
import UfødtBarnPartial from './partials/UfødtBarnPartial';
import søknadActions from './../../../redux/actions/søknad/søknadActionCreators';

import ErBarnetFødtSpørsmål from '../../../spørsmål/ErBarnetFødtSpørsmål';

import { AppState } from '../../../redux/reducers';
import { AnnenForelderPartial } from '../../../types/søknad/AnnenForelder';
import { DispatchProps } from 'common/redux/types';
import Person, { RegistrertBarn } from '../../../types/Person';
import Barn, { FødtBarn, UfødtBarn } from '../../../types/søknad/Barn';
import Søker from '../../../types/søknad/Søker';

import { StegID } from '../../../util/routing/stegConfig';
import { erFarEllerMedmor } from '../../../util/domain/personUtil';
import { Attachment } from 'common/storage/attachment/types/Attachment';
import HvilkeBarnGjelderSøknadenBolk from '../../../bolker/HvilkeBarnGjelderSøknadenBolk';
import isAvailable from '../isAvailable';
import { barnErGyldig, skalSøkerLasteOppTerminbekreftelse } from '../../../util/validation/steg/barn';
import Block from 'common/components/block/Block';
import Veilederinfo from 'common/components/veileder-info/Veilederinfo';
import { SøkerinfoProps } from '../../../types/søkerinfo';
import { HistoryProps } from '../../../types/common';
import { SøknadenGjelderBarnValg } from '../../../types/søknad/Søknad';

interface RelasjonTilBarnFødselStegProps {
    person: Person;
    barn: Barn;
    søker: Søker;
    annenForelder: AnnenForelderPartial;
    registrerteBarn: RegistrertBarn[];
    søknadenGjelderBarnValg: SøknadenGjelderBarnValg;
    terminbekreftelse: Attachment[];
    fødselsattest: Attachment[];
    stegProps: StegProps;
    skalLasteOppTerminbekreftelse: boolean;
}

type Props = RelasjonTilBarnFødselStegProps & InjectedIntlProps & DispatchProps & SøkerinfoProps & HistoryProps;

class RelasjonTilBarnFødselSteg extends React.Component<Props> {
    render() {
        const {
            barn,
            søker,
            annenForelder,
            person,
            fødselsattest,
            terminbekreftelse,
            registrerteBarn,
            søknadenGjelderBarnValg,
            stegProps,
            skalLasteOppTerminbekreftelse,
            dispatch
        } = this.props;

        const { gjelderAnnetBarn } = søknadenGjelderBarnValg;

        return (
            <Steg {...stegProps}>
                <Block visible={registrerteBarn.length > 0} margin="none">
                    <HvilkeBarnGjelderSøknadenBolk
                        søknadenGjelderBarnValg={søknadenGjelderBarnValg}
                        registrerteBarn={registrerteBarn}
                        onChange={(søknadenGjelder) =>
                            dispatch(søknadActions.updateSøknadenGjelderBarn(søknadenGjelder))
                        }
                    />
                </Block>
                <Block
                    margin="none"
                    hasChildBlocks={true}
                    visible={gjelderAnnetBarn === true || registrerteBarn.length === 0}>
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
                    {barn.erBarnetFødt === true && (
                        <FødtBarnPartial
                            dispatch={dispatch}
                            barn={barn as FødtBarn}
                            fødselsattest={fødselsattest || []}
                        />
                    )}
                    {barn.erBarnetFødt === false &&
                        !erFarEllerMedmor(person.kjønn, søker.rolle) && (
                            <UfødtBarnPartial
                                dispatch={dispatch}
                                barn={barn as UfødtBarn}
                                annenForelder={annenForelder}
                                skalLasteOppTerminbekreftelse={skalLasteOppTerminbekreftelse}
                                søker={søker}
                                erFarEllerMedmor={erFarEllerMedmor(person.kjønn, søker.rolle)}
                                terminbekreftelse={terminbekreftelse || []}
                            />
                        )}
                    {barn.erBarnetFødt === false &&
                        erFarEllerMedmor(person.kjønn, søker.rolle) && (
                            <Veilederinfo>Litt info her om hva som er galt</Veilederinfo>
                        )}
                </Block>
            </Steg>
        );
    }
}

const mapStateToProps = (state: AppState, props: Props): RelasjonTilBarnFødselStegProps => {
    const { person, registrerteBarn = [] } = props.søkerinfo;
    const { barn, temp, søker, annenForelder } = state.søknad;
    const fødselsattest = (barn as FødtBarn).fødselsattest;
    const terminbekreftelse = (barn as UfødtBarn).terminbekreftelse;

    const skalLasteOppTerminbekreftelse = skalSøkerLasteOppTerminbekreftelse(state.søknad, props.søkerinfo);

    const stegProps: StegProps = {
        id: StegID.RELASJON_TIL_BARN_FØDSEL,
        history: props.history,
        renderFortsettKnapp: barnErGyldig(state.søknad, props.søkerinfo),
        isAvailable: isAvailable(StegID.RELASJON_TIL_BARN_FØDSEL, state.søknad, props.søkerinfo)
    };

    return {
        søker,
        annenForelder,
        person,
        registrerteBarn,
        søknadenGjelderBarnValg: temp.søknadenGjelderBarnValg,
        barn,
        terminbekreftelse,
        fødselsattest,
        skalLasteOppTerminbekreftelse,
        stegProps
    };
};

export default connect<RelasjonTilBarnFødselStegProps, {}, {}>(mapStateToProps)(injectIntl(RelasjonTilBarnFødselSteg));
