import { InformationIcon, PaperplaneIcon, WalletIcon } from '@navikt/aksel-icons';
import { HvorMyeRoutes } from 'appData/routes';
import { useVeiviserNavigator } from 'appData/useVeiviserNavigator';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';
import { finnSisteGrunnbeløp } from 'utils/satserUtils';

import { BodyShort, Button, Heading, Label, Link, List, ReadMore, Spacer, VStack } from '@navikt/ds-react';

import { links } from '@navikt/fp-constants';
import { RhfCheckbox, RhfForm, RhfFormattertTallTextField } from '@navikt/fp-form-hooks';
import { Satser } from '@navikt/fp-types';
import { BluePanel, Infobox, VeiviserPage } from '@navikt/fp-ui';
import { capitalizeFirstLetter, formatCurrencyWithKr, useScrollBehaviour } from '@navikt/fp-utils';
import { isValidNumber, isValidNumberForm } from '@navikt/fp-validation';

import { HarIkkeRettTilFpInfobox } from '../felles/HarIkkeRettTilFpInfobox';
import { HøyInntektInfobox } from '../felles/HøyInntektInfobox';

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

    const m1 = isNumber(lønnMåned1) ? Number.parseFloat(lønnMåned1) : 0;
    const m2 = isNumber(lønnMåned2) ? Number.parseFloat(lønnMåned2) : 0;
    const m3 = isNumber(lønnMåned3) ? Number.parseFloat(lønnMåned3) : 0;

    const gjennomsnittslønn = (m1 + m2 + m3) / 3;
    return gjennomsnittslønn > 0 ? gjennomsnittslønn.toFixed(0) : undefined;
};

interface Props {
    arbeidssituasjon?: Arbeidssituasjon;
    setArbeidssituasjon: (arbeidssituasjon: Arbeidssituasjon) => void;
    satser: Satser;
}

export const ArbeidssituasjonSide = ({ arbeidssituasjon, setArbeidssituasjon, satser }: Props) => {
    const intl = useIntl();
    const { goToRoute } = useVeiviserNavigator();

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
    const antattÅrslønn = gjennomsnittslønnPerMåned ? Number.parseFloat(gjennomsnittslønnPerMåned) * 12 : undefined;

    const grunnbeløpet = finnSisteGrunnbeløp(satser);
    const minÅrslønn = grunnbeløpet / 2;
    const maxÅrslønn = grunnbeløpet * 6;

    const { ref } = useScrollBehaviour();

    return (
        <VeiviserPage
            ref={ref}
            label={intl.formatMessage({ id: 'Tittel' })}
            icon={<WalletIcon height={28} width={28} fontSize="1.5rem" aria-hidden />}
        >
            <RhfForm formMethods={formMethods} onSubmit={onSubmit} shouldUseFlexbox>
                <VStack gap="space-40" style={{ flex: 1 }}>
                    <BluePanel isDarkBlue={!isCheckboxValgt(formValues)} shouldFadeIn>
                        <Label>
                            <FormattedMessage id="ArbeidssituasjonSide.Arbeidssituasjon" />
                        </Label>
                        <BodyShort className="text-ax-text-neutral-subtle">
                            <FormattedMessage id="ArbeidssituasjonSide.VelgAlternativ" />
                        </BodyShort>
                        <RhfCheckbox
                            name="erArbeidstakerEllerFrilanser"
                            control={formMethods.control}
                            label={<FormattedMessage id="ArbeidssituasjonSide.ArbeidEllerFrilans" />}
                        />
                        <RhfCheckbox
                            name="harUtbetalingFraNav"
                            control={formMethods.control}
                            label={<FormattedMessage id="ArbeidssituasjonSide.UtbetalingNav" />}
                        />
                        <RhfCheckbox
                            name="erSelvstendigNæringsdrivende"
                            control={formMethods.control}
                            label={<FormattedMessage id="ArbeidssituasjonSide.SelvstendigNæringsdrivende" />}
                        />
                    </BluePanel>
                    {formValues.erSelvstendigNæringsdrivende && (
                        <Infobox
                            icon={
                                <InformationIcon
                                    height={24}
                                    width={24}
                                    color="var(--ax-bg-neutral-strong)"
                                    fontSize="1.5rem"
                                    aria-hidden
                                />
                            }
                            color="gray"
                        >
                            <VStack gap="space-24">
                                <BodyShort>
                                    <FormattedMessage id="ArbeidssituasjonSide.SNKanIkkeBruke" />
                                </BodyShort>
                                <BodyShort>
                                    <FormattedMessage id="ArbeidssituasjonSide.LesOm" />
                                    <Link inlineText href={links.selvstendigNæringsdrivendeHvorMye} rel="noreferrer">
                                        <FormattedMessage id="ArbeidssituasjonSide.Lenke" />
                                    </Link>
                                </BodyShort>
                            </VStack>
                        </Infobox>
                    )}
                    {!formValues.erSelvstendigNæringsdrivende &&
                        (formValues.erArbeidstakerEllerFrilanser || formValues.harUtbetalingFraNav) && (
                            <VStack gap="space-8">
                                <BluePanel isDarkBlue={gjennomsnittslønnPerMåned === undefined} shouldFadeIn>
                                    <VStack gap="space-24">
                                        {formValues.erArbeidstakerEllerFrilanser && !formValues.harUtbetalingFraNav && (
                                            <div>
                                                <Label>
                                                    <FormattedMessage id="ArbeidssituasjonSide.TreSisteMåneder" />
                                                </Label>
                                                <BodyShort className="text-ax-text-neutral-subtle">
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
                                                <BodyShort className="text-ax-text-neutral-subtle">
                                                    <FormattedMessage id="ArbeidssituasjonSide.LønnOgUtbetaling" />
                                                </BodyShort>
                                            </div>
                                        )}

                                        <VStack gap="space-16">
                                            <RhfFormattertTallTextField
                                                name="lønnMåned1"
                                                control={formMethods.control}
                                                label={capitalizeFirstLetter(
                                                    forrigeMåned.subtract(2, 'month').format('MMMM YYYY'),
                                                )}
                                                className="w-[300px]"
                                                validate={[
                                                    isValidNumberForm(
                                                        intl.formatMessage({ id: 'ArbeidssituasjonSide.ValidNumber' }),
                                                    ),
                                                ]}
                                            />
                                            <RhfFormattertTallTextField
                                                name="lønnMåned2"
                                                control={formMethods.control}
                                                label={capitalizeFirstLetter(
                                                    forrigeMåned.subtract(1, 'month').format('MMMM YYYY'),
                                                )}
                                                className="w-[300px]"
                                                validate={[
                                                    isValidNumberForm(
                                                        intl.formatMessage({ id: 'ArbeidssituasjonSide.ValidNumber' }),
                                                    ),
                                                ]}
                                            />
                                            <RhfFormattertTallTextField
                                                name="lønnMåned3"
                                                control={formMethods.control}
                                                label={capitalizeFirstLetter(forrigeMåned.format('MMMM YYYY'))}
                                                className="w-[300px]"
                                                validate={[
                                                    isValidNumberForm(
                                                        intl.formatMessage({ id: 'ArbeidssituasjonSide.ValidNumber' }),
                                                    ),
                                                ]}
                                            />
                                        </VStack>
                                        <div>
                                            <Label>
                                                <FormattedMessage id="ArbeidssituasjonSide.Gjennomsnitt" />
                                            </Label>
                                            <Heading size="large" as="p">
                                                {gjennomsnittslønnPerMåned
                                                    ? formatCurrencyWithKr(gjennomsnittslønnPerMåned)
                                                    : '-'}
                                            </Heading>
                                        </div>
                                        <div>
                                            <Label>
                                                <FormattedMessage id="ArbeidssituasjonSide.GjennomsnittÅrslønn" />
                                            </Label>
                                            <Heading size="large" as="p">
                                                {gjennomsnittslønnPerMåned
                                                    ? formatCurrencyWithKr(
                                                          Number.parseInt(gjennomsnittslønnPerMåned, 10) * 12,
                                                      )
                                                    : '-'}
                                            </Heading>
                                        </div>
                                    </VStack>
                                </BluePanel>
                                <ReadMore header={<FormattedMessage id="ArbeidssituasjonSide.GirRett" />}>
                                    <FormattedMessage id="ArbeidssituasjonSide.EnAvDisse" />
                                    <List>
                                        <List.Item>
                                            <FormattedMessage id="ArbeidssituasjonSide.Sykepenger" />
                                        </List.Item>
                                        <List.Item>
                                            <FormattedMessage id="ArbeidssituasjonSide.Foreldrepenger" />
                                        </List.Item>
                                        <List.Item>
                                            <FormattedMessage id="ArbeidssituasjonSide.Svangerskapspenger" />
                                        </List.Item>
                                        <List.Item>
                                            <FormattedMessage id="ArbeidssituasjonSide.Arbeidsavklaring" />
                                        </List.Item>
                                        <List.Item>
                                            <FormattedMessage id="ArbeidssituasjonSide.Dagpenger" />
                                        </List.Item>
                                        <List.Item>
                                            <FormattedMessage id="ArbeidssituasjonSide.OmsorgOgPleie" />
                                        </List.Item>
                                    </List>
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
            </RhfForm>
        </VeiviserPage>
    );
};
