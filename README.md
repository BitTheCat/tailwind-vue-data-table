# Tailwind Vue Data Table

<img src="https://github.com/BitTheCat/tailwind-vue-data-table/blob/main/tvdatatable.jpg"/>

### Use in Vue
``` js
import { TVDataTable } from '@bitthecat/tailwind-vue-data-table' 
```

### Next additions
- Select row column (with checkbox)
- Row detail
- ...
<hr>

## Table
### Props

| Props | Default | Description |
| --- | --- | --- |
| multipleSortable | false | enables multiple sortable for table header |
### Slots

| Props | Description |
| --- | --- |
| items | table data |
| fields | data fields |
| #cell:FIELD_NAME | used for overwrite |


slot 'cell:' has item or data props

item retrieves the row value

``` html
    <template #cell:username="{ item }">
        {{ item.emoji }} - {{ item.username }}
    </template>
```

data retrieves the field value

``` html
    <template #cell:username="{ data }">
        {{ data }}
    </template>
```

### Events

| Event | Description |
| --- | --- |
| updateSortable | emit the sortable field/fields |

<hr>

## Fields 
### Props

| Props | Description |
| --- | --- |
| key | Th Title |
| label | index of value |
| sortable | the default setting is false, if set to true a symbol appears for sorting |
| thStyle | used for overwrite the th style |
| tdStyle | used for overwrite the td style |
| thClass | used for overwrite the th class |
| tdClass | used for overwrite the td class |