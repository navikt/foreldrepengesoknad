import { HeartFillIcon } from '@navikt/aksel-icons';
import { FunctionComponent } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';
import { OmBarnet } from 'types/Barnet';
import { HvemPlanlegger, Situasjon } from 'types/HvemPlanlegger';
import { finnSøker1Tekst, finnSøker2Tekst, getFornavnPåSøker1, getFornavnPåSøker2 } from 'utils/HvemPlanleggerUtils';
import { erBarnetAdoptert, erBarnetFødt, erBarnetUFødt } from 'utils/barnetUtils';
import { HvemHarRett } from 'utils/hvemHarRettUtils';
import { TilgjengeligStønadskonto } from 'utils/stønadskontoerUtils';
import { Uttaksdata } from 'utils/uttakUtils';

import { BodyShort, HStack, VStack } from '@navikt/ds-react';

import AktivitetskravLabel from './AktivitetskravLabel';
import AntallUkerFpLabel from './AntallUkerFpLabel';
import ForeldrepengerLabel from './ForeldrepengerLabel';
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
    const søker1Tekst =
        erFarOgFar && hvemPlanlegger.navnPåMedfar
            ? getFornavnPåSøker1(hvemPlanlegger, intl)
            : finnSøker1Tekst(intl, hvemPlanlegger);
    const søker2Tekst =
        erFarOgFar && hvemPlanlegger.navnPåMedfar
            ? getFornavnPåSøker2(hvemPlanlegger, intl)
            : finnSøker2Tekst(intl, hvemPlanlegger);

    const { startdatoPeriode1, sluttdatoPeriode1, startdatoPeriode2, sluttdatoPeriode2, familiehendelsedato } =
        uttaksdata;

    const erFarOgFarOgFødsel = erFarOgFar && !erAdoptert;
    const skalViseAntallUkerLabels =
        !erFarOgFarOgFødsel &&
        (hvemHarRett === 'beggeHarRett' || hvemHarRett === 'kunFarSøker1HarRett' || hvemHarRett === 'kunMorHarRett');
    const skalViseAktivitetskravLabels =
        !erFarOgFarOgFødsel &&
        søker2Tekst &&
        startdatoPeriode2 &&
        sluttdatoPeriode2 &&
        (hvemHarRett === 'kunMedmorEllerFarSøker2HarRett' || hvemHarRett === 'kunMedfarHarRett');

    return (
        <VStack gap={{ sm: '1', md: '2' }}>
            {skalViseAntallUkerLabels && (
                <HStack gap="1">
                    <AntallUkerFpLabel
                        søkerTekst={søker1Tekst}
                        startdato={startdatoPeriode1}
                        sluttdato={sluttdatoPeriode1}
                        isBluePanel
                    />
                    {søker2Tekst && hvemHarRett === 'beggeHarRett' && startdatoPeriode2 && sluttdatoPeriode2 && (
                        <AntallUkerFpLabel
                            søkerTekst={søker2Tekst}
                            startdato={startdatoPeriode2}
                            sluttdato={sluttdatoPeriode2}
                        />
                    )}
                </HStack>
            )}
            {skalViseAktivitetskravLabels && (
                <>
                    <AktivitetskravLabel
                        utenAktivitetskrav
                        valgtStønadskonto={valgtStønadskonto}
                        hvemPlanlegger={hvemPlanlegger}
                        annenPartTekst={søker2Tekst}
                        startdato={startdatoPeriode1}
                        sluttdato={sluttdatoPeriode1}
                        isBluePanel
                    />
                    <AktivitetskravLabel
                        valgtStønadskonto={valgtStønadskonto}
                        hvemPlanlegger={hvemPlanlegger}
                        annenPartTekst={søker2Tekst}
                        startdato={startdatoPeriode2}
                        sluttdato={sluttdatoPeriode2}
                    />
                </>
            )}
            <HStack gap="2">
                {erFarOgFarOgFødsel && (
                    <ForeldrepengerLabel startdato={startdatoPeriode1} sluttdato={sluttdatoPeriode1} />
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
            </HStack>
        </VStack>
    );
};

export default OversiktLabels;
