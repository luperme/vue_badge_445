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
var eventBus = new Vue()

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
                <!--<p>Shipping: {{ shipping }}</p>-->

                <!--Challenge 3
                <p v-if="onSale">On Sale!</p>
                -->
                
                <!--Added in Lesson 4
                <ul>
                    <li v-for="detail in details">{{ detail }}</li>
                </ul>-->

                <info-tabs :shipping="shipping" :details="details"></info-tabs>

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

                <!--Challenge 5
                <button @click="outOfCart">Remove from Cart</button>
                -->

            </div>

            <product-tabs :reviews="reviews"></product-tabs>

        </div>
    `,
    data() {
        return {
            brand: '', //Added in Lesson 7
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
        
                //Added in Lesson 5 (moved to Vue instance)
        
                //Challenge 7
                //onSale: true

                reviews: []
            }
        },
                
        methods: {
            addToCart() {
                this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
            },
            updateProduct(index) {
                this.selectedVariant = index
                console.log(index)
            }
            //Challenge 5 and 9
            //outOfCart() {
                //this.$emit('out-of-cart', this.variants[this.selectedVariant].variantId)
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
        },
        mounted() {
            eventBus.$on('review-submitted', productReview => {
                this.reviews.push(productReview)
            })
        }
})


Vue.component('product-review', {
    template: `
    <form class="review-form" @submit.prevent="onSubmit">

    <p v-if="errors.length">
        <b>Please correct the following error(s):</b>
        <ul>
            <li v-for="error in errors">{{ error }}</li>
        </ul>
    </p>

    <p>
        <label for="name">Name:</label>
        <input id="name" v-model="name">
    </p>

    <p>
        <label for="review">Review:</label>
        <textarea id="review" v-model="review"></textarea>
    <p>
        <label for="rating">Rating:</label>
        <select id="rating" v-model.number="rating">
            <option>5</option>
            <option>4</option>
            <option>3</option>
            <option>2</option>
            <option>1</option>
        </select>
    </p>

    <!--Challenge 10
    <p>Would you recommend this product?</p>
    <label>
        Yes
        <input type="radio" value="Yes" v-model="rec"/>
    </label>

    <label>
        No
        <input type="radio" value="No" v-model="rec"/>
    </label>
    -->

    <p>
        <input type="submit" value="Submit">
    </p>

    </form>
    `,
    data() {
        return {
            name: null,
            review: null,
            rating: null,
            errors: []
        }
    },
    methods: {
        onSubmit() {
            if (this.name && this.review && this.rating) {

                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating
                    //rec: this.rec
                }
                eventBus.$emit('review-submitted', productReview)
                this.name = null,
                this.review = null,
                this.rating = null
                //this.rec = null
            }
            else {
                if(!this.name) this.errors.push("Name required.")
                if(!this.review) this.errors.push("Review required.")
                if(!this.rating) this.errors.push("Rating required.")
                //if(!this.rec) this.errors.push("Product recommendation required.")
            }
        } 
    }
})

Vue.component('product-tabs', {
    props: {
        reviews: {
            type: Array,
            required: true
        },
       
    },
    template: `
        <div>
            <span class="tab"
                :class="{ activeTab: selectedTab === tab}"
                v-for="(tab, index) in tabs" 
                :key="index"
                @click="selectedTab = tab">
                {{ tab }}</span>

            <div v-show="selectedTab === 'Reviews'">
                <p v-if="!reviews.length">There are no reviews yet.</p>
                <ul v-else>
                    <li v-for="review in reviews">
                    <p>{{ review.name }}</p>
                    <p>Rating: {{ review.rating }}</p>
                    <p>{{ review.review }}</p>
                    </li>
                </ul>
            </div>
    
            <product-review v-show="selectedTab === 'Make a Review'"></product-review>

           

        </div>
    `,
    data() {
        return {
            tabs: ['Reviews', 'Make a Review'],
            selectedTab: 'Reviews'
        }
    }
})

//Challenge 11 (entire component)
Vue.component('info-tabs', {
    props: {
        shipping: {
            required: true
        },
        details: {
            type: Array,
            required: true
        }
    },
    template: `
        <div>
            <ul>
                <span class="tab"
                    :class="{ activeTab: selectedTab === tab}"
                    v-for="(tab, index) in tabs" 
                    :key="tab"
                    @click="selectedTab = tab">
                    {{ tab }}</span>
            </ul>
            
            <div v-show="selectedTab === 'Shipping'">
                <p>{{ shipping }}</p>
            </div>

            <div v-show="selectedTab === 'Details'">
                <ul>
                    <li v-for="detail in details">{{ detail }}</li>
                </ul>
            </div>
        </div>
    `,
    data() {
        return {
            tabs: ['Shipping', 'Details'],
            selectedTab: 'Shipping'
        }
    }
})
var app = new Vue({
    el: '#app',
    data: {
        premium: false,
        cart: []
    },
    methods: {
        updateCart(id) {
            this.cart.push(id)
        },
        //removeItem(id) {
            //for(var i = this.cart.length - 1; i >= 0; i--) {
                //if (this.cart[i] === id) {
                    //this.cart.splice(i, 1);
                //}
            //}
        //}
    }   
})