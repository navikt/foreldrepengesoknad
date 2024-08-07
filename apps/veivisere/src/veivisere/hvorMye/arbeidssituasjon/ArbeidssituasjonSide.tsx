import { InformationIcon, PaperplaneIcon, WalletIcon } from '@navikt/aksel-icons';
import { ContextRoutes, HvorMyeRoutes } from 'appData/routes';
import useVeiviserNavigator from 'appData/useVeiviserNavigator';
import dayjs from 'dayjs';
import { FunctionComponent } from 'react';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { finnGrunnbeløp } from 'utils/satserUtils';
import useScrollBehaviour from 'utils/useScrollBehaviour';

import { BodyShort, Button, Heading, Label, Link, ReadMore, Spacer, VStack } from '@navikt/ds-react';

import { links } from '@navikt/fp-constants';
import { Checkbox, Form, TextField } from '@navikt/fp-form-hooks';
import { Satser } from '@navikt/fp-types';
import { BluePanel, Infobox } from '@navikt/fp-ui';
import { capitalizeFirstLetter, formatCurrencyWithKr } from '@navikt/fp-utils';
import { isValidNumber } from '@navikt/fp-validation';

import VeiviserPage from '../../felles/VeiviserPage';
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

export const finnGjennomsnittsMånedslønn = (formValues: Arbeidssituasjon): string | undefined => {
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
    satser: Satser;
}

const ArbeidssituasjonSide: FunctionComponent<Props> = ({ arbeidssituasjon, setArbeidssituasjon, satser }) => {
    const intl = useIntl();
    const { goToRoute } = useVeiviserNavigator(ContextRoutes.HVOR_MYE);

    const formMethods = useForm<Arbeidssituasjon>({
        defaultValues: arbeidssituasjon,
    });

    const onSubmit = (formValues: Arbeidssituasjon) => {
        setArbeidssituasjon(formValues);
        goToRoute(HvorMyeRoutes.OPPSUMMERING);
    };

    const formValues = formMethods.watch();

    const forrigeMåned = dayjs().subtract(1, 'month');

    const gjennomsnittslønnPerMåned = finnGjennomsnittsMånedslønn(formValues);
    const antattÅrslønn = gjennomsnittslønnPerMåned ? parseFloat(gjennomsnittslønnPerMåned) * 12 : undefined;

    const grunnbeløpet = finnGrunnbeløp(satser, dayjs());
    const minÅrslønn = grunnbeløpet / 2;
    const maxÅrslønn = grunnbeløpet * 6;

    const { ref } = useScrollBehaviour();

    return (
        <VeiviserPage
            ref={ref}
            label={intl.formatMessage({ id: 'Tittel' })}
            icon={<WalletIcon height={28} width={28} fontSize="1.5rem" aria-hidden />}
        >
            <Form formMethods={formMethods} onSubmit={onSubmit} shouldUseFlexbox>
                <VStack gap="10" style={{ flex: 1 }}>
                    <VStack gap="2">
                        <BluePanel isDarkBlue={!isCheckboxValgt(formValues)} shouldFadeIn>
                            <Label>
                                <FormattedMessage id="ArbeidssituasjonSide.Arbeidssituasjon" />
                            </Label>
                            <BodyShort className={styles.description}>
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
                        </BluePanel>
                        <ReadMore header={<FormattedMessage id="ArbeidssituasjonSide.Forskjellen" />}>todo</ReadMore>
                    </VStack>
                    {formValues.erSelvstendigNæringsdrivende && (
                        <Infobox
                            icon={
                                <InformationIcon
                                    height={24}
                                    width={24}
                                    color="#020C1CAD"
                                    fontSize="1.5rem"
                                    aria-hidden
                                />
                            }
                            color="gray"
                        >
                            <VStack gap="6">
                                <BodyShort>
                                    <FormattedMessage id="ArbeidssituasjonSide.SNKanIkkeBruke" />
                                </BodyShort>
                                <BodyShort>
                                    <FormattedMessage id="ArbeidssituasjonSide.LesOm" />
                                    <Link
                                        inlineText
                                        href={links.selvstendigNæringsdrivendeHvorMye}
                                        className="lenke"
                                        rel="noreferrer"
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
                                <BluePanel isDarkBlue={gjennomsnittslønnPerMåned === undefined} shouldFadeIn>
                                    <VStack gap="6">
                                        {formValues.erArbeidstakerEllerFrilanser && !formValues.harUtbetalingFraNav && (
                                            <div>
                                                <Label>
                                                    <FormattedMessage id="ArbeidssituasjonSide.TreSisteMåneder" />
                                                </Label>
                                                <BodyShort className={styles.description}>
                                                    <FormattedMessage id="ArbeidssituasjonSide.LønnFørSkatt" />
                                                </BodyShort>
                                            </div>
                                        )}
                                        {formValues.harUtbetalingFraNav && !formValues.erArbeidstakerEllerFrilanser && (
                                            <Label>
                                                <FormattedMessage id="ArbeidssituasjonSide.UtbetaltTreSiste" />
                                            </Label>
                                        )}
                                        {formValues.erArbeidstakerEllerFrilanser && formValues.harUtbetalingFraNav && (
                                            <div>
                                                <Label>
                                                    <FormattedMessage id="ArbeidssituasjonSide.UtbetaltTreSiste" />
                                                </Label>
                                                <BodyShort className={styles.description}>
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
                                                {gjennomsnittslønnPerMåned
                                                    ? formatCurrencyWithKr(gjennomsnittslønnPerMåned)
                                                    : '-'}
                                            </Heading>
                                        </div>
                                        <div>
                                            <Label>
                                                <FormattedMessage id="ArbeidssituasjonSide.GjennomsnittÅrslønn" />
                                            </Label>
                                            <Heading size="large">
                                                {gjennomsnittslønnPerMåned
                                                    ? formatCurrencyWithKr(parseInt(gjennomsnittslønnPerMåned, 10) * 12)
                                                    : '-'}
                                            </Heading>
                                        </div>
                                    </VStack>
                                </BluePanel>
                                <ReadMore header={<FormattedMessage id="ArbeidssituasjonSide.GirRett" />}>
                                    <FormattedMessage id="ArbeidssituasjonSide.EnAvDisse" />
                                    <ul>
                                        <li>
                                            <FormattedMessage id="ArbeidssituasjonSide.Sykepenger" />
                                        </li>
                                        <li>
                                            <FormattedMessage id="ArbeidssituasjonSide.Foreldrepenger" />
                                        </li>
                                        <li>
                                            <FormattedMessage id="ArbeidssituasjonSide.Arbeidsavklaring" />
                                        </li>
                                        <li>
                                            <FormattedMessage id="ArbeidssituasjonSide.Dagpenger" />
                                        </li>
                                        <li>
                                            <FormattedMessage id="ArbeidssituasjonSide.OmsorgOgPleie" />
                                        </li>
                                    </ul>
                                </ReadMore>
                            </VStack>
                        )}
                    {formValues.erArbeidstakerEllerFrilanser &&
                        antattÅrslønn !== undefined &&
                        antattÅrslønn < minÅrslønn && (
                            <HarIkkeRettTilFpInfobox antattÅrslønn={antattÅrslønn} minÅrslønn={minÅrslønn} showKrIcon />
                        )}
                    {formValues.erArbeidstakerEllerFrilanser &&
                        antattÅrslønn !== undefined &&
                        antattÅrslønn > maxÅrslønn && <HøyInntektInfobox maxÅrslønnDekket={maxÅrslønn} showKrIcon />}
                    <Spacer />
                    {gjennomsnittslønnPerMåned && (
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
        </VeiviserPage>
    );
};

export default ArbeidssituasjonSide;
