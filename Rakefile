require 'rake/clean'

source_js = FileList['src/**/*.js']
source_coffee = FileList['src/**/*.coffee']
source_tag = FileList['src/**/*.tag']

tmp_js = source_js.pathmap('%{^src,tmp}p') + source_coffee.pathmap('%{^src,tmp}X.js')
tmp_js += source_tag.pathmap('%{^src,tmp}X.js')

CLEAN.include tmp_js

build_top = FileList['src/*.js']

dist_top = build_top.pathmap('%{^src,gen}X.js')

CLOBBER.include dist_top

task default: dist_top

SEP = File::ALT_SEPARATOR || File::SEPARATOR

NPM_BIN_PATH = "node_modules#{SEP}.bin#{SEP}"

rule %r{gen/.+\.js} => tmp_js do |t|
  sh "#{NPM_BIN_PATH}browserify #{t.name.pathmap('%{^gen,tmp}p')} | #{NPM_BIN_PATH}uglifyjs -cm > #{t.name}"
  # sh "browserify #{t.name.pathmap('%{^gen,tmp}p')} > #{t.name}"
end

rule %r{tmp/.+\.js} => '%{^tmp,src}p' do |t|
  mkpath t.name.pathmap('%d')
  sh "#{NPM_BIN_PATH}babel #{t.source} -o #{t.name}"
end

rule %r{tmp/.+\.js} => '%{^tmp,src}X.coffee' do |t|
  path = t.name.pathmap('%d')
  mkpath path
  sh "#{NPM_BIN_PATH}coffee -bco #{path} #{t.source}"
end

rule %r{tmp/.+\.js} => '%{^tmp,src}X.tag' do |t|
  path = t.name.pathmap('%d')
  mkpath path
  sh "#{NPM_BIN_PATH}riot -m -t es6 #{t.source} #{path}"
end
