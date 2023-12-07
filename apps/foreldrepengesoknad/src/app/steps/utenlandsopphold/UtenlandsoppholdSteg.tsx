import { FormattedMessage, useIntl } from 'react-intl';
import { Heading } from '@navikt/ds-react';
import { UtenlandsoppholdPanel } from '@navikt/fp-utenlandsopphold';
import { Utenlandsopphold } from '@navikt/fp-types';
import { ContentWrapper } from '@navikt/fp-ui';
import useFortsettSøknadSenere from 'app/utils/hooks/useFortsettSøknadSenere';
import SøknadRoutes from 'app/routes/routes';
import createConfig, { getPreviousStepHref } from '../stepsConfig';
import { ContextDataType, useContextGetData, useContextSaveData } from 'app/context/FpDataContext';

const utledNesteSide = (values: Utenlandsopphold) => {
    if (values.harBoddUtenforNorgeSiste12Mnd) {
        return SøknadRoutes.TIDLIGERE_UTENLANDSOPPHOLD;
    } else if (values.skalBoUtenforNorgeNeste12Mnd) {
        return SøknadRoutes.SENERE_UTENLANDSOPPHOLD;
    }
    return SøknadRoutes.INNTEKTSINFORMASJON;
};

type Props = {
    mellomlagreSøknadOgNaviger: () => void;
    avbrytSøknad: () => void;
};

const UtenlandsoppholdSteg: React.FunctionComponent<Props> = ({ mellomlagreSøknadOgNaviger, avbrytSøknad }) => {
    const intl = useIntl();
    const onFortsettSøknadSenere = useFortsettSøknadSenere();

    const utenlandsopphold = useContextGetData(ContextDataType.UTENLANDSOPPHOLD);
    const oppdaterUtenlandsopphold = useContextSaveData(ContextDataType.UTENLANDSOPPHOLD);
    const oppdaterAppRoute = useContextSaveData(ContextDataType.APP_ROUTE);

    const save = (values: Utenlandsopphold) => {
        oppdaterUtenlandsopphold({
            iNorgeSiste12Mnd: !values.harBoddUtenforNorgeSiste12Mnd,
            iNorgeNeste12Mnd: !values.skalBoUtenforNorgeNeste12Mnd,
        });

        const nesteSide = utledNesteSide(values);
        oppdaterAppRoute(nesteSide);
        mellomlagreSøknadOgNaviger();
    };

    const goToPreviousStep = () => {
        const appRoute = getPreviousStepHref('utenlandsopphold');
        oppdaterAppRoute(appRoute);
        mellomlagreSøknadOgNaviger();
    };
    const saveOnPrevious = () => {
        // TODO (TOR) Lagre uvalidert data i framtida
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
                utenlandsopphold={
                    utenlandsopphold
                        ? {
                              harBoddUtenforNorgeSiste12Mnd: !utenlandsopphold.iNorgeSiste12Mnd,
                              skalBoUtenforNorgeNeste12Mnd: !utenlandsopphold.iNorgeNeste12Mnd,
                          }
                        : undefined
                }
                saveOnNext={save}
                saveOnPrevious={saveOnPrevious}
                cancelApplication={avbrytSøknad}
                onContinueLater={onFortsettSøknadSenere}
                goToPreviousStep={goToPreviousStep}
                stepConfig={stepConfig}
                stønadstype="Foreldrepenger"
                supportsTempSaving
            />
        </ContentWrapper>
    );
};

export default UtenlandsoppholdSteg;
