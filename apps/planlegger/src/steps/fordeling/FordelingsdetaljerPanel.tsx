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
                    color="var(--ax-bg-neutral-strong)"
                    fontSize="1.5rem"
                    aria-hidden
                />
            }
            shouldFadeIn
            color="green"
        >
            <VStack gap="space-8">
                <BodyShort>
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
                </BodyShort>
                <BodyShort>
                    <FormattedMessage
                        id="FordelingsdetaljerPanel.Infoboks.Periode"
                        values={{
                            hvem: capitalizeFirstLetter(fornavnSøker1),
                            fom: intl.formatDate(startdatoPeriode1, {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                            }),
                            tom: intl.formatDate(sluttdatoPeriode1, {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                            }),
                            b: (b) => <b>{b}</b>,
                        }}
                    />
                </BodyShort>
            </VStack>
            {fornavnSøker2 && sluttdatoPeriode2 && (
                <BodyShort>
                    <FormattedMessage
                        id="FordelingsdetaljerPanel.Infoboks.Periode"
                        values={{
                            hvem: capitalizeFirstLetter(fornavnSøker2),
                            fom: intl.formatDate(startdatoPeriode2, {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                            }),
                            tom: intl.formatDate(sluttdatoPeriode2, {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric',
                            }),
                            b: (b) => <b>{b}</b>,
                        }}
                    />
                </BodyShort>
            )}
        </Infobox>
    );
};
