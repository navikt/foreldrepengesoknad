import * as React from 'react';
import { connect } from 'react-redux';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { AppState } from '../../../redux/reducers';
import { Utenlandsopphold, UtenlandsoppholdType } from '../../../types/søknad/InformasjonOmUtenlandsopphold';
import getMessage from 'common/util/i18nUtils';
import UtenlandsoppholdBolk from '../../../bolker/UtenlandsoppholdBolk';
import Block from 'common/components/block/Block';
import søknadActions from '../../../redux/actions/søknad/søknadActionCreators';
import BoddINorgeSiste12MndSpørsmål from '../../../spørsmål/BoddINorgeSiste12MndSpørsmål';
import SkalBoINorgeNeste12MndSpørsmål from '../../../spørsmål/SkalBoINorgeNeste12MndSpørsmål';
import Søknad from '../../../types/søknad/Søknad';
import { DispatchProps } from 'common/redux/types';
import Steg, { StegProps } from '../../../components/steg/Steg';
import { default as stegConfig, StegID } from '../../../util/routing/stegConfig';
import { HistoryProps } from '../../../types/common';
import VæreINorgeVedFødselSpørsmål from '../../../spørsmål/VæreINorgeVedFødselSpørsmål';
import isAvailable from '../isAvailable';
import { utenlandsoppholdErGyldig } from '../../../util/validation/steg/utenlandsopphold';
import {
    getFraAvgrensninger as fraAvgrensningerTidligerePerioder,
    getTilAvgrensninger as tilAvgrensningerTidligerePerioder,
    getTidligereUtenlandsoppholdFradatoRegler as fraReglerTidligerePerioder,
    getTidligereUtenlandsoppholdTildatoRegler as tilReglerTidligerePerioder
} from '../../../util/validation/fields/tidligereUtenlandsopphold';
import {
    getFraAvgrensninger as fraAvgrensningerSenerePerioder,
    getTilAvgrensninger as tilAvgrensningerSenerePerioder,
    getSenereUtenlandsoppholdFradatoRegler as fraReglerSenerePerioder,
    getSenereUtenlandsoppholdTildatoRegler as tilReglerSenerePerioder
} from '../../../util/validation/fields/senereUtenlandsopphold';
import { FormSubmitEvent } from 'common/lib/validation/elements/ValiderbarForm';
import { søknadStegPath } from '../StegRoutes';
import apiActionCreators from '../../../redux/actions/api/apiActionCreators';
import { SøkerinfoProps } from '../../../types/søkerinfo';

interface StateProps {
    søknad: Søknad;
    stegProps: StegProps;
}

type Props = SøkerinfoProps & StateProps & InjectedIntlProps & DispatchProps & HistoryProps;

class UtenlandsoppholdSteg extends React.Component<Props> {
    constructor(props: Props) {
        super(props);

        this.renderSkalBoINorgeNeste12MndSpørsmål = this.renderSkalBoINorgeNeste12MndSpørsmål.bind(this);
        this.renderHarBoddINorgeSiste12MndSpørsmål = this.renderHarBoddINorgeSiste12MndSpørsmål.bind(this);
        this.updateUtenlandsopphold = this.updateUtenlandsopphold.bind(this);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);
    }

    renderSkalBoINorgeNeste12MndSpørsmål() {
        const { søknad, dispatch } = this.props;
        const { informasjonOmUtenlandsopphold } = søknad;
        return (
            <SkalBoINorgeNeste12MndSpørsmål
                iNorgeNeste12={informasjonOmUtenlandsopphold.iNorgeNeste12Mnd}
                onChange={(iNorgeNeste12Mnd: boolean) =>
                    dispatch(
                        søknadActions.updateUtenlandsopphold({
                            iNorgeNeste12Mnd
                        })
                    )
                }
            />
        );
    }

    renderHarBoddINorgeSiste12MndSpørsmål() {
        const { søknad, dispatch } = this.props;
        const { informasjonOmUtenlandsopphold } = søknad;
        return (
            <Block>
                <BoddINorgeSiste12MndSpørsmål
                    iNorgeSiste12={informasjonOmUtenlandsopphold.iNorgeSiste12Mnd}
                    onChange={(iNorgeSiste12Mnd: boolean) =>
                        dispatch(
                            søknadActions.updateUtenlandsopphold({
                                iNorgeSiste12Mnd
                            })
                        )
                    }
                />
            </Block>
        );
    }

    updateUtenlandsopphold(opphold: Utenlandsopphold[], oppholdType: UtenlandsoppholdType) {
        const { dispatch } = this.props;
        dispatch(søknadActions.updateUtenlandsopphold({ [oppholdType]: opphold }));
    }

    handleOnSubmit(event: FormSubmitEvent, stegForm: Element) {
        const { dispatch, history } = this.props;
        if (event.target === stegForm) {
            dispatch(apiActionCreators.storeAppState());
            history.push(`${søknadStegPath(stegConfig[StegID.UTENLANDSOPPHOLD].nesteSteg)}`);
        }
    }

    render() {
        const { søknad, stegProps, dispatch, intl } = this.props;
        const { informasjonOmUtenlandsopphold } = søknad;

        return (
            <Steg {...stegProps} onSubmit={this.handleOnSubmit}>
                <Block hasChildBlocks={true}>
                    <UtenlandsoppholdBolk
                        renderSpørsmål={this.renderHarBoddINorgeSiste12MndSpørsmål}
                        showUtenlandsoppholdContent={informasjonOmUtenlandsopphold.iNorgeSiste12Mnd === false}
                        oppfølgingsspørsmål={getMessage(intl, 'utenlandsopphold.select.spørsmål.tidligereOpphold')}
                        opphold={søknad.informasjonOmUtenlandsopphold.tidligereOpphold}
                        oppholdType={'tidligereOpphold'}
                        onChange={(opphold: Utenlandsopphold[]) =>
                            this.updateUtenlandsopphold(opphold, 'tidligereOpphold')
                        }
                        utenlandsoppholdModalProps={{
                            avgrensningGetters: {
                                getFraAvgrensning: fraAvgrensningerTidligerePerioder,
                                getTilAvgrensning: tilAvgrensningerTidligerePerioder
                            },
                            tidsperiodeValidators: {
                                getFraRegler: fraReglerTidligerePerioder,
                                getTilRegler: tilReglerTidligerePerioder
                            }
                        }}
                    />
                </Block>

                <Block hasChildBlocks={true} visible={informasjonOmUtenlandsopphold.iNorgeSiste12Mnd !== undefined}>
                    <UtenlandsoppholdBolk
                        renderSpørsmål={this.renderSkalBoINorgeNeste12MndSpørsmål}
                        showUtenlandsoppholdContent={informasjonOmUtenlandsopphold.iNorgeNeste12Mnd === false}
                        oppfølgingsspørsmål={getMessage(intl, 'utenlandsopphold.select.spørsmål.senereOpphold')}
                        opphold={søknad.informasjonOmUtenlandsopphold.senereOpphold}
                        oppholdType={'senereOpphold'}
                        onChange={(opphold: Utenlandsopphold[]) =>
                            this.updateUtenlandsopphold(opphold, 'senereOpphold')
                        }
                        utenlandsoppholdModalProps={{
                            avgrensningGetters: {
                                getFraAvgrensning: fraAvgrensningerSenerePerioder,
                                getTilAvgrensning: tilAvgrensningerSenerePerioder
                            },
                            tidsperiodeValidators: {
                                getFraRegler: fraReglerSenerePerioder,
                                getTilRegler: tilReglerSenerePerioder
                            }
                        }}
                    />
                </Block>

                <Block
                    visible={
                        informasjonOmUtenlandsopphold.iNorgeSiste12Mnd !== undefined &&
                        søknad.barn.erBarnetFødt === false
                    }>
                    <VæreINorgeVedFødselSpørsmål
                        fødselINorge={søknad.informasjonOmUtenlandsopphold.fødselINorge}
                        onChange={(fødselINorge: boolean) => {
                            dispatch(
                                søknadActions.updateUtenlandsopphold({
                                    fødselINorge
                                })
                            );
                        }}
                    />
                </Block>
            </Steg>
        );
    }
}

const mapStateToProps = (state: AppState, props: SøkerinfoProps & HistoryProps) => {
    const { søknad } = state;
    const { history } = props;

    const stegProps: StegProps = {
        id: StegID.UTENLANDSOPPHOLD,
        renderFortsettKnapp: utenlandsoppholdErGyldig(søknad),
        history,
        isAvailable: isAvailable(StegID.UTENLANDSOPPHOLD, state.søknad, props.søkerinfo)
    };

    return {
        søknad,
        stegProps,
        ...props
    };
};

export default connect<StateProps, {}, {}>(mapStateToProps)(injectIntl(UtenlandsoppholdSteg));
