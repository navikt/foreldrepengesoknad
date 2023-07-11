import { Step, intlUtils } from '@navikt/fp-common';
import stepConfig from '../stepsConfig';
import { useIntl } from 'react-intl';
import useOnValidSubmit from 'app/utils/hooks/useOnValidSubmit';
import SøknadRoutes from 'app/routes/routes';
import actionCreator from 'app/context/action/actionCreator';

const Utenlandsopphold = () => {
    const intl = useIntl();
    // const onValidSubmitHandler = (values: Partial<InntektsinformasjonFormData>) => {
    //     const updatedSøker = mapInntektsinformasjonFormDataToState(
    //         values,
    //         andreInntekterInformasjon,
    //         frilansoppdrag,
    //         egenNæringInformasjon
    //     );

    //     return [actionCreator.setSøker(updatedSøker)];
    // };
    const onValidSubmitHandler = (values: any) => {
        console.log('submit: ', values);
        return [actionCreator.setHarGodkjentVilkår(true)]; //TODO
    };

    const { handleSubmit, isSubmitting } = useOnValidSubmit(onValidSubmitHandler, SøknadRoutes.UTENLANDSOPPHOLD);
    console.log(handleSubmit, isSubmitting);
    return (
        <Step
            bannerTitle={intlUtils(intl, 'søknad.pageheading')}
            activeStepId="utenlandsopphold"
            pageTitle={intlUtils(intl, 'steps.label.utenlandsopphold')}
            // onCancel={onAvbrytSøknad}
            // onContinueLater={onFortsettSøknadSenere}
            steps={stepConfig(intl)}
        >
            <p>Utenlandsopphold</p>
        </Step>
    );
};

export default Utenlandsopphold;
