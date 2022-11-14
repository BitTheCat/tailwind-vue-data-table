# Tailwind Vue Data Table

Simple DataTable with slots, class and style modification for tr and td, sortable by columns (only graphics with click event).

Contains the TVPaginator component that can be disabled via prop or used in stand-alone mode.

<img src="https://github.com/BitTheCat/tailwind-vue-data-table/blob/main/assets/tvdatatable.jpg"/>

<hr>

#### ❗️ *__Documentation soon available__* 
##### For now, check under dev/TableShow.vue to see the table in action or [here](https://bitthecat.github.io/tailwind-vue-data-table.html)

<hr>

### Install
```
npm i @bitthecat/tailwind-vue-data-table
```

Add this code inside **tailwind.config.*** to compile the css library

``` js
content: [
    ...
    './node_modules/@bitthecat/tailwind-vue-data-table/dist/*.js',
],
```

### Use in Vue
``` js
import { TVTable } from '@bitthecat/tailwind-vue-data-table' 
```

<hr>

This project is licensed under the MIT license. See [LICENSE](LICENSE).