//callback(err, product||store||city)
const products = require('../data/products.json');
const stores = require('../data/stores.json');
const cities = require('../data/cities.json');

/**
 * async processes
 */
const getProductByName = (name, cb) => {
    setTimeout(() => {
        const product = products.find(product => product.name === name);
        if (product) { //موجود
            cb(undefined, product);
            //undefind => error(else)
        } else { //مش موجود
            err = { message: "Not found", code: 404 };
            // obj على شكل errorيفضل تعريف ال
            //object هو inputاذا ال arrayOfObject نفسه productsلانه ال
            //products => arrayOfObject
            //one product => object
            cb(err, null);
            //let it equal null.
        }
    }, 1000)
}

const getStoreById = (id, cb) => {
    setTimeout(() => {
        const store = stores.find(store => store.id === id);
        if (store) {
            cb(undefined, store);
        } else {
            err = { message: "Not found", code: 404 };
            cb(err, null);
        }
    }, 1000)
}

const getCityByName = (name, cb) => {
    setTimeout(() => {
        const city = cities.find(city => city.name === name);
        if (city) {
            cb(undefined, city);
        } else {
            err = { message: "Not found", code: 404 };
            cb(err, null);
        }
    }, 1000)
}


/**
 * callbacks and run
 */

const testProductName = "Tea Ahmad";

getProductByName(testProductName, (err, product) => {
    if (err) {
        console.log('error in get product is', err);
    } else {
        console.log('product is', product);

        getStoreById(product.store_id, (err, store) => {
            if (err) {
                console.log('error in get store is', err);
            } else {
                console.log('store is', store);

                getCityByName(store.city, (err, city) => {
                    if (err) {
                        console.log('error in get city is', err);
                    } else {
                        console.log('city is', city);
                    }
                })
            }
        })
    }
})

// above calls is called "callback hell"
/** Notes:
 * 1- callback-hell || Pyramid of Doom:
 *     - Nested Callbacks => Nested Functions.
 *     - Complexity Is So High.
 *     - Hard To Understand The Code.
 * 
 * 2- Solution for Callback-Hell || Pyramid of Doom:
 *      - Promise.
 *      - 
 */