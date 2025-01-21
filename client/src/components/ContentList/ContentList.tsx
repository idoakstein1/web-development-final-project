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
import { useState } from 'react';
import { Content } from './Content';
import { contentListContainerStyle, contentListStyle } from './styles';

const initialContent = [
    { id: '1', text: 'Movie 1' },
    { id: '2', text: 'Movie 2' },
    { id: '3', text: 'Movie 3' },
    { id: '4', text: 'Movie 4' },
    { id: '5', text: 'Movie 5' },
    { id: '6', text: 'Movie 6' },
    { id: '7', text: 'Movie 7' },
    { id: '8', text: 'Movie 8' },
    { id: '9', text: 'Movie 9' },
    { id: '10', text: 'Movie 10' },
    { id: '11', text: 'Movie 11' },
    { id: '12', text: 'Movie 12' },
    { id: '13', text: 'Movie 13' },
    { id: '14', text: 'Movie 14' },
    { id: '15', text: 'Movie 15' },
    { id: '16', text: 'Movie 16' },
    { id: '17', text: 'Movie 17' },
    { id: '18', text: 'Movie 18' },
    { id: '19', text: 'Movie 19' },
    { id: '20', text: 'Movie 20' },
];

export const ContentList = () => {
    const [content, setContent] = useState(initialContent);

    const dndContextProps: DndContextProps = {
        modifiers: [restrictToVerticalAxis, restrictToParentElement],
        collisionDetection: closestCenter,
        sensors: useSensors(
            useSensor(PointerSensor),
            useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
        ),
        onDragEnd: ({ active, over }: DragEndEvent) => {
            if (!over || active.id === over.id) {
                return;
            }

            setContent((prevItems) => {
                const oldIndex = prevItems.findIndex(({ id }) => id === active.id);
                const newIndex = prevItems.findIndex(({ id }) => id === over.id);

                return arrayMove(prevItems, oldIndex, newIndex);
            });
        },
    };

    const handleMarkAsWatched = (id: string) => {
        setContent((prevItems) => prevItems.filter((item) => item.id !== id));
    };

    return (
        <Box sx={contentListContainerStyle}>
            <Typography variant="h3">Watch Later</Typography>
            <DndContext {...dndContextProps}>
                <SortableContext items={content.map(({ id }) => id)} strategy={verticalListSortingStrategy}>
                    <List sx={contentListStyle}>
                        {content.map((item) => (
                            <Content key={item.id} content={item} handleMarkAsWatched={handleMarkAsWatched} />
                        ))}
                    </List>
                </SortableContext>
            </DndContext>
        </Box>
    );
};
