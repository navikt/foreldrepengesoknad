import { useState } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { Alert, BodyShort, Button, GuidePanel, Heading } from '@navikt/ds-react';
import { bemUtils, Block, intlUtils, LanguageToggle, links, Sak, Søkerinfo } from '@navikt/fp-common';
import { LocaleNo } from '@navikt/fp-types';
import {
    getInitialVelkommenValues,
    VelkommenFormComponents,
    VelkommenFormData,
    VelkommenFormField,
    velkommenFormQuestions,
    VelkommenQuestionsPayload,
} from './velkommenFormConfig';
import { ContextDataType, useContextSaveAnyData } from 'app/context/FpDataContext';
import DinePlikter from 'app/components/dine-plikter/DinePlikter';
import DinePersonopplysningerModal from '../modaler/DinePersonopplysningerModal';
import { validateHarForståttRettigheterOgPlikter } from './validation/velkommenValidation';
import SøknadRoutes from 'app/routes/routes';
import {
    mapSøkerensEksisterendeSakFromDTO,
    opprettSøknadFraEksisterendeSak,
    opprettSøknadFraValgteBarn,
    opprettSøknadFraValgteBarnMedSak,
} from 'app/utils/eksisterendeSakUtils';
import { useSetSøknadsdata } from 'app/context/useSetSøknadsdata';
import { Søknad } from 'app/context/types/Søknad';
import BarnVelger, { SelectableBarnOptions } from './components/barnVelger/BarnVelger';
import { getBarnFraNesteSak, getSelectableBarnOptions, sorterSelectableBarnEtterYngst } from './velkommenUtils';

import './velkommen.less';
import useFpNavigator from 'app/appData/useFpNavigator';

export interface Props {
    fornavn: string;
    onChangeLocale: (locale: LocaleNo) => void;
    locale: LocaleNo;
    saker: Sak[];
    fnr: string;
    harGodkjentVilkår: boolean;
    søkerInfo: Søkerinfo;
    setHarGodkjentVilkår: (harGodkjentVilkår: boolean) => void;
    setErEndringssøknad: (erEndringssøknad: boolean) => void;
    setSøknadGjelderNyttBarn: (søknadGjelderNyttBarn: boolean) => void;
    mellomlagreSøknadOgNaviger: () => Promise<void>;
}

const Velkommen: React.FunctionComponent<Props> = ({
    locale,
    saker,
    onChangeLocale,
    harGodkjentVilkår,
    søkerInfo,
    setHarGodkjentVilkår,
    setErEndringssøknad,
    setSøknadGjelderNyttBarn,
    mellomlagreSøknadOgNaviger,
}) => {
    const bem = bemUtils('velkommen');
    const intl = useIntl();
    const navigator = useFpNavigator(mellomlagreSøknadOgNaviger);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const oppdaterDataIState = useContextSaveAnyData();
    const { oppdaterSøknadIState } = useSetSøknadsdata();

    const [isDinePersonopplysningerModalOpen, setDinePersonopplysningerModalOpen] = useState(false);
    const selectableBarn = getSelectableBarnOptions(saker, søkerInfo.registrerteBarn);
    const sortedSelectableBarn = [...selectableBarn].sort(sorterSelectableBarnEtterYngst);

    const onSubmit = (values: Partial<VelkommenFormData>) => {
        if (values.harForståttRettigheterOgPlikter !== true) {
            return;
        }
        setIsSubmitting(true);

        const valgteBarn =
            values.valgteBarn === SelectableBarnOptions.SØKNAD_GJELDER_NYTT_BARN
                ? undefined
                : selectableBarn.find((sb) => sb.id === values.valgteBarn);
        const vilSøkeOmEndring = valgteBarn !== undefined && !!valgteBarn.kanSøkeOmEndring;

        let barnFraNesteSak = undefined;
        if (valgteBarn !== undefined) {
            barnFraNesteSak = getBarnFraNesteSak(valgteBarn, sortedSelectableBarn);
            oppdaterDataIState(ContextDataType.BARN_FRA_NESTE_SAK, barnFraNesteSak);
        }

        const valgtEksisterendeSak =
            vilSøkeOmEndring && valgteBarn.sak !== undefined
                ? saker.find((sak) => sak.saksnummer === valgteBarn.sak?.saksnummer)
                : undefined;

        const førsteUttaksdagNesteBarnsSak =
            barnFraNesteSak !== undefined ? barnFraNesteSak.startdatoFørsteStønadsperiode : undefined;

        const endringssøknad = vilSøkeOmEndring && valgtEksisterendeSak;
        const nySøknadPåAlleredeSøktBarn =
            valgteBarn !== undefined && valgteBarn.sak !== undefined && valgteBarn.kanSøkeOmEndring === false;
        const nySøknadPåValgteRegistrerteBarn =
            !endringssøknad && !nySøknadPåAlleredeSøktBarn && valgteBarn !== undefined;

        let nextRoute = SøknadRoutes.SØKERSITUASJON;
        let søknadGjelderNyttBarn = false;

        if (endringssøknad) {
            const eksisterendeSak = mapSøkerensEksisterendeSakFromDTO(
                valgtEksisterendeSak,
                førsteUttaksdagNesteBarnsSak,
            );

            nextRoute = SøknadRoutes.UTTAKSPLAN;

            const søknad = opprettSøknadFraEksisterendeSak(
                søkerInfo,
                eksisterendeSak!,
                intl,
                valgtEksisterendeSak.annenPart,
                valgteBarn,
            ) as Søknad;
            oppdaterSøknadIState(søknad, eksisterendeSak);
        } else if (nySøknadPåAlleredeSøktBarn) {
            const søknad = opprettSøknadFraValgteBarnMedSak(valgteBarn, intl, søkerInfo) as Søknad;
            oppdaterSøknadIState(søknad);
        } else if (nySøknadPåValgteRegistrerteBarn) {
            const søknad = opprettSøknadFraValgteBarn(valgteBarn) as Søknad;
            oppdaterSøknadIState(søknad);
        } else {
            søknadGjelderNyttBarn = true;
        }

        setHarGodkjentVilkår(values.harForståttRettigheterOgPlikter!);
        setErEndringssøknad(vilSøkeOmEndring);
        setSøknadGjelderNyttBarn(søknadGjelderNyttBarn);

        navigator.goToNextStep(nextRoute);
    };

    return (
        <VelkommenFormComponents.FormikWrapper
            initialValues={getInitialVelkommenValues(harGodkjentVilkår)}
            onSubmit={onSubmit}
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
                        <LanguageToggle locale={locale} availableLocales={['nb', 'nn']} toggle={onChangeLocale} />
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
