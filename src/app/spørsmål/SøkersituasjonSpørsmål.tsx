import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import getMessage from 'common/util/i18nUtils';
import { Søkersituasjon } from '../types/søknad/Søknad';
import { RadioProps } from 'nav-frontend-skjema/lib/radio-panel-gruppe';
import RadioPanelGruppeResponsiveField from 'common/lib/formik/fields/RadioPanelGruppeResponsiveField';

interface SøkersituasjonProps {
    situasjon?: Søkersituasjon;
    navn: string;
}

type Props = SøkersituasjonProps & InjectedIntlProps;

const SøkersituasjonSpørsmål = (props: Props) => {
    const { situasjon, navn, intl } = props;

    const getSituasjonOption = (key: Søkersituasjon): RadioProps => ({
        label: intl.formatMessage({
            id: `søkersituasjon.alternativ.${key}`
        }),
        value: key
    });

    return (
        <RadioPanelGruppeResponsiveField
            checked={situasjon}
            legend={getMessage(intl, 'søkersituasjon.spørsmål')}
            radios={[
                getSituasjonOption(Søkersituasjon.FØDSEL),
                getSituasjonOption(Søkersituasjon.ADOPSJON),
                getSituasjonOption(Søkersituasjon.FORELDREANSVAR)
            ]}
            name={navn}
        />
    );
};

export default injectIntl(SøkersituasjonSpørsmål);
