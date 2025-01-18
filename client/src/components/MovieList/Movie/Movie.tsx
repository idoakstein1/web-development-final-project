import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { CheckCircleOutline, DragIndicator } from '@mui/icons-material';
import { IconButton, IconButtonProps, ListItem, ListItemIcon, ListItemProps, ListItemText, Paper } from '@mui/material';
import { MovieProps } from './types';

export const Movie = ({ movie: { id, text }, handleMarkAsWatched }: MovieProps) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

    const iconButtonProps: IconButtonProps = {
        edge: 'end',
        color: 'primary',
        onClick: () => handleMarkAsWatched(id),
        onPointerDown: (event) => event.stopPropagation(),
    };

    const listItemProps: ListItemProps = {
        sx: { transform: CSS.Transform.toString(transform), transition, borderRadius: '10px' },
        ref: setNodeRef,
        component: Paper,
        secondaryAction: (
            <IconButton {...iconButtonProps}>
                <CheckCircleOutline />
            </IconButton>
        ),
        ...attributes,
        ...listeners,
    };

    return (
        <ListItem {...listItemProps}>
            <ListItemIcon>
                <DragIndicator />
            </ListItemIcon>
            <ListItemText primary={text} />
        </ListItem>
    );
};
