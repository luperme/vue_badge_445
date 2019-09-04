//Challenge 8
//Vue.component('product-details', {
    //props: {
        //details: {
            //type: Array,
            //required: true
        //}
    //},
    //template: `
        //<ul>
            //<li v-for="detail in details">{{ detail }}</li>
        //</ul>
    //`
//})
Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: `
    <div class="product">

            <div class="product-image">
                <img :src="image" :alt="altText"/>
            </div>

            <div class="product-info">
                <!--Changed in Lesson 7-->
                <h1>{{ title }}</h1>

                <!--Challenge 1
                <p>{{ description }}</p>
                --> 
                <!--Challenge 2
                <a :href="link" target="_blank">More products like this</a>
                -->

                <!-- Added in Lesson 3-->
                <p v-if="inStock">In Stock</p>

                <!--Challenge 6-->
                <!--:class="{ outOfStock: !inStock }" ADDED TO P TAG BELOW-->

                <p v-else>Out of Stock</p>
                <p>Shipping: {{ shipping }}</p>

                <!--Challenge 3
                <p v-if="onSale">On Sale!</p>
                -->
                
                <!--Added in Lesson 4-->
                <ul>
                    <li v-for="detail in details">{{ detail }}</li>
                </ul>

                <div v-for="(variant, index) in variants" 
                    :key="variant.variantId"
                    class="color-box"
                    :style="{ backgroundColor: variant.variantColor }"
                    @mouseover="updateProduct(index)">
                </div>

                <!--Challenge 4
                <ul>
                    <li v-for="size in sizes">{{ size }}</li>
                </ul>
                -->

                <button v-on:click="addToCart" 
                    :disabled="!inStock"
                    :class="{ disabledButton: !inStock }">Add to Cart</button>

                <div class="cart">
                    <p>Cart({{cart}})</p>
                </div>

                <!--Challenge 5
                <button @click="outOfCart">Remove from Cart</button>
                -->

            </div>
        </div>
    `,
    data() {
        return {
            brand: 'Vue Mastery', //Added in Lesson 7
            product: 'Socks',
            //Challenge 1
            //description: 'A pair of warm, fuzzy socks'
        
            //Added in Lesson 2
            selectedVariant: 0,
                altText: 'A pair of socks',
                
                // Challenge 2
                //link: 'https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks'
                
                //Added in Lesson 3
                //inStock: true,
        
                //Challenge 3
                //onSale: true
        
                //Added in Lesson 4
                details: ["80% cotton", "20% polyester", "Gender-neutral"],
                variants: [
                    {
                        variantId: 2234,
                        variantColor: "green",
                        variantImage: './vmSocks-green-onWhite.jpg',
                        variantQuantity: 10
                    },
                    {
                        variantId: 2235,
                        variantColor: "blue",
                        variantImage: './vmSocks-blue-onWhite.jpg',
                        variantQuantity: 0
                    }
                ],
        
                //Challenge 4
                //sizes: ["small", "medium", "large", "x-large"]
        
                //Added in Lesson 5
                cart: 0
        
                //Challenge 7
                //onSale: true
            }
        },
                
        methods: {
            addToCart() {
                this.cart += 1
            },
            updateProduct(index) {
                this.selectedVariant = index
                console.log(index)
            }//,
            //Challenge 5
            //outOfCart() {
                //this.cart -= 1
            //}
        
        },
        //Added in Lesson 7
        computed: {
            title() {
                return this.brand + ' ' + this.product
            },
            image() {
                return this.variants[this.selectedVariant].variantImage
            },
            inStock() {
                return this.variants[this.selectedVariant].variantQuantity
            },
        
            //Challenge 7
            //sale() {
                //if (this.onSale) {
                    //return this.brand + ' ' + this.product + ' are on sale!'
                //}    
                    //return this.brand + ' ' + this.product + ' are not on sale'
            //}

            shipping() {
                if (this.premium) {
                    return "Free"
                }
                return 2.99
            }
        }
})

var app = new Vue({
    el: '#app',
    data: {
        premium: true
    }    
})