
release:
	git tag -a v$(TAG) -m "$(MESSAGE)"
	git push --tags

dev:
	NODE_ENV=development npm run dev

prod:
	NODE_ENV=production npm run dist

dist:
	firebase use tv-deadpool
	firebase deploy

dist-dev:
	firebase use tv-deadpool-dev
	firebase deploy

clean:
	rm public/bundle.js public/bundle.css
