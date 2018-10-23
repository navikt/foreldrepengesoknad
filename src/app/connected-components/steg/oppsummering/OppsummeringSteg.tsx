import * as React from 'react';
import { connect } from 'react-redux';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { BekreftCheckboksPanel } from 'nav-frontend-skjema';
import Steg, { StegProps } from '../../../components/steg/Steg';
import { AppState } from '../../../redux/reducers';
import { DispatchProps } from 'common/redux/types';
import { HistoryProps } from '../../../types/common';
import Person from '../../../types/Person';
import getMessage from 'common/util/i18nUtils';
import søknadActions from '../../../redux/actions/søknad/søknadActionCreators';
import Søknad from '../../../types/søknad/Søknad';
import { apiActionCreators } from '../../../redux/actions';
import { StegID } from '../../../util/routing/stegConfig';
import { Kvittering } from '../../../types/Kvittering';
import { SøkerinfoProps } from '../../../types/søkerinfo';
import { Periode } from '../../../types/uttaksplan/periodetyper';
import isAvailable from '../util/isAvailable';
import {
    findMissingAttachments,
    mapMissingAttachmentsToSøknad,
    MissingAttachment
} from '../../../util/søknad/missingAttachmentUtil';
import Oppsummering from 'common/components/oppsummering/Oppsummering';
import Veilederinfo from 'common/components/veileder-info/Veilederinfo';

interface StateProps {
    person: Person;
    søknad: Søknad;
    kvittering?: Kvittering;
    stegProps: StegProps;
    perioder: Periode[];
    missingAttachments: MissingAttachment[];
}

type Props = SøkerinfoProps & StateProps & InjectedIntlProps & DispatchProps & HistoryProps;
class OppsummeringSteg extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.sendSøknad = this.sendSøknad.bind(this);
    }

    sendSøknad() {
        const { søknad, perioder, missingAttachments, dispatch } = this.props;
        dispatch(
            apiActionCreators.sendSøknad(
                {
                    ...mapMissingAttachmentsToSøknad(missingAttachments, søknad),
                    uttaksplan: [...(perioder || [])]
                },
                this.props.history
            )
        );
    }

    render() {
        const { søknad, søkerinfo, stegProps, missingAttachments, dispatch, intl } = this.props;
        const { person } = søkerinfo;
        if (person === undefined) {
            return null;
        }

        return (
            <Steg {...stegProps} onSubmit={this.sendSøknad}>
                <Oppsummering søkerinfo={søkerinfo} søknad={søknad} />
                {missingAttachments.length > 0 && (
                    <Veilederinfo type="advarsel">
                        {getMessage(intl, 'oppsummering.veileder.manglendeVedlegg')}
                    </Veilederinfo>
                )}
                <BekreftCheckboksPanel
                    className="blokk-m"
                    checked={søknad.harGodkjentOppsummering}
                    label={getMessage(intl, 'oppsummering.samtykke')}
                    onChange={() => {
                        dispatch(
                            søknadActions.updateSøknad({
                                harGodkjentOppsummering: !søknad.harGodkjentOppsummering
                            })
                        );
                    }}
                />
            </Steg>
        );
    }
}

const mapStateToProps = (state: AppState, props: Props): StateProps => {
    const søknad = state.søknad;
    const { person } = props.søkerinfo;
    const stegProps: StegProps = {
        id: StegID.OPPSUMMERING,
        renderFortsettKnapp: søknad.harGodkjentOppsummering,
        renderFormTag: true,
        history: props.history,
        isAvailable: isAvailable(StegID.OPPSUMMERING, søknad, props.søkerinfo, state.uttaksplanValidering.erGyldig)
    };

    const missingAttachments: MissingAttachment[] = findMissingAttachments(søknad, state.api);

    return {
        person,
        søknad,
        perioder: state.søknad.uttaksplan,
        kvittering: state.api.kvittering,
        missingAttachments,
        stegProps
    };
};

export default connect<StateProps, {}, {}>(mapStateToProps)(injectIntl(OppsummeringSteg));
