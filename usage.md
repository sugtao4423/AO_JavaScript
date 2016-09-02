# 使い方

## JSON2Table.js
JSONデータをテーブルにして表示するJavaScript

1. tableを挿入する要素を作り、固有のIDを指定  
    ex. `<div id="sample-table"></div>`
1. `<script>`タグ内で JSON2Table.js を宣言

```javascript:Minimum
new JSON2Table({
    element : '',
    keys : [],
    json : [],
    unit : '',
    appendUnitKeys : []
});
```

### オプション
名称 | データ型 | 説明 | 必須
--- | --- | --- | ---
element | String | 挿入する対象要素ID | :heavy_check_mark:
keys | String Array | JSONデータから取得するキー | :heavy_check_mark:
json | String Array | JSONデータ | :heavy_check_mark:
unit | String | 単位 |
appendUnitKeys | String Array | 単位を付与するJSONデータのキー |


## JSON2LineGraph.js
JSONデータを折れ線グラフにして表示するJavaScript

1. 描画するcanvas要素を作り、固有のIDを指定  
    ex. `<canvas id="canvas"></canvas>`
1. `<script>`タグ内で JSON2LineGraph.js を宣言

```
new JSON2LineGraph({
    element : '',
    xKey : '',
    yKeys : [],
    json : [],
    yUnit : '',
    lineColors : []
});
```

### オプション
名称 | データ型 | 説明 | 必須
--- | --- | --- | ---
element | String | 描画するcanvas要素ID | :heavy_check_mark:
xKey | String | X軸となるJSONデータのキー | :heavy_check_mark:
yKeys | String Array | Y軸となるJSONデータにキー | :heavy_check_mark:
json | String Array | JSONデータ | :heavy_check_mark:
unit | String | 単位 |
lineColors | String Array | 折れ線の色 |

### lineColorsに関して
lineColorsを指定する場合、`yKeys`の長さより小さくなってはいけません

lineColorsを指定しなかった場合はデフォルトの値である  
`'#0b62a4', '#7a92a3', '#4da74d', '#afd8f8', '#edc240', '#cb4b4b', '#9440ed'`  
が割り当てられますが、`yKeys`の長さが`8`以上になる場合は指定してください。
