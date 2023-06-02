const App = {
    data() {
        return {
            title: 'Button show hide',
            lorem: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit, illum.',
            labtoggle: true,
            myshoptoggle: true
        }
    }
}

Vue.createApp(App).mount('#app')