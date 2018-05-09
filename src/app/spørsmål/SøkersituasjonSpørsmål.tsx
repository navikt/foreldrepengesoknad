import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import RadioPanelGruppeResponsive from '../components/radio-panel-gruppe-responsive/RadioPanelGruppeResponsive';
import getMessage from '../util/i18nUtils';
import { Søkersituasjon } from '../types/s\u00F8knad/S\u00F8knad';
import { RadioProps } from 'nav-frontend-skjema/lib/radio-panel-gruppe';

interface SøkersituasjonProps {
    situasjon: Søkersituasjon;
    onChange: (
        situasjon: Søkersituasjon,
        e: React.ChangeEvent<HTMLInputElement>
    ) => void;
}

type Props = SøkersituasjonProps & InjectedIntlProps;

const SøkersituasjonSpørsmål = (props: Props) => {
    const { onChange, situasjon, intl } = props;

    const getSituasjonOption = (key: Søkersituasjon): RadioProps => ({
        label: intl.formatMessage({
            id: `søkersituasjon.alternativ.${key}`
        }),
        value: key
    });

    return (
        <RadioPanelGruppeResponsive
            checked={situasjon}
            legend={getMessage(intl, 'søkersituasjon.spørsmål')}
            radios={[
                getSituasjonOption(Søkersituasjon.ADOPSJON),
                getSituasjonOption(Søkersituasjon.FØDSEL),
                getSituasjonOption(Søkersituasjon.STEBARN),
                getSituasjonOption(Søkersituasjon.FORELDREANSVAR)
            ]}
            name="søkersituasjon"
            onChange={(
                e: React.ChangeEvent<HTMLInputElement>,
                v: Søkersituasjon
            ) => onChange(v, e)}
        />
    );
};

export default injectIntl(SøkersituasjonSpørsmål);
