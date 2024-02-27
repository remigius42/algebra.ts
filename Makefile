.PHONY: test

$(info version is $(PACKAGE_VERSION))

test:
	npx jasmine --config="jasmine.json"

bundle:
	./node_modules/.bin/browserify algebra.js --standalone algebra > build/algebra-$(PACKAGE_VERSION).js

minify: bundle
	./node_modules/.bin/uglifyjs --mangle --beautify ascii_only=true,beautify=false build/algebra-$(PACKAGE_VERSION).js > build/algebra-$(PACKAGE_VERSION).min.js

sync: minify
	git checkout gh-pages
	cp build/*.min.js javascripts

coveralls:
	npx nyc --reporter=lcovonly --reporter=text --reporter=text-summary jasmine --config=jasmine.json  && \
	cat ./coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js && rm -rf ./coverage

lint:
	./node_modules/jshint/bin/jshint algebra.js src/*.js test/*.js
