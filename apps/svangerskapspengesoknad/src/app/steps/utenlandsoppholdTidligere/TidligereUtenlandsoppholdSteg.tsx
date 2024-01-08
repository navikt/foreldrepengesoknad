import { FormattedMessage, useIntl } from 'react-intl';
import { Heading } from '@navikt/ds-react';
import { TidligereUtenlandsoppholdPanel } from '@navikt/fp-utenlandsopphold';
import { UtenlandsoppholdTidligere } from '@navikt/fp-types';
import { ContentWrapper } from '@navikt/fp-ui';
import useFortsettSøknadSenere from 'app/utils/hooks/useFortsettSøknadSenere';
import SøknadRoutes from 'app/routes/routes';
import { getPreviousStep, useStepConfig } from '../stepsConfig';
import { ContextDataType, useContextGetData, useContextSaveData } from 'app/context/SvpDataContext';
import { notEmpty } from '@navikt/fp-validation';
import { Søkerinfo } from 'app/types/Søkerinfo';

type Props = {
    mellomlagreSøknadOgNaviger: () => Promise<void>;
    avbrytSøknad: () => void;
    søkerInfo: Søkerinfo;
};

const TidligereUtenlandsoppholdSteg: React.FunctionComponent<Props> = ({
    mellomlagreSøknadOgNaviger,
    avbrytSøknad,
    søkerInfo,
}) => {
    const intl = useIntl();
    const stepConfig = useStepConfig(intl, søkerInfo.arbeidsforhold).map((config) => ({
        ...config,
        isSelected: config.id === 'boIUtlandetIFortid',
    }));
    const onFortsettSøknadSenere = useFortsettSøknadSenere();

    const utenlandsopphold = notEmpty(useContextGetData(ContextDataType.UTENLANDSOPPHOLD));
    const tidligereUtenlandsopphold = useContextGetData(ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE);
    const oppdaterTidligereUtenlandsopphold = useContextSaveData(ContextDataType.UTENLANDSOPPHOLD_TIDLIGERE);
    const oppdaterAppRoute = useContextSaveData(ContextDataType.APP_ROUTE);

    const lagredeTidligereUtenlandsopphold =
        tidligereUtenlandsopphold && tidligereUtenlandsopphold.tidligereOpphold.length > 0
            ? {
                  utenlandsoppholdSiste12Mnd: tidligereUtenlandsopphold.tidligereOpphold.map((so) => ({
                      fom: so.tidsperiode.fom,
                      tom: so.tidsperiode.tom,
                      landkode: so.land,
                  })),
              }
            : undefined;

    const save = (values: UtenlandsoppholdTidligere) => {
        oppdaterTidligereUtenlandsopphold({
            tidligereOpphold: values.utenlandsoppholdSiste12Mnd.map((un) => ({
                land: un.landkode,
                tidsperiode: {
                    fom: un.fom,
                    tom: un.tom,
                },
            })),
        });

        const nesteSide = utenlandsopphold.iNorgeNeste12Mnd ? SøknadRoutes.ARBEID : SøknadRoutes.SKAL_BO_I_UTLANDET;
        oppdaterAppRoute(nesteSide);
        return mellomlagreSøknadOgNaviger();
    };

    const goToPreviousStep = () => {
        oppdaterAppRoute(getPreviousStep('boIUtlandetIFortid'));
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
            <TidligereUtenlandsoppholdPanel
                tidligereUtenlandsopphold={lagredeTidligereUtenlandsopphold}
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

export default TidligereUtenlandsoppholdSteg;
