import { Box } from "@mui/material";
import { useNotifications } from "./notificationsState";
import Notification from "./Notification";



const NotificationsManager = () => {

    const {notifications} = useNotifications();

    return (
        <Box
            position="fixed"
            display="flex"
            flexDirection="column"
            alignItems="center"
            zIndex={10}
            sx={{
                top: 0,
                left: '50%',
                transform: 'translateX(-50%)',
            }}
        >
            {notifications.reverse().map((n) => (
                <Notification  key={n.id} notification={n} />
            ))}
        </Box>
    );
}

export default NotificationsManager;
