import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';

import getMessage from 'common/util/i18nUtils';
import CheckboksPanelGruppeResponsive from 'common/components/skjema/elements/checkbox-panel-gruppe-responsive/CheckboksPanelGruppeResponsive';
import { Næringstype } from '../types/søknad/SelvstendigNæringsdrivendeInformasjon';
import { InputChangeEvent } from '../../common/types/Events';
import { CheckboksPanelProps } from 'nav-frontend-skjema';

interface NæringstypeSpørsmålProps {
    næringstyper: Næringstype[];
    onChange: (fødselsnummer: string) => void;
}

type Props = NæringstypeSpørsmålProps & InjectedIntlProps;

const næringstypeValues = [Næringstype.DAGMAMMA, Næringstype.FISKER, Næringstype.JORDBRUK, Næringstype.ANNET];

const NæringstypeSpørsmål: React.StatelessComponent<Props> = (props: Props) => {
    const { onChange, næringstyper, intl } = props;
    const createNæringstypeOptions = (): CheckboksPanelProps[] => {
        return næringstypeValues.map(
            (næringstype: Næringstype): CheckboksPanelProps => {
                return {
                    label: getMessage(intl, `næringstype.${næringstype.toLocaleLowerCase()}`),
                    value: næringstype,
                    checked: næringstyper.indexOf(næringstype) >= 0
                };
            }
        );
    };

    return (
        <CheckboksPanelGruppeResponsive
            twoColumns={true}
            legend={getMessage(intl, 'næringstype.spørsmål')}
            checkboxes={createNæringstypeOptions()}
            onChange={(e: InputChangeEvent, næringstype: Næringstype) => {
                onChange(næringstype);
            }}
        />
    );
};

export default injectIntl(NæringstypeSpørsmål);
