import * as React from 'react';
import { InjectedIntlProps, injectIntl, InjectedIntl } from 'react-intl';
import RadioPanelGruppeResponsive from 'common/components/skjema/elements/radio-panel-gruppe-responsive/RadioPanelGruppeResponsive';
import { SøkerRolle } from '../types/søknad/Søknad';
import { RadioProps } from 'nav-frontend-skjema/lib/radio-panel-gruppe';

interface OwnProps {
    rolle?: SøkerRolle;
    roller?: SøkerRolle[];
    onChange: (rolle: SøkerRolle) => void;
}

type Props = OwnProps & InjectedIntlProps;

const getRadioOptions = (roller: SøkerRolle[] = [], intl: InjectedIntl): RadioProps[] =>
    roller.map((rolle) => ({
        label: intl.formatMessage({ id: `søkerrolle.rolle.${rolle}` }),
        value: rolle
    }));

const SøkerrolleSpørsmål = (props: Props) => {
    const { onChange, rolle, roller, intl } = props;

    return (
        <RadioPanelGruppeResponsive
            name="søkerrolle"
            checked={rolle}
            legend={intl.formatMessage({ id: 'søkerrolle.spørsmål' })}
            radios={getRadioOptions(roller, intl)}
            onChange={(e: React.ChangeEvent<HTMLInputElement>, nyRolle: SøkerRolle) => onChange(nyRolle)}
        />
    );
};

export default injectIntl(SøkerrolleSpørsmål);
