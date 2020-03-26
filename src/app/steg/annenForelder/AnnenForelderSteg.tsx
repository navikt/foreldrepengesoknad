import * as React from 'react';
import { connect } from 'react-redux';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import Steg, { StegProps } from '../../components/applikasjon/steg/Steg';
import { AppState } from '../../redux/reducers';
import { DispatchProps } from 'common/redux/types';
import { HistoryProps } from '../../types/common';
import { RegistrertAnnenForelder } from '../../types/Person';
import { getErSøkerFarEllerMedmor } from '../../util/domain/personUtil';
import isAvailable from '../../util/steg/isAvailable';
import { StegID } from '../../util/routing/stegConfig';
import Block from 'common/components/block/Block';
import getMessage from 'common/util/i18nUtils';
import RegistrertePersonalia from './registrerte-personalia/RegistrertePersonalia';
import { SøkerinfoProps } from '../../types/søkerinfo';
import { getAnnenForelderStegVisibility, AnnenForelderStegVisibility } from './visibility/annenForelderStegVisibility';
import cleanupAnnenForelderSteg from '../../util/cleanup/cleanupAnnenForelderSteg';
import { default as søknadActions } from '../../redux/actions/søknad/søknadActionCreators';
import { resolveStegToRender } from '../../util/steg/navigation';
import Søknad, { Søkersituasjon } from '../../types/søknad/Søknad';
import { Barn, isAdopsjonsbarn } from '../../types/søknad/Barn';
import AnnenForelder from '../../types/søknad/AnnenForelder';
import { Søker } from '../../types/søknad/Søker';
import { Attachment } from 'app/components/storage/attachment/types/Attachment';
import AnnenForelderForm from './AnnenForelderForm';
import { getFamiliehendelsedato } from 'app/util/uttaksplan';
import { AnnenForelderFormValues } from './form/annenforelderFormTypes';
import { YesOrNo } from '@navikt/sif-common-formik/lib';
import { mapBooleanToYesOrNo } from 'app/util/form/formUtils';

interface StateProps {
    søknad: Partial<Søknad>;
    antallBarn?: number;
    søker: Søker;
    barn: Barn;
    situasjon: Søkersituasjon;
    annenForelder: AnnenForelder;
    søkersFødselsnummer?: string;
    erSøkerFarEllerMedmor: boolean;
    registrertAnnenForelder?: RegistrertAnnenForelder;
    stegProps: StegProps;
    gjelderStebarnsadopsjon: boolean;
    familiehendelseDato: Date | undefined;
    visibility?: AnnenForelderStegVisibility;
    initialFormValues: AnnenForelderFormValues;
}

type Props = SøkerinfoProps & StateProps & InjectedIntlProps & DispatchProps & HistoryProps;

class AnnenForelderSteg extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.cleanupSteg = this.cleanupSteg.bind(this);
        this.updateBarn = this.updateBarn.bind(this);
        this.updateSøker = this.updateSøker.bind(this);
        this.updateAnnenForelder = this.updateAnnenForelder.bind(this);
        this.onFileDelete = this.onFileDelete.bind(this);
        this.onFilesSelect = this.onFilesSelect.bind(this);
        this.updateReduxState = this.updateReduxState.bind(this);
    }

    updateReduxState(values: AnnenForelderFormValues) {
        const annenForelder: Partial<AnnenForelder> = {
            fornavn: values.fornavn,
            etternavn: values.etternavn,
            fnr: values.fnr,
            erInformertOmSøknaden: values.erInformertOmSøknaden === YesOrNo.YES,
            harRettPåForeldrepenger: values.harRettPåForeldrepenger === YesOrNo.YES,
            kanIkkeOppgis: values.kanIkkeOppgis,
            utenlandskFnr: values.utenlandskFnr,
            erUfør: values.erMorUfør === YesOrNo.YES,
            bostedsland: values.bostedsland
        };

        const barn: Partial<Barn> = {
            datoForAleneomsorg: values.datoForAleneomsorg
        };

        const søker: Partial<Søker> = {
            erAleneOmOmsorg: values.aleneOmOmsorg === YesOrNo.YES
        };

        this.updateAnnenForelder(annenForelder);
        this.updateBarn(barn);
        this.updateSøker(søker);
    }

    cleanupSteg() {
        if (this.props.visibility) {
            const { annenForelder, barn } = cleanupAnnenForelderSteg(this.props.visibility, this.props.søknad);
            this.props.dispatch(søknadActions.updateAnnenForelder(annenForelder));
            this.props.dispatch(søknadActions.updateBarn(barn));
        }
    }

    updateBarn(barn: Partial<Barn>) {
        this.props.dispatch(søknadActions.updateBarn(barn));
    }

    updateAnnenForelder(annenForelder: Partial<AnnenForelder>) {
        this.props.dispatch(søknadActions.updateAnnenForelder(annenForelder));
    }

    updateSøker(søker: Partial<Søker>) {
        this.props.dispatch(søknadActions.updateSøker(søker));
    }

    onFilesSelect(attachments: Attachment[]) {
        attachments.forEach((attachment: Attachment) => {
            attachment.beskrivelse = getMessage(this.props.intl, 'vedlegg.beskrivelse.dokumentasjonAvAleneomsorg');
            this.props.dispatch(søknadActions.uploadAttachment(attachment));
        });
    }

    onFileDelete(attachment: Attachment) {
        this.props.dispatch(søknadActions.deleteAttachment(attachment));
    }

    render() {
        const {
            registrertAnnenForelder,
            søkersFødselsnummer,
            søker,
            barn,
            antallBarn,
            stegProps,
            gjelderStebarnsadopsjon,
            familiehendelseDato,
            visibility,
            initialFormValues,
            situasjon,
            intl
        } = this.props;

        const gjelderAdopsjon = situasjon === Søkersituasjon.ADOPSJON;

        if (søkersFødselsnummer && visibility) {
            return (
                <Steg
                    {...stegProps}
                    renderProp={(options) => (
                        <>
                            <Block
                                header={{
                                    title: getMessage(intl, 'annenForelder.label.registrertForelder', { antallBarn })
                                }}
                                visible={registrertAnnenForelder !== undefined}
                            >
                                {registrertAnnenForelder ? (
                                    <RegistrertePersonalia person={registrertAnnenForelder} />
                                ) : (
                                    undefined
                                )}
                            </Block>
                            <AnnenForelderForm
                                onValidSubmit={(values) => {
                                    this.updateReduxState(values);
                                    this.cleanupSteg();
                                    options.onValidFormSubmit();
                                }}
                                skalOppgiPersonalia={registrertAnnenForelder === undefined}
                                søkerRolle={søker.rolle}
                                gjelderStebarnsadopsjon={gjelderStebarnsadopsjon}
                                familiehendelseDato={familiehendelseDato}
                                barn={barn}
                                gjelderAdopsjon={gjelderAdopsjon}
                                søkersFødselsnummer={søkersFødselsnummer}
                                initialFormValues={initialFormValues}
                                onFileDelete={this.onFileDelete}
                                onFilesSelect={this.onFilesSelect}
                            />
                        </>
                    )}
                />
            );
        }
        return null;
    }
}

const gjelderSøknadenStebarnsadopsjon = (barn: Barn, situasjon: Søkersituasjon): boolean => {
    if (situasjon === Søkersituasjon.ADOPSJON && isAdopsjonsbarn(barn, situasjon)) {
        return barn.adopsjonAvEktefellesBarn === true;
    }
    return false;
};

const mapStateToProps = (state: AppState, props: Props): StateProps => {
    const { person, registrerteBarn } = props.søkerinfo;
    const { søker, barn, annenForelder, situasjon, sensitivInfoIkkeLagre } = state.søknad;
    const { registrertAnnenForelder } = sensitivInfoIkkeLagre;
    const erSøkerFarEllerMedmor = getErSøkerFarEllerMedmor(søker.rolle);

    const gjelderStebarnsadopsjon = gjelderSøknadenStebarnsadopsjon(barn, situasjon);
    const familiehendelseDato = getFamiliehendelsedato(barn, situasjon);

    const visibility = getAnnenForelderStegVisibility(state.søknad, props.søkerinfo);

    const stegProps: StegProps = {
        id: StegID.ANNEN_FORELDER,
        renderFortsettKnapp: false,
        renderFormTag: false,
        previousStegID: resolveStegToRender(state),
        history: props.history,
        isAvailable: isAvailable(StegID.ANNEN_FORELDER, state.søknad, props.søkerinfo)
    };

    const initialFormValues: AnnenForelderFormValues = {
        aleneOmOmsorg: mapBooleanToYesOrNo(søker.erAleneOmOmsorg),
        bostedsland: annenForelder.bostedsland,
        datoForAleneomsorg: barn.datoForAleneomsorg,
        erInformertOmSøknaden: mapBooleanToYesOrNo(annenForelder.erInformertOmSøknaden),
        erMorUfør: mapBooleanToYesOrNo(annenForelder.erUfør),
        etternavn: annenForelder.etternavn,
        fornavn: annenForelder.fornavn,
        fnr: annenForelder.fnr,
        harRettPåForeldrepenger: mapBooleanToYesOrNo(annenForelder.harRettPåForeldrepenger),
        kanIkkeOppgis: annenForelder.kanIkkeOppgis,
        utenlandskFnr: annenForelder.utenlandskFnr
    };

    return {
        søknad: state.søknad,
        stegProps,
        situasjon,
        visibility,
        søker,
        barn,
        annenForelder,
        antallBarn: registrerteBarn ? registrerteBarn.length : 0,
        søkersFødselsnummer: person.fnr,
        erSøkerFarEllerMedmor,
        registrertAnnenForelder,
        gjelderStebarnsadopsjon,
        familiehendelseDato,
        initialFormValues
    };
};

export default connect<StateProps, {}, {}>(mapStateToProps)(injectIntl(AnnenForelderSteg));
