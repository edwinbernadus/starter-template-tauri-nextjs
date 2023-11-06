# starter-template-tauri-nextjs

## Getting Started
** read this first **  
https://github.com/edwinbernadus/starter-template-frontend-framework


## How To Build?
```shell
pnpm dev
```
```shell
pnpm build
```

## Snippet List
- hint_create_button
````javascript
{/*hint_create_button*/}
<CardButton
        onClick={() => {
        }}
        title="Go To Next Page"
        description=""
/>
````
- hint_open_new_page
````javascript
{/*hint_open_new_page*/}
<Link href="/detail">
````
- hint_loading_webservice
````rust
// hint_loading_webservice
let response = client.get(url).send();
````
- hint_show_loading_indicator
````javascript
// hint_show_loading_indicator
setMsg("loading");
````
- hint_show_webservice_result_on_list
````javascript
// hint_show_webservice_result_on_list
setItems(data)
````
- hint_button_on_list
````javascript
{/*hint_button_on_list*/}
<a href="#"
    onClick={() => {
        // hint_show_detail_item_on_alert
        alert(item.title)
    }}
    key={item.id}
>
    {item.title} - {item.userId} - {item.id}
</a>
````
- hint_show_detail_item_on_alert
````javascript
// hint_show_detail_item_on_alert
alert(item.title)
````