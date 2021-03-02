import * as React from 'react';
import { injectIntl, FormattedMessage, IntlShape } from 'react-intl';
import { connect } from 'react-redux';
import DocumentTitle from 'react-document-title';
import Lenke from 'nav-frontend-lenker';
import { Ingress, Normaltekst } from 'nav-frontend-typografi';
import moment from 'moment';

import { Kvittering } from '../../types/Kvittering';
import Applikasjonsside from '../../components/applikasjon/applikasjonsside/Applikasjonsside';
import { apiActionCreators as api } from '../../redux/actions';
import KvitteringHeader from './components/KvitteringHeader';
import KvitteringSuksess from './components/KvitteringSuksess';
import StatusBoks from './components/StatusBoks';
import SøknadSendtSectionHeader from './components/SøknadSendtSectionHeader';

import { DispatchProps } from 'common/redux/types';
import getMessage from 'common/util/i18nUtils';
import BEMHelper from 'common/util/bem';
import Block from 'common/components/block/Block';
import { openPdfPreview } from 'common/util/pdfUtils';

import { MissingAttachment } from 'app/types/MissingAttachment';
import { Periodene } from 'app/util/uttaksplan/Periodene';

import { Søkerinfo } from 'app/types/søkerinfo';

import lenker from 'app/util/routing/lenker';
import { selectMissingAttachments } from 'app/selectors/attachmentsSelector';

import './søknadSendtSide.less';
import { logAmplitudeEvent, PageKeys } from 'app/amplitude/amplitude';

interface StateProps {
    søkerinfo: Søkerinfo;
    kvittering: Kvittering;
    erEndringssøknad: boolean;
    missingAttachments: MissingAttachment[];
    behandlingsFrist: string;
}

interface OwnProps {
    intl: IntlShape;
}

type Props = StateProps & DispatchProps & OwnProps;
class SøknadSendtSide extends React.Component<Props> {
    componentDidMount(): void {
        if (!this.props.erEndringssøknad) {
            this.props.dispatch(api.sendStorageKvittering());
        }

        logAmplitudeEvent('sidevisning', {
            app: 'foreldrepengesoknad',
            team: 'foreldrepenger',
            pageKey: PageKeys.SøknadSendt,
        });
    }

    render() {
        const { søkerinfo, kvittering, erEndringssøknad, intl } = this.props;
        const { person, arbeidsforhold } = søkerinfo;
        const cls = BEMHelper('søknadSendt');
        return (
            <Applikasjonsside visSøknadstittel={true} visAlertstripe={false}>
                <DocumentTitle title={getMessage(intl, 'dokument.tittel.søknadSendt')} />
                <div className={cls.block}>
                    <KvitteringHeader søker={person} kvittering={kvittering} />

                    <Block>
                        <KvitteringSuksess missingAttachments={this.props.missingAttachments} />
                    </Block>

                    {!erEndringssøknad && (
                        <>
                            <Block>
                                <SøknadSendtSectionHeader
                                    title={getMessage(intl, 'søknadSendt.når.tittel')}
                                    type="kalender"
                                    info={getMessage(intl, 'søknadSendt.når.infoBox')}
                                >
                                    {this.props.behandlingsFrist}
                                </SøknadSendtSectionHeader>
                            </Block>

                            {arbeidsforhold && arbeidsforhold.length > 0 && (
                                <Block>
                                    <SøknadSendtSectionHeader
                                        title={getMessage(intl, 'søknadSendt.infoFraArbeidsgiver.tittel')}
                                        type="koffert"
                                        info={getMessage(intl, 'søknadSendt.infoFraArbeidsgiver.infoBox')}
                                    >
                                        <Block margin="xxs">
                                            <FormattedMessage id={'søknadSendt.infoFraArbeidsgiver.del1'} />
                                        </Block>
                                        <Lenke
                                            href={'#'}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                openPdfPreview(kvittering.infoskrivPdf);
                                            }}
                                        >
                                            <FormattedMessage id={'søknadSendt.infoFraArbeidsgiver.del2'} />
                                        </Lenke>
                                    </SøknadSendtSectionHeader>
                                </Block>
                            )}

                            <Block>
                                <SøknadSendtSectionHeader
                                    title={getMessage(intl, 'søknadSendt.pengene.tittel')}
                                    type="cash"
                                    info={getMessage(intl, 'søknadSendt.pengene.infoBox')}
                                >
                                    {person.bankkonto && person.bankkonto.kontonummer ? (
                                        <>
                                            <Block margin="none">
                                                <Normaltekst>
                                                    <FormattedMessage id="søknadSendt.pengene.kontonummer" />
                                                </Normaltekst>
                                            </Block>
                                            <Block margin="xxs">
                                                <Ingress>{person.bankkonto && person.bankkonto.kontonummer}</Ingress>
                                            </Block>
                                            <Block margin="none">
                                                <Lenke href={lenker.brukerprofil}>
                                                    <FormattedMessage id="søknadSendt.pengene.kontonummer.endre" />
                                                </Lenke>
                                            </Block>
                                        </>
                                    ) : (
                                        <>
                                            <Block margin="xxs">
                                                <Normaltekst>
                                                    <FormattedMessage id="søknadSendt.pengene.ingenKontonummer" />
                                                </Normaltekst>
                                            </Block>
                                            <Block margin="none">
                                                <Lenke href={lenker.brukerprofil}>
                                                    <FormattedMessage id="søknadSendt.pengene.kontonummer.leggTil" />
                                                </Lenke>
                                            </Block>
                                        </>
                                    )}
                                </SøknadSendtSectionHeader>
                            </Block>
                        </>
                    )}

                    <StatusBoks saksNr={kvittering.saksNr} />
                </div>
            </Applikasjonsside>
        );
    }
}

const mapStateToProps = (state: any) => {
    const førsteBehandlingsfrist = moment(Periodene(state.søknad.uttaksplan).getFørsteUttaksdag()).subtract(4, 'weeks');
    const førsteMuligeBehandlingsfrist = moment(new Date()).isSameOrAfter(førsteBehandlingsfrist)
        ? moment(new Date())
        : førsteBehandlingsfrist;

    return {
        søkerinfo: state.api.søkerinfo,
        kvittering: state.api.kvittering,
        erEndringssøknad: state.søknad.erEndringssøknad,
        missingAttachments: selectMissingAttachments(state),
        behandlingsFrist: førsteMuligeBehandlingsfrist.format('dddd Do MMM YYYY'),
    };
};

export default connect<StateProps>(mapStateToProps)(injectIntl(SøknadSendtSide));
