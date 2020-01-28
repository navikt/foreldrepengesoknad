import * as React from 'react';
import { connect } from 'react-redux';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { AppState } from '../../redux/reducers';
import InformasjonOmUtenlandsopphold, {
    Utenlandsopphold,
    UtenlandsoppholdType
} from '../../types/søknad/InformasjonOmUtenlandsopphold';
import UtenlandsoppholdBolk from './utenlandsoppholdBolk/UtenlandsoppholdBolk';
import Block from 'common/components/block/Block';
import søknadActions from '../../redux/actions/søknad/søknadActionCreators';
import BoddINorgeSiste12MndSpørsmål from '../../spørsmål/BoddINorgeSiste12MndSpørsmål';
import SkalBoINorgeNeste12MndSpørsmål from '../../spørsmål/SkalBoINorgeNeste12MndSpørsmål';
import Søknad, { Søkersituasjon } from '../../types/søknad/Søknad';
import { DispatchProps } from 'common/redux/types';
import Steg, { StegProps } from '../../components/applikasjon/steg/Steg';
import { StegID } from '../../util/routing/stegConfig';
import { HistoryProps } from '../../types/common';
import isAvailable from '../../util/steg/isAvailable';
import { utenlandsoppholdErGyldig } from '../../util/validation/steg/utenlandsopphold';
import {
    getFraAvgrensninger as fraAvgrensningerTidligerePerioder,
    getTilAvgrensninger as tilAvgrensningerTidligerePerioder,
    getTidligereUtenlandsoppholdFradatoRegler as fraReglerTidligerePerioder,
    getTidligereUtenlandsoppholdTildatoRegler as tilReglerTidligerePerioder
} from '../../util/validation/tidligereUtenlandsopphold';
import {
    getFraAvgrensninger as fraAvgrensningerSenerePerioder,
    getTilAvgrensninger as tilAvgrensningerSenerePerioder,
    getSenereUtenlandsoppholdFradatoRegler as fraReglerSenerePerioder,
    getSenereUtenlandsoppholdTildatoRegler as tilReglerSenerePerioder
} from '../../util/validation/senereUtenlandsopphold';
import { default as visibility } from './visibility';
import { SøkerinfoProps } from '../../types/søkerinfo';
import cleanupUtenlandsOppholdSteg from '../../util/cleanup/cleanupUtenlandsoppholdSteg';
import { selectSøknadsinfo } from '../../selectors/søknadsinfoSelector';
import Barn, { isUfødtBarn, UfødtBarn } from 'app/types/søknad/Barn';
import VeilederInfo from 'app/components/veilederInfo/VeilederInfo';
import { Tidsperioden } from 'app/util/uttaksplan/Tidsperioden';
import { formatDate } from 'app/util/dates/dates';
import * as countries from 'i18n-iso-countries';

interface StateProps {
    søknad: Søknad;
    stegProps: StegProps;
    barn: Barn;
}

type Props = SøkerinfoProps & StateProps & InjectedIntlProps & DispatchProps & HistoryProps;

class UtenlandsoppholdSteg extends React.Component<Props> {
    constructor(props: Props) {
        super(props);

        this.renderSkalBoINorgeNeste12MndSpørsmål = this.renderSkalBoINorgeNeste12MndSpørsmål.bind(this);
        this.renderHarBoddINorgeSiste12MndSpørsmål = this.renderHarBoddINorgeSiste12MndSpørsmål.bind(this);
        this.updateUtenlandsopphold = this.updateUtenlandsopphold.bind(this);
        this.cleanupSteg = this.cleanupSteg.bind(this);
        this.hentRelevantUtenlandsopphold = this.hentRelevantUtenlandsopphold.bind(this);
    }

    renderSkalBoINorgeNeste12MndSpørsmål() {
        const { søknad, dispatch } = this.props;
        const { informasjonOmUtenlandsopphold } = søknad;
        return (
            <Block margin={informasjonOmUtenlandsopphold.iNorgeNeste12Mnd ? 'm' : 'xs'}>
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
            </Block>
        );
    }

    renderHarBoddINorgeSiste12MndSpørsmål() {
        const { søknad, dispatch } = this.props;
        const { informasjonOmUtenlandsopphold } = søknad;
        return (
            <Block margin={informasjonOmUtenlandsopphold.iNorgeSiste12Mnd ? 'm' : 'xs'}>
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

    cleanupSteg() {
        const { dispatch, søknad } = this.props;
        const { informasjonOmUtenlandsopphold } = søknad;
        dispatch(søknadActions.updateUtenlandsopphold(cleanupUtenlandsOppholdSteg(informasjonOmUtenlandsopphold)));
    }

    hentRelevantUtenlandsopphold(
        barn: Barn,
        informasjonOmUtenlandsopphold: InformasjonOmUtenlandsopphold,
        situasjon: Søkersituasjon
    ): Utenlandsopphold | undefined {
        if (informasjonOmUtenlandsopphold.iNorgeNeste12Mnd) {
            return undefined;
        }

        let termindato: Date | undefined;
        if (isUfødtBarn(barn, situasjon)) {
            termindato = barn.termindato;
        }

        if (termindato !== undefined) {
            return informasjonOmUtenlandsopphold.senereOpphold.find((info) =>
                Tidsperioden(info.tidsperiode).inneholderDato(termindato!)
            );
        }

        return undefined;
    }

    getCountryName(countryNames: countries.LocalizedCountryNames, utenlandsopphold: Utenlandsopphold | undefined) {
        if (utenlandsopphold) {
            return countryNames[utenlandsopphold.land];
        }
    }

    render() {
        const { søknad, stegProps, barn, intl } = this.props;
        const { informasjonOmUtenlandsopphold, situasjon } = søknad;
        const språk = intl.locale;
        const countryNames = countries.getNames(språk);
        const relevantUtenlandsopphold = this.hentRelevantUtenlandsopphold(
            barn,
            informasjonOmUtenlandsopphold,
            situasjon
        );

        return (
            <Steg {...stegProps} onPreSubmit={this.cleanupSteg}>
                <Block hasChildBlocks={true}>
                    <UtenlandsoppholdBolk
                        renderSpørsmål={this.renderHarBoddINorgeSiste12MndSpørsmål}
                        showUtenlandsoppholdContent={visibility.harBoddINorgeSiste12MndContent(
                            informasjonOmUtenlandsopphold
                        )}
                        opphold={søknad.informasjonOmUtenlandsopphold.tidligereOpphold}
                        oppholdType="tidligereOpphold"
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

                <Block
                    hasChildBlocks={true}
                    visible={visibility.skalBoINorgeNeste12MndBlock(informasjonOmUtenlandsopphold)}
                >
                    <UtenlandsoppholdBolk
                        renderSpørsmål={this.renderSkalBoINorgeNeste12MndSpørsmål}
                        showUtenlandsoppholdContent={visibility.skalBoINorgeNeste12MndContent(
                            informasjonOmUtenlandsopphold
                        )}
                        opphold={søknad.informasjonOmUtenlandsopphold.senereOpphold}
                        oppholdType="senereOpphold"
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
                <Block visible={relevantUtenlandsopphold !== undefined}>
                    <VeilederInfo
                        messages={[
                            {
                                type: 'normal',
                                contentIntlKey: 'utenlandsopphold.infoOmFødselsattest',
                                values: {
                                    land: this.getCountryName(countryNames, relevantUtenlandsopphold),
                                    termindato: formatDate((barn as UfødtBarn).termindato)
                                }
                            }
                        ]}
                    />
                </Block>
            </Steg>
        );
    }
}

const mapStateToProps = (state: AppState, props: SøkerinfoProps & HistoryProps) => {
    const { søknad } = state;
    const { history } = props;
    const { barn } = søknad;

    const stegProps: StegProps = {
        id: StegID.UTENLANDSOPPHOLD,
        renderFortsettKnapp: utenlandsoppholdErGyldig(søknad),
        renderFormTag: true,
        history,
        isAvailable: isAvailable(StegID.UTENLANDSOPPHOLD, state.søknad, props.søkerinfo, selectSøknadsinfo(state))
    };

    return {
        søknad,
        stegProps,
        barn,
        ...props
    };
};

export default connect<StateProps, {}, {}>(mapStateToProps)(injectIntl(UtenlandsoppholdSteg));
