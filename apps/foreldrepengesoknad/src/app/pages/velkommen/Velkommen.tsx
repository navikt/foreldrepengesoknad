import { bemUtils, Block, intlUtils, LanguageToggle, Locale } from '@navikt/fp-common';
import actionCreator, { ForeldrepengesøknadContextAction } from 'app/context/action/actionCreator';
import { useEffect, useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import useOnValidSubmit from 'app/utils/hooks/useOnValidSubmit';
import useSøknad from 'app/utils/hooks/useSøknad';
import {
    getInitialVelkommenValues,
    VelkommenFormComponents,
    VelkommenFormData,
    VelkommenFormField,
    velkommenFormQuestions,
    VelkommenQuestionsPayload,
} from './velkommenFormConfig';
import DinePlikter from 'app/components/dine-plikter/DinePlikter';
import DinePersonopplysningerModal from '../modaler/DinePersonopplysningerModal';
import { validateHarForståttRettigheterOgPlikter } from './validation/velkommenValidation';
import SøknadRoutes from 'app/routes/routes';
import { storeAppState } from 'app/utils/submitUtils';
import { ForeldrepengesøknadContextState } from 'app/context/ForeldrepengesøknadContextConfig';
import {
    mapSøkerensEksisterendeSakFromDTO,
    opprettSøknadFraEksisterendeSak,
    opprettSøknadFraValgteBarn,
    opprettSøknadFraValgteBarnMedSak,
} from 'app/utils/eksisterendeSakUtils';
import { useForeldrepengesøknadContext } from 'app/context/hooks/useForeldrepengesøknadContext';
import { Søknad } from 'app/context/types/Søknad';

import BarnVelger, { SelectableBarnOptions } from './components/barnVelger/BarnVelger';
import { getBarnFraNesteSak, getSelectableBarnOptions, sorterSelectableBarnEtterYngst } from './velkommenUtils';
import useSøkerinfo from 'app/utils/hooks/useSøkerinfo';
import { Sak } from 'app/types/Sak';
import { Alert, BodyShort, Button, GuidePanel, Heading } from '@navikt/ds-react';

import './velkommen.less';
import links from 'app/links/links';

interface Props {
    fornavn: string;
    onChangeLocale: (locale: Locale) => void;
    locale: Locale;
    saker: Sak[];
    fnr: string;
}

const Velkommen: React.FunctionComponent<Props> = ({ locale, saker, onChangeLocale }) => {
    const intl = useIntl();
    const søknad = useSøknad();
    const { dispatch, state } = useForeldrepengesøknadContext();
    const [isDinePersonopplysningerModalOpen, setDinePersonopplysningerModalOpen] = useState(false);
    const bem = bemUtils('velkommen');
    const søkerinfo = useSøkerinfo();
    const { registrerteBarn } = søkerinfo;
    const selectableBarn = getSelectableBarnOptions(saker, registrerteBarn);
    const sortedSelectableBarn = [...selectableBarn].sort(sorterSelectableBarnEtterYngst);

    useEffect(() => {
        if (state.søknad.søker.språkkode !== locale) {
            dispatch(actionCreator.setSpråkkode(locale));
        }
    }, [dispatch, locale, state.søknad.søker.språkkode]);

    const onValidSubmitHandler = (values: Partial<VelkommenFormData>) => {
        const valgteBarn =
            values.valgteBarn === SelectableBarnOptions.SØKNAD_GJELDER_NYTT_BARN
                ? undefined
                : selectableBarn.find((sb) => sb.id === values.valgteBarn);
        const vilSøkeOmEndring = valgteBarn !== undefined && !!valgteBarn.kanSøkeOmEndring;
        const valgtEksisterendeSak =
            vilSøkeOmEndring && valgteBarn.sak !== undefined
                ? saker.find((sak) => sak.saksnummer === valgteBarn.sak?.saksnummer)
                : undefined;

        const actionsToDispatch: ForeldrepengesøknadContextAction[] = [
            actionCreator.setVelkommen(values.harForståttRettigheterOgPlikter!),
            actionCreator.setErEndringssøknad(vilSøkeOmEndring),
        ];
        let barnFraNesteSak = undefined;
        if (valgteBarn !== undefined) {
            barnFraNesteSak = getBarnFraNesteSak(valgteBarn, sortedSelectableBarn);
            actionsToDispatch.push(actionCreator.setBarnFraNesteSak(barnFraNesteSak));
        }
        const førsteUttaksdagNesteBarnsSak =
            barnFraNesteSak !== undefined ? barnFraNesteSak.startdatoFørsteStønadsperiode : undefined;

        const endringssøknad = vilSøkeOmEndring && valgtEksisterendeSak;
        const nySøknadPåAlleredeSøktBarn =
            valgteBarn !== undefined && valgteBarn.sak !== undefined && valgteBarn.kanSøkeOmEndring === false;
        const nySøknadPåValgteRegistrerteBarn =
            !endringssøknad && !nySøknadPåAlleredeSøktBarn && valgteBarn !== undefined;

        if (endringssøknad) {
            const eksisterendeSak = mapSøkerensEksisterendeSakFromDTO(
                valgtEksisterendeSak,
                førsteUttaksdagNesteBarnsSak,
            );

            const søknad = opprettSøknadFraEksisterendeSak(
                state.søkerinfo,
                eksisterendeSak!,
                intl,
                valgtEksisterendeSak.annenPart,
                valgteBarn,
            ) as Søknad;

            actionsToDispatch.push(actionCreator.updateCurrentRoute(SøknadRoutes.UTTAKSPLAN));
            actionsToDispatch.push(actionCreator.setSøknad(søknad));
            actionsToDispatch.push(actionCreator.setEksisterendeSak(eksisterendeSak));
            actionsToDispatch.push(
                actionCreator.setBrukerSvarteJaPåAutoJustering(eksisterendeSak?.grunnlag.ønskerJustertUttakVedFødsel),
            );
            actionsToDispatch.push(actionCreator.setSøknadGjelderEtNyttBarn(false));
        } else if (nySøknadPåAlleredeSøktBarn) {
            const søknad = opprettSøknadFraValgteBarnMedSak(valgteBarn, intl, søkerinfo) as Søknad;
            actionsToDispatch.push(actionCreator.setSøknad(søknad));
            actionsToDispatch.push(actionCreator.setSøknadGjelderEtNyttBarn(false));
        } else if (nySøknadPåValgteRegistrerteBarn) {
            const søknad = opprettSøknadFraValgteBarn(valgteBarn) as Søknad;
            actionsToDispatch.push(actionCreator.setSøknad(søknad));
            actionsToDispatch.push(actionCreator.setSøknadGjelderEtNyttBarn(false));
        } else {
            actionsToDispatch.push(actionCreator.setSøknadGjelderEtNyttBarn(true));
        }

        return actionsToDispatch;
    };

    const { handleSubmit, isSubmitting } = useOnValidSubmit(
        onValidSubmitHandler,
        SøknadRoutes.SØKERSITUASJON,
        (state: ForeldrepengesøknadContextState) => storeAppState(state),
    );

    return (
        <VelkommenFormComponents.FormikWrapper
            initialValues={getInitialVelkommenValues(søknad.harGodkjentVilkår)}
            onSubmit={handleSubmit}
            renderForm={({ values, setFieldValue }) => {
                const visibility = velkommenFormQuestions.getVisbility({
                    ...values,
                    selectableBarn,
                } as VelkommenQuestionsPayload);
                const valgtBarnId = values.valgteBarn;
                const valgtBarn =
                    valgtBarnId === SelectableBarnOptions.SØKNAD_GJELDER_NYTT_BARN
                        ? undefined
                        : selectableBarn.find((barn) => barn.id === valgtBarnId);
                const knapptekst =
                    valgtBarn !== undefined && valgtBarn.kanSøkeOmEndring === true
                        ? intlUtils(intl, 'velkommen.endreSøknad')
                        : intlUtils(intl, 'velkommen.begynnMedSøknad');
                return (
                    <VelkommenFormComponents.Form includeButtons={false}>
                        <LanguageToggle
                            locale={locale}
                            availableLocales={['nb', 'nn']}
                            toggle={(l: Locale) => onChangeLocale(l)}
                        />
                        <div className={bem.block}>
                            <Block>
                                <Heading size="xlarge" className={`${bem.element('tittel')}`}>
                                    {intlUtils(intl, 'velkommen.tittel')}
                                </Heading>
                            </Block>
                            <Block padBottom="l">
                                <GuidePanel poster>
                                    <Block padBottom="m">{intlUtils(intl, 'velkommen.guidepanel.del1')}</Block>{' '}
                                    <Block>
                                        <FormattedMessage
                                            id="velkommen.guidepanel.del2"
                                            values={{
                                                a: (msg: any) => (
                                                    <a
                                                        className="lenke"
                                                        rel="noopener noreferrer"
                                                        href={links.foreldrepenger}
                                                        target="_blank"
                                                    >
                                                        {msg}
                                                    </a>
                                                ),
                                            }}
                                        />
                                    </Block>
                                </GuidePanel>
                            </Block>
                            <Block padBottom="l" visible={visibility.isVisible(VelkommenFormField.valgteBarn)}>
                                <BarnVelger
                                    selectableBarn={sortedSelectableBarn}
                                    visibility={visibility}
                                    formValues={values as VelkommenFormData}
                                    setFieldValue={setFieldValue}
                                />
                            </Block>
                            <Block
                                padBottom="l"
                                visible={visibility.isVisible(VelkommenFormField.harForståttRettigheterOgPlikter)}
                            >
                                <Alert variant="info">{intlUtils(intl, 'velkommen.lagring.info')}</Alert>
                            </Block>
                            <Block
                                padBottom="l"
                                visible={visibility.isVisible(VelkommenFormField.harForståttRettigheterOgPlikter)}
                            >
                                <VelkommenFormComponents.ConfirmationCheckbox
                                    name={VelkommenFormField.harForståttRettigheterOgPlikter}
                                    label={intlUtils(intl, 'velkommen.samtykke')}
                                    validate={validateHarForståttRettigheterOgPlikter(intl)}
                                >
                                    <>
                                        <Block padBottom="l">
                                            <FormattedMessage id="velkommen.samtykkeIntro.del1" />
                                        </Block>
                                        <Block padBottom="m">
                                            <DinePlikter />
                                        </Block>
                                    </>
                                </VelkommenFormComponents.ConfirmationCheckbox>
                            </Block>
                            <Block padBottom="l">
                                <div style={{ textAlign: 'center' }}>
                                    <Button
                                        type="submit"
                                        variant="primary"
                                        disabled={isSubmitting}
                                        loading={isSubmitting}
                                    >
                                        {knapptekst}
                                    </Button>
                                </div>
                            </Block>
                            <BodyShort className={bem.element('personopplysningerLink')}>
                                <a
                                    className="lenke"
                                    href="#"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setDinePersonopplysningerModalOpen(true);
                                    }}
                                >
                                    <FormattedMessage id="velkommen.lesMerOmPersonopplysninger" />
                                </a>
                            </BodyShort>
                            <DinePersonopplysningerModal
                                isOpen={isDinePersonopplysningerModalOpen}
                                onRequestClose={() => setDinePersonopplysningerModalOpen(false)}
                            />
                        </div>
                    </VelkommenFormComponents.Form>
                );
            }}
        />
    );
};

export default Velkommen;
