# Tailwind Vue Data Table

![](https://img.shields.io/badge/Vue3-318534?logo=vuedotjs&logoColor=white&style=flat-square)
![](https://img.shields.io/badge/Tailwind-6899C7?logo=tailwindcss&logoColor=white&style=flat-square)

Simple DataTable with slots, class and style modification for tr and td, sortable by columns (only graphics with click event).

Contains the TVPaginator component that can be disabled via prop or used in stand-alone mode.

<a href="https://www.npmjs.com/package/@bitthecat/tailwind-vue-data-table"><img alt="Total Downloads" src="https://img.shields.io/npm/dt/@bitthecat/tailwind-vue-data-table"></a>
<a href="https://www.npmjs.com/package/@bitthecat/tailwind-vue-data-table"><img alt="Latest Version" src="https://img.shields.io/npm/v/@bitthecat/tailwind-vue-data-table"></a>
<a href="https://www.npmjs.com/package/@bitthecat/tailwind-vue-data-table"><img alt="License" src="https://img.shields.io/npm/l/@bitthecat/tailwind-vue-data-table"></a>

<hr>

#### [*__Documentation__* ](https://bitthecat.github.io/tailwind-vue-data-table.html)

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

### Import default css
``` css
import "@bitthecat/tailwind-vue-data-table/dist/library.css" 
```

<hr>

This project is licensed under the MIT license. See [LICENSE](LICENSE).