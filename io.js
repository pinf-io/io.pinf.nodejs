
module.exports.overlays = {
    name: "nodejs",
    defaultConfig: {
        "httpd": {
            "port": null
        }
    },
    toStandardConfig: function(config) {
        return {
            "io": {
                "port": (config && config.httpd.port) || null
            }
        };
    },
    fromStandardConfig: function(config) {
        return {
            "httpd": {
                "port": config.io.port
            }
        };
    },
    getLaunchScript: function($pinf, config, options) {
        var args = [
            "node",
            $pinf.config.scriptPath
        ];
        args = args.concat([
            ">", options.stdoutPath,
            "2>", options.stderrPath
        ]);
        return [
            "#!/bin/sh",
            "export PORT=" + config.httpd.port,
            args.join(" ")
        ].join("\n");
    }
};

require("pinf-io-daemonize/io").forModule(module, module.exports.overlays);
