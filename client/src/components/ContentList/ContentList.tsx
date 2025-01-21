import {
    closestCenter,
    DndContext,
    DndContextProps,
    DragEndEvent,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
} from '@dnd-kit/core';
import { restrictToParentElement, restrictToVerticalAxis } from '@dnd-kit/modifiers';
import {
    arrayMove,
    SortableContext,
    sortableKeyboardCoordinates,
    verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Box, List, Typography } from '@mui/material';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useAPI, useAuth } from '../../hooks';
import { Loader } from '../Loader';
import { Content } from './Content';
import { contentListContainerStyle, contentListStyle } from './styles';

export const ContentList = () => {
    const API = useAPI();
    const { user, setUser } = useAuth();
    const queryClient = useQueryClient();
    const { data, isLoading } = useQuery({
        queryKey: ['watchLater', user._id],
        queryFn: async () => API.watchLater.get(),
    });

    const dndContextProps: DndContextProps = {
        modifiers: [restrictToVerticalAxis, restrictToParentElement],
        collisionDetection: closestCenter,
        sensors: useSensors(
            useSensor(PointerSensor),
            useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
        ),
        onDragEnd: async ({ active, over }: DragEndEvent) => {
            if (!data || !over || active.id === over.id) {
                return;
            }

            const oldIndex = data.watchLater.findIndex(({ id }) => id === active.id);
            const newIndex = data.watchLater.findIndex(({ id }) => id === over.id);

            const newWatchList = arrayMove(data.watchLater, oldIndex, newIndex);

            await API.watchLater.update(newWatchList.map(({ id }) => id));
            queryClient.invalidateQueries({ queryKey: ['watchLater', user._id] });
            setUser({ ...user, watchLater: newWatchList });
        },
    };

    const handleMarkAsWatched = async (contentId: string) => {
        await API.watchLater.update(user.watchLater.filter(({ id }) => id !== contentId).map(({ id }) => id));
        queryClient.invalidateQueries({ queryKey: ['watchLater', user._id] });
        setUser({ ...user, watchLater: user.watchLater.filter(({ id }) => id !== contentId) });
    };

    if (isLoading || !data) {
        return <Loader />;
    }

    return (
        <Box sx={contentListContainerStyle}>
            <Typography variant="h3">Watch Later</Typography>
            <DndContext {...dndContextProps}>
                <SortableContext items={data.watchLater.map(({ id }) => id)} strategy={verticalListSortingStrategy}>
                    <List sx={contentListStyle}>
                        {data.watchLater.map((content) => (
                            <Content key={content.id} content={content} handleMarkAsWatched={handleMarkAsWatched} />
                        ))}
                    </List>
                </SortableContext>
            </DndContext>
        </Box>
    );
};
