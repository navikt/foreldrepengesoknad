import * as React from 'react';
import { useIntl } from 'react-intl';
import RadioPanelGruppeResponsive from 'common/components/skjema/elements/radio-panel-gruppe-responsive/RadioPanelGruppeResponsive';
import getMessage from 'common/util/i18nUtils';
import { Søkersituasjon } from '../types/søknad/Søknad';
import { RadioProps } from 'nav-frontend-skjema';

interface SøkersituasjonProps {
    situasjon?: Søkersituasjon;
    onChange: (situasjon: Søkersituasjon, e: React.ChangeEvent<HTMLInputElement>) => void;
}

type Props = SøkersituasjonProps;

const SøkersituasjonSpørsmål = (props: Props) => {
    const { onChange, situasjon } = props;
    const intl = useIntl();

    const søkersituasjonRadioName = 'søkersituasjon';

    const getSituasjonOption = (key: Søkersituasjon): RadioProps => ({
        label: intl.formatMessage({
            id: `søkersituasjon.alternativ.${key}`,
        }),
        value: key,
        name: søkersituasjonRadioName,
    });

    return (
        <RadioPanelGruppeResponsive
            checked={situasjon}
            legend={getMessage(intl, 'søkersituasjon.spørsmål')}
            radios={[
                getSituasjonOption(Søkersituasjon.FØDSEL),
                getSituasjonOption(Søkersituasjon.ADOPSJON),
                getSituasjonOption(Søkersituasjon.FORELDREANSVAR),
            ]}
            name={søkersituasjonRadioName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>, v: Søkersituasjon) => onChange(v, e)}
        />
    );
};

export default SøkersituasjonSpørsmål;
