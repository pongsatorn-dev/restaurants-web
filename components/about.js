export default {
    setup() {
        const name = 'Pongsatorn Jintana'
        return {
            name
        }
    },
    template: `
    <section class="search-place mt-3 mb-3">
            <div class="card">
                <h5 class="card-header">About</h5>
                <div class="card-body">
                    <div class="input-group mb-3">
                        <h3>{{ name }}</h3>
                      </div>
                </div>
            </div>
    </section>     
    `
  }

  