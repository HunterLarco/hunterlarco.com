module.exports = {
  productionSourceMap: false,

  pluginOptions: {
    s3Deploy: {
      registry: undefined,
      awsProfile: "default",
      overrideEndpoint: false,
      region: "us-east-1",
      bucket: "hunterlarco.com",
      createBucket: false,
      staticHosting: false,
      assetPath: "dist",
      assetMatch: "**",
      deployPath: "/",
      acl: "public-read",
      pwa: false,
      enableCloudfront: true,
      cloudfrontId: "E2ID2BM3SQABB2",
      cloudfrontMatchers: "/index.html,/service-worker.js,/manifest.json",
      pluginVersion: "4.0.0-rc3",
      uploadConcurrency: 5,
    },
  },
};
