'use strict'

const loader = {
    toggleLoader: () =>{
        setTimeout(function(){
            $('.loader_bg').fadeToggle();
        }, 1500)
    }
}

export default loader

