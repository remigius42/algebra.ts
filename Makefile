.PHONY: test

$(info version is $(PACKAGE_VERSION))

test:
	npx jasmine --config="jasmine.json"

bundle:
	npx browserify algebra.js --standalone algebra > build/algebra-$(PACKAGE_VERSION).js

minify: bundle
	npx uglifyjs --mangle --beautify ascii_only=true,beautify=false build/algebra-$(PACKAGE_VERSION).js > build/algebra-$(PACKAGE_VERSION).min.js

sync: minify
	git checkout gh-pages
	cp build/*.min.js javascripts

coveralls:
	npx nyc --reporter=lcovonly --reporter=text --reporter=text-summary jasmine --config=jasmine.json  && \
	cat ./coverage/lcov.info | npx coveralls && rm -rf ./coverage

lint:
	npx jshint algebra.js src/*.js test/*.js
