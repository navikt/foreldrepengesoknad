import React, { FunctionComponent } from 'react';
import { useIntl } from 'react-intl';

import { CustomFormikProps } from 'app/types/Formik';
import { getSøknadStepPath } from 'app/utils/stepUtils';
import { Oppholdstype } from 'app/types/InformasjonOmUtenlandsopphold';
import { StepProps } from 'app/components/step/Step';
import Applikasjonsside from '../applikasjonsside/Applikasjonsside';
import Block from 'common/components/block/Block';
import FormikStep from 'app/components/formik-step/FormikStep';
import getMessage from 'common/util/i18nUtils';
import Oppholdsseksjon from './Oppholdsseksjon';
import SøknadStep, { StepID } from 'app/types/SøknadStep';
import { useNavigate } from 'react-router-dom';

interface OwnProps {
    step: SøknadStep;
    formikProps: CustomFormikProps;
}

type Props = OwnProps & StepProps;

const Utenlandsopphold: FunctionComponent<Props> = (props) => {
    const intl = useIntl();
    const { step, formikProps } = props;
    const { informasjonOmUtenlandsopphold: opphold } = formikProps.values;

    const visKomponent = {
        senereOpphold:
            opphold.iNorgeSiste12Mnd || (opphold.iNorgeSiste12Mnd === false && opphold.tidligereOpphold.length > 0),
        nesteknapp:
            opphold.iNorgeNeste12Mnd || (opphold.iNorgeNeste12Mnd === false && opphold.senereOpphold.length > 0),
    };

    const navigateTo = useNavigate();

    const navigate = () => {
        navigateTo(getSøknadStepPath(StepID.OPPSUMMERING));
    };

    return (
        <Applikasjonsside visTittel={true}>
            <FormikStep
                step={step}
                formikProps={formikProps}
                showNesteknapp={visKomponent.nesteknapp}
                onValidFormSubmit={navigate}
            >
                <Block>
                    <Oppholdsseksjon
                        type={Oppholdstype.TIDLIGERE_OPPHOLD}
                        name="informasjonOmUtenlandsopphold.iNorgeSiste12Mnd"
                        land="informasjonOmUtenlandsopphold.tidligereOpphold"
                        legend={getMessage(intl, 'utenlandsopphold.iNorgeSiste12Mnd.label')}
                        infoboksTekst={getMessage(intl, 'utenlandsopphold.iNorgeSiste12Mnd.infoboxTekst')}
                        labels={{
                            ja: getMessage(intl, 'utenlandsopphold.iNorgeSiste12Mnd.ja'),
                            nei: getMessage(intl, 'utenlandsopphold.iNorgeSiste12Mnd.nei'),
                        }}
                    />
                </Block>
                <Block visible={visKomponent.senereOpphold}>
                    <Oppholdsseksjon
                        type={Oppholdstype.SENERE_OPPHOLD}
                        name="informasjonOmUtenlandsopphold.iNorgeNeste12Mnd"
                        land="informasjonOmUtenlandsopphold.senereOpphold"
                        legend={getMessage(intl, 'utenlandsopphold.iNorgeNeste12Mnd.label')}
                        infoboksTekst={getMessage(intl, 'utenlandsopphold.iNorgeNeste12Mnd.infoboxTekst')}
                        labels={{
                            ja: getMessage(intl, 'utenlandsopphold.iNorgeNeste12Mnd.ja'),
                            nei: getMessage(intl, 'utenlandsopphold.iNorgeNeste12Mnd.nei'),
                        }}
                    />
                </Block>
            </FormikStep>
        </Applikasjonsside>
    );
};

export default Utenlandsopphold;
