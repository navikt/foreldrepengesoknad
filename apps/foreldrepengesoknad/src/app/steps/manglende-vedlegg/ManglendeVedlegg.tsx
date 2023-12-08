import { ISOStringToDate, Step, getErSøkerFarEllerMedmor, getNavnPåForeldre, intlUtils } from '@navikt/fp-common';
import { Form, StepButtonsHookForm } from '@navikt/fp-form-hooks';
import SøknadRoutes from 'app/routes/routes';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';
import stepConfig from '../stepsConfig';
import useFortsettSøknadSenere from 'app/utils/hooks/useFortsettSøknadSenere';
import { perioderSomKreverVedlegg } from '@navikt/uttaksplan';
import { ManglendeVedleggFormData } from './manglendeVedleggFormConfig';
import { useNavigate } from 'react-router-dom';
import { Attachment } from '@navikt/fp-types';
import { getFamiliehendelsedato, getTermindato } from 'app/utils/barnUtils';
import FellesperiodeDok from './dokumentasjon/FellesperiodeDok';
import {
    GyldigeSkjemanummer,
    isArbeidUtdanningEllerSykdomVedlegg,
    isFedrekvoteMorForSykVedlegg,
    isFellesperiodeAttachment,
    isIntroduksjonsprogramVedlegg,
    isKvalifiseringsprogramVedlegg,
    isOverføringsVedlegg,
} from './util';
import { Skjemanummer } from '@navikt/fp-constants';
import OverføringsDok from './dokumentasjon/OverføringDok';
import { ContextDataType, useContextGetData, useContextSaveData } from 'app/context/FpDataContext';
import { notEmpty } from '@navikt/fp-validation';
import Person from '@navikt/fp-common/src/common/types/Person';
import FedrekvoteMorForSykDok from './dokumentasjon/FedrekvoteMorForSykDok';
import UtsettelseDok from './dokumentasjon/UtsettelseDok';

type Props = {
    person: Person;
    erEndringssøknad: boolean;
    mellomlagreSøknadOgNaviger: () => Promise<void>;
    avbrytSøknad: () => void;
};

const ManglendeVedlegg: React.FunctionComponent<Props> = ({
    mellomlagreSøknadOgNaviger,
    avbrytSøknad,
    person,
    erEndringssøknad,
}) => {
    const intl = useIntl();
    const uttaksplan = notEmpty(useContextGetData(ContextDataType.UTTAKSPLAN));
    const annenForelder = notEmpty(useContextGetData(ContextDataType.ANNEN_FORELDER));
    const barn = notEmpty(useContextGetData(ContextDataType.OM_BARNET));
    const søkersituasjon = notEmpty(useContextGetData(ContextDataType.SØKERSITUASJON));
    const vedlegg = useContextGetData(ContextDataType.VEDLEGG) || [];
    const manglerDokumentasjon = useContextGetData(ContextDataType.MANGLER_DOKUMENTASJON);
    const saveVedlegg = useContextSaveData(ContextDataType.VEDLEGG);
    const saveNextRoute = useContextSaveData(ContextDataType.APP_ROUTE);
    const navigate = useNavigate();
    const onFortsettSøknadSenere = useFortsettSøknadSenere();
    const erFarEllerMedmor = getErSøkerFarEllerMedmor(søkersituasjon.rolle);
    const perioderSomManglerVedlegg = perioderSomKreverVedlegg(uttaksplan, erFarEllerMedmor, annenForelder);
    const fellesperiodeVedlegg = vedlegg.filter(isFellesperiodeAttachment);
    const overføringsVedlegg = vedlegg.filter(isOverføringsVedlegg);
    const fedrekvoteMorForSykVedlegg = vedlegg.filter(isFedrekvoteMorForSykVedlegg);

    const navnPåForeldre = getNavnPåForeldre(person, annenForelder, erFarEllerMedmor, intl);
    const familiehendelsesdato = getFamiliehendelsedato(barn);
    const termindato = getTermindato(barn);

    const lagre = (formValues: ManglendeVedleggFormData) => {
        const alleVedlegg = [
            ...formValues[Skjemanummer.DOK_MORS_UTDANNING_ARBEID_SYKDOM],
            ...formValues[Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM],
            ...formValues[Skjemanummer.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET],
            ...formValues[Skjemanummer.DOK_OVERFØRING_FOR_SYK],
            ...formValues[Skjemanummer.DOK_INNLEGGELSE],
        ];

        saveVedlegg(alleVedlegg);
        saveNextRoute(SøknadRoutes.UTENLANDSOPPHOLD);

        return mellomlagreSøknadOgNaviger();
    };

    const formMethods = useForm<ManglendeVedleggFormData>({
        defaultValues: {
            [Skjemanummer.DOK_MORS_UTDANNING_ARBEID_SYKDOM]: vedlegg.filter(isArbeidUtdanningEllerSykdomVedlegg),
            [Skjemanummer.BEKREFTELSE_DELTAR_KVALIFISERINGSPROGRAM]: vedlegg.filter(isKvalifiseringsprogramVedlegg),
            [Skjemanummer.DOK_DELTAKELSE_I_INTRODUKSJONSPROGRAMMET]: vedlegg.filter(isIntroduksjonsprogramVedlegg),
            [Skjemanummer.DOK_OVERFØRING_FOR_SYK]: vedlegg.filter(isOverføringsVedlegg),
            [Skjemanummer.DOK_INNLEGGELSE]: vedlegg.filter(isFedrekvoteMorForSykVedlegg),
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
            onCancel={avbrytSøknad}
            onContinueLater={onFortsettSøknadSenere}
            steps={stepConfig(intl, erEndringssøknad, manglerDokumentasjon)}
        >
            <Form formMethods={formMethods} onSubmit={lagre}>
                <FellesperiodeDok
                    attachments={fellesperiodeVedlegg}
                    familiehendelsesdato={ISOStringToDate(familiehendelsesdato)!}
                    navnPåForeldre={navnPåForeldre}
                    perioder={perioderSomManglerVedlegg}
                    situasjon={søkersituasjon.situasjon}
                    termindato={termindato}
                    updateAttachments={updateAttachments}
                />
                <OverføringsDok
                    attachments={overføringsVedlegg}
                    familiehendelsesdato={ISOStringToDate(familiehendelsesdato)!}
                    navnPåForeldre={navnPåForeldre}
                    perioder={perioderSomManglerVedlegg}
                    situasjon={søkersituasjon.situasjon}
                    termindato={termindato}
                    updateAttachments={updateAttachments}
                />
                <FedrekvoteMorForSykDok
                    attachments={fedrekvoteMorForSykVedlegg}
                    familiehendelsesdato={ISOStringToDate(familiehendelsesdato)!}
                    navnPåForeldre={navnPåForeldre}
                    perioder={perioderSomManglerVedlegg}
                    situasjon={søkersituasjon.situasjon}
                    termindato={termindato}
                    updateAttachments={updateAttachments}
                />
                <UtsettelseDok
                    attachments={fedrekvoteMorForSykVedlegg}
                    familiehendelsesdato={ISOStringToDate(familiehendelsesdato)!}
                    navnPåForeldre={navnPåForeldre}
                    perioder={perioderSomManglerVedlegg}
                    situasjon={søkersituasjon.situasjon}
                    termindato={termindato}
                    updateAttachments={updateAttachments}
                />
                <StepButtonsHookForm<ManglendeVedleggFormData>
                    goToPreviousStep={() => navigate(SøknadRoutes.UTTAKSPLAN)}
                />
            </Form>
        </Step>
    );
};

export default ManglendeVedlegg;
