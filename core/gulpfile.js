var gulp      = require('gulp');
var sass      = require('gulp-sass');
var template  = require('gulp-template-compile');
var concat    = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var htmlmin   = require('gulp-htmlmin');
var htmlClass = require('html-classer-gulp');
var importCss = require('gulp-import-css');
var Path      = require('path');
var debug     = require('gulp-debug');
var stripCssComments = require('gulp-strip-css-comments');
var stripJsComments = require('gulp-strip-comments');
var header = require('gulp-header');
var rootPath  = Path.join(__dirname, "/src/main/web/app/");
var buildPath = Path.join(__dirname, "/src/main/web/app/dist");
var tempPath = Path.join(__dirname, "/src/main/web/app/temp");

var banner = ['/*',
              ' *  Copyright 2014 TWO SIGMA OPEN SOURCE, LLC',
              ' *',
              ' *  Licensed under the Apache License, Version 2.0 (the "License");',
              ' *  you may not use this file except in compliance with the License.',
              ' *  You may obtain a copy of the License at',
              ' *',
              ' *         http://www.apache.org/licenses/LICENSE-2.0',
              ' *',
              ' *  Unless required by applicable law or agreed to in writing, software',
              ' *  distributed under the License is distributed on an "AS IS" BASIS,',
              ' *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.',
              ' *  See the License for the specific language governing permissions and',
              ' *  limitations under the License.',
              ' */',
              ''].join('\n');

var csslist = [
  "src/main/web/app/temp/vendor.css",
  "src/main/web/app/temp/app.css"
];

var jslist = [
  "src/main/web/vendor/flotr2/flotr2.js",
  "src/main/web/vendor/bower_components/big.js/big.js",
  "src/main/web/vendor/bower_components/jquery/jquery.js",
  "src/main/web/vendor/bower_components/datatables/media/js/jquery.dataTables.js",
  "src/main/web/vendor/bower_components/jquery-file-upload/js/vendor/jquery.ui.widget.js",
  "src/main/web/vendor/bower_components/jquery-file-upload/js/jquery.fileupload.js",
  "src/main/web/vendor/ColVis-1.1.1/js/dataTables.colVis.js",
  "src/main/web/vendor/ColReorder-1.1.2/js/dataTables.colReorder.js",
  "src/main/web/vendor/Responsive-1.0.1/js/dataTables.responsive.js",
  "src/main/web/vendor/TableTools-2.2.3/js/dataTables.tableTools.js",
  "src/main/web/vendor/bower_components/angular/angular.js",
  "src/main/web/vendor/bower_components/ngstorage/ngStorage.js",
  "src/main/web/vendor/bower_components/angular-datatables/dist/angular-datatables.js",
  "src/main/web/vendor/bower_components/angular-route/angular-route.js",
  "src/main/web/vendor/bower_components/angular-animate/angular-animate.js",
  "src/main/web/vendor/bower_components/codemirror/lib/codemirror.js",
  "src/main/web/vendor/bower_components/codemirror/addon/hint/show-hint.js",
  "src/main/web/vendor/bower_components/codemirror/addon/hint/javascript-hint.js",
  "src/main/web/vendor/bower_components/codemirror/addon/hint/html-hint.js",
  "src/main/web/vendor/bower_components/codemirror/addon/hint/xml-hint.js",
  "src/main/web/vendor/bower_components/codemirror/addon/edit/matchbrackets.js",
  "src/main/web/vendor/bower_components/codemirror/addon/dialog/dialog.js",
  "src/main/web/vendor/bower_components/codemirror/addon/search/searchcursor.js",
  "src/main/web/vendor/bower_components/codemirror/mode/r/r.js",
  "src/main/web/vendor/bower_components/codemirror/mode/ruby/ruby.js",
  "src/main/web/vendor/bower_components/codemirror/mode/javascript/javascript.js",
  "src/main/web/vendor/bower_components/codemirror/mode/python/python.js",
  "src/main/web/vendor/bower_components/codemirror/mode/julia/julia.js",
  "src/main/web/vendor/bower_components/codemirror/mode/groovy/groovy.js",
  "src/main/web/vendor/bower_components/codemirror/mode/htmlmixed/htmlmixed.js",
  "src/main/web/vendor/bower_components/codemirror/mode/stex/stex.js",
  "src/main/web/vendor/bower_components/codemirror/mode/xml/xml.js",
  "src/main/web/vendor/bower_components/codemirror/mode/css/css.js",
  "src/main/web/vendor/bower_components/codemirror/mode/clike/clike.js",
  "src/main/web/vendor/bower_components/codemirror/keymap/vim.js",
  "src/main/web/vendor/bower_components/codemirror/keymap/emacs.js",
  "src/main/web/vendor/bower_components/q/q.js",
  "src/main/web/vendor/epiceditor/js/epiceditor.js",
  "src/main/web/vendor/bower_components/underscore/underscore-min.js",
  "src/main/web/vendor/bower_components/underscore.string/lib/underscore.string.js",
  "src/main/web/vendor/angular-ui/ui-utils.min.js",
  "src/main/web/vendor/cometd/cometd.js",
  "src/main/web/vendor/cometd/jquery/jquery.cometd.js",
  "src/main/web/vendor/jquery.event.drag/jquery.event.drag.js",
  "src/main/web/vendor/jquery-ui/js/jquery-ui.custom.min.js",
  "src/main/web/vendor/bower_components/angular-bootstrap/ui-bootstrap-tpls.js",
  "src/main/web/vendor/bower_components/bootstrap-sass/assets/javascripts/bootstrap.js",
  "src/main/web/vendor/moment/moment.min.js",
  "src/main/web/vendor/moment/moment-timezone.js",
  "src/main/web/vendor/moment/moment-timezone-data.js",
  "src/main/web/vendor/bower_components/requirejs/require.js"
];

var bkjslist = [
  "src/main/web/app/dist/templates.js",
  "src/main/web/app/controlpanel/controlpanel.js",
  "src/main/web/app/controlpanel/controlpanel-directive.js",
  "src/main/web/app/controlpanel/controlpanelsessionitem-directive.js",
  "src/main/web/app/helpers/cellmenupluginmanager.js",
  "src/main/web/app/helpers/core.js",
  "src/main/web/app/helpers/debug.js",
  "src/main/web/app/helpers/datatables.js",
  "src/main/web/app/helpers/evaluatepluginmanager.js",
  "src/main/web/app/helpers/helper.js",
  "src/main/web/app/helpers/menupluginmanager.js",
  "src/main/web/app/mainapp/mainapp.js",
  "src/main/web/app/mainapp/services/evaluatejobmanager.js",
  "src/main/web/app/mainapp/services/evaluatormanager.js",
  "src/main/web/app/mainapp/services/notebookcellmodelmanager.js",
  "src/main/web/app/mainapp/services/notebooknamespacemodelmanager.js",
  "src/main/web/app/mainapp/services/sessionmanager.js",
  "src/main/web/app/mainapp/components/notebook/notebook.js",
  "src/main/web/app/mainapp/components/notebook/cell-directive.js",
  "src/main/web/app/mainapp/components/notebook/codecell-directive.js",
  "src/main/web/app/mainapp/components/notebook/codecellinputmenu-directive.js",
  "src/main/web/app/mainapp/components/notebook/codecelloutput-directive.js",
  "src/main/web/app/mainapp/components/notebook/codecelloutputmenu-directive.js",
  "src/main/web/app/mainapp/components/notebook/markdowncell-directive.js",
  "src/main/web/app/mainapp/components/notebook/newcellmenu-directive.js",
  "src/main/web/app/mainapp/components/notebook/notebook-directive.js",
  "src/main/web/app/mainapp/components/notebook/sectioncell-directive.js",
  "src/main/web/app/mainapp/components/notebook/textcell-directive.js",
  "src/main/web/app/mainapp/components/notebook/outputdisplay/outputdisplay.js",
  "src/main/web/app/mainapp/components/notebook/outputdisplay/outputdisplay-directive.js",
  "src/main/web/app/mainapp/components/notebook/outputdisplay/outputdisplayfactory-service.js",
  "src/main/web/app/mainapp/components/notebook/outputdisplay/outputdisplayservicemanager-service.js",
  "src/main/web/app/mainapp/components/pluginmanager/pluginmanager-directive.js",
  "src/main/web/app/mainapp/components/pluginmanager/pluginmanagerevaluatorsettings-directive.js",
  "src/main/web/app/mainapp/dialogs/codecelloptions-directive.js",
  "src/main/web/app/utils/basic/commonutils.js",
  "src/main/web/app/utils/basic/commonui.js",
  "src/main/web/app/utils/basic/angularutils.js",
  "src/main/web/app/utils/basic/treeview.js",
  "src/main/web/app/utils/cometdutils.js",
  "src/main/web/app/utils/notebookversionmanager.js",
  "src/main/web/app/utils/outputlog.js",
  "src/main/web/app/utils/recentmenu.js",
  "src/main/web/app/utils/session.js",
  "src/main/web/app/utils/share.js",
  "src/main/web/app/utils/track.js",
  "src/main/web/app/utils/utils.js"
];

var outdispcsslist = [
  // required for plot and combined plot output display
  "src/main/web/outputdisplay/bko-plot/bko-plot.css",
  "src/main/web/outputdisplay/bko-plot/bko-combinedplot.css"
];

var outdispjslist = [
 "src/main/web/vendor/bower_components/d3/d3.js",

 "src/main/web/outputdisplay/bko-tabledisplay.js",
 
 "src/main/web/outputdisplay/bko-image.js",
 
 "src/main/web/outputdisplay/bko-latex.js",
 
 "src/main/web/outputdisplay/bko-progress.js",

 "src/main/web/outputdisplay/bko-results.js",

 "src/main/web/vendor/vega/vega.js",
 "src/main/web/vendor/vega/d3.geo.projection.min.js",
 "src/main/web/vendor/vega/d3.layout.cloud.js",
 "src/main/web/outputdisplay/bko-vega.js",

 "src/main/web/outputdisplay/bko-plot/plotutils.js",
 "src/main/web/outputdisplay/bko-plot/plotsampler.js",
 "src/main/web/outputdisplay/bko-plot/plotitems/auxes/plotauxbox.js",
 "src/main/web/outputdisplay/bko-plot/plotitems/auxes/plotauxriver.js",
 "src/main/web/outputdisplay/bko-plot/plotitems/auxes/plotauxstem.js",
 "src/main/web/outputdisplay/bko-plot/plotitems/std/plotline.js",
 "src/main/web/outputdisplay/bko-plot/plotitems/std/plotbar.js",
 "src/main/web/outputdisplay/bko-plot/plotitems/std/plotstem.js",
 "src/main/web/outputdisplay/bko-plot/plotitems/std/plotarea.js",
 "src/main/web/outputdisplay/bko-plot/plotitems/std/plotpoint.js",
 "src/main/web/outputdisplay/bko-plot/plotitems/std/plotconstline.js",
 "src/main/web/outputdisplay/bko-plot/plotitems/std/plotconstband.js",
 "src/main/web/outputdisplay/bko-plot/plotitems/std/plottext.js",
 "src/main/web/outputdisplay/bko-plot/plotitems/lod/plotlodline.js",
 "src/main/web/outputdisplay/bko-plot/plotitems/lod/plotlodriver.js",
 "src/main/web/outputdisplay/bko-plot/plotitems/lod/plotlodbox.js",
 "src/main/web/outputdisplay/bko-plot/plotitems/lod/plotlodpoint.js",
 "src/main/web/outputdisplay/bko-plot/plotitems/lod/plotlodstem.js",
 "src/main/web/outputdisplay/bko-plot/plotitems/lodloader/plotlinelodloader.js",
 "src/main/web/outputdisplay/bko-plot/plotitems/lodloader/plotarealodloader.js",
 "src/main/web/outputdisplay/bko-plot/plotitems/lodloader/plotbarlodloader.js",
 "src/main/web/outputdisplay/bko-plot/plotitems/lodloader/plotstemlodloader.js",
 "src/main/web/outputdisplay/bko-plot/plotitems/lodloader/plotpointlodloader.js",
 "src/main/web/outputdisplay/bko-plot/plotaxis.js",
 "src/main/web/outputdisplay/bko-plot/plotfactory.js",
 "src/main/web/outputdisplay/bko-plot/plotconverter.js",
 "src/main/web/outputdisplay/bko-plot/plotformatter.js",
 "src/main/web/outputdisplay/bko-plot/combinedplotformatter.js",
 "src/main/web/outputdisplay/bko-plot/bko-plot.js",
 "src/main/web/outputdisplay/bko-plot/bko-combinedplot.js"
];

function handleError(e) {
  console.log('\u0007', e.message);
}

gulp.task("buildSingleCss", function() {
  gulp.src(csslist)
  .pipe(stripCssComments())
  .pipe(concat('beakerApp.css'))
  .pipe(header(banner ))
  .pipe(gulp.dest(buildPath));
});

gulp.task("buildSingleVendorJs", function() {
  gulp.src(jslist)
  .pipe(concat('beakerVendor.js'))
  .pipe(gulp.dest(buildPath));
});

gulp.task("buildSingleBeakerJs", function() {
  gulp.src(bkjslist)
  .pipe(stripJsComments())
  .pipe(concat('beakerApp.js'))
  .pipe(header(banner ))
  .pipe(gulp.dest(buildPath));
});

gulp.task("buildSingleOutDispCss", function() {
  gulp.src(outdispcsslist)
  .pipe(stripCssComments())
  .pipe(concat('beakerOutDisp.css'))
  .pipe(header(banner ))
  .pipe(gulp.dest(buildPath));
});

gulp.task("buildSingleOutDispJs", function() {
  gulp.src(outdispjslist)
  .pipe(debug())
  .pipe(concat('beakerOutDisp.js'))
  .pipe(header(banner ))
  .pipe(gulp.dest(buildPath));
});

gulp.task("compileBeakerScss", function() {
  gulp.src(Path.join(rootPath, "**.scss"))
  .pipe(sass().on('error', handleError))
  .pipe(importCss())
  .pipe(stripCssComments())
  //.pipe(minifyCSS())
  .pipe(gulp.dest(tempPath))
});

gulp.task("compileBeakerTemplates", function() {
  gulp.src(rootPath+ "/**/*.jst.html")
  .pipe(htmlClass({klass: "bkr"}))
  .pipe(htmlmin({removeComments: true}))
  .pipe(template({
    name: function (file) {
      return file.relative.split(".")[0];
    }
  }))
  .pipe(concat('templates.js'))
  .pipe(gulp.dest(buildPath));
});

gulp.task("watchBeakerScss", function() {
  var watchPath = rootPath + "/**/*.scss";
  gulp.watch(watchPath, ["compileBeakerScss"])
});

gulp.task("watchBeakerTemplates", function() {
  var watchPath = rootPath + "/**/*.jst.html";
  gulp.watch(watchPath, ["compileBeakerTemplates"])
});

gulp.task("watch", ["watchBeakerScss", "watchBeakerTemplates"]);
gulp.task("compile", ["compileBeakerScss", "compileBeakerTemplates", "buildSingleCss", "buildSingleVendorJs", "buildSingleBeakerJs", "buildSingleOutDispCss", "buildSingleOutDispJs"]);
