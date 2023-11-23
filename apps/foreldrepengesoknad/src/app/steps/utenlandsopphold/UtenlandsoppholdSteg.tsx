import { FormattedMessage, useIntl } from 'react-intl';
import { useNavigate } from 'react-router-dom';
import { Heading } from '@navikt/ds-react';
import { UtenlandsoppholdPanel } from '@navikt/fp-utenlandsopphold';
import { Utenlandsopphold } from '@navikt/fp-types';
import { ContentWrapper } from '@navikt/fp-ui';
import { notEmpty } from '@navikt/fp-validation';
import useFortsettSøknadSenere from 'app/utils/hooks/useFortsettSøknadSenere';
import SøknadRoutes from 'app/routes/routes';
import createConfig, { getPreviousStepHref } from '../stepsConfig';
import { FpDataType, useFpStateData, useFpStateSaveFn } from 'app/context/FpDataContext';

const utledNesteSide = (values: Utenlandsopphold) => {
    if (values.harBoddUtenforNorgeSiste12Mnd) {
        return SøknadRoutes.TIDLIGERE_UTENLANDSOPPHOLD;
    } else if (values.skalBoUtenforNorgeNeste12Mnd) {
        return SøknadRoutes.SENERE_UTENLANDSOPPHOLD;
    }
    return SøknadRoutes.INNTEKTSINFORMASJON;
};

type Props = {
    mellomlagreSøknad: () => Promise<any>;
    avbrytSøknad: () => void;
};

const UtenlandsoppholdSteg: React.FunctionComponent<Props> = ({ mellomlagreSøknad, avbrytSøknad }) => {
    const intl = useIntl();
    const navigate = useNavigate();
    const onFortsettSøknadSenere = useFortsettSøknadSenere();

    const utenlandsopphold = useFpStateData(FpDataType.UTENLANDSOPPHOLD);
    const lagreUtenlandsopphold = useFpStateSaveFn(FpDataType.UTENLANDSOPPHOLD);
    const lagreAppRoute = useFpStateSaveFn(FpDataType.APP_ROUTE);

    const save = async (values: Utenlandsopphold) => {
        lagreUtenlandsopphold({
            iNorgeSiste12Mnd: !values.harBoddUtenforNorgeSiste12Mnd,
            iNorgeNeste12Mnd: !values.skalBoUtenforNorgeNeste12Mnd,
        });

        const nesteSide = utledNesteSide(values);
        lagreAppRoute(nesteSide);
        await mellomlagreSøknad();
        navigate(nesteSide);
    };

    const goToPreviousStep = async () => {
        const appRoute = getPreviousStepHref('utenlandsopphold');
        lagreAppRoute(appRoute);
        await mellomlagreSøknad();
        navigate(appRoute);
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
