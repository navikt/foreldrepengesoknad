import { FormattedMessage, useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { Heading } from '@navikt/ds-react';
import { UtenlandsoppholdPanel } from '@navikt/fp-utenlandsopphold';
import { Utenlandsopphold } from '@navikt/fp-types';
import { ContentWrapper } from '@navikt/fp-ui';
import actionCreator from 'app/context/action/actionCreator';
import useSøknad from 'app/utils/hooks/useSøknad';
import useAvbrytSøknad from 'app/utils/hooks/useAvbrytSøknad';
import useFortsettSøknadSenere from 'app/utils/hooks/useFortsettSøknadSenere';
import useSaveLoadedRoute from 'app/utils/hooks/useSaveLoadedRoute';
import SøknadRoutes from 'app/routes/routes';
import { ForeldrepengesøknadContextState } from 'app/context/ForeldrepengesøknadContextConfig';
import { storeAppState } from 'app/utils/submitUtils';
import { useOnValidSubmitNew } from 'app/utils/hooks/useOnValidSubmit';
import createConfig, { getPreviousStepHref } from '../stepsConfig';

const UtenlandsoppholdSteg: React.FunctionComponent = () => {
    const intl = useIntl();
    const navigate = useNavigate();
    const onAvbrytSøknad = useAvbrytSøknad();
    const onFortsettSøknadSenere = useFortsettSøknadSenere();

    useSaveLoadedRoute(SøknadRoutes.UTENLANDSOPPHOLD);

    const { informasjonOmUtenlandsopphold, søkersituasjon } = useSøknad();
    const utenlandsopphold =
        informasjonOmUtenlandsopphold.iNorgeNeste12Mnd !== undefined
            ? {
                  harBoddUtenforNorgeSiste12Mnd: !informasjonOmUtenlandsopphold.iNorgeSiste12Mnd,
                  skalBoUtenforNorgeNeste12Mnd: !informasjonOmUtenlandsopphold.iNorgeNeste12Mnd,
              }
            : undefined;

    const onValidSubmitHandler = (values: Utenlandsopphold) => {
        const utenlandsopphold = {
            iNorgeSiste12Mnd: !values.harBoddUtenforNorgeSiste12Mnd,
            iNorgeNeste12Mnd: !values.skalBoUtenforNorgeNeste12Mnd,
        };
        return [actionCreator.setInformasjonOmUtenlandsopphold(utenlandsopphold)];
    };

    const { handleSubmit } = useOnValidSubmitNew(
        onValidSubmitHandler,
        (values: Utenlandsopphold) => {
            if (values.harBoddUtenforNorgeSiste12Mnd) {
                return SøknadRoutes.TIDLIGERE_UTENLANDSOPPHOLD;
            } else if (values.skalBoUtenforNorgeNeste12Mnd) {
                return SøknadRoutes.SENERE_UTENLANDSOPPHOLD;
            }
            return SøknadRoutes.INNTEKTSINFORMASJON;
        },
        (state: ForeldrepengesøknadContextState) => storeAppState(state),
    );

    const goToPreviousStep = () => {
        navigate(getPreviousStepHref('utenlandsopphold'));
    };
    const saveOnPrevious = () => {
        // TODO Lagre uvalidert data i framtida
    };

    const stepConfig = createConfig(intl, false).map((config) => ({
        ...config,
        isSelected: config.id === 'utenlandsopphold',
    }));

    return (
        <ContentWrapper>
            <Heading size="large">
                <FormattedMessage id="søknad.pageheading" />
            </Heading>
            <UtenlandsoppholdPanel
                utenlandsopphold={utenlandsopphold}
                saveOnNext={handleSubmit}
                saveOnPrevious={saveOnPrevious}
                cancelApplication={onAvbrytSøknad}
                onContinueLater={onFortsettSøknadSenere}
                goToPreviousStep={goToPreviousStep}
                stepConfig={stepConfig}
                søkersituasjon={søkersituasjon.situasjon}
                stønadstype="Foreldrepenger"
            />
        </ContentWrapper>
    );
};

export default UtenlandsoppholdSteg;
