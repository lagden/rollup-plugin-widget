# rollup-plugin-widget

Generate app widget


## Installation

```
npm i -D @tadashi/rollup-plugin-widget
```

## API

createApp( [options] )

Name      | Type   | Default    | Description
--------- | ------ | ---------- | ------------
options   | object | See bellow | Plugin options


### options

Name       | Type    | Default       | Description
---------  | ------  | ----------    | ------------
output     | string  | widget.js     | Output filename
publicPath | string  | process.cwd() | Directory where file is published
additional | array   | []            | Anothers scripts files to import
esm        | boolean | false         | Use native import


## Usage

```js
import {rollup} from 'rollup'
import envs from 'rollup-plugin-widget'

rollup({
  entry: 'src/index.js',
  plugins: [
    widget({
      publicPath: `./public/scripts`,
      output: 'widget.js',
      esm: true
    })
  ]
}).then(/* ... */)
```


## License

MIT
