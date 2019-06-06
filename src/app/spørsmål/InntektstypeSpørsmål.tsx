import * as React from 'react';
import { AnnenInntektType } from '../types/søknad/AnnenInntekt';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { RadioProps } from 'nav-frontend-skjema/lib/radio-panel-gruppe';
import getMessage from 'common/util/i18nUtils';
import FlervalgSpørsmål from '../../common/components/skjema/elements/flervalg-spørsmål/FlervalgSpørsmål';

interface InntektstypeSpørsmålProps {
    inntektstype?: AnnenInntektType;
    onChange: (inntektstype: AnnenInntektType) => void;
}

type Props = InntektstypeSpørsmålProps & InjectedIntlProps;

class InntektstypeSpørsmål extends React.Component<Props> {
    constructor(props: Props) {
        super(props);

        this.getRadioOptions = this.getRadioOptions.bind(this);
    }

    getRadioOptions(): RadioProps[] {
        const { intl } = this.props;
        return [
            { value: AnnenInntektType.JOBB_I_UTLANDET, label: getMessage(intl, 'inntektstype.jobb_i_utlandet') },

            { value: AnnenInntektType.VENTELØNN, label: getMessage(intl, 'inntektstype.ventelønn_vartpenger') },
            { value: AnnenInntektType.SLUTTPAKKE, label: getMessage(intl, 'inntektstype.etterlønn_sluttpakke') },
            {
                value: AnnenInntektType.MILITÆRTJENESTE,
                label: getMessage(intl, 'inntektstype.militær_eller_siviltjeneste')
            }
        ];
    }

    render() {
        const { inntektstype, onChange, intl } = this.props;
        return (
            <FlervalgSpørsmål
                navn="inntektstype"
                alternativer={this.getRadioOptions()}
                valgtVerdi={inntektstype}
                toKolonner={true}
                spørsmål={getMessage(intl, 'annenInntekt.modal.velgInntektstype')}
                onChange={onChange}
            />
        );
    }
}

export default injectIntl(InntektstypeSpørsmål);
