import { InformationIcon, PaperplaneIcon } from '@navikt/aksel-icons';
import { ContextRoutes, HvorMyeRoutes } from 'appData/routes';
import useVeilederNavigator from 'appData/useVeilederNavigator';
import VeilederPage from 'components/Page/VeilederPage';
import dayjs from 'dayjs';
import { FunctionComponent } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import useScrollBehaviour from 'utils/useScrollBehaviour';

import { BodyShort, Button, Heading, Label, Link, ReadMore, Spacer, VStack } from '@navikt/ds-react';

import { links } from '@navikt/fp-constants';
import { Checkbox, Form, TextField } from '@navikt/fp-form-hooks';
import { GreenPanel, Infobox } from '@navikt/fp-ui';
import { capitalizeFirstLetter } from '@navikt/fp-utils';
import { isValidNumber } from '@navikt/fp-validation';

import FpEllerEsOgHvaSkjerNåLinkPanel from '../felles/FpEllerEsOgHvaSkjerNåLinkPanel';
import HarIkkeRettTilFpInfobox from '../felles/HarIkkeRettTilFpInfobox';
import HøyInntektInfobox from '../felles/HøyInntektInfobox';
import styles from './arbeidssituasjonSide.module.css';

export type Arbeidssituasjon = {
    erArbeidstakerEllerFrilanser: boolean;
    harUtbetalingFraNav: boolean;
    erSelvstendigNæringsdrivende: boolean;
    lønnMåned1: string;
    lønnMåned2: string;
    lønnMåned3: string;
};

//FIXME Hent frå tjeneste
const minÅrslønn = 59310;
const GRUNNBELØPET = 118620;
const maxÅrslønn = GRUNNBELØPET * 6;

const isCheckboxValgt = (arbeidsituasjon?: Arbeidssituasjon) => {
    return (
        arbeidsituasjon?.erArbeidstakerEllerFrilanser ||
        arbeidsituasjon?.harUtbetalingFraNav ||
        arbeidsituasjon?.erSelvstendigNæringsdrivende
    );
};

const isNumber = (value?: string) => {
    return value && isValidNumber(value);
};

export const finnGjennomsnittslønn = (formValues: Arbeidssituasjon): string | undefined => {
    const { lønnMåned1, lønnMåned2, lønnMåned3 } = formValues;

    const m1 = isNumber(lønnMåned1) ? parseFloat(lønnMåned1) : 0;
    const m2 = isNumber(lønnMåned2) ? parseFloat(lønnMåned2) : 0;
    const m3 = isNumber(lønnMåned3) ? parseFloat(lønnMåned3) : 0;

    const gjennomsnittslønn = (m1 + m2 + m3) / 3;
    return gjennomsnittslønn > 0 ? gjennomsnittslønn.toFixed(0) : undefined;
};

interface Props {
    arbeidssituasjon?: Arbeidssituasjon;
    setArbeidssituasjon: (arbeidssituasjon: Arbeidssituasjon) => void;
}

const ArbeidssituasjonSide: FunctionComponent<Props> = ({ arbeidssituasjon, setArbeidssituasjon }) => {
    const intl = useIntl();
    const { goToRoute } = useVeilederNavigator(ContextRoutes.HVOR_MYE);

    const formMethods = useForm<Arbeidssituasjon>({
        defaultValues: arbeidssituasjon,
    });

    const onSubmit = (formValues: Arbeidssituasjon) => {
        setArbeidssituasjon(formValues);
        goToRoute(HvorMyeRoutes.OPPSUMMERING);
    };

    const formValues = formMethods.watch();

    const forrigeMåned = dayjs().subtract(1, 'month');

    const gjennomsnittslønn = finnGjennomsnittslønn(formValues);
    const antattÅrslønn = gjennomsnittslønn ? parseFloat(gjennomsnittslønn) * 12 : undefined;

    const { ref } = useScrollBehaviour();

    return (
        <>
            <VeilederPage ref={ref} label={intl.formatMessage({ id: 'Tittel' })}>
                <Form formMethods={formMethods} onSubmit={onSubmit} shouldUseFlexbox>
                    <VStack gap="10" style={{ flex: 1 }}>
                        <VStack gap="2">
                            <GreenPanel isDarkGreen={!isCheckboxValgt(formValues)} shouldFadeIn>
                                <Label>
                                    <FormattedMessage id="ArbeidssituasjonSide.Arbeidssituasjon" />
                                </Label>
                                <BodyShort>
                                    <FormattedMessage id="ArbeidssituasjonSide.VelgAlternativ" />
                                </BodyShort>
                                <Checkbox
                                    name="erArbeidstakerEllerFrilanser"
                                    label={<FormattedMessage id="ArbeidssituasjonSide.ArbeidEllerFrilans" />}
                                />
                                <Checkbox
                                    name="harUtbetalingFraNav"
                                    label={<FormattedMessage id="ArbeidssituasjonSide.UtbetalingNav" />}
                                />
                                <Checkbox
                                    name="erSelvstendigNæringsdrivende"
                                    label={<FormattedMessage id="ArbeidssituasjonSide.SelvstendigNæringsdrivende" />}
                                />
                            </GreenPanel>
                            <ReadMore header={<FormattedMessage id="ArbeidssituasjonSide.Forskjellen" />}>
                                todo
                            </ReadMore>
                        </VStack>
                        {formValues.erSelvstendigNæringsdrivende && (
                            <Infobox
                                isGray
                                icon={
                                    <InformationIcon
                                        height={24}
                                        width={24}
                                        color="#020C1CAD"
                                        fontSize="1.5rem"
                                        aria-hidden
                                    />
                                }
                            >
                                <VStack gap="6">
                                    <BodyShort>
                                        <FormattedMessage id="ArbeidssituasjonSide.SNKanIkkeBruke" />
                                    </BodyShort>
                                    <BodyShort>
                                        <FormattedMessage id="ArbeidssituasjonSide.LesOm" />
                                        <Link
                                            inlineText
                                            href={links.næringsdrivendeInfoBoks}
                                            className="lenke"
                                            rel="noreferrer"
                                            target="_blank"
                                        >
                                            <FormattedMessage id="ArbeidssituasjonSide.Lenke" />
                                        </Link>
                                    </BodyShort>
                                </VStack>
                            </Infobox>
                        )}
                        {!formValues.erSelvstendigNæringsdrivende &&
                            (formValues.erArbeidstakerEllerFrilanser || formValues.harUtbetalingFraNav) && (
                                <VStack gap="2">
                                    <GreenPanel isDarkGreen={gjennomsnittslønn === undefined} shouldFadeIn>
                                        <VStack gap="6">
                                            {formValues.erArbeidstakerEllerFrilanser &&
                                                !formValues.harUtbetalingFraNav && (
                                                    <div>
                                                        <Label>
                                                            <FormattedMessage id="ArbeidssituasjonSide.TreSisteMåneder" />
                                                        </Label>
                                                        <BodyShort>
                                                            <FormattedMessage id="ArbeidssituasjonSide.LønnFørSkatt" />
                                                        </BodyShort>
                                                    </div>
                                                )}
                                            {formValues.harUtbetalingFraNav &&
                                                !formValues.erArbeidstakerEllerFrilanser && (
                                                    <Label>
                                                        <FormattedMessage id="ArbeidssituasjonSide.UtbetaltTreSiste" />
                                                    </Label>
                                                )}
                                            {formValues.erArbeidstakerEllerFrilanser &&
                                                formValues.harUtbetalingFraNav && (
                                                    <div>
                                                        <Label>
                                                            <FormattedMessage id="ArbeidssituasjonSide.UtbetaltTreSiste" />
                                                        </Label>
                                                        <BodyShort>
                                                            <FormattedMessage id="ArbeidssituasjonSide.LønnOgUtbetaling" />
                                                        </BodyShort>
                                                    </div>
                                                )}

                                            <VStack gap="4">
                                                <TextField
                                                    name="lønnMåned1"
                                                    label={capitalizeFirstLetter(
                                                        forrigeMåned.subtract(2, 'month').format('MMMM YYYY'),
                                                    )}
                                                    className={styles.widthTextInput}
                                                />
                                                <TextField
                                                    name="lønnMåned2"
                                                    label={capitalizeFirstLetter(
                                                        forrigeMåned.subtract(1, 'month').format('MMMM YYYY'),
                                                    )}
                                                    className={styles.widthTextInput}
                                                />
                                                <TextField
                                                    name="lønnMåned3"
                                                    label={capitalizeFirstLetter(forrigeMåned.format('MMMM YYYY'))}
                                                    className={styles.widthTextInput}
                                                />
                                            </VStack>
                                            <div>
                                                <Label>
                                                    <FormattedMessage id="ArbeidssituasjonSide.Gjennomsnitt" />
                                                </Label>
                                                <Heading size="large">
                                                    {gjennomsnittslønn || '-'}
                                                    <FormattedMessage id="ArbeidssituasjonSide.Kr" />
                                                </Heading>
                                            </div>
                                        </VStack>
                                    </GreenPanel>
                                    <ReadMore header={<FormattedMessage id="ArbeidssituasjonSide.GirRett" />}>
                                        todo
                                    </ReadMore>
                                </VStack>
                            )}
                        {formValues.erArbeidstakerEllerFrilanser && antattÅrslønn && antattÅrslønn < minÅrslønn && (
                            <HarIkkeRettTilFpInfobox antattÅrslønn={antattÅrslønn} minÅrslønn={minÅrslønn} />
                        )}
                        {formValues.erArbeidstakerEllerFrilanser && antattÅrslønn && antattÅrslønn > maxÅrslønn && (
                            <HøyInntektInfobox maxÅrslønnDekket={maxÅrslønn} />
                        )}
                        <Spacer />
                        {gjennomsnittslønn && (
                            <Button
                                icon={<PaperplaneIcon aria-hidden />}
                                iconPosition="right"
                                type="submit"
                                style={{ flex: 1 }}
                            >
                                <FormattedMessage id="ArbeidssituasjonSide.SeResultatet" />
                            </Button>
                        )}
                    </VStack>
                </Form>
            </VeilederPage>
            {gjennomsnittslønn && <FpEllerEsOgHvaSkjerNåLinkPanel />}
        </>
    );
};

export default ArbeidssituasjonSide;
