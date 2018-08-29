import * as React from 'react';
import { injectIntl, InjectedIntlProps } from 'react-intl';
import { Input } from 'nav-frontend-skjema';
import { AnnenForelderPartial } from '../types/søknad/AnnenForelder';
import getMessage from 'common/util/i18nUtils';

interface NavnPåAnnenForelderSpørsmålProps {
    navn?: string;
    kanIkkeOppgis?: boolean;
    onChange: (annenForelder: AnnenForelderPartial) => void;
}

type Props = NavnPåAnnenForelderSpørsmålProps & InjectedIntlProps;

const NavnPåAnnenForelderSpørsmål = (props: Props) => {
    const { kanIkkeOppgis, navn, onChange, intl } = props;

    return (
        <Input
            disabled={kanIkkeOppgis}
            label={getMessage(intl, 'annenForelder.spørsmål.navn')}
            name="navn"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange({ navn: e.target.value })}
            value={navn === undefined ? '' : navn}
        />
    );
};

export default injectIntl(NavnPåAnnenForelderSpørsmål);
