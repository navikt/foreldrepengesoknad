interface Props {
    isBlue?: boolean;
}

export const HorizontalLine = ({ isBlue = false }: Props) => {
    return <hr style={{ width: '100%', border: 'none', height: '1px' }} color={isBlue ? '#66A3C4' : '#99C4DD'} />;
};
