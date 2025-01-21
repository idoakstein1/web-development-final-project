export type ContentProps = {
    content: { id: string; text: string };
    handleMarkAsWatched: (id: string) => void;
};
