import { Block, Step, intlUtils } from '@navikt/fp-common';
import { Form, StepButtonsHookForm } from '@navikt/fp-form-hooks';
import useSaveLoadedRoute from 'app/utils/hooks/useSaveLoadedRoute';
import SøknadRoutes from 'app/routes/routes';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import stepConfig from '../stepsConfig';
import useSøknad from 'app/utils/hooks/useSøknad';
import { useForeldrepengesøknadContext } from 'app/context/hooks/useForeldrepengesøknadContext';
import useAvbrytSøknad from 'app/utils/hooks/useAvbrytSøknad';
import useFortsettSøknadSenere from 'app/utils/hooks/useFortsettSøknadSenere';
import { perioderSomKreverVedlegg } from '@navikt/uttaksplan';
import PeriodeAttachmentUploader from './periode-attachment-uploader/PeriodeAttachmentUploader';
import { getInitValues } from './manglendeVedleggFormUtils';
import { ManglendeVedleggFormData } from './manglendeVedleggFormConfig';
import { useNavigate } from 'react-router-dom';
import { Attachment } from '@navikt/fp-types';
import actionCreator from 'app/context/action/actionCreator';

const ManglendeVedlegg: React.FunctionComponent = () => {
    const intl = useIntl();
    const søknad = useSøknad();
    const { state } = useForeldrepengesøknadContext();
    const { uttaksplan, annenForelder } = søknad;
    const navigate = useNavigate();
    const onAvbrytSøknad = useAvbrytSøknad();
    const onFortsettSøknadSenere = useFortsettSøknadSenere();
    const perioderSomManglerVedlegg = perioderSomKreverVedlegg(uttaksplan, true, annenForelder);

    useSaveLoadedRoute(SøknadRoutes.DOKUMENTASJON);

    const onSubmit = (formValues: ManglendeVedleggFormData) => {
        if (formValues.vedlegg.length === 0) {
            formMethods.setError('vedlegg', {
                message: 'Det er ingen vedlegg',
            });
        } else {
            actionCreator.lagreDokumentasjon(formValues.vedlegg);
            navigate(SøknadRoutes.UTENLANDSOPPHOLD);
        }
    };

    const formMethods = useForm<ManglendeVedleggFormData>({
        defaultValues: getInitValues(),
    });

    const updateAttachments = (attachments: Attachment[]) => {
        formMethods.setValue('vedlegg', attachments);
        formMethods.clearErrors('vedlegg');
    };

    return (
        <Step
            bannerTitle={intlUtils(intl, 'søknad.pageheading')}
            activeStepId="dokumentasjon"
            pageTitle={intlUtils(intl, 'søknad.manglendeVedlegg')}
            onCancel={onAvbrytSøknad}
            onContinueLater={onFortsettSøknadSenere}
            steps={stepConfig(intl, søknad.erEndringssøknad, state.manglerDokumentasjon)}
        >
            <Form formMethods={formMethods} onSubmit={onSubmit}>
                <Block padBottom="xl">
                    {perioderSomManglerVedlegg.map((p) => {
                        return (
                            <PeriodeAttachmentUploader
                                attachments={[]}
                                updateAttachments={updateAttachments}
                                key={p.id}
                                periode={p}
                            />
                        );
                    })}
                </Block>
                <StepButtonsHookForm<ManglendeVedleggFormData>
                    goToPreviousStep={() => navigate(SøknadRoutes.UTTAKSPLAN)}
                />
            </Form>
        </Step>
    );
};

export default ManglendeVedlegg;
