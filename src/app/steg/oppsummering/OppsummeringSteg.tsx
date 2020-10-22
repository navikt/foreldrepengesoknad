import * as React from 'react';
import { FormattedMessage, injectIntl, IntlShape } from 'react-intl';
import { connect } from 'react-redux';
import { ISOStringToDate } from '@navikt/sif-common-formik/lib';
import _ from 'lodash';
import AlertStripe from 'nav-frontend-alertstriper';
import { BekreftCheckboksPanel } from 'nav-frontend-skjema';
import Veilederpanel from 'nav-frontend-veilederpanel';
import ApplicationSpinner from 'common/components/applicationSpinner/ApplicationSpinner';
import Block from 'common/components/block/Block';
import Veileder from 'common/components/veileder/Veileder';
import { DispatchProps } from 'common/redux/types';
import getMessage from 'common/util/i18nUtils';
import { getAktiveArbeidsforhold } from 'app/api/utils/søkerinfoUtils';
import ResetSoknad from 'app/components/applikasjon/resetSoknad/ResetSoknad';
import LinkButton from 'app/components/elementer/linkButton/LinkButton';
import VeilederInfo from 'app/components/veilederInfo/VeilederInfo';
import { selectTilgjengeligeStønadskontoer } from 'app/selectors/apiSelector';
import { selectMissingAttachments } from 'app/selectors/attachmentsSelector';
import { selectSøknadsinfo } from 'app/selectors/søknadsinfoSelector';
import { Søknadsinfo } from 'app/selectors/types';
import ErAnnenForelderInformertSpørsmål from 'app/spørsmål/ErAnnenForelderInformertSpørsmål';
import Oppsummering from 'app/steg/oppsummering/components/oppsummering/Oppsummering';
import Barn from 'app/types/søknad/Barn';
import { getAntallUker } from 'app/util/uttaksplan/stønadskontoer';
import { GetTilgjengeligeStønadskontoerParams } from '../../api/api';
import Steg, { StegProps } from '../../components/applikasjon/steg/Steg';
import { apiActionCreators } from '../../redux/actions';
import søknadActions from '../../redux/actions/søknad/søknadActionCreators';
import { validerUttaksplanAction } from '../../redux/actions/uttaksplanValidering/uttaksplanValideringActionCreators';
import { AppState } from '../../redux/reducers';
import { UttaksplanValideringState } from '../../redux/reducers/uttaksplanValideringReducer';
import { HistoryProps } from '../../types/common';
import { Kvittering } from '../../types/Kvittering';
import { MissingAttachment } from '../../types/MissingAttachment';
import Person from '../../types/Person';
import { SøkerinfoProps } from '../../types/søkerinfo';
import Søknad from '../../types/søknad/Søknad';
import { TilgjengeligStønadskonto } from '../../types/uttaksplan/periodetyper';
import { mapMissingAttachmentsOnSøknad } from '../../util/attachments/missingAttachmentUtil';
import { StegID } from '../../util/routing/stegConfig';
import isAvailable from '../../util/steg/isAvailable';
import { skalViseManglendeVedleggSteg } from '../../util/steg/navigation';
import { getStønadskontoParams } from '../../util/uttaksplan/stønadskontoParams';
import { findAllAttachments } from '../manglendeVedlegg/manglendeVedleggUtil';
import { søknadStegPath } from '../StegRoutes';

interface StateProps {
    søknadsinfo: Søknadsinfo;
    person: Person;
    søknad: Søknad;
    kvittering?: Kvittering;
    stegProps: StegProps;
    skalSpørreOmAnnenForelderErInformert: boolean;
    uttaksplanValidering: UttaksplanValideringState;
    missingAttachments: MissingAttachment[];
    tilgjengeligeStønadskontoer: TilgjengeligStønadskonto[];
    isLoadingTilgjengeligeStønadskontoer: boolean;
    antallUkerUttaksplan: number;
    barn: Barn;
    familiehendelsesdato: Date | undefined;
}

interface OwnProps {
    intl: IntlShape;
}

type Props = SøkerinfoProps & StateProps & DispatchProps & HistoryProps & OwnProps;

export const getSkalSpørreOmAnnenForelderErInformert = (søknad: Søknad | undefined): boolean => {
    if (!søknad) {
        return false;
    }

    return (
        søknad.erEndringssøknad &&
        søknad.ekstrainfo.erEnkelEndringssøknad &&
        søknad.ekstrainfo.eksisterendeSak !== undefined &&
        søknad.ekstrainfo.eksisterendeSak.grunnlag.erDeltUttak
    );
};
class OppsummeringSteg extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        const {
            tilgjengeligeStønadskontoer,
            søknad,
            familiehendelsesdato,
            søkerinfo,
            stegProps,
            søknadsinfo,
            dispatch,
            barn,
        } = this.props;

        this.sendSøknad = this.sendSøknad.bind(this);
        this.gotoUttaksplan = this.gotoUttaksplan.bind(this);

        if (tilgjengeligeStønadskontoer.length === 0 && stegProps.isAvailable) {
            const params: GetTilgjengeligeStønadskontoerParams = getStønadskontoParams(
                søknadsinfo,
                ISOStringToDate(søknad.ekstrainfo.uttaksplanSkjema.startdatoPermisjon),
                barn
            );
            dispatch(apiActionCreators.getTilgjengeligeStønadskontoer(params, this.props.history));
        }
        const { arbeidsforhold } = søkerinfo;

        if (arbeidsforhold.length > 0) {
            dispatch(
                apiActionCreators.fjernInaktiveArbeidsforhold(
                    getAktiveArbeidsforhold(arbeidsforhold, familiehendelsesdato)
                )
            );
        }
    }

    componentDidMount() {
        this.props.dispatch(validerUttaksplanAction());
    }

    sendSøknad() {
        const { missingAttachments, dispatch } = this.props;
        dispatch(apiActionCreators.sendSøknad(missingAttachments, this.props.history));
    }

    gotoUttaksplan() {
        const { history } = this.props;
        const path = søknadStegPath(StegID.UTTAKSPLAN);
        this.props.dispatch(søknadActions.setCurrentSteg(StegID.UTTAKSPLAN));
        history.push(path);
    }

    render() {
        const {
            søknad,
            søkerinfo,
            søknadsinfo,
            uttaksplanValidering,
            stegProps,
            missingAttachments,
            isLoadingTilgjengeligeStønadskontoer,
            antallUkerUttaksplan,
            skalSpørreOmAnnenForelderErInformert,
            dispatch,
            intl,
        } = this.props;
        const { person } = søkerinfo;
        if (person === undefined) {
            return null;
        }

        if (!søknadsinfo) {
            return <ResetSoknad history={this.props.history} />;
        }

        return (
            <Steg {...stegProps} onSubmit={this.sendSøknad}>
                {isLoadingTilgjengeligeStønadskontoer === true || søknadsinfo === undefined ? (
                    <ApplicationSpinner />
                ) : (
                    <>
                        {uttaksplanValidering.erGyldig === false && (
                            <Block>
                                <AlertStripe type="feil">
                                    <Block margin="xxs">
                                        <FormattedMessage id="oppsummering.valideringsfeil.uttaksplan.intro" />
                                    </Block>
                                    <LinkButton onClick={() => this.gotoUttaksplan()}>
                                        <FormattedMessage id="oppsummering.valideringsfeil.uttaksplan.lenketekst" />
                                    </LinkButton>
                                </AlertStripe>
                            </Block>
                        )}
                        <Oppsummering
                            søknadsinfo={søknadsinfo}
                            søkerinfo={søkerinfo}
                            søknad={søknad}
                            uttaksplanValidering={uttaksplanValidering}
                            antallUkerUttaksplan={antallUkerUttaksplan}
                        />
                        {uttaksplanValidering.erGyldig && missingAttachments.length > 0 && (
                            <Veilederpanel svg={<Veileder farge="lilla" ansikt="skeptisk" stil="kompakt" />}>
                                <FormattedMessage id="oppsummering.veileder.manglendeVedlegg" />
                            </Veilederpanel>
                        )}
                        {skalSpørreOmAnnenForelderErInformert && (
                            <>
                                <Block>
                                    <ErAnnenForelderInformertSpørsmål
                                        navn={søknadsinfo.navn.annenForelder.fornavn}
                                        erAnnenForelderInformert={søknad.annenForelder.erInformertOmSøknaden}
                                        onChange={(erInformertOmSøknaden) =>
                                            dispatch(søknadActions.updateAnnenForelder({ erInformertOmSøknaden }))
                                        }
                                    />
                                </Block>
                                <Block visible={søknad.annenForelder.erInformertOmSøknaden === false}>
                                    <VeilederInfo
                                        messages={[
                                            {
                                                type: 'normal',
                                                contentIntlKey:
                                                    'erAnnenForelderInformert.veilederIkkeInformert.oppsummeringsside',
                                                values: { navn: søknadsinfo.navn.annenForelder.fornavn },
                                            },
                                        ]}
                                    />
                                </Block>
                            </>
                        )}
                        {uttaksplanValidering.erGyldig &&
                            (skalSpørreOmAnnenForelderErInformert
                                ? søknad.annenForelder.erInformertOmSøknaden === true
                                : true) && (
                                <BekreftCheckboksPanel
                                    className="blokk-m"
                                    checked={søknad.harGodkjentOppsummering}
                                    label={getMessage(intl, 'oppsummering.samtykke')}
                                    onChange={() => {
                                        dispatch(
                                            søknadActions.updateSøknad({
                                                harGodkjentOppsummering: !søknad.harGodkjentOppsummering,
                                            })
                                        );
                                    }}
                                />
                            )}
                    </>
                )}
            </Steg>
        );
    }
}

const mapStateToProps = (state: AppState, props: Props): StateProps => {
    const { søknad } = state;
    const { person } = props.søkerinfo;
    const {
        api: { isLoadingTilgjengeligeStønadskontoer },
    } = state;

    const skalSpørreOmAnnenForelderErInformert = getSkalSpørreOmAnnenForelderErInformert(søknad);
    const søknadsinfo = selectSøknadsinfo(state);
    const missingAttachments: MissingAttachment[] = selectMissingAttachments(state);
    const attachmentMap = findAllAttachments(mapMissingAttachmentsOnSøknad(missingAttachments, _.cloneDeep(søknad)));

    let previousStegID = StegID.UTTAKSPLAN;

    const familiehendelsesdato = søknadsinfo !== undefined ? søknadsinfo.søknaden.familiehendelsesdato : undefined;

    if (søknadsinfo) {
        previousStegID = søknadsinfo.søknaden.erEndringssøknad
            ? StegID.UTTAKSPLAN
            : skalViseManglendeVedleggSteg(attachmentMap)
            ? StegID.MANGLENDE_VEDLEGG
            : StegID.ANDRE_INNTEKTER;
    }

    const stegProps: StegProps = {
        id: StegID.OPPSUMMERING,
        renderFortsettKnapp:
            søknad.harGodkjentOppsummering &&
            (skalSpørreOmAnnenForelderErInformert ? søknad.annenForelder.erInformertOmSøknaden === true : true),
        renderFormTag: true,
        history: props.history,
        isAvailable: isAvailable(StegID.OPPSUMMERING, søknad, props.søkerinfo, søknadsinfo),
        previousStegID,
    };

    const tilgjengeligeStønadskontoer = selectTilgjengeligeStønadskontoer(state);
    const antallUkerUttaksplan = getAntallUker(tilgjengeligeStønadskontoer);

    return {
        person,
        søknad,
        barn: søknad.barn,
        uttaksplanValidering: state.uttaksplanValidering,
        kvittering: state.api.kvittering,
        missingAttachments,
        stegProps,
        tilgjengeligeStønadskontoer,
        isLoadingTilgjengeligeStønadskontoer,
        antallUkerUttaksplan,
        søknadsinfo: søknadsinfo!,
        skalSpørreOmAnnenForelderErInformert,
        familiehendelsesdato,
    };
};

export default connect<StateProps>(mapStateToProps)(injectIntl(OppsummeringSteg));
