export type MovieProps = {
    movie: { id: string; text: string };
    handleMarkAsWatched: (id: string) => void;
};
