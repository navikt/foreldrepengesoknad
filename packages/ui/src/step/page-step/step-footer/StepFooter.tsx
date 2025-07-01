import { AvsluttModal } from './AvsluttModal';
import { FortsettSenereModal } from './FortsettSenereModal';

interface Props {
    onAvsluttOgSlett?: () => void;
    onFortsettSenere?: () => void;
}

export const StepFooter = ({ onAvsluttOgSlett, onFortsettSenere }: Props) => {
    return (
        <>
            {onFortsettSenere ? <FortsettSenereModal onFortsettSenere={onFortsettSenere} /> : <div />}
            {onAvsluttOgSlett ? <AvsluttModal onAvsluttOgSlett={onAvsluttOgSlett} /> : <div />}
        </>
    );
};
