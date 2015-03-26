// could import all types (tsd.d.ts references other type declarations)...
// /// <reference path="../../typings/tsd.d.ts" />
// ... or import just ones that this file really uses
/// <reference path="../typings/angularjs/angular.d.ts" />
/// <reference path="../typings/toastr/toastr.d.ts" />
(function() {
    'use strict';

    var core:ng.IModule = angular.module('app.core');

    core.config(toastrConfig);

    /* @ngInject */
    function toastrConfig(toastr: Toastr) {
        toastr.options.timeOut = 4000;
        toastr.options.positionClass = 'toast-bottom-right';
    }

    var config = {
        appErrorPrefix: '[Timetracker error] ', //Configure the exceptionHandler decorator
        appTitle: 'Timetracker application'
    };

    core.value('config', config);

    core.config(configure);
    
    /* @ngInject */
    function configure ($compileProvider: ng.ICompileProvider, $logProvider: ng.ILogProvider, routerHelperProvider, exceptionHandlerProvider) {

        $compileProvider.debugInfoEnabled(false);

        // turn debugging off/on (no info or warn)
        if ($logProvider.debugEnabled) {
            $logProvider.debugEnabled(true);
        }
        exceptionHandlerProvider.configure(config.appErrorPrefix);
        configureStateHelper();

        ////////////////

        function configureStateHelper() {
            var resolveAlways = { /* @ngInject */
                ready: function (dataservice) {
                    return dataservice.ready();
                }
            };

            routerHelperProvider.configure({
                docTitle: 'Timetracker: ',
                resolveAlways: resolveAlways
            });
        }
    }
})();
