import { TasklistStartIcon } from '@navikt/aksel-icons';
import dayjs from 'dayjs';
import { useFormContext } from 'react-hook-form';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';
import { HvemPlanlegger, HvemPlanleggerType } from 'types/HvemPlanlegger';
import { erAlenesøker as erAlene, erFarDelAvSøknaden, erFarOgFar, erMorDelAvSøknaden } from 'utils/HvemPlanleggerUtils';
import { formatError } from 'utils/customErrorFormatter';
import { erFødtFørUke33, getAntallVirkedagerFraFødselTilTermin } from 'utils/dateUtils';
import { getUkerOgDager } from 'utils/stønadskvoterUtils';

import { BodyShort, ReadMore, VStack } from '@navikt/ds-react';

import { DATE_3_YEARS_AGO, ISO_DATE_REGEX } from '@navikt/fp-constants';
import { RhfDatepicker } from '@navikt/fp-form-hooks';
import { OmBarnetPlanlegger } from '@navikt/fp-types';
import { BluePanel, Infobox } from '@navikt/fp-ui';
import { erI22SvangerskapsukeEllerSenere, isBeforeTodayOrToday, isRequired, isValidDate } from '@navikt/fp-validation';

const erDatoGyldig = (date: string) => ISO_DATE_REGEX.test(date);
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
    antallBarn?: string;
    scrollToBottom: () => void;
};

export const ErFødtPanel = ({
    hvemPlanlegger,
    erOmBarnetPlanleggerIkkeOppgittFraFør,
    antallBarn,
    scrollToBottom,
}: Props) => {
    const intl = useIntl();

    const formMethods = useFormContext<OmBarnetPlanlegger>();
    const fødselsdato = formMethods.watch('fødselsdato');
    const termindato = formMethods.watch('termindato');

    const erAlenesøker = erAlene(hvemPlanlegger);
    const erFedre = erFarOgFar(hvemPlanlegger);
    const erFarMedISøknaden = erFarDelAvSøknaden(hvemPlanlegger);

    const erFar = (() => {
        switch (hvemPlanlegger.type) {
            case HvemPlanleggerType.MOR:
            case HvemPlanleggerType.MOR_OG_MEDMOR:
                return false;
            default:
                return true;
        }
    })();

    const visInfoOmForlengetPeriode = erFødtFørUke33(fødselsdato, termindato);
    const { uker, dager } = visInfoOmForlengetPeriode
        ? getUkerOgDager(getAntallVirkedagerFraFødselTilTermin(fødselsdato, termindato!))
        : { uker: 0, dager: 0 };

    return (
        <VStack gap="space-20">
            <BluePanel isDarkBlue={erOmBarnetPlanleggerIkkeOppgittFraFør} shouldFadeIn>
                <VStack gap="space-32">
                    <RhfDatepicker
                        name="fødselsdato"
                        control={formMethods.control}
                        label={<FormattedMessage id="ErFødtPanel.Fødselsdato" values={{ antallBarn }} />}
                        maxDate={dayjs()}
                        useStrategyAbsolute
                        validate={[
                            isRequired(intl.formatMessage({ id: 'Fødselsdato.Required' })),
                            isValidDate(intl.formatMessage({ id: 'ValidationMessage.ValidDate' })),
                            isBeforeTodayOrToday(
                                intl.formatMessage({
                                    id: 'ValidationMessage.InFuture',
                                }),
                            ),
                        ]}
                        showMonthAndYearDropdowns
                        customErrorFormatter={formatError}
                        onSelect={scrollToBottom}
                        onBlur={scrollToBottom}
                    />
                    <RhfDatepicker
                        name="termindato"
                        control={formMethods.control}
                        label={<FormattedMessage id="ErFødtPanel.NårVarTermin" />}
                        maxDate={dayjs().add(18, 'weeks').add(3, 'days')}
                        validate={[
                            isRequired(intl.formatMessage({ id: 'Termindato.Required' })),
                            isValidDate(intl.formatMessage({ id: 'ValidationMessage.ValidDate' })),
                            erI22SvangerskapsukeEllerSenere(
                                intl.formatMessage({
                                    id: 'ValidationMessage.DuMåVæreIUke22',
                                }),
                            ),
                        ]}
                        showMonthAndYearDropdowns
                        customErrorFormatter={formatError}
                        useStrategyAbsolute
                        onSelect={scrollToBottom}
                        onBlur={scrollToBottom}
                    />
                </VStack>
            </BluePanel>
            {visInfoOmForlengetPeriode && (
                <Infobox
                    color="blue"
                    header={<FormattedMessage id="ErFødtPanel.ErFødtFørUke33.Tittel" />}
                    shouldFadeIn
                >
                    <VStack gap="space-16">
                        <BodyShort>
                            <FormattedMessage id="ErFødtPanel.ErFødtFørUke33.Tekst" values={{ uker, dager }} />
                        </BodyShort>
                        <ReadMore header={intl.formatMessage({ id: 'ErFødtPanel.ErFødtFørUke33.ReadMore.Header' })}>
                            <FormattedMessage id="ErFødtPanel.ErFødtFørUke33.ReadMore.Tekst" />
                        </ReadMore>
                    </VStack>
                </Infobox>
            )}
            {fødselsdato !== undefined && erDatoGyldig(fødselsdato) && dayjs(fødselsdato).isAfter(DATE_3_YEARS_AGO) && (
                <Infobox
                    header={<FormattedMessage id="ErFødtPanel.Født.InfoboksTittel" values={{ erAlenesøker }} />}
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
            {fødselsdato !== undefined &&
                erDatoGyldig(fødselsdato) &&
                dayjs(fødselsdato).isBefore(DATE_3_YEARS_AGO) && (
                    <Infobox
                        header={
                            <FormattedMessage
                                id="ErFødtPanel.Født.InfoboksTittel.EldreEnnTreÅr"
                                values={{ erAlenesøker, antallBarn }}
                            />
                        }
                        icon={
                            <TasklistStartIcon
                                height={24}
                                width={24}
                                color="var(--ax-bg-success-strong)"
                                fontSize="1.5rem"
                            />
                        }
                        shouldFadeIn
                        color="green"
                    >
                        <VStack gap="space-8">
                            <BodyShort>
                                <FormattedMessage
                                    id="ErFødtPanel.Født.InfoboksTekst.EldreEnnTreÅr"
                                    values={{ antallBarn }}
                                />
                            </BodyShort>
                            <BodyShort>
                                <FormattedMessage
                                    id="ErFødtPanel.Født.Infoboks.ManKanSøkeTilbakeITid"
                                    values={{ erFar }}
                                />
                            </BodyShort>
                        </VStack>
                    </Infobox>
                )}
        </VStack>
    );
};
