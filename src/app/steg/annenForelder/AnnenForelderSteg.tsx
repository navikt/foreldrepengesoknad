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
import PersonaliaBox from 'app/steg/annenForelder/personalia-box/PersonaliaBox';
import { SøkerinfoProps } from '../../types/søkerinfo';
import {
    getAnnenForelderStegVisibility,
    AnnenForelderStegVisibility,
    skalBrukerStoppesPgaAnnenForelderIkkeInformert
} from './visibility/annenForelderStegVisibility';
import cleanupAnnenForelderSteg from '../../util/cleanup/cleanupAnnenForelderSteg';
import { default as søknadActions } from '../../redux/actions/søknad/søknadActionCreators';
import { resolveStegToRender } from '../../util/steg/navigation';
import Søknad, { Søkersituasjon } from '../../types/søknad/Søknad';
import AnnenForelderSpørsmål from './AnnenForelderSpørsmål';
import { Barn } from '../../types/søknad/Barn';
import AnnenForelder from '../../types/søknad/AnnenForelder';
import { Søker } from '../../types/søknad/Søker';
import { Attachment } from 'app/components/storage/attachment/types/Attachment';

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
    visibility?: AnnenForelderStegVisibility;
}

type Props = SøkerinfoProps & StateProps & InjectedIntlProps & DispatchProps & HistoryProps;

class AnnenForelderSteg extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.cleanupSteg = this.cleanupSteg.bind(this);
        this.onBarnChange = this.onBarnChange.bind(this);
        this.onSøkerChange = this.onSøkerChange.bind(this);
        this.onAnnenForelderChange = this.onAnnenForelderChange.bind(this);
        this.onFileDelete = this.onFileDelete.bind(this);
        this.onFilesSelect = this.onFilesSelect.bind(this);
    }

    cleanupSteg() {
        if (this.props.visibility) {
            const { annenForelder, barn } = cleanupAnnenForelderSteg(this.props.visibility, this.props.søknad);
            this.props.dispatch(søknadActions.updateAnnenForelder(annenForelder));
            this.props.dispatch(søknadActions.updateBarn(barn));
        }
    }

    onBarnChange(barn: Partial<Barn>) {
        this.props.dispatch(søknadActions.updateBarn(barn));
    }

    onAnnenForelderChange(annenForelder: Partial<AnnenForelder>) {
        this.props.dispatch(søknadActions.updateAnnenForelder(annenForelder));
    }

    onSøkerChange(søker: Partial<Søker>) {
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
            annenForelder,
            antallBarn,
            situasjon,
            stegProps,
            visibility,
            intl
        } = this.props;

        if (søkersFødselsnummer && visibility) {
            return (
                <Steg
                    {...stegProps}
                    onPreSubmit={this.cleanupSteg}
                    onRequestNavigateToNextStep={() => {
                        if (annenForelder.kanIkkeOppgis) {
                            return true;
                        }

                        return annenForelder.fnr !== undefined && annenForelder.fnr !== '';
                    }}
                >
                    <Block
                        header={{
                            title: getMessage(intl, 'annenForelder.label.registrertForelder', { antallBarn })
                        }}
                        visible={registrertAnnenForelder !== undefined}
                    >
                        {registrertAnnenForelder ? <PersonaliaBox person={registrertAnnenForelder} /> : undefined}
                    </Block>
                    <AnnenForelderSpørsmål
                        søkerFnr={søkersFødselsnummer}
                        søker={søker}
                        annenForelder={annenForelder}
                        søknad={this.props.søknad}
                        barn={barn}
                        situasjon={situasjon}
                        visibility={visibility}
                        onSøkerChange={this.onSøkerChange}
                        onBarnChange={this.onBarnChange}
                        onAnnenForelderChange={this.onAnnenForelderChange}
                        onFileDelete={this.onFileDelete}
                        onFilesSelect={this.onFilesSelect}
                    />
                </Steg>
            );
        }
        return null;
    }
}

const skalFortsettKnappRendres = (søknad: Søknad, visibility: AnnenForelderStegVisibility | undefined): boolean => {
    if (
        visibility === undefined ||
        visibility.areAllQuestionsAnswered() === false ||
        skalBrukerStoppesPgaAnnenForelderIkkeInformert(søknad.annenForelder, visibility)
    ) {
        return false;
    }
    return true;
};

const mapStateToProps = (state: AppState, props: Props): StateProps => {
    const { person, registrerteBarn } = props.søkerinfo;
    const { søker, barn, annenForelder, situasjon, sensitivInfoIkkeLagre } = state.søknad;
    const { registrertAnnenForelder } = sensitivInfoIkkeLagre;
    const erSøkerFarEllerMedmor = getErSøkerFarEllerMedmor(søker.rolle);

    const visibility = getAnnenForelderStegVisibility(state.søknad, props.søkerinfo);

    const stegProps: StegProps = {
        id: StegID.ANNEN_FORELDER,
        renderFortsettKnapp: skalFortsettKnappRendres(state.søknad, visibility),
        renderFormTag: true,
        previousStegID: resolveStegToRender(state),
        history: props.history,
        isAvailable: isAvailable(StegID.ANNEN_FORELDER, state.søknad, props.søkerinfo)
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
        registrertAnnenForelder
    };
};

export default connect<StateProps, {}, {}>(mapStateToProps)(injectIntl(AnnenForelderSteg));
