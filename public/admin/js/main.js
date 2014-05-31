require.config({
    baseUrl: "/admin/js/libs",
    shim: {
        "angular": {
            exports: "angular"
        },
        "angular-resource": {
            deps: ["angular"]
        },
    },
    paths: {
        
    },
    waitSeconds: 15
});