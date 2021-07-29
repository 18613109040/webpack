

"use strict"
import { minus } from "./minus.js"
import { hello } from "./dir/hello.js"
import {dir} from "./dir/index.js"
const fc = () => {
    const val = minus(2,1);
    console.log(val);
    hello();
    dir();
    console.dir("sssss");
}
fc();
