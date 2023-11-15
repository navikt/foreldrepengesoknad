import { FormattedMessage, useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { Heading } from '@navikt/ds-react';
import { SenereUtenlandsoppholdPanel } from '@navikt/fp-utenlandsopphold';
import { UtenlandsoppholdSenere } from '@navikt/fp-types';
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
import createConfig from '../stepsConfig';

const SenereUtenlandsoppholdSteg: React.FunctionComponent = () => {
    const intl = useIntl();
    const navigate = useNavigate();
    const onAvbrytSøknad = useAvbrytSøknad();
    const onFortsettSøknadSenere = useFortsettSøknadSenere();

    useSaveLoadedRoute(SøknadRoutes.SENERE_UTENLANDSOPPHOLD);

    const { informasjonOmUtenlandsopphold } = useSøknad();
    const lagredeSenereUtenlandsopphold =
        informasjonOmUtenlandsopphold.senereOpphold.length > 0
            ? {
                  utenlandsoppholdNeste12Mnd: informasjonOmUtenlandsopphold.senereOpphold.map((so) => ({
                      fom: so.tidsperiode.fom,
                      tom: so.tidsperiode.tom,
                      landkode: so.land,
                  })),
              }
            : undefined;

    const onValidSubmitHandler = (values: UtenlandsoppholdSenere) => {
        const senereUtenlandsopphold = {
            senereOpphold: values.utenlandsoppholdNeste12Mnd.map((un) => ({
                land: un.landkode,
                tidsperiode: {
                    fom: un.fom,
                    tom: un.tom,
                },
            })),
        };
        return [actionCreator.setInformasjonOmUtenlandsoppholdSenere(senereUtenlandsopphold)];
    };

    const { handleSubmit } = useOnValidSubmitNew(
        onValidSubmitHandler,
        () => SøknadRoutes.INNTEKTSINFORMASJON,
        (state: ForeldrepengesøknadContextState) => storeAppState(state),
    );

    const goToPreviousStep = () => {
        navigate(
            informasjonOmUtenlandsopphold.iNorgeSiste12Mnd
                ? SøknadRoutes.TIDLIGERE_UTENLANDSOPPHOLD
                : SøknadRoutes.UTENLANDSOPPHOLD,
        );
    };
    const saveOnPrevious = () => {
        // TODO Lagre uvalidert data i framtida
    };

    const stepConfig = createConfig(intl, false).map((config) => ({
        ...config,
        isSelected: config.id === 'utenlandsoppholdSenere',
    }));

    return (
        <ContentWrapper>
            <Heading size="large">
                <FormattedMessage id="søknad.pageheading" />
            </Heading>
            <SenereUtenlandsoppholdPanel
                senereUtenlandsopphold={lagredeSenereUtenlandsopphold}
                saveOnNext={handleSubmit}
                saveOnPrevious={saveOnPrevious}
                cancelApplication={onAvbrytSøknad}
                onContinueLater={onFortsettSøknadSenere}
                goToPreviousStep={goToPreviousStep}
                stepConfig={stepConfig}
            />
        </ContentWrapper>
    );
};

export default SenereUtenlandsoppholdSteg;
