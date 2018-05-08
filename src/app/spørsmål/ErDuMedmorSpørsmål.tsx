import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import RadioPanelGruppeResponsive from '../components/radio-panel-gruppe-responsive/RadioPanelGruppeResponsive';
import { SøkerRolle } from '../types/søknad/Søknad';
import getMessage from '../util/i18nUtils';

interface MedmorBolkProps {
    erMedmor: string;
    onChange: (
        erMedmor: SøkerRolle,
        e: React.ChangeEvent<HTMLInputElement>
    ) => void;
}

type Props = MedmorBolkProps & InjectedIntlProps;

const ErDuMedmorSpørsmål = (props: Props) => {
    const { onChange, erMedmor, intl, ...otherProps } = props;
    return (
        <RadioPanelGruppeResponsive
            checked={erMedmor}
            legend={getMessage(intl, 'erDuMedmor.spørsmål')}
            radios={[
                { label: getMessage(intl, 'ja'), value: SøkerRolle.MEDMOR },
                { label: getMessage(intl, 'nei'), value: SøkerRolle.MOR }
            ]}
            name="erMedmor"
            onChange={(e: React.ChangeEvent<HTMLInputElement>, v: SøkerRolle) =>
                onChange(v, e)
            }
            {...otherProps}
        />
    );
};

export default injectIntl(ErDuMedmorSpørsmål);
