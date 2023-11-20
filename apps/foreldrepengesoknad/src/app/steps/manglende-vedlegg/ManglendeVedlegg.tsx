import { Step, intlUtils } from '@navikt/fp-common';
import { ManglendeVedleggFormComponents } from './manglendeVedleggFormConfig';
import useSaveLoadedRoute from 'app/utils/hooks/useSaveLoadedRoute';
import SøknadRoutes from 'app/routes/routes';
import { useIntl } from 'react-intl';
import stepConfig from '../stepsConfig';
import useSøknad from 'app/utils/hooks/useSøknad';
import { useForeldrepengesøknadContext } from 'app/context/hooks/useForeldrepengesøknadContext';
import useAvbrytSøknad from 'app/utils/hooks/useAvbrytSøknad';
import useFortsettSøknadSenere from 'app/utils/hooks/useFortsettSøknadSenere';

const ManglendeVedlegg: React.FunctionComponent = () => {
    const intl = useIntl();
    const søknad = useSøknad();
    const { state } = useForeldrepengesøknadContext();
    const onAvbrytSøknad = useAvbrytSøknad();
    const onFortsettSøknadSenere = useFortsettSøknadSenere();

    useSaveLoadedRoute(SøknadRoutes.MANGLENDE_VEDLEGG);

    return (
        <ManglendeVedleggFormComponents.FormikWrapper
            initialValues={{}}
            onSubmit={() => null}
            renderForm={() => {
                return (
                    <Step
                        bannerTitle={intlUtils(intl, 'søknad.pageheading')}
                        activeStepId="dokumentasjon"
                        pageTitle={intlUtils(intl, 'søknad.manglendeVedlegg')}
                        onCancel={onAvbrytSøknad}
                        onContinueLater={onFortsettSøknadSenere}
                        steps={stepConfig(intl, søknad.erEndringssøknad, state.manglerDokumentasjon)}
                    >
                        <ManglendeVedleggFormComponents.Form includeButtons={false}>
                            <div>Form for manglende vedlegg</div>
                        </ManglendeVedleggFormComponents.Form>
                    </Step>
                );
            }}
        />
    );
};

export default ManglendeVedlegg;
