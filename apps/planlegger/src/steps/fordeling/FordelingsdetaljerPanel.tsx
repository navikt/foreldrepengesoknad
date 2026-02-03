import { CalendarIcon } from '@navikt/aksel-icons';
import { FormattedMessage, useIntl } from 'react-intl';
import { OmBarnet } from 'types/Barnet';
import { HvemPlanlegger } from 'types/HvemPlanlegger';
import { erAlenesøker, erMorDelAvSøknaden } from 'utils/HvemPlanleggerUtils';
import { erBarnetFødt } from 'utils/barnetUtils';
import { Uttaksdata } from 'utils/uttakUtils';

import { BodyShort, VStack } from '@navikt/ds-react';

import { Infobox } from '@navikt/fp-ui';
import { capitalizeFirstLetter } from '@navikt/fp-utils';
import { periodFormat } from '@navikt/fp-utils/src/periodUtils';

interface Props {
    barnet: OmBarnet;
    hvemPlanlegger: HvemPlanlegger;
    uttaksdata: Uttaksdata;
    fornavnSøker1: string;
    fornavnSøker2?: string;
}

export const FordelingsdetaljerPanel = ({
    barnet,
    hvemPlanlegger,
    uttaksdata,
    fornavnSøker1,
    fornavnSøker2,
}: Props) => {
    const intl = useIntl();
    const antallBarn = barnet.antallBarn;
    const erFødsel = barnet.erFødsel;
    const erFødt = erBarnetFødt(barnet);

    const { startdatoPeriode1, sluttdatoPeriode1, startdatoPeriode2, sluttdatoPeriode2, familiehendelsedato } =
        uttaksdata;
    const dato = intl.formatDate(familiehendelsedato, { day: 'numeric', month: 'short', year: 'numeric' });

    return (
        <Infobox
            header={<FormattedMessage id="FordelingsdetaljerPanel.InfoboksTittel" />}
            icon={
                <CalendarIcon
                    height={24}
                    width={24}
                    color="var(--ax-text-neutral-strong)"
                    fontSize="1.5rem"
                    aria-hidden
                />
            }
            shouldFadeIn
            color="green"
        >
            <VStack gap="space-8">
                {erFødsel && (
                    <>
                        <BodyShort>
                            <FormattedMessage
                                id="FordelingsdetaljerPanel.Infoboks.HvisBarnet"
                                values={{
                                    erFødt,
                                    dato: dato,
                                    erMorDelAvSøknaden: erMorDelAvSøknaden(hvemPlanlegger),
                                    erFlereBarn: antallBarn !== '1',
                                }}
                            />
                        </BodyShort>
                        <BodyShort>
                            <FormattedMessage
                                id="FordelingsdetaljerPanel.Infoboks.HvisBarnetDel2"
                                values={{
                                    erAlenesøker: erAlenesøker(hvemPlanlegger),
                                }}
                            />
                        </BodyShort>
                    </>
                )}
                {!erFødsel && (
                    <>
                        <BodyShort>
                            <FormattedMessage
                                id="FordelingsdetaljerPanel.Infoboks.HvisAdopsjon"
                                values={{
                                    antallBarn,
                                    dato: dato,
                                    erMorDelAvSøknaden: erMorDelAvSøknaden(hvemPlanlegger),
                                }}
                            />
                        </BodyShort>
                        <BodyShort>
                            <FormattedMessage
                                id="FordelingsdetaljerPanel.Infoboks.HvisAdopsjonDel2"
                                values={{
                                    dato: dato,
                                }}
                            />
                        </BodyShort>
                    </>
                )}
                <BodyShort weight="semibold">
                    <FormattedMessage
                        id="FordelingsdetaljerPanel.Infoboks.Periode"
                        values={{
                            hvem: capitalizeFirstLetter(fornavnSøker1),
                            periode: periodFormat(startdatoPeriode1, sluttdatoPeriode1, intl, {
                                separator: '–',
                                useShortMonth: true,
                            }),
                        }}
                    />
                </BodyShort>
                {fornavnSøker2 && sluttdatoPeriode2 && startdatoPeriode2 && (
                    <BodyShort weight="semibold">
                        <FormattedMessage
                            id="FordelingsdetaljerPanel.Infoboks.Periode"
                            values={{
                                hvem: capitalizeFirstLetter(fornavnSøker2),
                                periode: periodFormat(startdatoPeriode2, sluttdatoPeriode2, intl, {
                                    separator: '–',
                                    useShortMonth: true,
                                }),
                            }}
                        />
                    </BodyShort>
                )}
            </VStack>
        </Infobox>
    );
};
