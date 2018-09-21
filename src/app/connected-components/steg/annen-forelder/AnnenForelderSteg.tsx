import * as React from 'react';
import { connect } from 'react-redux';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import Steg, { StegProps } from '../../../components/steg/Steg';
import { AppState } from '../../../redux/reducers';
import { DispatchProps } from 'common/redux/types';
import { HistoryProps } from '../../../types/common';
import { RegistrertAnnenForelder } from '../../../types/Person';
import { erFarEllerMedmor } from '../../../util/domain/personUtil';
import isAvailable from '../util/isAvailable';
import { StegID } from '../../../util/routing/stegConfig';
import Block from 'common/components/block/Block';
import getMessage from 'common/util/i18nUtils';
import PersonaliaBox from 'common/components/personalia-box/PersonaliaBox';
import { SøkerinfoProps } from '../../../types/søkerinfo';
import { getAnnenForelderStegVisibility, AnnenForelderStegVisibility } from './visibility/annenForelderStegVisibility';
import cleanupAnnenForelderSteg from '../../../util/cleanup/cleanupAnnenForelderSteg';
import { default as søknadActions } from '../../../redux/actions/søknad/søknadActionCreators';
import { resolveStegToRender } from '../util/navigation';
import Søknad, { Søkersituasjon } from '../../../types/søknad/Søknad';
import AnnenForelderSpørsmål from './AnnenForelderSp\u00F8rsm\u00E5l';
import { Barn } from '../../../types/s\u00F8knad/Barn';
import AnnenForelder from '../../../types/s\u00F8knad/AnnenForelder';
import { Søker } from '../../../types/s\u00F8knad/S\u00F8ker';
import { Attachment } from 'common/storage/attachment/types/Attachment';

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
    vis?: AnnenForelderStegVisibility;
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
        if (this.props.vis) {
            const { annenForelder, barn } = cleanupAnnenForelderSteg(this.props.vis, this.props.søknad);
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
            vis,
            intl
        } = this.props;

        if (søkersFødselsnummer && vis) {
            return (
                <Steg {...stegProps} preSubmit={this.cleanupSteg}>
                    <Block
                        header={{
                            title: getMessage(intl, 'annenForelder.label.registrertForelder', { antallBarn })
                        }}
                        visible={vis.personaliaRegistrertAnnenForelder}>
                        {registrertAnnenForelder ? <PersonaliaBox person={registrertAnnenForelder} /> : undefined}
                    </Block>
                    <AnnenForelderSpørsmål
                        søkerFnr={søkersFødselsnummer}
                        søker={søker}
                        annenForelder={annenForelder}
                        søknad={this.props.søknad}
                        barn={barn}
                        situasjon={situasjon}
                        vis={vis}
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

const mapStateToProps = (state: AppState, props: Props): StateProps => {
    const { person, registrerteBarn } = props.søkerinfo;
    const { søker, barn, annenForelder, situasjon, sensitivInfoIkkeLagre } = state.søknad;
    const { registrertAnnenForelder } = sensitivInfoIkkeLagre;
    const erSøkerFarEllerMedmor = erFarEllerMedmor(person!.kjønn, søker.rolle);

    const vis = getAnnenForelderStegVisibility(state.søknad, props.søkerinfo);

    const stegProps: StegProps = {
        id: StegID.ANNEN_FORELDER,
        renderFortsettKnapp: vis !== undefined && vis.isComplete,
        renderFormTag: true,
        previousStegRoute: resolveStegToRender(state),
        history: props.history,
        isAvailable: isAvailable(StegID.ANNEN_FORELDER, state.søknad, props.søkerinfo)
    };

    return {
        søknad: state.søknad,
        stegProps,
        situasjon,
        vis,
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
