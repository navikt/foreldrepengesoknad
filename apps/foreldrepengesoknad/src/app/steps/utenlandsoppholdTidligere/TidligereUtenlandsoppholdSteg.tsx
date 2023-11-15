import { FormattedMessage, useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { Heading } from '@navikt/ds-react';
import { TidligereUtenlandsoppholdPanel } from '@navikt/fp-utenlandsopphold';
import { UtenlandsoppholdTidligere } from '@navikt/fp-types';
import { ContentWrapper } from '@navikt/fp-ui';
import actionCreator from 'app/context/action/actionCreator';
import useSøknad from 'app/utils/hooks/useSøknad';
import useAvbrytSøknad from 'app/utils/hooks/useAvbrytSøknad';
import useFortsettSøknadSenere from 'app/utils/hooks/useFortsettSøknadSenere';
import useSaveLoadedRoute from 'app/utils/hooks/useSaveLoadedRoute';
import SøknadRoutes from 'app/routes/routes';
import { ForeldrepengesøknadContextState } from 'app/context/ForeldrepengesøknadContextConfig';
import { storeAppState } from 'app/utils/submitUtils';
import useOnValidSubmit from 'app/utils/hooks/useOnValidSubmit';
import createConfig, { getPreviousStepHref } from '../stepsConfig';

const TidligereUtenlandsoppholdSteg: React.FunctionComponent = () => {
    const intl = useIntl();
    const navigate = useNavigate();
    const onAvbrytSøknad = useAvbrytSøknad();
    const onFortsettSøknadSenere = useFortsettSøknadSenere();

    useSaveLoadedRoute(SøknadRoutes.TIDLIGERE_UTENLANDSOPPHOLD);

    const { informasjonOmUtenlandsopphold } = useSøknad();
    const lagredeTidligereUtenlandsopphold =
        informasjonOmUtenlandsopphold.tidligereOpphold.length > 0
            ? {
                  utenlandsoppholdSiste12Mnd: informasjonOmUtenlandsopphold.tidligereOpphold.map((so) => ({
                      fom: so.tidsperiode.fom,
                      tom: so.tidsperiode.tom,
                      landkode: so.land,
                  })),
              }
            : undefined;

    const onValidSubmitHandler = (values: UtenlandsoppholdTidligere) => {
        const tidligereUtenlandsopphold = {
            tidligereOpphold: values.utenlandsoppholdSiste12Mnd.map((un) => ({
                land: un.landkode,
                tidsperiode: {
                    fom: un.fom,
                    tom: un.tom,
                },
            })),
        };
        return [actionCreator.setInformasjonOmUtenlandsoppholdTidligere(tidligereUtenlandsopphold)];
    };

    const { handleSubmit } = useOnValidSubmit(
        onValidSubmitHandler,
        SøknadRoutes.INNTEKTSINFORMASJON,
        (state: ForeldrepengesøknadContextState) => storeAppState(state),
    );

    const goToPreviousStep = () => {
        navigate(getPreviousStepHref('utenlandsoppholdTidligere'));
    };
    const saveOnPrevious = () => {
        // TODO Lagre uvalidert data i framtida
    };

    const stepConfig = createConfig(intl, false).map((config) => ({
        ...config,
        isSelected: config.id === 'utenlandsoppholdTidligere',
    }));

    return (
        <ContentWrapper>
            <Heading size="large">
                <FormattedMessage id="søknad.pageheading" />
            </Heading>
            <TidligereUtenlandsoppholdPanel
                tidligereUtenlandsopphold={lagredeTidligereUtenlandsopphold}
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

export default TidligereUtenlandsoppholdSteg;
