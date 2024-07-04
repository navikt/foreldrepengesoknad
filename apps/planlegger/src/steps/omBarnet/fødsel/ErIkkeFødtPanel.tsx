import { TasklistStartIcon } from '@navikt/aksel-icons';
import dayjs from 'dayjs';
import { useFormContext } from 'react-hook-form';
import { FormattedMessage, IntlShape, useIntl } from 'react-intl';
import { OmBarnet } from 'types/Barnet';
import { HvemPlanlegger, Situasjon } from 'types/HvemPlanlegger';
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

import { Datepicker } from '@navikt/fp-form-hooks';
import { BluePanel, Infobox } from '@navikt/fp-ui';
import { isLessThanThreeWeeksAgo, isRequired, isValidDate } from '@navikt/fp-validation';

const DATO_22_UKER_FRAM = dayjs().startOf('days').add(22, 'weeks');

const TODAY = dayjs().startOf('days').toDate();
const finnAnnenPartTekst = (intl: IntlShape, hvemPlanlegger: HvemPlanlegger): string | undefined => {
    if (hvemPlanlegger.type === Situasjon.MOR_OG_MEDMOR) {
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
    antallBarn?: string;
    scrollToBottom: () => void;
};

const ErIkkeFødtPanel: React.FunctionComponent<Props> = ({
    hvemPlanlegger,
    erOmBarnetIkkeOppgittFraFør,
    scrollToBottom,
}) => {
    const intl = useIntl();

    const formMethods = useFormContext<OmBarnet>();
    const termindato = formMethods.watch('termindato');

    const datoSvangerskapsuke22 =
        termindato !== undefined ? dayjs(termindato).subtract(18, 'weeks').subtract(3, 'days').toDate() : undefined;

    const erAlenesøker = erAlene(hvemPlanlegger);
    const erFarMedISøknaden = erFarDelAvSøknaden(hvemPlanlegger);
    const erFedre = erFarOgFar(hvemPlanlegger);
    const erFar = hvemPlanlegger.type === Situasjon.FAR;

    return (
        <VStack gap="5">
            <BluePanel isDarkBlue={erOmBarnetIkkeOppgittFraFør} shouldFadeIn>
                <Datepicker
                    label={<FormattedMessage id="ErIkkeFødtPanel.Termin" />}
                    name="termindato"
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
            {termindato !== undefined && dayjs(termindato).isBefore(TODAY) && (
                <Infobox
                    header={<FormattedMessage id="ErFødtPanel.Født.InfoboksTittel" values={{ erAlenesøker }} />}
                    icon={<TasklistStartIcon height={24} width={24} color="#7F8900" fontSize="1.5rem" aria-hidden />}
                    shouldFadeIn
                >
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
                </Infobox>
            )}
            {termindato !== undefined && dayjs(termindato).isAfter(DATO_22_UKER_FRAM) && (
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
                    icon={<TasklistStartIcon height={24} width={24} color="#7F8900" fontSize="1.5rem" aria-hidden />}
                    shouldFadeIn
                >
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
                </Infobox>
            )}
            {termindato !== undefined &&
                dayjs(termindato).isSameOrAfter(TODAY) &&
                dayjs(termindato).isSameOrBefore(DATO_22_UKER_FRAM) && (
                    <Infobox
                        header={
                            <FormattedMessage id="ErIkkeFødtPanel.UnderTreMndTilTerminInfo" values={{ erAlenesøker }} />
                        }
                        icon={
                            <TasklistStartIcon height={24} width={24} color="#7F8900" fontSize="1.5rem" aria-hidden />
                        }
                        shouldFadeIn
                    >
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
                                    {hvemPlanlegger.type === Situasjon.MOR && (
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
                                {(!erAlenesøker || hvemPlanlegger.type === Situasjon.FAR) && (
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
                    </Infobox>
                )}
        </VStack>
    );
};
export default ErIkkeFødtPanel;
