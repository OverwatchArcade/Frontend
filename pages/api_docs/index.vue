<template>
  <div>
    <div class="row">
      <div class="col-auto">
        <h1>API</h1>
        <h4>
          By using the API you agree to the Attribution-NonCommercial-ShareAlike
          4.0 International (CC BY-NC-SA 4.0) license
        </h4>
      </div>
    </div>

    <div class="row mt-4">
      <div class="col-12 col-md-4 mb-2 mb-sm-0">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">
              Overwatch
            </h5>
            <p class="card-text">
              Featuring Today's arcade and available gamemodes
            </p>
            <nuxt-link
              to="/api_docs/overwatch"
              class="card-link"
            >
              View
            </nuxt-link>
          </div>
        </div>
      </div>
      <!--            <div class="col-12 col-md-4 mb-2 mb-sm-0">-->
      <!--                <div class="card">-->
      <!--                    <div class="card-body">-->
      <!--                        <h5 class="card-title">Overwatch 2</h5>-->
      <!--                        <p class="card-text">Featuring Today's arcade and available gamemodes</p>-->
      <!--                        <nuxt-link to="/api/v1/overwatch2" class="card-link">View</nuxt-link></div>-->
      <!--                </div>-->
      <!--            </div>-->
      <div class="col-12 col-md-4 mb-2 mb-sm-0">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">
              Contributors
            </h5>
            <p class="card-text">
              View contributor data
            </p>
            <nuxt-link
              to="/api_docs/contributors"
              class="card-link"
            >
              View
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {}
</script>
