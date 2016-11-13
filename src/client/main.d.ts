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
        on: (eventId: string, callback: (data) => void) => void;
    };
    app: {
        alert: (def: AlertDescription) => void;
    };
    utils: {
        toISOString: (timestamp: number) => string;
    };
    jQuery: any;
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__: any;
}

interface EventTarget {
    value: any;
}

declare module "*.png" {
    var _: string;
    export default _;
}

declare module "*.jpg!jpg" {
    var _: string;
    export default _;
}
