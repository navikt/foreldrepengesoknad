import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Hovedknapp } from 'nav-frontend-knapper';
import DocumentTitle from 'react-document-title';
import Lenke from 'nav-frontend-lenker';
import { Ingress, Innholdstittel, Undertittel } from 'nav-frontend-typografi';
import moment from 'moment';

import getMessage from 'common/util/i18nUtils';
import Person from '../../../types/Person';
import { Kvittering, LeveranseStatus } from '../../../types/Kvittering';
import SpotlightLetter from 'common/components/ikoner/SpotlightLetter';
import Applikasjonsside from '../Applikasjonsside';
import lenker from '../../../util/routing/lenker';
import Block from 'common/components/block/Block';
import BEMHelper from 'common/util/bem';
import { openPdfPreview } from 'common/util/pdfUtils';
import { apiActionCreators as api } from '../../../redux/actions';
import { DispatchProps } from 'common/redux/types';

import './søknadSendtSide.less';

interface StateProps {
    person: Person;
    kvittering: Kvittering;
}

type Props = StateProps & InjectedIntlProps & DispatchProps;
class SøknadSendtSide extends React.Component<Props> {
    componentDidMount(): void {
        this.props.dispatch(api.sendStorageKvittering());
    }

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
                id="kvittering.saksNr"
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
        const { kvittering } = this.props;
        return (
            <FormattedMessage
                id={
                    kvittering.leveranseStatus === LeveranseStatus.GOSYS
                        ? 'kvittering.innsyn.infotrygd'
                        : 'kvittering.innsyn.fpsak'
                }
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

    buildPdfPreviewLink() {
        const { kvittering } = this.props;
        return (
            <FormattedMessage
                id={'kvittering.pdf.lastNed.del1'}
                values={{
                    lenke: (
                        <Lenke
                            href={'#'}
                            onClick={(e) => {
                                e.preventDefault();
                                openPdfPreview(kvittering.pdf);
                            }}>
                            <FormattedMessage id={'kvittering.pdf.lastNed.del2'} />
                        </Lenke>
                    )
                }}
            />
        );
    }

    render() {
        const { intl, person, kvittering } = this.props;
        const bem = BEMHelper('søknadSendt');
        return (
            <Applikasjonsside visSøknadstittel={true}>
                <DocumentTitle title={getMessage(intl, 'dokument.tittel.søknadSendt')} />

                <div className={bem.className}>
                    <Block margin="m">
                        <SpotlightLetter className={bem.element('spotlightLetter')} />
                    </Block>

                    <Block margin="s">
                        <Innholdstittel className={bem.element('tittel')}>{this.buildHeadlineMessage()}</Innholdstittel>
                    </Block>

                    <Block margin="m">
                        <Ingress>
                            {this.props.kvittering.saksNr
                                ? this.buildSaksnummerMessage()
                                : this.buildReferenceNumberMessage()}
                        </Ingress>
                    </Block>

                    <Block margin="xs">
                        <Undertittel>
                            <FormattedMessage id="kvittering.behandlingstid.tittel" />
                        </Undertittel>
                    </Block>
                    <Block margin="s">
                        <Ingress>
                            <FormattedMessage id="kvittering.behandlingstid" />
                        </Ingress>
                    </Block>

                    <Block margin="xs">
                        <Undertittel>
                            <FormattedMessage id="kvittering.innsyn.tittel" />
                        </Undertittel>
                    </Block>
                    <Block margin="s">
                        <Ingress>{this.buildDittNavMessage()}</Ingress>
                    </Block>

                    {person.bankkonto &&
                        person.bankkonto.kontonummer && (
                            <>
                                <Block margin="xs">
                                    <Undertittel>
                                        <FormattedMessage id="kvittering.kontonummer.tittel" />
                                    </Undertittel>
                                </Block>
                                <Block margin="m">
                                    <Ingress>{this.buildBankAccountMessage(person.bankkonto.kontonummer)}</Ingress>
                                </Block>
                            </>
                        )}

                    <Block margin="s" visible={kvittering.pdf !== undefined}>
                        <Ingress>{this.buildPdfPreviewLink()}</Ingress>
                    </Block>

                    <Hovedknapp
                        className={bem.element('avsluttKnapp')}
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
