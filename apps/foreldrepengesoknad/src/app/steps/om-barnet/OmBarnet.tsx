import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import { useIntl } from 'react-intl';

import {
    Block,
    ISOStringToDate,
    RegistrertBarn,
    Situasjon,
    Step,
    Søkerinfo,
    Søkerrolle,
    andreAugust2022ReglerGjelder,
    isFarEllerMedmor,
    isFødtBarn,
    isUfødtBarn,
} from '@navikt/fp-common';
import { ErrorSummaryHookForm, Form, StepButtonsHookForm } from '@navikt/fp-form-hooks';
import { notEmpty } from '@navikt/fp-validation';

import useFpNavigator from 'app/appData/useFpNavigator';
import useStepConfig from 'app/appData/useStepConfig';
import { ContextDataType, useContextGetData, useContextSaveData } from 'app/context/FpDataContext';
import { getErDatoInnenEnDagFraAnnenDato } from 'app/pages/velkommen/velkommenUtils';
import { getFamiliehendelsedato } from 'app/utils/barnUtils';
import { getEldsteRegistrerteBarn } from 'app/utils/dateUtils';

import { OmBarnetFormValues } from './components/OmBarnetFormValues';
import ValgteRegistrerteBarn from './components/ValgteRegistrerteBarn';
import AdopsjonPanel from './new/AdopsjonPanel';
import FødselPanel from './new/FødselPanel';
import { getOmBarnetInitialValues, mapOmBarnetFormDataToState } from './omBarnetUtils';

const erDatoInnenforDeSiste12Ukene = (dato: Date) => {
    const twelveWeeksAfterBirthday = dayjs(dato).add(12, 'weeks');
    return dayjs(twelveWeeksAfterBirthday).isAfter(new Date(), 'day');
};

const includeTermindato = (
    rolle: Søkerrolle,
    fødselsdato: string | undefined,
    valgteRegistrerteBarn: RegistrertBarn[] | undefined,
    situasjon: Situasjon,
): boolean => {
    if (situasjon === 'adopsjon') {
        return false;
    }

    let eldsteBarnFødselsdato = undefined;

    if (valgteRegistrerteBarn !== undefined && valgteRegistrerteBarn.length > 0) {
        const eldsteBarn = getEldsteRegistrerteBarn(valgteRegistrerteBarn);

        eldsteBarnFødselsdato = eldsteBarn.fødselsdato;
    }

    if (!fødselsdato && !eldsteBarnFødselsdato) {
        return false;
    }

    const relevantFødselsdato = eldsteBarnFødselsdato || ISOStringToDate(fødselsdato);

    if (isFarEllerMedmor(rolle)) {
        if (andreAugust2022ReglerGjelder(relevantFødselsdato!)) {
            return true;
        }
        return erDatoInnenforDeSiste12Ukene(relevantFødselsdato!);
    }
    return true;
};

type Props = {
    søkerInfo: Søkerinfo;
    søknadGjelderNyttBarn: boolean;
    mellomlagreSøknadOgNaviger: () => Promise<void>;
    avbrytSøknad: () => void;
};

const OmBarnet: React.FunctionComponent<Props> = ({
    søkerInfo,
    søknadGjelderNyttBarn,
    mellomlagreSøknadOgNaviger,
    avbrytSøknad,
}) => {
    const intl = useIntl();

    const stepConfig = useStepConfig();
    const navigator = useFpNavigator(mellomlagreSøknadOgNaviger);

    const søkersituasjon = notEmpty(useContextGetData(ContextDataType.SØKERSITUASJON));
    const omBarnet = useContextGetData(ContextDataType.OM_BARNET);

    const oppdaterOmBarnet = useContextSaveData(ContextDataType.OM_BARNET);

    const { arbeidsforhold, søker } = søkerInfo;

    const erFarEllerMedmor = isFarEllerMedmor(søkersituasjon.rolle);
    const findBarnetIRegistrerteBarn = (regBarn: SøkerBarn) => {
        if (omBarnet && !isUfødtBarn(omBarnet) && omBarnet.fnr !== undefined && omBarnet.fnr.length > 0) {
            return omBarnet.fnr.includes(regBarn.fnr);
        }
        return false;
    };

    const familiehendelsesdato = omBarnet ? ISOStringToDate(getFamiliehendelsedato(omBarnet)) : undefined;

    const dødfødteUtenFnrMedSammeFødselsdato =
        omBarnet && isFødtBarn(omBarnet)
            ? søker.barn.filter(
                  (barn) =>
                      barn.fnr === undefined && getErDatoInnenEnDagFraAnnenDato(barn.fødselsdato, familiehendelsesdato),
              )
            : [];

    const valgteRegistrerteBarn =
        !søknadGjelderNyttBarn && omBarnet && !isUfødtBarn(omBarnet)
            ? søker.barn.filter((b) => findBarnetIRegistrerteBarn(b)).concat(dødfødteUtenFnrMedSammeFødselsdato)
            : undefined;
    const barnSøktOmFørMenIkkeRegistrert =
        !søknadGjelderNyttBarn && (valgteRegistrerteBarn === undefined || valgteRegistrerteBarn.length === 0);

    const onSubmit = (values: OmBarnetFormValues) => {
        const valgtBarn = !søknadGjelderNyttBarn && !barnSøktOmFørMenIkkeRegistrert ? omBarnet : undefined;

        const oppdatertBarn = mapOmBarnetFormDataToState(
            values,
            arbeidsforhold,
            valgtBarn,
            søkersituasjon.situasjon,
            barnSøktOmFørMenIkkeRegistrert,
        );

        oppdaterOmBarnet(oppdatertBarn);

        return navigator.goToNextDefaultStep();
    };

    const formMethods = useForm<OmBarnetFormValues>({
        shouldUnregister: true,
        defaultValues: getOmBarnetInitialValues(arbeidsforhold, omBarnet),
    });

    const fødselsdatoer = formMethods.watch('fødselsdatoer');
    const skalInkludereTermindato = includeTermindato(
        søkersituasjon.rolle,
        fødselsdatoer ? fødselsdatoer[0].dato : undefined,
        valgteRegistrerteBarn,
        søkersituasjon.situasjon,
    );

    // const farMedmorSøkerPåTerminFørWLB =
    //     erFarEllerMedmor &&
    //     convertYesOrNoOrUndefinedToBoolean(formValues.erBarnetFødt) === false &&
    //     hasValue(formValues.termindato) &&
    //     !andreAugust2022ReglerGjelder(ISOStringToDate(formValues.termindato)!);

    // const visGåVidereKnapp = visibility.areAllQuestionsAnswered() && !farMedmorSøkerPåTerminFørWLB;

    //cleanup={(values) => cleanupOmBarnetFormData(values, visibility)}

    return (
        <Step
            bannerTitle={intl.formatMessage({ id: 'søknad.pageheading' })}
            onCancel={avbrytSøknad}
            onContinueLater={navigator.fortsettSøknadSenere}
            steps={stepConfig}
        >
            <Form formMethods={formMethods} onSubmit={onSubmit}>
                <ErrorSummaryHookForm />
                {valgteRegistrerteBarn && valgteRegistrerteBarn.length > 0 && (
                    <ValgteRegistrerteBarn
                        valgteRegistrerteBarn={valgteRegistrerteBarn}
                        skalInkludereTermindato={skalInkludereTermindato}
                    />
                )}
                {søkersituasjon.situasjon === 'fødsel' && (
                    <FødselPanel
                        erFarEllerMedmor={erFarEllerMedmor}
                        søknadGjelderEtNyttBarn={barnSøktOmFørMenIkkeRegistrert || søknadGjelderNyttBarn}
                        søkersituasjon={søkersituasjon}
                        valgteRegistrerteBarn={valgteRegistrerteBarn}
                        barnSøktOmFørMenIkkeRegistrert={barnSøktOmFørMenIkkeRegistrert}
                        arbeidsforhold={arbeidsforhold}
                        skalInkludereTermindato={skalInkludereTermindato}
                    />
                )}
                {søkersituasjon.situasjon === 'adopsjon' && (
                    <AdopsjonPanel søknadGjelderEtNyttBarn={barnSøktOmFørMenIkkeRegistrert || søknadGjelderNyttBarn} />
                )}
                <Block margin="l">
                    <StepButtonsHookForm goToPreviousStep={navigator.goToPreviousDefaultStep} />
                </Block>
            </Form>
        </Step>
    );
};

export default OmBarnet;
