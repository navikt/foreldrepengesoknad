import * as React from 'react';
import { injectIntl, IntlShape } from 'react-intl';
import { ISOStringToDate } from '@navikt/sif-common-formik/lib';
import getMessage from 'common/util/i18nUtils';
import AnnenInntektDetaljer from 'app/steg/oppsummering/components/oppsummering/oppsummeringer/detaljer/AnnenInntektDetaljer';
import Oppsummeringsliste from 'app/steg/oppsummering/components/oppsummeringsliste/Oppsummeringsliste';
import { AnnenInntekt } from '../../../../../../types/søknad/AnnenInntekt';
import { formatDate } from '../../../../../../util/dates/dates';

interface AndreInntekterOppsummeringslisteProps {
    andreInntekter: AnnenInntekt[];
    intl: IntlShape;
}

type Props = AndreInntekterOppsummeringslisteProps;

class AndreInntekterOppsummeringsliste extends React.Component<Props> {
    constructor(props: Props) {
        super(props);
        this.state = {
            modalIsOpen: false,
        };

        this.createOppsummeringslisteData = this.createOppsummeringslisteData.bind(this);
        this.createOppsummeringslisteelementData = this.createOppsummeringslisteelementData.bind(this);
    }

    createOppsummeringslisteData() {
        const { andreInntekter } = this.props;
        return andreInntekter.map((annenInntekt) => this.createOppsummeringslisteelementData(annenInntekt));
    }

    createOppsummeringslisteelementData(annenInntekt: AnnenInntekt) {
        const { intl } = this.props;
        const { type, tidsperiode, pågående } = annenInntekt;
        return {
            venstrestiltTekst: getMessage(intl, `inntektstype.${type.toLowerCase()}`),
            høyrestiltTekst: getMessage(intl, 'tidsintervall', {
                fom: formatDate(ISOStringToDate(tidsperiode.fom)),
                tom: pågående ? 'pågående' : formatDate(ISOStringToDate(tidsperiode.tom)),
            }),
            content: <AnnenInntektDetaljer annenInntekt={annenInntekt} />,
        };
    }

    render() {
        return <Oppsummeringsliste data={this.createOppsummeringslisteData()} />;
    }
}

export default injectIntl(AndreInntekterOppsummeringsliste);
