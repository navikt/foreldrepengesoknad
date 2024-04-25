import { HeartFillIcon } from '@navikt/aksel-icons';
import { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { OmBarnet } from 'types/Barnet';
import { HvemPlanlegger, Situasjon } from 'types/HvemPlanlegger';
import {
    finnAnnenPartTekst,
    finnSøkerTekst,
    getFornavnPåAnnenPart,
    getFornavnPåSøker,
} from 'utils/HvemPlanleggerUtils';
import { erBarnetAdoptert, erBarnetFødt, erBarnetUFødt } from 'utils/barnetUtils';
import { HvemHarRett } from 'utils/hvemHarRettUtils';
import { TilgjengeligStønadskonto } from 'utils/stønadskontoerUtils';
import { Uttaksdata } from 'utils/uttakUtils';

import { BodyShort, HStack, VStack } from '@navikt/ds-react';

import AktivitetskravLabel from './AktivitetskravLabel';
import AntallUkerFpLabel from './AntallUkerFpLabel';
import styles from './oversiktLabels.module.css';

interface Props {
    barnet: OmBarnet;
    uttaksdata: Uttaksdata;
    hvemPlanlegger: HvemPlanlegger;
    hvemHarRett: HvemHarRett;
    valgtStønadskonto: TilgjengeligStønadskonto[];
}

const OversiktLabels: FunctionComponent<Props> = ({
    barnet,
    uttaksdata,
    hvemPlanlegger,
    hvemHarRett,
    valgtStønadskonto,
}) => {
    const intl = useIntl();

    const erFødt = erBarnetFødt(barnet);
    const erIkkeFødt = erBarnetUFødt(barnet);
    const erAdoptert = erBarnetAdoptert(barnet);

    const erFarOgFar = hvemPlanlegger.type === Situasjon.FAR_OG_FAR;
    const søkerTekst =
        erFarOgFar && hvemPlanlegger.navnPåMedfar
            ? getFornavnPåSøker(hvemPlanlegger, intl)
            : finnSøkerTekst(intl, hvemPlanlegger);
    const annenPartTekst =
        erFarOgFar && hvemPlanlegger.navnPåMedfar
            ? getFornavnPåAnnenPart(hvemPlanlegger, intl)
            : finnAnnenPartTekst(intl, hvemPlanlegger);

    const { startdatoPeriode1, sluttdatoPeriode1, startdatoPeriode2, sluttdatoPeriode2, familiehendelsedato } =
        uttaksdata;

    return (
        <VStack gap={{ sm: '1', md: '2' }}>
            {(hvemHarRett === 'beggeHarRett' ||
                hvemHarRett === 'kunFarSøker1HarRett' ||
                hvemHarRett === 'kunMorHarRett') && (
                <HStack gap="1">
                    <AntallUkerFpLabel
                        søkerTekst={søkerTekst}
                        startdato={startdatoPeriode1}
                        sluttdato={sluttdatoPeriode1}
                    />
                    {annenPartTekst && hvemHarRett === 'beggeHarRett' && startdatoPeriode2 && sluttdatoPeriode2 && (
                        <AntallUkerFpLabel
                            søkerTekst={annenPartTekst}
                            startdato={startdatoPeriode2}
                            sluttdato={sluttdatoPeriode2}
                            isBluePanel={false}
                        />
                    )}
                </HStack>
            )}
            {annenPartTekst &&
                startdatoPeriode2 &&
                sluttdatoPeriode2 &&
                (hvemHarRett === 'kunMedmorEllerFarSøker2HarRett' || hvemHarRett === 'kunMedfarHarRett') && (
                    <>
                        <AktivitetskravLabel
                            utenAktivitetskrav
                            valgtStønadskonto={valgtStønadskonto}
                            hvemPlanlegger={hvemPlanlegger}
                            annenPartTekst={annenPartTekst}
                            startdato={startdatoPeriode1}
                            sluttdato={sluttdatoPeriode1}
                            isBluePanel
                        />
                        <AktivitetskravLabel
                            valgtStønadskonto={valgtStønadskonto}
                            hvemPlanlegger={hvemPlanlegger}
                            annenPartTekst={annenPartTekst}
                            startdato={startdatoPeriode2}
                            sluttdato={sluttdatoPeriode2}
                            isBluePanel={false}
                        />
                    </>
                )}
            <div className={styles.pinkPanel}>
                <HStack gap="2" align="center">
                    <BodyShort>
                        {erFødt && (
                            <FormattedMessage
                                id="OversiktSteg.Fødselsdato"
                                values={{
                                    mnd: familiehendelsedato,
                                    dato: intl.formatDate(barnet.fødselsdato, {
                                        day: '2-digit',
                                        month: 'short',
                                    }),
                                }}
                            />
                        )}
                        {erIkkeFødt && (
                            <FormattedMessage
                                id="OversiktSteg.Termindato"
                                values={{
                                    dato: intl.formatDate(barnet.termindato, {
                                        day: '2-digit',
                                        month: 'short',
                                    }),
                                }}
                            />
                        )}
                        {erAdoptert && (
                            <FormattedMessage
                                id="OversiktSteg.Omsorgsovertakelse"
                                values={{
                                    dato: intl.formatDate(barnet.overtakelsesdato, {
                                        day: '2-digit',
                                        month: 'short',
                                    }),
                                }}
                            />
                        )}
                    </BodyShort>
                    <HeartFillIcon color="#F68282" aria-hidden />
                </HStack>
            </div>
        </VStack>
    );
};

export default OversiktLabels;
