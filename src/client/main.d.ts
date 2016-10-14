///<reference path="../../node_modules/redux/index.d.ts" />
interface AlertDescription {
    type?: string;
    alert_id?: string;
    title?: string;
    message?: string;
    timeout?: number;
}
interface Window {
    ajaxify: {
        data: {
            bodyClass: string;
            loggedIn: boolean;
            relative_path: string;
            url: string;
        }
        loadData: (path: string, callback: (error: Error, data: any) => void) => void;
        go: (path: string) => void;
    };
    devToolsExtension: any;
    socket: {
        emit: (eventId: string, data: any, callback: (err, data) => void) => void;
        on: (eventId: string, data: any) => void;
    };
    app: {
        alert: (def: AlertDescription) => void;
    };
}

interface EventTarget {
    value: any;
}



