import * as React from 'react';
import { connect, DispatchProp } from 'react-redux';
import getMessage from 'common/util/i18nUtils';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Ingress, Innholdstittel } from 'nav-frontend-typografi';
import DocumentTitle from 'react-document-title';
import Lenke from 'nav-frontend-lenker';
import Person from '../../../types/Person';
import { injectIntl, FormattedMessage, InjectedIntlProps } from 'react-intl';
import moment from 'moment';
import { Kvittering } from '../../../types/Kvittering';
import SpotlightLetter from 'common/components/ikoner/SpotlightLetter';
import Applikasjonsside from '../Applikasjonsside';

import './søknadSendtSide.less';
import lenker from '../../../util/routing/lenker';

interface StateProps {
    person: Person;
    kvittering: Kvittering;
}

type Props = StateProps & InjectedIntlProps & DispatchProp;
class SøknadSendtSide extends React.Component<Props> {
    buildHeadlineMessage() {
        const { intl, person } = this.props;
        return (
            <React.Fragment>
                {getMessage(intl, 'kvittering.headline')}
                <span> {person.fornavn}!</span>
            </React.Fragment>
        );
    }

    buildSaksnummerMessage() {
        const { kvittering } = this.props;
        return (
            <FormattedMessage
                id={'kvittering.saksNr'}
                values={{
                    id: kvittering.saksNr ? kvittering.saksNr : kvittering.referanseId,
                    timeOfDay: moment(kvittering.mottattDato).format('HH:mm'),
                    date: moment(kvittering.mottattDato).format('LL')
                }}
            />
        );
    }

    buildReferenceNumberMessage() {
        const { kvittering } = this.props;
        return (
            <FormattedMessage
                id="kvittering.referanseId"
                values={{
                    timeOfDay: moment(kvittering.mottattDato).format('HH:mm'),
                    date: moment(kvittering.mottattDato).format('LL')
                }}
            />
        );
    }

    buildBankAccountMessage(kontonummer: string) {
        return (
            <FormattedMessage
                id="kvittering.kontonummer"
                values={{
                    kontonummer,
                    dinProfilLink: (
                        <Lenke href="https://tjenester.nav.no/brukerprofil/">
                            <FormattedMessage id="kvittering.dinProfilLink" />
                        </Lenke>
                    )
                }}
            />
        );
    }

    buildDittNavMessage() {
        return (
            <FormattedMessage
                id="kvittering.innsyn"
                values={{
                    lenke: (
                        <Lenke href={lenker.innsyn}>
                            <FormattedMessage id="kvittering.innsyn.lenke" />
                        </Lenke>
                    )
                }}
            />
        );
    }

    render() {
        const { intl, person } = this.props;
        return (
            <Applikasjonsside visSøknadstittel={true}>
                <DocumentTitle title={getMessage(intl, 'dokument.tittel.søknadSendt')} />

                <div className="søknadSendt">
                    <SpotlightLetter className="blokk-m søknadSendt__spotlightLetter" />
                    <Innholdstittel className="søknadSendt__tittel  blokk-s">
                        {this.buildHeadlineMessage()}
                    </Innholdstittel>

                    <Ingress className="blokk-xs">
                        {this.props.kvittering.saksNr
                            ? this.buildSaksnummerMessage()
                            : this.buildReferenceNumberMessage()}
                    </Ingress>

                    <Ingress className={'blokk-xs'}>
                        <FormattedMessage id={'kvittering.behandlingstid'} />
                    </Ingress>

                    <Ingress className="blokk-xs">{this.buildDittNavMessage()}</Ingress>

                    {person.bankkonto &&
                        person.bankkonto.kontonummer && (
                            <Ingress className="blokk-m">
                                {this.buildBankAccountMessage(person.bankkonto.kontonummer)}
                            </Ingress>
                        )}

                    <Hovedknapp
                        onClick={() => ((window as any).location = 'https://tjenester.nav.no/dittnav/oversikt')}>
                        {getMessage(intl, 'avslutt')}
                    </Hovedknapp>
                </div>
            </Applikasjonsside>
        );
    }
}

const mapStateToProps = (state: any) => ({
    person: state.api.søkerinfo.person,
    kvittering: state.api.kvittering
});

export default connect<StateProps>(mapStateToProps)(injectIntl(SøknadSendtSide));
