var ModuleManager = (function ModuleManager(){
    const modules = {}
    function define(name, deps, impl){
        for(let i=0;i<deps.length;i++){
            deps[i] = modules[deps[i]]    
        }
        modules[name] = impl.apply(impl,deps)
    }
    function get(name){
        return modules[name]
    }
    return {
        define,
        get
    }
 })();

 const {define,get} = ModuleManager;
 define('a',[],function(){
     return 1
 })
 define('b',[],function(){
    return 2
})
 define('calc',['a','b'],function(a,b){
    console.warn(a+b)
 })
 get('calc')