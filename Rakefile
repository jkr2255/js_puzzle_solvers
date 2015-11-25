require 'rake/clean'

source_js = FileList['src/**/*.js']
source_coffee = FileList['src/**/*.coffee']

tmp_js = source_js.pathmap("%{^src,tmp}p") + source_coffee.pathmap("%{^src,tmp}X.js")

CLEAN.include tmp_js

build_top = FileList['src/*.js', 'src/*.coffee']

build_top_tmp = build_top.pathmap("%{^src,tmp}X.js")

dist_top = build_top.pathmap("%{^src,gen}X.js")

CLOBBER.include dist_top

task default: dist_top

rule /gen\/.+\.js/ => tmp_js do |t|
 sh "browserify #{t.name.pathmap('%{^gen,tmp}p')} | uglifyjs -cm > #{t.name}"
 # sh "browserify #{t.name.pathmap('%{^gen,tmp}p')} > #{t.name}"
end

rule /tmp\/.+\.js/ => "%{^tmp,src}p" do |t|
  mkpath t.name.pathmap('%d')
  sh "babel #{t.source} -o #{t.name}"
end

rule /tmp\/.+\.js/ => "%{^tmp,src}X.coffee" do |t|
  path = t.name.pathmap('%d')
  mkpath path
  sh "coffee -bco #{path} #{t.source}"
end
