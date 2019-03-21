import * as React from 'react';
import { default as Steg, StegProps } from '../../../components/steg/Steg';
import moment from 'moment';
import Block from 'common/components/block/Block';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { StegID } from '../../../util/routing/stegConfig';
import { connect } from 'react-redux';
import { AppState } from '../../../redux/reducers';
import AndreInntekterBolk from '../../../bolker/andre-inntekter-bolk/AndreInntekterBolk';
import { DispatchProps } from 'common/redux/types';
import søknadActions from '../../../redux/actions/søknad/søknadActionCreators';
import getMessage from 'common/util/i18nUtils';
import Søker from '../../../types/søknad/Søker';
import FrilanserBolk from '../../../bolker/frilanser-bolk/FrilanserBolk';
import { FrilansInformasjon } from '../../../types/søknad/FrilansInformasjon';
import SelvstendigNæringsdrivendeBolk from '../../../bolker/selvstendig-næringsdrivende-bolk/SelvstendigNæringsdrivendeBolk';
import { Næring } from '../../../types/søknad/SelvstendigNæringsdrivendeInformasjon';
import isAvailable from '../util/isAvailable';
import { annenInntektErGyldig } from '../../../util/validation/steg/annenInntekt';
import Arbeidsforhold from '../../../types/Arbeidsforhold';
import InformasjonOmArbeidsforholdWrapper from 'common/components/arbeidsforhold-infobox/InformasjonOmArbeidsforholdWrapper';
import visibility from './visibility';
import cleanupAndreInntekterSteg from '../../../util/cleanup/cleanupAndreInntekterSteg';
import { HistoryProps } from '../../../types/common';
import { SøkerinfoProps } from '../../../types/søkerinfo';
import YtelseInfoWrapper from 'common/components/ytelser-infobox/InformasjonOmYtelserWrapper';
import { Periode } from 'app/types/uttaksplan/periodetyper';
import { formatDate } from 'app/util/dates/dates';
import Veilederpanel from 'nav-frontend-veilederpanel';
import Veileder from 'common/components/veileder/Veileder';
import VeilederpanelInnhold from 'app/components/veilederpanel-innhold/VeilederpanelInnhold';
import { getSøknadsinfo } from '../../../selectors/s\u00F8knadsinfoSelector';

interface StateProps {
    stegProps: StegProps;
    arbeidsforhold: Arbeidsforhold[];
    søker: Søker;
    uttaksplan: Periode[];
}

type Props = SøkerinfoProps & HistoryProps & StateProps & InjectedIntlProps & DispatchProps;

class AndreInntekterSteg extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.cleanupSteg = this.cleanupSteg.bind(this);
        this.updateSøkerAndSave = this.updateSøkerAndSave.bind(this);
        this.state = {
            harHattAnnenInntekt: undefined
        };
    }

    updateSøkerAndSave(søker: Partial<Søker>) {
        this.props.dispatch(søknadActions.updateSøkerAndStorage(søker));
    }

    cleanupSteg() {
        const { søker, dispatch } = this.props;
        dispatch(søknadActions.updateSøker(cleanupAndreInntekterSteg(søker)));
    }

    render() {
        const { stegProps, søker, arbeidsforhold, uttaksplan, dispatch, intl } = this.props;
        const fireUkerFørFørsteUttaksdag = formatDate(
            moment(uttaksplan[0].tidsperiode.fom)
                .subtract(4, 'weeks')
                .toDate()
        );
        const { harHattAnnenInntektSiste10Mnd } = søker;
        const harArbeidsforhold = arbeidsforhold !== undefined && arbeidsforhold.length > 0;

        return (
            <Steg {...stegProps} onPreSubmit={this.cleanupSteg}>
                <Block
                    header={{
                        title: getMessage(intl, 'annenInntekt.ytelser.label')
                    }}>
                    <YtelseInfoWrapper ytelser={[]} />
                </Block>
                <Block
                    header={{
                        title: getMessage(intl, 'annenInntekt.arbeidsforhold.label'),
                        info: getMessage(intl, 'annenInntekt.arbeidsforhold.infotekst')
                    }}>
                    <InformasjonOmArbeidsforholdWrapper arbeidsforhold={arbeidsforhold} />
                    {harArbeidsforhold && (
                        <>
                            <Veilederpanel kompakt={true} svg={<Veileder stil="kompakt-uten-bakgrunn" />}>
                                <VeilederpanelInnhold
                                    messages={[
                                        {
                                            type: 'normal',
                                            contentIntlKey: 'annenInntekt.arbeidsforhold.veileder',
                                            values: { dato: fireUkerFørFørsteUttaksdag }
                                        }
                                    ]}
                                />
                            </Veilederpanel>
                        </>
                    )}
                </Block>

                <Block hasChildBlocks={true} margin="none">
                    <FrilanserBolk
                        søker={søker}
                        onChangeSøker={(søkerProperties: Søker) => dispatch(søknadActions.updateSøker(søkerProperties))}
                        onChangeFrilansinformasjon={(frilansInformasjon: FrilansInformasjon) =>
                            dispatch(
                                søknadActions.updateSøker({
                                    frilansInformasjon
                                })
                            )
                        }
                    />
                </Block>

                <Block hasChildBlocks={true} margin="none" visible={visibility.selvstendigNæringsdrivendeBolk(søker)}>
                    <SelvstendigNæringsdrivendeBolk
                        harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd={
                            søker.harJobbetSomSelvstendigNæringsdrivendeSiste10Mnd
                        }
                        næringListe={søker.selvstendigNæringsdrivendeInformasjon || []}
                        onChangeSøker={(søkerProperties: Søker) => dispatch(søknadActions.updateSøker(søkerProperties))}
                        onChange={(updatedNæringer: Næring[]) =>
                            this.updateSøkerAndSave({
                                selvstendigNæringsdrivendeInformasjon: updatedNæringer
                            })
                        }
                    />
                </Block>

                <Block hasChildBlocks={true} margin="none" visible={visibility.andreInntekterBolk(søker)}>
                    <AndreInntekterBolk
                        harHattAnnenInntektSiste10Mnd={harHattAnnenInntektSiste10Mnd}
                        andreInntekterSiste10Mnd={søker.andreInntekterSiste10Mnd || []}
                        onChangeSøker={(søkerProperties) => dispatch(søknadActions.updateSøker(søkerProperties))}
                        onChange={(andreInntekterSiste10Mnd) =>
                            dispatch(
                                søknadActions.updateSøker({
                                    andreInntekterSiste10Mnd
                                })
                            )
                        }
                    />
                </Block>
            </Steg>
        );
    }
}

const mapStateToProps = (state: AppState, props: Props): StateProps => {
    const { søknad } = state;
    const { history } = props;
    const { søker, uttaksplan } = søknad;
    const { arbeidsforhold } = props.søkerinfo;

    const stegProps: StegProps = {
        id: StegID.ANDRE_INNTEKTER,
        renderFortsettKnapp: annenInntektErGyldig(søker),
        renderFormTag: true,
        history,
        isAvailable: isAvailable(StegID.ANDRE_INNTEKTER, state.søknad, props.søkerinfo, getSøknadsinfo(state))
    };

    return {
        søker,
        arbeidsforhold,
        stegProps,
        uttaksplan
    };
};

export default connect<StateProps, {}, {}>(mapStateToProps)(injectIntl(AndreInntekterSteg));
