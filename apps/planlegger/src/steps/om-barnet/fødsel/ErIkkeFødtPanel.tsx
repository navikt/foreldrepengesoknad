import { TasklistStartIcon } from '@navikt/aksel-icons';
import dayjs from 'dayjs';
import { useFormContext } from 'react-hook-form';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';
import { OmBarnet } from 'types/Barnet';
import { HvemPlanlegger } from 'types/HvemPlanlegger';
import {
    erAlenesøker as erAlene,
    erFarDelAvSøknaden,
    erFarOgFar,
    erMorDelAvSøknaden,
    finnSøker2Tekst,
    getFornavnPåSøker1,
} from 'utils/HvemPlanleggerUtils';
import { formatError } from 'utils/customErrorFormatter';

import { BodyShort, VStack } from '@navikt/ds-react';

import { RhfDatepicker } from '@navikt/fp-form-hooks';
import { HvemPlanleggerType } from '@navikt/fp-types';
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
    erOmBarnetIkkeOppgittFraFør: boolean;
    scrollToBottom: () => void;
};

export const ErIkkeFødtPanel = ({ hvemPlanlegger, erOmBarnetIkkeOppgittFraFør, scrollToBottom }: Props) => {
    const intl = useIntl();

    const formMethods = useFormContext<OmBarnet>();
    const termindato = formMethods.watch('termindato');

    const datoSvangerskapsuke22 =
        termindato !== undefined ? dayjs(termindato).subtract(18, 'weeks').subtract(3, 'days').toDate() : undefined;

    // TODO: disse sjekker nå på dato, skal den sjekke på ukenummer?

    const erAlenesøker = erAlene(hvemPlanlegger);
    const erFarMedISøknaden = erFarDelAvSøknaden(hvemPlanlegger);
    const erFedre = erFarOgFar(hvemPlanlegger);
    const erFar = hvemPlanlegger.type === HvemPlanleggerType.FAR;

    return (
        <VStack gap="5">
            <BluePanel isDarkBlue={erOmBarnetIkkeOppgittFraFør} shouldFadeIn>
                <RhfDatepicker
                    name="termindato"
                    control={formMethods.control}
                    label={<FormattedMessage id="ErIkkeFødtPanel.Termin" />}
                    minDate={dayjs().subtract(3, 'week').toDate()}
                    maxDate={dayjs().add(1, 'year').toDate()}
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
                    customErrorFormatter={formatError}
                    onChange={scrollToBottom}
                />
            </BluePanel>
            {/* kan søke tilbake i tid */}
            {termindato !== undefined && dayjs(termindato).isBefore(TODAY) && (
                <Infobox
                    header={<FormattedMessage id="ErFødtPanel.Født.InfoboksTittel" values={{ erAlenesøker }} />}
                    icon={<TasklistStartIcon height={24} width={24} color="#7F8900" fontSize="1.5rem" aria-hidden />}
                    shouldFadeIn
                    color="green"
                >
                    <VStack gap="2">
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
                        {erFarDelAvSøknaden(hvemPlanlegger) && (
                            <BodyShort>
                                <FormattedMessage
                                    id="ErFødtPanel.Født.InfoboksTekst.toFørsteUkerDekket"
                                    values={{
                                        erFar: erFarMedISøknaden,
                                        hvem: finnSøker2Tekst(intl, hvemPlanlegger),
                                    }}
                                />
                            </BodyShort>
                        )}
                    </VStack>
                </Infobox>
            )}

            {/* kan søke allerede nå */}
            {termindato !== undefined &&
                dayjs(termindato).isSameOrAfter(TODAY) &&
                dayjs(TODAY).isSameOrAfter(datoSvangerskapsuke22) && (
                    <Infobox
                        header={
                            <FormattedMessage id="ErIkkeFødtPanel.UnderTreMndTilTerminInfo" values={{ erAlenesøker }} />
                        }
                        icon={
                            <TasklistStartIcon height={24} width={24} color="#7F8900" fontSize="1.5rem" aria-hidden />
                        }
                        shouldFadeIn
                        color="green"
                    >
                        <VStack gap="2">
                            <BodyShort>
                                <FormattedMessage id="ErIkkeFødtPanel.ForeldrepengerInfoTekst.kanSøke" />

                                {erFedre || erFar ? (
                                    <FormattedMessage
                                        id="ErFødtPanel.Født.InfoboksTekst.NAVanbefaler"
                                        values={{
                                            erMorDelAvSøknaden: false,
                                        }}
                                    />
                                ) : (
                                    <FormattedMessage
                                        id="ErFødtPanel.Født.InfoboksTekst.NAVanbefaler"
                                        values={{
                                            erMorDelAvSøknaden: true,
                                        }}
                                    />
                                )}
                            </BodyShort>
                            {!erFedre && (
                                <>
                                    <BodyShort>
                                        {hvemPlanlegger.type === HvemPlanleggerType.MOR && (
                                            <FormattedMessage
                                                id="ErIkkeFødtPanel.UnderTreMndTilTermin"
                                                values={{ erAlenesøker }}
                                            />
                                        )}
                                    </BodyShort>
                                    {!erAlenesøker && (
                                        <BodyShort>
                                            <FormattedMessage
                                                id="ErIkkeFødtPanel.UnderTreMndTilTermin"
                                                values={{
                                                    erAlenesøker,
                                                    navn: getFornavnPåSøker1(hvemPlanlegger, intl),
                                                }}
                                            />
                                        </BodyShort>
                                    )}
                                    {(!erAlenesøker || hvemPlanlegger.type === HvemPlanleggerType.FAR) && (
                                        <BodyShort>
                                            <FormattedMessage
                                                id="ErIkkeFødtPanel.ForeldrepengerInfoTekst.toFørsteUkerDekket"
                                                values={{
                                                    erAlenesøker,
                                                    erFar: erFarMedISøknaden,
                                                    hvem: finnAnnenPartTekst(intl, hvemPlanlegger),
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
                            <TasklistStartIcon height={24} width={24} color="#7F8900" fontSize="1.5rem" aria-hidden />
                        }
                        shouldFadeIn
                        color="green"
                    >
                        <VStack gap="2">
                            <BodyShort>
                                <FormattedMessage id="ErIkkeFødtPanel.ForeldrepengerInfoTekst.kanSøke" />
                            </BodyShort>
                            <BodyShort>
                                {!erFedre ? (
                                    <FormattedMessage
                                        id="ErFødtPanel.Født.InfoboksTekst.NAVanbefaler"
                                        values={{
                                            erMorDelAvSøknaden: true,
                                        }}
                                    />
                                ) : (
                                    <FormattedMessage
                                        id="ErFødtPanel.Født.InfoboksTekst.NAVanbefaler"
                                        values={{
                                            erMorDelAvSøknaden: false,
                                        }}
                                    />
                                )}
                            </BodyShort>
                            {erFarDelAvSøknaden(hvemPlanlegger) && !erFedre && (
                                <BodyShort>
                                    <FormattedMessage
                                        id="ErIkkeFødtPanel.ForeldrepengerInfoTekst.toFørsteUkerDekket"
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
