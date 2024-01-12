import { FormattedMessage, useIntl } from 'react-intl';
import { Heading } from '@navikt/ds-react';
import { SenereUtenlandsoppholdPanel } from '@navikt/fp-utenlandsopphold';
import { UtenlandsoppholdSenere } from '@navikt/fp-types';
import { ContentWrapper } from '@navikt/fp-ui';
import { notEmpty } from '@navikt/fp-validation';
import useFortsettSøknadSenere from 'app/utils/hooks/useFortsettSøknadSenere';
import SøknadRoutes from 'app/routes/routes';
import { ContextDataType, useContextGetData, useContextSaveData } from 'app/context/SvpDataContext';
import { useStepConfig } from '../stepsConfig';
import { Søkerinfo } from 'app/types/Søkerinfo';

type Props = {
    mellomlagreSøknadOgNaviger: () => Promise<void>;
    avbrytSøknad: () => void;
    søkerInfo: Søkerinfo;
};

const SenereUtenlandsoppholdSteg: React.FunctionComponent<Props> = ({
    mellomlagreSøknadOgNaviger,
    avbrytSøknad,
    søkerInfo,
}) => {
    const intl = useIntl();
    const stepConfig = useStepConfig(intl, søkerInfo.arbeidsforhold).map((config) => ({
        ...config,
        isSelected: config.id === 'boIUtlandetIFremtid',
    }));
    const onFortsettSøknadSenere = useFortsettSøknadSenere();

    const utenlandsopphold = notEmpty(useContextGetData(ContextDataType.UTENLANDSOPPHOLD));
    const senereUtenlandsopphold = useContextGetData(ContextDataType.UTENLANDSOPPHOLD_SENERE);

    const oppdaterSenereUtenlandsopphold = useContextSaveData(ContextDataType.UTENLANDSOPPHOLD_SENERE);
    const oppdaterAppRoute = useContextSaveData(ContextDataType.APP_ROUTE);

    const lagredeSenereUtenlandsopphold =
        senereUtenlandsopphold && senereUtenlandsopphold.senereOpphold.length > 0
            ? {
                  utenlandsoppholdNeste12Mnd: senereUtenlandsopphold.senereOpphold.map((so) => ({
                      fom: so.tidsperiode.fom,
                      tom: so.tidsperiode.tom,
                      landkode: so.land,
                  })),
              }
            : undefined;

    const save = (values: UtenlandsoppholdSenere) => {
        oppdaterSenereUtenlandsopphold({
            senereOpphold: values.utenlandsoppholdNeste12Mnd.map((un) => ({
                land: un.landkode,
                tidsperiode: {
                    fom: un.fom,
                    tom: un.tom,
                },
            })),
        });

        oppdaterAppRoute(SøknadRoutes.ARBEID);
        return mellomlagreSøknadOgNaviger();
    };

    const goToPreviousStep = () => {
        const appRoute = utenlandsopphold.iNorgeSiste12Mnd
            ? SøknadRoutes.UTENLANDSOPPHOLD
            : SøknadRoutes.HAR_BODD_I_UTLANDET;

        oppdaterAppRoute(appRoute);
        mellomlagreSøknadOgNaviger();
    };
    const saveOnPrevious = () => {
        // TODO (TOR) Lagre uvalidert data i framtida
    };

    return (
        <ContentWrapper>
            <Heading size="large">
                <FormattedMessage id="søknad.pageheading" />
            </Heading>
            <SenereUtenlandsoppholdPanel
                senereUtenlandsopphold={lagredeSenereUtenlandsopphold}
                saveOnNext={save}
                saveOnPrevious={saveOnPrevious}
                cancelApplication={avbrytSøknad}
                onContinueLater={onFortsettSøknadSenere}
                goToPreviousStep={goToPreviousStep}
                stepConfig={stepConfig}
            />
        </ContentWrapper>
    );
};

export default SenereUtenlandsoppholdSteg;