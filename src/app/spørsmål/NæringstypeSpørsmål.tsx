import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';

import getMessage from 'common/util/i18nUtils';
import CheckboksPanelGruppeResponsive from 'common/components/checkbox-panel-gruppe-responsive/CheckboksPanelGruppeResponsive';
import { Næringstype } from '../types/søknad/SelvstendigNæringsdrivendeInformasjon';
import { InputChangeEvent } from '../types/dom/Events';

interface NæringstypeSpørsmålProps {
    næringstyper: Næringstype[];
    onChange: (fødselsnummer: string) => void;
}

type Props = NæringstypeSpørsmålProps & InjectedIntlProps;

const næringstypeValues = [
    Næringstype.DAGMAMMA,
    Næringstype.FISKER,
    Næringstype.JORDBRUK,
    Næringstype.ANNET
];

const NæringstypeSpørsmål: React.StatelessComponent<Props> = (props: Props) => {
    const { onChange, næringstyper, intl } = props;
    const createNæringstypeOptions = () => {
        return næringstypeValues.map((næringstype: Næringstype) => {
            return {
                label: næringstype,
                value: næringstype,
                checked: næringstyper.indexOf(næringstype) >= 0
            };
        });
    };

    return (
        <CheckboksPanelGruppeResponsive
            legend={getMessage(intl, 'næringstype.spørsmål')}
            checkboxes={createNæringstypeOptions()}
            onChange={(e: InputChangeEvent, næringstype: Næringstype) => {
                onChange(næringstype);
            }}
        />
    );
};

export default injectIntl(NæringstypeSpørsmål);
