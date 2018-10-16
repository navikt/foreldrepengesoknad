import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import { formatDate } from '../../../../app/util/dates/dates';
import Oppsummeringsliste from 'common/components/oppsummering/oppsummeringsliste/Oppsummeringsliste';
import { Næring } from '../../../../app/types/søknad/SelvstendigNæringsdrivendeInformasjon';
import SeDetaljerLink from '../../../../app/components/se-detaljer-link/SeDetaljerLink';
import NæringOppsummeringsmodal from 'common/components/oppsummering/oppsummeringsliste/NæringOppsummeringsmodal';

interface SelvstendigNæringsdrivendeOppsummeringslisteProps {
    næringer: Næring[];
}

type Props = SelvstendigNæringsdrivendeOppsummeringslisteProps & InjectedIntlProps;

interface State {
    modalIsOpen: boolean;
    næring?: Næring;
}

class SelvstendigNæringsdrivendeOppsummeringsliste extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            modalIsOpen: false
        };

        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.createOppsummeringslisteData = this.createOppsummeringslisteData.bind(this);
        this.createOppsummeringslisteelementData = this.createOppsummeringslisteelementData.bind(this);
    }

    openModal(næring: Næring) {
        this.setState({
            modalIsOpen: true,
            næring
        });
    }

    closeModal() {
        this.setState({
            modalIsOpen: false,
            næring: undefined
        });
    }

    createOppsummeringslisteData() {
        const { næringer } = this.props;
        return næringer.map((næring) => this.createOppsummeringslisteelementData(næring));
    }

    createOppsummeringslisteelementData(næring: Næring) {
        const { intl } = this.props;
        const { navnPåNæringen, tidsperiode, pågående } = næring;
        return {
            venstrestiltTekst: (
                <SeDetaljerLink content={navnPåNæringen} onClick={() => this.openModal(næring)} href="#" />
            ),
            høyrestiltTekst: getMessage(intl, 'tidsintervall', {
                fom: formatDate(tidsperiode.fom),
                tom: pågående ? 'pågående' : formatDate(tidsperiode.tom)
            })
        };
    }

    render() {
        const { næring, modalIsOpen } = this.state;
        return (
            <>
                <Oppsummeringsliste data={this.createOppsummeringslisteData()} />
                <NæringOppsummeringsmodal
                    næring={næring}
                    isOpen={modalIsOpen}
                    onRequestClose={this.closeModal}
                    contentLabel={'Oppsummering'}>
                    Some content
                </NæringOppsummeringsmodal>
            </>
        );
    }
}
export default injectIntl(SelvstendigNæringsdrivendeOppsummeringsliste);
