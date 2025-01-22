import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { CheckCircleOutline, DragIndicator } from '@mui/icons-material';
import {
    Avatar,
    IconButton,
    IconButtonProps,
    ListItem,
    ListItemAvatar,
    ListItemIcon,
    ListItemProps,
    ListItemText,
    Paper,
} from '@mui/material';
import { ContentProps } from './types';

export const Content = ({ content: { id, name, poster, year }, handleMarkAsWatched }: ContentProps) => {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id });

    const iconButtonProps: IconButtonProps = {
        edge: 'end',
        color: 'primary',
        onClick: () => handleMarkAsWatched(id),
        onPointerDown: (event) => event.stopPropagation(),
    };

    const listItemProps: ListItemProps = {
        sx: { transform: CSS.Transform.toString(transform), transition, borderRadius: '10px', gap: 3 },
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
            <ListItemAvatar>
                <Avatar sx={{ width: '75px', height: '75px' }} src={poster} />
            </ListItemAvatar>
            <ListItemText primary={name} secondary={year} />
        </ListItem>
    );
};
