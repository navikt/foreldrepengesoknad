import * as React from 'react';
import { AnnenInntektType } from '../types/søknad/AnnenInntekt';
import { injectIntl, IntlShape } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import FlervalgSpørsmål from '../../common/components/skjema/elements/flervalg-spørsmål/FlervalgSpørsmål';
import { RadioProps } from 'nav-frontend-skjema';

interface InntektstypeSpørsmålProps {
    inntektstype?: AnnenInntektType;
    onChange: (inntektstype: AnnenInntektType) => void;
    intl: IntlShape;
}

type Props = InntektstypeSpørsmålProps;

class InntektstypeSpørsmål extends React.Component<Props> {
    constructor(props: Props) {
        super(props);

        this.getRadioOptions = this.getRadioOptions.bind(this);
    }

    getRadioOptions(radioName: string): RadioProps[] {
        const { intl } = this.props;

        return [
            {
                value: AnnenInntektType.JOBB_I_UTLANDET,
                label: getMessage(intl, 'inntektstype.jobb_i_utlandet'),
                name: radioName,
            },

            {
                value: AnnenInntektType.VENTELØNN,
                label: getMessage(intl, 'inntektstype.ventelønn_vartpenger'),
                name: radioName,
            },
            {
                value: AnnenInntektType.SLUTTPAKKE,
                label: getMessage(intl, 'inntektstype.etterlønn_sluttpakke'),
                name: radioName,
            },
            {
                value: AnnenInntektType.MILITÆRTJENESTE,
                label: getMessage(intl, 'inntektstype.militær_eller_siviltjeneste'),
                name: radioName,
            },
        ];
    }

    render() {
        const { inntektstype, onChange, intl } = this.props;
        const radioName = 'inntektstype';

        return (
            <FlervalgSpørsmål
                navn={radioName}
                alternativer={this.getRadioOptions(radioName)}
                valgtVerdi={inntektstype}
                toKolonner={true}
                spørsmål={getMessage(intl, 'annenInntekt.modal.velgInntektstype')}
                onChange={onChange}
            />
        );
    }
}

export default injectIntl(InntektstypeSpørsmål);
