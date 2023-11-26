export default {
    data() {
        return { 
            searchPlace: null,
            restaurants: null,
            nextPageToken : null,
            showLoadMoreBtn: false,
            showLoading: true,
            endpoint: {
                search: 'https://www.pongsatorn.net/backend/public/api/search/',
                loadMore: 'https://www.pongsatorn.net/backend/public/api/next/',
            },
         }
    },
    mounted() {
        this.search();
    },
    methods: {
        search() { // this method for search restaurants near place

            // set default data
            this.restaurants = null;
            this.showLoading = true;
            this.showLoadMoreBtn = false;
            
            fetch(this.endpoint.search + this.searchPlace)
            .then( resp => {
                return resp.json();
            }).then( data =>  {
                this.restaurants = data.restaurants;
                this.nextPageToken = data.next_page_token;
                this.showLoadMoreBtn = true;

                // if dont have next page
                if(this.nextPageToken == null) {
                    this.showLoadMoreBtn = false;
                }

                this.showLoading = false;
            })
            .catch( err => {
                console.log(err);
            })
        },
        loadMore() { // this method for load restaurants next page

            // set default data
            this.showLoading = true;
            this.showLoadMoreBtn = false;

            fetch(this.endpoint.loadMore + this.nextPageToken)
            .then( resp => {
                return resp.json();
            }).then( data =>  {
                // insert new data while still having old data
                this.restaurants.push(...data.restaurants);
                this.nextPageToken = data.next_page_token;
                this.showLoadMoreBtn = true;

                // if dont have next page
                if(this.nextPageToken == null) {
                    this.showLoadMoreBtn = false;
                }

                this.showLoading = false;
            })
            .catch( err => {
                console.log(err);
            })
        }
    },
    template: `
    <section class="search-place mt-3 mb-3">
            <div class="card">
                <h5 class="card-header">ค้นหาสถานที่ใกล้เคียง</h5>
                <div class="card-body">
                    <div class="input-group mb-3">
                        <input v-model="searchPlace" @keydown.enter="search()" type="text" class="form-control" placeholder="bangsue" aria-label="bang sue" aria-describedby="button-addon2">
                        <button @click="search()" class="btn btn-outline-secondary" type="button" id="button-addon2">ค้นหา</button>
                      </div>
                </div>
            </div>
    </section>

    <section class="place mb-3">
        <div class="row row-cols-1 row-cols-md-4 g-4">
            
            <div class="col" v-for="restaurant in restaurants">
                <div class="card h-100">
                <div class="card-body">
                    <h5 class="card-title text-center">{{ restaurant.restaurant_name }}</h5>
                    <p class="card-text"><small><strong>ที่ตั้ง :</strong> {{ restaurant.detail.formatted_address }}</small></p>
                </div>
                <div class="card-footer">
                    <small class="text-body-secondary">
                        <strong>ติดต่อ :</strong> {{ restaurant.detail.formatted_phone_number ? restaurant.detail.formatted_phone_number : '-' }}
                    </small>
                </div>
                </div>
            </div>
            
        </div>

        <div class="d-flex justify-content-center mt-5" v-if="showLoading">
            <div class="spinner-border" style="width: 3rem; height: 3rem;" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>

        <div class="load-more text-center mt-5">
            <button v-if="showLoadMoreBtn" @click="loadMore" class="btn btn-primary btn-load-more">โหลดเพิ่มเติม</button>
        </div>
    </section> 
    `
  }

  