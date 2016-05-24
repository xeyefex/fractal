'use strict';

const _           = require('lodash');
const promisedHbs = require('promised-handlebars');
const Handlebars  = require('handlebars');
const Adapter     = require('@frctl/fractal').Adapter;

class HandlebarsAdapter extends Adapter {

    constructor() {
        super(...arguments);
        this.on('view:added',   view => this.engine.registerPartial(view.handle, view.content));
        this.on('view:removed', view => this.engine.unregisterPartial(view.handle));
        this.on('view:updated', view => this.engine.registerPartial(view.handle, view.content));
    }

    render(path, str, context, meta) {
        const template = this.engine.compile(str);
        return this._resolve(template(context));
    }

}

module.exports = function(config) {

    config = config || {};

    return {

        register(source, app) {

            const hbs = promisedHbs(Handlebars);
            const adapter = new HandlebarsAdapter(hbs, source);

            if (!config.pristine) {
                _.each(require('./helpers')(app) || {}, function(helper, name){
                    hbs.registerHelper(name, helper);
                });
                _.each(require('./partials')(app) || {}, function(partial, name){
                    hbs.registerPartial(name, partial);
                });
            }

            _.each(config.helpers, function(helper, name){
                hbs.registerHelper(name, helper);
            });
            _.each(config.partials, function(partial, name){
                hbs.registerPartial(name, partial);
            });

            return adapter;
        }
    }

};