import { Alert, BodyShort, Button, GuidePanel, HStack, Heading, VStack } from '@navikt/ds-react';
import { LanguageToggle, Sak, links } from '@navikt/fp-common';
import { ConfirmationPanel, Form } from '@navikt/fp-form-hooks';
import { LocaleNo, Søker } from '@navikt/fp-types';
import { ContentWrapper } from '@navikt/fp-ui';
import useFpNavigator from 'app/appData/useFpNavigator';
import DinePlikter from 'app/components/dine-plikter/DinePlikter';
import { ContextDataType, useContextSaveAnyData } from 'app/context/FpDataContext';
import { Søknad } from 'app/context/types/Søknad';
import { useSetSøknadsdata } from 'app/context/useSetSøknadsdata';
import SøknadRoutes from 'app/routes/routes';
import {
    mapSøkerensEksisterendeSakFromDTO,
    opprettSøknadFraEksisterendeSak,
    opprettSøknadFraValgteBarn,
    opprettSøknadFraValgteBarnMedSak,
} from 'app/utils/eksisterendeSakUtils';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import DinePersonopplysningerModal from '../modaler/DinePersonopplysningerModal';
import BarnVelger, { SelectableBarnOptions } from './BarnVelger';
import { getBarnFraNesteSak, getSelectableBarnOptions, sorterSelectableBarnEtterYngst } from './velkommenUtils';

type VelkommenFormData = {
    harForståttRettigheterOgPlikter: boolean;
    valgteBarn: string | undefined;
};

export interface Props {
    fornavn: string;
    onChangeLocale: (locale: LocaleNo) => void;
    locale: LocaleNo;
    saker: Sak[];
    fnr: string;
    harGodkjentVilkår: boolean;
    søker: Søker;
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
    søker,
    setHarGodkjentVilkår,
    setErEndringssøknad,
    setSøknadGjelderNyttBarn,
    mellomlagreSøknadOgNaviger,
}) => {
    const intl = useIntl();
    const navigator = useFpNavigator(mellomlagreSøknadOgNaviger);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const oppdaterDataIState = useContextSaveAnyData();
    const { oppdaterSøknadIState } = useSetSøknadsdata();

    const [isDinePersonopplysningerModalOpen, setDinePersonopplysningerModalOpen] = useState(false);

    // Denne må memoriserast, ellers får barna ulik id for kvar render => trøbbel
    const selectableBarn = useMemo(() => getSelectableBarnOptions(saker, søker.barn), [saker, søker.barn]);
    const sortedSelectableBarn = [...selectableBarn].sort(sorterSelectableBarnEtterYngst);

    const onSubmit = (values: VelkommenFormData) => {
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
                søker,
                eksisterendeSak!,
                intl,
                valgtEksisterendeSak.annenPart,
                valgteBarn,
            ) as Søknad;
            oppdaterSøknadIState(søknad, eksisterendeSak);
        } else if (nySøknadPåAlleredeSøktBarn) {
            const søknad = opprettSøknadFraValgteBarnMedSak(valgteBarn, intl, søker.barn) as Søknad;
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

        return navigator.goToNextStep(nextRoute);
    };

    const formMethods = useForm<VelkommenFormData>({
        defaultValues: {
            harForståttRettigheterOgPlikter: harGodkjentVilkår,
        },
    });

    const valgtBarnId = formMethods.watch('valgteBarn');

    const valgtBarn =
        valgtBarnId === SelectableBarnOptions.SØKNAD_GJELDER_NYTT_BARN
            ? undefined
            : selectableBarn.find((barn) => barn.id === valgtBarnId);

    const knapptekst =
        valgtBarn !== undefined && valgtBarn.kanSøkeOmEndring === true
            ? intl.formatMessage({ id: 'velkommen.endreSøknad' })
            : intl.formatMessage({ id: 'velkommen.begynnMedSøknad' });

    return (
        <Form formMethods={formMethods} onSubmit={onSubmit}>
            <VStack gap="10">
                <LanguageToggle locale={locale} availableLocales={['nb', 'nn']} toggle={onChangeLocale} />
                <ContentWrapper>
                    <VStack gap="8">
                        <HStack justify="center">
                            <Heading size="xlarge">
                                <FormattedMessage id="velkommen.tittel" />
                            </Heading>
                        </HStack>
                        <GuidePanel poster>
                            <VStack gap="2">
                                <FormattedMessage id="velkommen.guidepanel.del1" />
                                <FormattedMessage
                                    id="velkommen.guidepanel.del2"
                                    values={{
                                        a: (msg: any) => (
                                            <a className="lenke" rel="noopener noreferrer" href={links.foreldrepenger}>
                                                {msg}
                                            </a>
                                        ),
                                    }}
                                />
                            </VStack>
                        </GuidePanel>
                        <BarnVelger selectableBarn={sortedSelectableBarn} />
                        <Alert variant="info">
                            <FormattedMessage id="velkommen.lagring.info" />
                        </Alert>
                        <ConfirmationPanel
                            name="harForståttRettigheterOgPlikter"
                            label={intl.formatMessage({ id: 'velkommen.samtykke' })}
                            validate={[
                                (value: boolean) =>
                                    value !== true
                                        ? intl.formatMessage({
                                              id: 'valideringsfeil.velkommen.harForståttRettigheterOgPlikter.påkrevd',
                                          })
                                        : null,
                            ]}
                        >
                            <VStack gap="5">
                                <HStack gap="1">
                                    <BodyShort>
                                        <FormattedMessage id="velkommen.samtykkeIntro.del1" />
                                    </BodyShort>
                                    <DinePlikter />
                                </HStack>
                            </VStack>
                        </ConfirmationPanel>
                        <HStack justify="center">
                            <Button type="submit" variant="primary" disabled={isSubmitting} loading={isSubmitting}>
                                {knapptekst}
                            </Button>
                        </HStack>
                        <HStack justify="center">
                            <BodyShort>
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
                        </HStack>
                        <DinePersonopplysningerModal
                            isOpen={isDinePersonopplysningerModalOpen}
                            onRequestClose={() => setDinePersonopplysningerModalOpen(false)}
                        />
                    </VStack>
                </ContentWrapper>
            </VStack>
        </Form>
    );
};

export default Velkommen;
