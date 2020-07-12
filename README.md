# Build

```
git submodule init --update
cd streama-source
./gradlew build
wget 'https://github.com/grails/grails-core/releases/download/v4.0.3/grails-4.0.3.zip'
ln -s grails-4.0.3/bin/grails .
./grails war
cp -r build/assets ../
```

TODO: figure out how to use `grails.assets.storagePath`
