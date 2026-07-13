import { TasklistStartIcon } from '@navikt/aksel-icons';
import dayjs from 'dayjs';
import { useFormContext } from 'react-hook-form';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';
import { HvemPlanlegger, HvemPlanleggerType } from 'types/HvemPlanlegger';
import { erAlenesøker as erAlene, erFarDelAvSøknaden, erFarOgFar, erMorDelAvSøknaden } from 'utils/HvemPlanleggerUtils';
import { formatError } from 'utils/customErrorFormatter';

import { BodyShort, VStack } from '@navikt/ds-react';

import { RhfDatepicker } from '@navikt/fp-form-hooks';
import { OmBarnetPlanlegger } from '@navikt/fp-types';
import { BluePanel, Infobox } from '@navikt/fp-ui';
import { isLessThanThreeWeeksAgo, isRequired, isValidDate } from '@navikt/fp-validation';

const TODAY = dayjs().startOf('day').toDate();

const finnAnnenPartTekst = (intl: IntlShape, hvemPlanlegger: HvemPlanlegger): string | undefined => {
    if (hvemPlanlegger.type === HvemPlanleggerType.MOR_OG_MEDMOR) {
        return intl.formatMessage({ id: 'OversiktSteg.Medmor' });
    }
    if (erFarDelAvSøknaden(hvemPlanlegger)) {
        return intl.formatMessage({ id: 'OversiktSteg.Far' });
    }
    return undefined;
};
type Props = {
    hvemPlanlegger: HvemPlanlegger;
    erOmBarnetPlanleggerIkkeOppgittFraFør: boolean;
    scrollToBottom: () => void;
};

export const ErIkkeFødtPanel = ({ hvemPlanlegger, erOmBarnetPlanleggerIkkeOppgittFraFør, scrollToBottom }: Props) => {
    const intl = useIntl();

    const formMethods = useFormContext<OmBarnetPlanlegger>();
    const termindato = formMethods.watch('termindato');

    const datoSvangerskapsuke22 = termindato
        ? dayjs(termindato).subtract(18, 'weeks').subtract(3, 'days').toDate()
        : undefined;

    const erAlenesøker = erAlene(hvemPlanlegger);
    const erFarMedISøknaden = erFarDelAvSøknaden(hvemPlanlegger);
    const erFedre = erFarOgFar(hvemPlanlegger);
    const erFar = (() => {
        switch (hvemPlanlegger.type) {
            case HvemPlanleggerType.MOR:
            case HvemPlanleggerType.MOR_OG_MEDMOR:
                return false;
            default:
                return true;
        }
    })();

    return (
        <VStack gap="space-20">
            <BluePanel isDarkBlue={erOmBarnetPlanleggerIkkeOppgittFraFør} shouldFadeIn>
                <RhfDatepicker
                    name="termindato"
                    control={formMethods.control}
                    label={<FormattedMessage id="ErIkkeFødtPanel.Termin" />}
                    minDate={dayjs().subtract(3, 'week')}
                    maxDate={dayjs().add(1, 'year')}
                    useStrategyAbsolute
                    validate={[
                        isRequired(intl.formatMessage({ id: 'Termindato.Required' })),
                        isValidDate(intl.formatMessage({ id: 'ValidationMessage.ValidDate' })),
                        isLessThanThreeWeeksAgo(
                            intl.formatMessage({
                                id: 'ValidationMessage.KanIkkeVære3UkerFraIdag',
                            }),
                        ),
                    ]}
                    showMonthAndYearDropdowns
                    customErrorFormatter={formatError}
                    onSelect={scrollToBottom}
                    onBlur={scrollToBottom}
                />
            </BluePanel>
            {/* kan søke tilbake i tid */}
            {termindato !== undefined && dayjs(termindato).isBefore(TODAY) && (
                <Infobox
                    header={<FormattedMessage id="Fødsel.InfoboksTittel" values={{ erAlenesøker }} />}
                    icon={
                        <TasklistStartIcon
                            height={24}
                            width={24}
                            color="var(--ax-bg-success-strong)"
                            fontSize="1.5rem"
                            aria-hidden
                        />
                    }
                    shouldFadeIn
                    color="green"
                >
                    <VStack gap="space-8">
                        <BodyShort>
                            <FormattedMessage id="ErFødtPanel.Født.Infoboks.ManKanSøkeTilbakeITid" />
                        </BodyShort>

                        <BodyShort>
                            <FormattedMessage
                                id="ErFødtPanel.Født.InfoboksTekst.NAVanbefaler"
                                values={{
                                    erMorDelAvSøknaden: erMorDelAvSøknaden(hvemPlanlegger),
                                }}
                            />
                        </BodyShort>
                        <BodyShort>
                            <FormattedMessage
                                id="ErFødtPanel.Født.InfoboksTekst.ToFørsteUkerDekket"
                                values={{
                                    erAlenesøker,
                                    erFar,
                                }}
                            />
                        </BodyShort>
                    </VStack>
                </Infobox>
            )}

            {/* kan søke allerede nå */}
            {termindato !== undefined &&
                dayjs(termindato).isSameOrAfter(TODAY) &&
                dayjs(TODAY).isSameOrAfter(datoSvangerskapsuke22) && (
                    <Infobox
                        header={<FormattedMessage id="Fødsel.InfoboksTittel" values={{ erAlenesøker }} />}
                        icon={
                            <TasklistStartIcon
                                height={24}
                                width={24}
                                color="var(--ax-bg-success-strong)"
                                fontSize="1.5rem"
                                aria-hidden
                            />
                        }
                        shouldFadeIn
                        color="green"
                    >
                        <VStack gap="space-8">
                            <BodyShort>
                                <FormattedMessage id="Fødsel.ForeldrepengerInfoTekst.KanSøke" />
                            </BodyShort>
                            <BodyShort>
                                {erFedre || erFar ? (
                                    <VStack gap="space-8">
                                        <BodyShort>
                                            <FormattedMessage
                                                id="ErFødtPanel.Født.InfoboksTekst.NAVanbefaler"
                                                values={{
                                                    erMorDelAvSøknaden: erMorDelAvSøknaden(hvemPlanlegger),
                                                }}
                                            />
                                        </BodyShort>
                                        {erFedre && (
                                            <BodyShort>
                                                <FormattedMessage id="Fødsel.ForeldrepengerInfoTekst.StebarnsadopterendeFar" />
                                            </BodyShort>
                                        )}
                                    </VStack>
                                ) : (
                                    <FormattedMessage
                                        id="Fødsel.ForeldrepengerInfoTekst.SøkeFireUkerFør"
                                        values={{
                                            erMorDelAvSøknaden: true,
                                            erAlenesøker,
                                        }}
                                    />
                                )}
                            </BodyShort>
                            {!erFedre && (
                                <>
                                    {!erAlenesøker && (
                                        <BodyShort>
                                            <FormattedMessage
                                                id="Fødsel.ForeldrepengerInfoTekst.ToFørsteUkerDekket"
                                                values={{
                                                    erAlenesøker,
                                                    erFar: erFarMedISøknaden,
                                                    hvem: finnAnnenPartTekst(intl, hvemPlanlegger),
                                                    erMedmor: !erFarDelAvSøknaden(hvemPlanlegger),
                                                }}
                                            />
                                        </BodyShort>
                                    )}
                                </>
                            )}
                        </VStack>
                    </Infobox>
                )}
            {/* kan søke fra datoSvangerskapsuke22 */}
            {termindato !== undefined &&
                dayjs(termindato).isAfter(TODAY) &&
                dayjs(TODAY).isBefore(datoSvangerskapsuke22) && (
                    <Infobox
                        header={
                            <FormattedMessage
                                id="ErIkkeFødtPanel.ForeldrepengerInfo"
                                values={{
                                    erAlenesøker,
                                    dato: dayjs(datoSvangerskapsuke22).format('DD.MM.YY'),
                                }}
                            />
                        }
                        icon={
                            <TasklistStartIcon
                                height={24}
                                width={24}
                                color="var(--ax-bg-success-strong)"
                                fontSize="1.5rem"
                                aria-hidden
                            />
                        }
                        shouldFadeIn
                        color="green"
                    >
                        <VStack gap="space-8">
                            <BodyShort>
                                <FormattedMessage id="ErIkkeFødtPanel.ForeldrepengerInfoTekst.KanSøke" />
                            </BodyShort>
                            <BodyShort>
                                <FormattedMessage
                                    id="Fødsel.ForeldrepengerInfoTekst.SøkeFireUkerFør"
                                    values={{
                                        erAlenesøker,
                                    }}
                                />
                            </BodyShort>
                            {erFarDelAvSøknaden(hvemPlanlegger) && !erFedre && (
                                <BodyShort>
                                    <FormattedMessage
                                        id="ErIkkeFødtPanel.ForeldrepengerInfoTekst.ToFørsteUkerDekket"
                                        values={{
                                            erFar: erFarMedISøknaden,
                                            hvem: finnAnnenPartTekst(intl, hvemPlanlegger),
                                        }}
                                    />
                                </BodyShort>
                            )}
                        </VStack>
                    </Infobox>
                )}
        </VStack>
    );
};
