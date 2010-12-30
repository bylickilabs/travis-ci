var BuildView = Backbone.View.extend({
  initialize: function(args) {
    _.bindAll(this, 'bind', 'unbind', 'render', 'build_log', 'build_updated', 'build_finished', 'update_summary', 'append_log');

    this.app = args.app;
    this.template = args.templates['builds/show'];
    this.element = $('#right');
  },
  bind: function() {
    Backbone.Events.bind.apply(this, arguments);
    // this.build.repository.bind('changed', this.build_updated);
    this.app.bind('build:log', this.build_log);
    this.app.bind('build:finished', this.build_finished);
  },
  unbind: function() {
    Backbone.Events.unbind.apply(this, arguments);
    this.app.unbind('build:log', this.build_log);
    this.app.unbind('build:finished', this.build_finished);
  },
  render: function(build) {
    this.build = build;
    this.bind();
    this.element.html($(this.template(this.build.toJSON())));
    $('.log', this.element).deansi();
  },
  build_log: function(data) {
    this.append_log(data.id, data.append_log);
  },
  build_updated: function(repository) {
    // this.update_summary(repository.build.toJSON());
  },
  build_finished: function(data) {
    this.update_summary(data.repository.last_build);
  },
  update_summary: function(attributes) {
    $('#build_' + attributes.id + ' .summary', this.element).replaceWith($(this.template(attributes)));
    Util.update_times();
  },
  append_log: function(id, chars) {
    var element = $('#build_' + id + ' .log', this.element);
    element.append(chars);
    element.deansi();
  }
});

