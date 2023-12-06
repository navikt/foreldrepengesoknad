import { ISOStringToDate, Step, getErSøkerFarEllerMedmor, getNavnPåForeldre, intlUtils } from '@navikt/fp-common';
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
import { ManglendeVedleggFormData } from './manglendeVedleggFormConfig';
import { useNavigate } from 'react-router-dom';
import { Attachment } from '@navikt/fp-types';
import actionCreator from 'app/context/action/actionCreator';
import { getFamiliehendelsedato, getTermindato } from 'app/utils/barnUtils';
import useOnValidSubmit from 'app/utils/hooks/useOnValidSubmit';
import { storeAppState } from 'app/utils/submitUtils';
import { ForeldrepengesøknadContextState } from 'app/context/ForeldrepengesøknadContextConfig';
import FellesperiodeDok from './dokumentasjon/FellesperiodeDok';
import { useState } from 'react';
import {
    GyldigeSkjemanummer,
    isArbeidUtdanningEllerSykdomVedlegg,
    isFellesperiodeAttachment,
    isIntroduksjonsprogramVedlegg,
    isKvalifiseringsprogramVedlegg,
} from './util';
import { Skjemanummer } from '@navikt/fp-constants';

const ManglendeVedlegg: React.FunctionComponent = () => {
    const intl = useIntl();
    const søknad = useSøknad();
    const { state } = useForeldrepengesøknadContext();
    const { uttaksplan, annenForelder, barn, søkersituasjon } = søknad;
    const [fellesperiodeVedlegg, setFellesperiodeVedlegg] = useState<Attachment[]>(
        søknad.vedlegg.filter(isFellesperiodeAttachment),
    );
    const navigate = useNavigate();
    const onAvbrytSøknad = useAvbrytSøknad();
    const onFortsettSøknadSenere = useFortsettSøknadSenere();
    const erFarEllerMedmor = getErSøkerFarEllerMedmor(søknad.søkersituasjon.rolle);
    const perioderSomManglerVedlegg = perioderSomKreverVedlegg(uttaksplan, erFarEllerMedmor, annenForelder);

    const navnPåForeldre = getNavnPåForeldre(state.søkerinfo.person, annenForelder, erFarEllerMedmor, intl);
    const familiehendelsesdato = getFamiliehendelsedato(barn);
    const termindato = getTermindato(barn);

    useSaveLoadedRoute(SøknadRoutes.DOKUMENTASJON);

    const onSubmit = (formValues: ManglendeVedleggFormData) => {
        const alleVedlegg = [
            ...formValues[Skjemanummer.DOK_MORS_UTDANNING_ARBEID_SYKDOM],
            ...formValues[Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM],
            ...formValues[Skjemanummer.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET],
        ];

        return [actionCreator.lagreDokumentasjon(alleVedlegg)];
    };

    const { handleSubmit } = useOnValidSubmit(
        onSubmit,
        SøknadRoutes.UTENLANDSOPPHOLD,
        (state: ForeldrepengesøknadContextState) => storeAppState(state),
    );

    const formMethods = useForm<ManglendeVedleggFormData>({
        defaultValues: {
            [Skjemanummer.DOK_MORS_UTDANNING_ARBEID_SYKDOM]: søknad.vedlegg.filter(isArbeidUtdanningEllerSykdomVedlegg),
            [Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM]:
                søknad.vedlegg.filter(isKvalifiseringsprogramVedlegg),
            [Skjemanummer.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET]:
                søknad.vedlegg.filter(isIntroduksjonsprogramVedlegg),
        },
    });

    const updateAttachments = (skjemanummer: GyldigeSkjemanummer) => (attachments: Attachment[]) => {
        formMethods.setValue(skjemanummer, attachments);
        formMethods.clearErrors(skjemanummer);
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
            <Form formMethods={formMethods} onSubmit={handleSubmit}>
                <FellesperiodeDok
                    attachments={fellesperiodeVedlegg}
                    familiehendelsesdato={ISOStringToDate(familiehendelsesdato)!}
                    navnPåForeldre={navnPåForeldre}
                    perioder={perioderSomManglerVedlegg}
                    situasjon={søkersituasjon.situasjon}
                    termindato={termindato}
                    updateAttachments={updateAttachments}
                    setFellesperiodeVedlegg={setFellesperiodeVedlegg}
                />
                <StepButtonsHookForm<ManglendeVedleggFormData>
                    goToPreviousStep={() => navigate(SøknadRoutes.UTTAKSPLAN)}
                />
            </Form>
        </Step>
    );
};

export default ManglendeVedlegg;
