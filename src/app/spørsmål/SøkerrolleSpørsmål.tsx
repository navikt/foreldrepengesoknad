import * as React from 'react';
import { InjectedIntlProps, injectIntl, InjectedIntl } from 'react-intl';
import { SøkerRolle } from '../types/søknad/Søknad';
import { RadioProps } from 'nav-frontend-skjema/lib/radio-panel-gruppe';
import RadioPanelGruppeResponsiveField from 'common/lib/formik/fields/RadioPanelGruppeResponsiveField';

interface OwnProps {
    rolle?: SøkerRolle;
    roller?: SøkerRolle[];
    navn: string;
}

type Props = OwnProps & InjectedIntlProps;

const getRadioOptions = (roller: SøkerRolle[] = [], intl: InjectedIntl): RadioProps[] =>
    roller.map((rolle) => ({
        label: intl.formatMessage({ id: `søkerrolle.rolle.${rolle}` }),
        value: rolle
    }));

const SøkerrolleSpørsmål = (props: Props) => {
    const { rolle, roller, navn, intl } = props;

    return (
        <RadioPanelGruppeResponsiveField
            name={navn}
            checked={rolle}
            legend={intl.formatMessage({ id: 'søkerrolle.spørsmål' })}
            radios={getRadioOptions(roller, intl)}
        />
    );
};

export default injectIntl(SøkerrolleSpørsmål);
