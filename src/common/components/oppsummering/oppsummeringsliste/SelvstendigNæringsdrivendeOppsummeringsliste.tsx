import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import { formatDate } from '../../../../app/util/dates/dates';
import Oppsummeringsliste from 'common/components/oppsummering/oppsummeringsliste/Oppsummeringsliste';
import { Næring } from '../../../../app/types/søknad/SelvstendigNæringsdrivendeInformasjon';
import Modal from 'nav-frontend-modal';
import SeDetaljerLink from '../../../../app/components/se-detaljer-link/SeDetaljerLink';

interface SelvstendigNæringsdrivendeOppsummeringslisteProps {
    næringer: Næring[];
}

type Props = SelvstendigNæringsdrivendeOppsummeringslisteProps & InjectedIntlProps;

interface State {
    modalIsOpen: boolean;
}

class SelvstendigNæringsdrivendeOppsummeringsliste extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            modalIsOpen: false
        };

        this.toggleModal = this.toggleModal.bind(this);
    }

    toggleModal(e?: React.SyntheticEvent<HTMLAnchorElement>) {
        if (e) {
            e.preventDefault();
        }
        this.setState({
            modalIsOpen: !this.state.modalIsOpen
        });
    }

    render() {
        const { næringer, intl } = this.props;
        return (
            <>
                <Oppsummeringsliste
                    data={næringer.map(({ navnPåNæringen, tidsperiode, pågående }) => ({
                        venstrestiltTekst: (
                            <SeDetaljerLink content={navnPåNæringen} onClick={this.toggleModal} href="" />
                        ),
                        høyrestiltTekst: getMessage(intl, 'tidsintervall', {
                            fom: formatDate(tidsperiode.fom),
                            tom: pågående ? 'pågående' : formatDate(tidsperiode.tom)
                        })
                    }))}
                />

                <Modal onRequestClose={this.toggleModal} isOpen={this.state.modalIsOpen} contentLabel={'Oppsummering'}>
                    Some content
                </Modal>
            </>
        );
    }
}

export default injectIntl(SelvstendigNæringsdrivendeOppsummeringsliste);
