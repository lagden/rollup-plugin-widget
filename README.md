# rollup-plugin-widget

Generate widget file


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
path       | string  | .             | Path
more       | array   | []            | Anothers scripts files to import


## Usage

```js
import {rollup} from 'rollup'
import widget from 'rollup-plugin-widget'

rollup({
  entry: 'src/app.js',
  plugins: [
    widget()
  ]
}).then(/* ... */)
```


## License

MIT
