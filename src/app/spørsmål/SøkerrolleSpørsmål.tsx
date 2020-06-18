import * as React from 'react';
import { useIntl, IntlShape } from 'react-intl';
import RadioPanelGruppeResponsive from 'common/components/skjema/elements/radio-panel-gruppe-responsive/RadioPanelGruppeResponsive';
import { SøkerRolle } from '../types/søknad/Søknad';
import { RadioProps } from 'nav-frontend-skjema';

interface OwnProps {
    rolle?: SøkerRolle;
    roller?: SøkerRolle[];
    onChange: (rolle: SøkerRolle) => void;
}

type Props = OwnProps;

const getRadioOptions = (roller: SøkerRolle[] = [], radioName: string, intl: IntlShape): RadioProps[] =>
    roller.map((rolle) => ({
        label: intl.formatMessage({ id: `søkerrolle.rolle.${rolle}` }),
        value: rolle,
        name: radioName,
    }));

const SøkerrolleSpørsmål = (props: Props) => {
    const { onChange, rolle, roller } = props;
    const intl = useIntl();
    const radioName = 'søkerrolle';

    return (
        <RadioPanelGruppeResponsive
            name={radioName}
            checked={rolle}
            legend={intl.formatMessage({ id: 'søkerrolle.spørsmål' })}
            radios={getRadioOptions(roller, radioName, intl)}
            onChange={(_e: React.ChangeEvent<HTMLInputElement>, nyRolle: SøkerRolle) => onChange(nyRolle)}
        />
    );
};

export default SøkerrolleSpørsmål;
