module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
    plugins: [
        [
          "import",
          // libraryDirectory: "es",
          { libraryName: "ant-design-vue",libraryDirectory: "es",style:true }
        ]
      ]
}
