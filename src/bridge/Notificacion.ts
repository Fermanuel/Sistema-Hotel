import { toast } from 'sonner';

// NotificationFactory.ts
interface Notification {
    send(): void;
}

class SuccessNotification implements Notification {
    send(): void {
        toast.success("¡Operación exitosa!");
    }
}

class ErrorNotification implements Notification {
    send(): void {
        toast.error("Hubo un error.");
    }
}

class WarningNotification implements Notification {
    send(): void {
        toast("¡Advertencia!");
    }
}

interface NotificationFactory {
    createNotification(): Notification;
}

class SuccessNotificationFactory implements NotificationFactory {
    createNotification(): Notification {
        return new SuccessNotification();
    }
}

class ErrorNotificationFactory implements NotificationFactory {
    createNotification(): Notification {
        return new ErrorNotification();
    }
}

class WarningNotificationFactory implements NotificationFactory {
    createNotification(): Notification {
        return new WarningNotification();
    }
}

// Uso
function notifyUser(type: string) {
    let factory: NotificationFactory;

    switch (type) {
        case "success":
            factory = new SuccessNotificationFactory();
            break;
        case "error":
            factory = new ErrorNotificationFactory();
            break;
        case "warning":
            factory = new WarningNotificationFactory();
            break;
        default:
            factory = new SuccessNotificationFactory();
    }

    const notification = factory.createNotification();
    notification.send();
}
